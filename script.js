const statusElement = document.querySelector('.status');
const moveCountElement = document.querySelector('.move-count');
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.restart-btn');

let player;
let grid;
let moves;

const winPatterns = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6],
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    player = 'X';
    grid = ["", "", "", "", "", "", "", "", ""];
    moves = 0;

    cells.forEach((cell, index) => {
        cell.innerText = "";
        cell.style.pointerEvents = "all";
        cell.classList.remove("win");
    });

    statusElement.innerText = `Current Player - ${player}`;
    moveCountElement.innerText = `Moves: ${moves}`;
    restartButton.classList.remove("active");
}

startGame();

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleCellClick(index);
    });
});

function handleCellClick(index) {
    if (grid[index] === "") {
        cells[index].innerText = player;
        cells[index].style.pointerEvents = "none";
        grid[index] = player;
        moves++;
        moveCountElement.innerText = `Moves: ${moves}`;
        switchPlayer();
        checkEndGame();
    }
}

function switchPlayer() {
    player = player === 'X' ? 'O' : 'X';
    statusElement.innerText = `Current Player - ${player}`;
}

function checkEndGame() {
    let winner = "";

    winPatterns.forEach(pattern => {
        if (grid[pattern[0]] && 
            grid[pattern[0]] === grid[pattern[1]] &&
            grid[pattern[0]] === grid[pattern[2]]) {
            winner = grid[pattern[0]];
            pattern.forEach(index => {
                cells[index].classList.add("win");
            });
        }
    });

    if (winner) {
        statusElement.innerText = `Winner - ${winner}`;
        restartButton.classList.add("active");
        cells.forEach(cell => cell.style.pointerEvents = "none");
        return;
    }

    if (moves === 9) {
        statusElement.innerText = `It's a Draw`;
        restartButton.classList.add("active");
    }
}

restartButton.addEventListener('click', startGame);
