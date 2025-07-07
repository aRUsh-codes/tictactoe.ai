let aiDatabase = {};
const nodeExpansionMap = {};


// Load AI move data
fetch('ai_db.json')
  .then(response => response.json())
  .then(data => {
    aiDatabase = data;
  });

// Determine current player's turn
function currentPlayer(state) {
  const ones = [...state].filter(c => c === '1').length;
  const twos = [...state].filter(c => c === '2').length;
  return ones <= twos ? '1' : '2';
}

// Entry point: called on button click
function suggestMove() {
  const input = document.getElementById('gameStateInput').value;
  const resultDiv = document.getElementById('result');
  const inputPlayer = currentPlayer(input); // track the original input player
  resultDiv.textContent = '';

  if (!/^[012]{9}$/.test(input)) {
    resultDiv.textContent = "Please enter a valid 9-digit game state using only 0, 1, and 2.";
    return;
  }

  if (!(input in aiDatabase)) {
    resultDiv.textContent = "No moves available. Better luck next time!";
    return;
  }

  const rootNode = buildTree(input, 0, 3, new Set(), null, inputPlayer); // pass inputPlayer

  const treeContainer = document.getElementById('treeContainer');
  treeContainer.innerHTML = '';
  const ul = document.createElement('ul');
  buildTreeDom(rootNode, ul, rootNode.rootPlayer);
  treeContainer.appendChild(ul);
}

// Recursively build the tree structure
function buildTree(state, depth, maxDepth, visited, parent = null, rootPlayer = null) {
  if (visited.has(state) || depth > maxDepth) return null;
  visited.add(state);

  if (!rootPlayer) {
    rootPlayer = currentPlayer(state); // input player
  }

  let winProb = 0;

  if (parent && aiDatabase[parent] && aiDatabase[parent][state]) {
    winProb = aiDatabase[parent][state][`p${rootPlayer}_wins`] ?? 0;
  } else if (!parent && aiDatabase[state]) {
    // This is the root node — estimate winProb from its children
    const children = Object.values(aiDatabase[state]);
    const total = children.length;
    if (total > 0) {
      let sum = 0;
      for (const child of children) {
        sum += child[`p${rootPlayer}_wins`] ?? 0;
      }
      winProb = sum / total;
    }
  }


  const node = {
    id: state,
    label: renderLabel(state),
    winProb: winProb,
    children: [],
    expanded: nodeExpansionMap[state] || false,
    rootPlayer: rootPlayer
  };

  const moves = aiDatabase[state];
  if (!moves) return node;

  for (const [nextState, _] of Object.entries(moves)) {
    const child = buildTree(nextState, depth + 1, maxDepth, visited, state, rootPlayer);
    if (child) node.children.push(child);
  }

  return node;
}


// Convert state to readable board label
function renderLabel(state) {
  const cells = state.split('').map(c => {
    if (c === '1') return 'X';
    if (c === '2') return 'O';
    return '';
  });

  return `
${cells[0]} ${cells[1]} ${cells[2]}
${cells[3]} ${cells[4]} ${cells[5]}
${cells[6]} ${cells[7]} ${cells[8]}
  `.trim();
}

// Render each tree node into DOM
function buildTreeDom(node, parentEl, rootPlayer) {
  const li = document.createElement('li');
  const container = document.createElement('div');
  container.className = 'node-container';

  // Color based on win percentage
  if (node.winProb > 0.6) {
    container.classList.add('green');
  } else if (node.winProb < 0.4) {
    container.classList.add('red');
  }

  // Win percentage text
  const winInfo = document.createElement('div');
  winInfo.className = 'win-info';
  winInfo.textContent = `Win%: ${Math.round(node.winProb * 100)}% for Player ${rootPlayer}`;
  container.appendChild(winInfo);

  // Encouragement
  const message = document.createElement('div');
  message.className = 'encouragement';
  if (node.winProb >= 0.75) {
    message.textContent = "We’ve got this 💪";
    message.style.color = '#2e7d32';
  } else if (node.winProb >= 0.4) {
    message.textContent = "It’s close! Stay sharp 🔍";
    message.style.color = '#f9a825';
  } else {
    message.textContent = "Tough road ahead 😅";
    message.style.color = '#c62828';
  }
  container.appendChild(message);

  // Board
  const board = document.createElement('div');
  board.className = 'board';
  for (const c of node.id) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = c === '1' ? 'X' : c === '2' ? 'O' : '';
    board.appendChild(cell);
  }
  container.appendChild(board);

  // Expand/Collapse button
  if (node.children.length > 0) {
    const toggleBtn = document.createElement('button');
    toggleBtn.textContent = node.expanded ? '−' : '+';
    toggleBtn.className = 'toggle-btn';

    toggleBtn.onclick = () => {
      nodeExpansionMap[node.id] = !node.expanded;
      suggestMove(); // re-renders tree and picks up expanded state from the map
    };

    container.appendChild(toggleBtn);
  }


  li.appendChild(container);

  // Only render children if expanded
  if (node.expanded && node.children.length > 0) {
    const ul = document.createElement('ul');
    node.children.forEach(child => buildTreeDom(child, ul, rootPlayer));
    li.appendChild(ul);
  }

  parentEl.appendChild(li);
}
