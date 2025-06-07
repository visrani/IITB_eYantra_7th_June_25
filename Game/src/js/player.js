// player.js

class Player {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    spawn() {
        const pos = grid.getRandomEmptyPosition();
        this.x = pos.x;
        this.y = pos.y;
        grid.setCell(this.x, this.y, 'player');
    }

    move(direction) {
        let newX = this.x;
        let newY = this.y;

        switch(direction) {
            case 'ArrowUp': newY = Math.max(0, this.y - 1); break;
            case 'ArrowDown': newY = Math.min(grid.height - 1, this.y + 1); break;
            case 'ArrowLeft': newX = Math.max(0, this.x - 1); break;
            case 'ArrowRight': newX = Math.min(grid.width - 1, this.x + 1); break;
        }

        const targetCell = grid.getCell(newX, newY);
        if (targetCell === 'apple') {
            increaseScore(10, 'apple');
            spawnApple();
        } else if (targetCell === 'monster') {
            if (window.powerUpActive || powerUpActive) {
                // Eat the ghost during power-up - game continues!
                eatGhost(newX, newY);
                increaseScore(25, 'ghost');
                console.log('Ghost eaten! Power-up mode active.');
            } else {
                // Normal mode - game over
                gameOver();
                return;
            }
        }

        grid.clearCell(this.x, this.y);
        this.x = newX;
        this.y = newY;
        grid.setCell(this.x, this.y, 'player');
    }
}

let player = null;

function spawnPlayer() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        player = new Player();
        player.x = pos.x;
        player.y = pos.y;
        window.player = player;
        grid.setCell(player.x, player.y, 'player');
        console.log('Player spawned at:', player.x, player.y); // Debug: Confirm player spawn
    } else {
        console.warn('No empty position to spawn player!');
    }
}

function movePlayer(direction) {
    if (player && gameActive) {
        player.move(direction);
        moveMonsters();
    }
}

function eatGhost(x, y) {
    // Find and remove the monster at this position
    const monsterIndex = window.monsters.findIndex(monster => monster.x === x && monster.y === y);
    if (monsterIndex !== -1) {
        // Clear the cell first
        grid.clearCell(x, y);
        // Remove from monsters array
        window.monsters.splice(monsterIndex, 1);
        console.log('Ghost eaten at:', x, y, 'Remaining ghosts:', window.monsters.length);
        
        // Add visual effect for eating ghost
        createGhostEatenEffect(x, y);
    }
}

function createGhostEatenEffect(x, y) {
    // Get the cell element to add effect
    const cellIndex = y * grid.width + x;
    const cell = document.querySelector(`[data-index="${cellIndex}"]`);
    if (cell) {
        cell.classList.add('ghost-eaten');
        setTimeout(() => {
            cell.classList.remove('ghost-eaten');
        }, 500);
    }
}

// Make Player and functions global
window.Player = Player;
window.player = player;
window.spawnPlayer = spawnPlayer;
window.movePlayer = movePlayer;
// Make new function global
window.eatGhost = eatGhost;