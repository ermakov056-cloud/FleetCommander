const SIZE = 10;

const playerBoard = document.getElementById("playerBoard");
const enemyBoard = document.getElementById("enemyBoard");
const statusText = document.getElementById("status");

let player = [];
let enemy = [];

function createMatrix() {
    let arr = [];
    for (let y = 0; y < SIZE; y++) {
        arr[y] = [];
        for (let x = 0; x < SIZE; x++) {
            arr[y][x] = 0;
        }
    }
    return arr;
}

function drawBoard(board, matrix, editable) {

    board.innerHTML = "";

    for (let y = 0; y < SIZE; y++) {

        for (let x = 0; x < SIZE; x++) {

            let cell = document.createElement("div");
            cell.className = "cell";

            if (matrix[y][x] == 1)
                cell.classList.add("ship");

            if (editable) {

                cell.onclick = function () {

                    matrix[y][x] = matrix[y][x] ? 0 : 1;

                    drawBoard(board, matrix, editable);

                }

            }

            board.appendChild(cell);

        }

    }

}

function autoPlace(matrix) {

    for (let y = 0; y < SIZE; y++)
        for (let x = 0; x < SIZE; x++)
            matrix[y][x] = 0;

    let placed = 0;

    while (placed < 20) {

        let x = Math.floor(Math.random() * SIZE);
        let y = Math.floor(Math.random() * SIZE);

        if (matrix[y][x] == 0) {

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

    statusText.innerHTML = "Игра готова";

}

document.getElementById("newGame").onclick = function () {

    newGame();

}

document.getElementById("autoPlace").onclick = function () {

    autoPlace(player);
    autoPlace(enemy);

    drawBoard(playerBoard, player, true);
    drawBoard(enemyBoard, enemy, false);

    statusText.innerHTML = "Корабли расставлены";

}

window.onload = function () {

    newGame();

}
