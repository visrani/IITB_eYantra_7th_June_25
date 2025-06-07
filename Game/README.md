# Contents of /grid-apple-quest/README.md

# Grid Apple Quest Game

## Overview
Grid Apple Quest is a web-based game where the player controls a hero navigating through a 10x10 grid. The objective is to collect apples to score points while avoiding monsters that chase the player.

## Project Structure
The project is organized into the following directories and files:

```
grid-apple-quest
├── src
│   ├── css
│   │   └── style.css       # Styles for the game, including layout and animations
│   ├── js
│   │   ├── game.js         # Main game logic and scoring
│   │   ├── player.js       # Player class and movement logic
│   │   ├── monster.js      # Monster class and AI behavior
│   │   └── grid.js         # Grid management and rendering
│   └── index.html          # Main HTML file for the game interface
└── README.md                # Project documentation
```

## Gameplay Instructions
1. **Movement**: Use the arrow keys (↑↓←→) to move the hero around the grid.
2. **Objective**: Collect apples (🍎) to score points while avoiding ghost monsters (👻).
3. **Scoring**: Each apple gives 10 points. Every 50 points spawns a new monster.
4. **Game Over**: The game ends when the hero collides with a monster.
5. **Characters**: 
   - 😊 Player (you)
   - 🍎 Apple (collect for points)
   - 👻 Ghost Monster (avoid these)

## Setup Instructions
1. Clone the repository or download the project files.
2. Open `src/index.html` in a web browser.
3. Click "Start Game" to begin playing.
4. Use arrow keys to move and collect apples!

## Features
- 10x10 grid gameplay
- Dynamic monster spawning based on score
- Responsive controls with arrow keys
- Visual feedback with emojis
- Score tracking and game over states

## License
This project is open-source and available for modification and distribution. Enjoy the game!