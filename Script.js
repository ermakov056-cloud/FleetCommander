// Fleet Commander 2.0

const SIZE = 10;

const playerBoard = document.getElementById("playerBoard");
const enemyBoard = document.getElementById("enemyBoard");

const status = document.getElementById("status");

const player = [];
const enemy = [];

function createMatrix() {

    return Array.from({ length: SIZE }, () =>
        Array(SIZE).fill(0)
    );

}

function createBoard(element, matrix, enemyField = false) {

    element.innerHTML = "";

    for (let y = 0; y < SIZE; y++) {

        for (let x = 0; x < SIZE; x++) {

            const cell = document.createElement("div");

            cell.className = "cell";

            cell.dataset.x = x;
            cell.dataset.y = y;

            if (!enemyField) {

                cell.addEventListener("click", () => {

                    cell.classList.toggle("ship");

                    matrix[y][x] = matrix[y][x] ? 0 : 1;

                });

            }

            element.appendChild(cell);

        }

    }

}

function newGame() {

    player.length = 0;
    enemy.length = 0;

    player.push(...createMatrix());
    enemy.push(...createMatrix());

    createBoard(playerBoard, player, false);
    createBoard(enemyBoard, enemy, true);

    status.textContent = "Подготовьте свой флот.";

}

function randomShips(matrix, boardElement, visible = true) {

    matrix.forEach(row => row.fill(0));

    boardElement.querySelectorAll(".cell").forEach(c => {
        c.className = "cell";
    });

    let ships = 20;

    while (ships > 0) {

        const x = Math.floor(Math.random() * SIZE);
        const y = Math.floor(Math.random() * SIZE);

        if (matrix[y][x] === 0) {

            matrix[y][x] = 1;

            if (visible) {

                const index = y * SIZE + x;

                boardElement.children[index].classList.add("ship");

            }

            ships--;

        }

    }

}

document
.getElementById("newGame")
.addEventListener("click", newGame);

document
.getElementById("autoPlace")
.addEventListener("click", () => {

    randomShips(player, playerBoard, true);

    randomShips(enemy, enemyBoard, false);

    status.textContent = "Флот готов. Скоро начнётся бой.";

});

newGame();
