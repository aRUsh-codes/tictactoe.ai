# 🎮 Tic-Tac-Toe AI Tree Visualizer

Ever wondered how an AI "thinks" during a game of Tic-Tac-Toe? What if you could *see* the entire game tree unfold in front of you—moves, probabilities, and all?  
**Welcome to the Tic-Tac-Toe AI Tree Visualizer**, a creative and interactive way to explore game strategy through beautifully rendered decision trees! 🌳✨

---

## 🧠 The Idea

It all started with a simple curiosity:  
> *"If an AI is playing Tic-Tac-Toe, how does it know which move is best?"*

From that question came a fun side project—something that’s part AI, part visualization, and 100% educational. Instead of letting an AI just suggest a move, why not **visualize the entire decision tree** of possibilities, complete with **win probabilities, encouragement messages**, and **expandable branches**?

---

## 🚀 Features

🟢 **Dynamic Move Tree:**  
Visualizes the game tree from any current board state.

🎯 **AI Insights:**  
Each node shows the win percentage **for the original player** (the one who entered the input).

📦 **Expandable Tree Nodes:**  
Click the ➕ button under any board to expand that branch. It's like opening a new box of possibilities!

🎨 **Smart UI Cues:**  
- Green borders mean you're likely to win 💪  
- Red borders mean trouble ahead 😅  
- Yellow means it's a tight call 🔍

📈 **Win Probabilities + Messages:**  
Each board displays an encouraging message based on your chances.

🖼️ **Beautiful UI:**  
- Centered input area  
- Blurred arcade-style background  
- Scrollable game tree so no branch gets cut off

---

## 🕹️ How to Use

1. **Enter a game state** in the input field (e.g., `120000001`).  
   Use digits:
   - `0` for empty  
   - `1` for X (Player 1)  
   - `2` for O (Player 2)

2. **Click “Suggest Best Move Tree”**

3. **Explore the decision tree** that appears below:
   - Hover to view each board
   - Click ➕ to expand deeper branches
   - Watch the tree grow and strategize smarter!
   - If you want to retract then just click the - sign and it would resolve back to a collapsable UI

---

## 🧩 Behind the Scenes

The app reads from a JSON file (`ai_db.json`) filled with precomputed probabilities of winning for every possible state and move.  
It:
- Detects whose turn it is
- Builds a decision tree
- Calculates the win chance for the **original player**
- Dynamically renders the tree with visual cues

---

## 💡 Tech Stack

- **HTML, CSS, JavaScript** (Vanilla but snazzy 😎)
- **Precomputed AI game states** stored in JSON
- **Dynamic DOM rendering** of trees
- **Responsive layout** with expandable/scrollable views

---

## 🧪 Fun Ideas to Try

- Enter a winning position (like `112122021`) and feel like a genius
- Enter an empty board (`000000000`) and explore how massive the full tree gets
- Try entering a weird invalid string like `123456789` and see the validation kick in

---

## 📬 Future Improvements

- Zoom/drag controls for larger trees  
- Tooltip overlays on hover  
- Downloadable move recommendations  
- Mobile responsiveness for tree views

---

## 🙌 Inspiration

Inspired by curiosity, classic games, and a sprinkle of obsession over visualizing things AI usually hides from us.  
This isn’t just a game—it’s **a window into how machines reason**, and a cool way to learn game theory without feeling like homework.

---

## 🎉 Have fun exploring the AI’s mind—one move at a time!
