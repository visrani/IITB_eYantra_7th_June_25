function spawnApple() {
    const pos = grid.getRandomEmptyPosition();
    if (pos) {
        grid.setCell(pos.x, pos.y, 'apple');
        console.log('Apple spawned at:', pos.x, pos.y); // Debug: Confirm apple spawn
    } else {
        console.warn('No empty position to spawn apple!');
    }
}
