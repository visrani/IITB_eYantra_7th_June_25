let score = 0;
let gameActive = false;
let powerUpActive = false;
let powerUpTimer = null;
let spacebarCount = 0;
let spacebarTimeout = null;

function initializeGame() {
    console.log('Initializing game...'); // Debug: Confirm initializeGame call
    createGrid(10, 10);
    resetGame();
}

function startGame() {
    gameActive = true;
    score = 0;
    window.score = score;
    window.gameActive = gameActive;
    document.getElementById('score').textContent = score;
    document.getElementById('message').textContent = 'Game started! Collect the apples!';
    
    // Clear grid first
    grid.cells.fill(null);
    grid.createGrid();
    
    // Spawn entities in order
    spawnPlayer();
    spawnApple();
    spawnMonster();
    console.log('Entities spawned.'); // Debug: Confirm entity spawning
}

function resetGame() {
    gameActive = false;
    score = 0;
    powerUpActive = false;
    spacebarCount = 0;
    
    if (powerUpTimer) {
        clearTimeout(powerUpTimer);
        powerUpTimer = null;
    }
    if (spacebarTimeout) {
        clearTimeout(spacebarTimeout);
        spacebarTimeout = null;
    }
    
    window.score = score;
    window.gameActive = gameActive;
    window.powerUpActive = powerUpActive;
    
    clearMonsters();
    
    // Remove any existing overlays and effects
    const existingOverlay = document.querySelector('.game-over-overlay');
    const existingFlash = document.querySelector('.screen-flash');
    const existingExplosion = document.querySelector('.bang-explosion');
    
    if (existingOverlay) existingOverlay.remove();
    if (existingFlash) existingFlash.remove();
    if (existingExplosion) existingExplosion.remove();
    
    document.getElementById('grid').classList.remove('game-over');
    document.body.classList.remove('power-up-mode');
    
    document.getElementById('score').textContent = score;
    document.getElementById('message').textContent = 'Press Start to play!';
    grid.cells.fill(null);
    grid.createGrid();
}

function gameOver() {
    gameActive = false;
    window.gameActive = gameActive;
    document.getElementById('message').textContent = `Game Over! Final Score: ${score}`;
}

function spawnApple() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        grid.setCell(pos.x, pos.y, 'apple');
    } else {
        console.warn('No empty position to spawn apple!');
    }
}

function spawnMonster() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        const monster = new Monster(pos.x, pos.y);
        monsters.push(monster);
        grid.setCell(pos.x, pos.y, 'monster');
    } else {
        console.warn('No empty position to spawn monster!');
    }
}

function spawnPlayer() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        player = new Player();
        player.x = pos.x;
        player.y = pos.y;
        window.player = player;
        grid.setCell(player.x, player.y, 'player');
    } else {
        console.warn('No empty position to spawn player!');
    }
}

function activatePowerUp() {
    powerUpActive = true;
    window.powerUpActive = powerUpActive;
    
    // Visual feedback
    document.body.classList.add('power-up-mode');
    document.getElementById('message').textContent = 'POWER-UP ACTIVE! Eat the ghosts! 👹 (10 sec)';
    
    // Clear existing timer
    if (powerUpTimer) {
        clearTimeout(powerUpTimer);
    }
    
    // Set 10-second timer
    powerUpTimer = setTimeout(() => {
        deactivatePowerUp();
    }, 10000);
    
    console.log('Power-up activated! Player can now eat ghosts for 10 seconds.');
}

function deactivatePowerUp() {
    powerUpActive = false;
    window.powerUpActive = powerUpActive;
    
    // Remove visual effects
    document.body.classList.remove('power-up-mode');
    if (gameActive) {
        document.getElementById('message').textContent = 'Power-up expired! Avoid ghosts again.';
    }
    
    if (powerUpTimer) {
        clearTimeout(powerUpTimer);
        powerUpTimer = null;
    }
    
    console.log('Power-up deactivated! Back to normal ghost behavior.');
}

function increaseScore(points = 10, type = 'apple') {
    score += points;
    window.score = score;
    document.getElementById('score').textContent = score;
    
    if (type === 'ghost') {
        // Create special score popup for ghost consumption
        createScorePopup(points, 'ghost');
    }
    
    if (score % 50 === 0 && type === 'apple') {
        spawnMonster();
    }
}

function createScorePopup(points, type) {
    const popup = document.createElement('div');
    popup.className = 'score-popup';
    if (type === 'ghost') {
        popup.textContent = `+${points} GHOST!`;
        popup.style.color = '#ff6b6b';
        popup.style.fontSize = '24px';
        popup.style.fontWeight = 'bold';
    } else {
        popup.textContent = `+${points}`;
        popup.style.color = '#FFD700';
    }
    popup.style.left = '50%';
    popup.style.top = '40%';
    document.body.appendChild(popup);
    
    setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }
    }, 1000);
}

document.addEventListener('keydown', function(event) {
    if (event.key === ' ' && gameActive) {
        event.preventDefault();
        spacebarCount++;
        
        // Reset counter after 2 seconds if not completed
        if (spacebarTimeout) {
            clearTimeout(spacebarTimeout);
        }
        spacebarTimeout = setTimeout(() => {
            spacebarCount = 0;
        }, 2000);
        
        // Activate cheat if spacebar pressed 3 times
        if (spacebarCount >= 3) {
            activatePowerUp();
            spacebarCount = 0;
            if (spacebarTimeout) {
                clearTimeout(spacebarTimeout);
                spacebarTimeout = null;
            }
        }
        return;
    }
    
    if (!gameActive) return;
    
    switch(event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowLeft':
        case 'ArrowRight':
            movePlayer(event.key);
            event.preventDefault();
            break;
    }
});

// Make functions global
window.initializeGame = initializeGame;
window.startGame = startGame;
window.resetGame = resetGame;
window.gameOver = gameOver;
window.spawnApple = spawnApple;
window.spawnMonster = spawnMonster;
window.spawnPlayer = spawnPlayer;
window.increaseScore = increaseScore;
window.activatePowerUp = activatePowerUp;
window.deactivatePowerUp = deactivatePowerUp;
window.powerUpActive = powerUpActive;