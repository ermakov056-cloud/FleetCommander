let gameStarted = false;
let playerTurn = true;

const SHIPS = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
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

function autoPlace(matrix) {

    for (let y = 0; y < SIZE; y++)
        for (let x = 0; x < SIZE; x++)
            matrix[y][x] = 0;

    function canPlace(x, y, len, horizontal) {

        for (let i = 0; i < len; i++) {

            let xx = horizontal ? x + i : x;
            let yy = horizontal ? y : y + i;

            if (xx >= SIZE || yy >= SIZE)
                return false;

            for (let dy = -1; dy <= 1; dy++) {

                for (let dx = -1; dx <= 1; dx++) {

                    let nx = xx + dx;
                    let ny = yy + dy;

                    if (
                        nx >= 0 &&
                        ny >= 0 &&
                        nx < SIZE &&
                        ny < SIZE &&
                        matrix[ny][nx] == 1
                    )
                        return false;

                }

            }

        }

        return true;

    }

    function placeShip(len) {

        while (true) {

            let horizontal = Math.random() < 0.5;

            let x = Math.floor(Math.random() * SIZE);

            let y = Math.floor(Math.random() * SIZE);

            if (!canPlace(x, y, len, horizontal))
                continue;

            for (let i = 0; i < len; i++) {

                if (horizontal)
                    matrix[y][x + i] = 1;
                else
                    matrix[y + i][x] = 1;

            }

            return;

        }

    }

    SHIPS.forEach(placeShip);

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
