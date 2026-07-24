let gameStarted = false;
let playerTurn = true;
    SIZE = 10; 
const playerBoard = document.getElementById("playerBoard");
const enemyBoard = document.getElementById("enemyBoard");
const statusText = document.getElementById("status");
const newGameBtn = document.getElementById("newGame");
const autoPlaceBtn = document.getElementById("autoPlace");

let player = [];
let enemy = [];

function createMatrix() {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function drawBoard(board, matrix, editable, enemy = false) {

    board.innerHTML = "";

    for (let y = 0; y < SIZE; y++) {

        for (let x = 0; x < SIZE; x++) {

            const cell = document.createElement("div");
            cell.className = "cell";

            if (!enemy && matrix[y][x] == 1)
                cell.classList.add("ship");

            if (editable) {

                cell.onclick = function () {

                    if (gameStarted) return;

                    matrix[y][x] = matrix[y][x] ? 0 : 1;

                    drawBoard(board, matrix, editable, enemy);

                };

            }

            if (enemy) {

                cell.onclick = function () {

                    if (!gameStarted) return;

                    if (cell.classList.contains("hit") ||
                        cell.classList.contains("miss"))
                        return;

                    if (matrix[y][x] == 1) {

                        cell.classList.add("hit");

                        statusText.innerHTML = "💥 Попадание!";

                    } else {

                        cell.classList.add("miss");

                        statusText.innerHTML = "🌊 Мимо.";

                    }

                };

            }

            board.appendChild(cell);

        }

    }

}

function autoPlaceShips(matrix) {
    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            matrix[y][x] = 0;
        }
    }

    let placed = 0;

    while (placed < 20) {
        const x = Math.floor(Math.random() * SIZE);
        const y = Math.floor(Math.random() * SIZE);

        if (matrix[y][x] === 0) {
            matrix[y][x] = 1;
            placed++;
        }
    }
}

function newGame() {
    player = createMatrix();
    enemy = createMatrix();

    drawBoard(playerBoard, player, true);
    drawBoard(enemyBoard, enemy, false);

    statusText.textContent = "Игра готова";
}

newGameBtn.addEventListener("click", function() {
    newGame();
});

autoPlaceBtn.addEventListener("click", function() {
    autoPlaceShips(player);
    autoPlaceShips(enemy);

    drawBoard(playerBoard, player, true);
    drawBoard(enemyBoard, enemy, false);

    statusText.textContent = "Корабли расставлены";
});
document.getElementById("startGame").onclick = function () {

    gameStarted = true;

    statusText.innerHTML = "Ваш ход! Стреляйте по полю противника.";

}

newGame();
