/* ===== SCRIPT.JS ===== */
/* ЧАСТЬ 1 */
/* Создание игры и игрового поля */


// Размер поля
const BOARD_SIZE = 10;


// Корабли
const SHIPS = [
    { name: "4 палубы", size: 4 },
    { name: "3 палубы", size: 3 },
    { name: "3 палубы", size: 3 },
    { name: "2 палубы", size: 2 },
    { name: "2 палубы", size: 2 },
    { name: "2 палубы", size: 2 },
    { name: "1 палуба", size: 1 },
    { name: "1 палуба", size: 1 },
    { name: "1 палуба", size: 1 },
    { name: "1 палуба", size: 1 }
];


// Игровые поля

let playerBoard = [];

let enemyBoard = [];


// Очки

let playerHits = 0;

let enemyHits = 0;


// Текущий ход

let playerTurn = true;



/*
Создание пустого поля
*/

function createEmptyBoard() {

    let board = [];

    for (let y = 0; y < BOARD_SIZE; y++) {

        board[y] = [];

        for (let x = 0; x < BOARD_SIZE; x++) {

            board[y][x] = {

                ship: false,

                hit: false

            };

        }

    }

    return board;

}



/*
Запуск игры
*/

function startGame() {

    playerBoard = createEmptyBoard();

    enemyBoard = createEmptyBoard();


    placeAllShips(playerBoard);

    placeAllShips(enemyBoard);


    playerHits = 0;

    enemyHits = 0;


    playerTurn = true;


    drawBoards();


    showMessage("Ваш ход");

}



/*
Создание поля на экране
*/

function createBoardHTML(containerId, board, enemy = false) {


    const container = document.getElementById(containerId);


    if (!container) return;


    container.innerHTML = "";


    for (let y = 0; y < BOARD_SIZE; y++) {


        for (let x = 0; x < BOARD_SIZE; x++) {


            let cell = document.createElement("div");


            cell.className = "cell";


            cell.dataset.x = x;

            cell.dataset.y = y;



            if (board[y][x].ship && !enemy) {

                cell.classList.add("ship-part");

            }



            if (board[y][x].hit) {


                if (board[y][x].ship) {

                    cell.classList.add("hit");

                } else {

                    cell.classList.add("miss");

                }

            }



            if (enemy) {


                cell.onclick = function() {

                    playerShoot(x, y);

                };


            }


            container.appendChild(cell);


        }

    }

}



/*
Отрисовка полей
*/

function drawBoards() {


    createBoardHTML(
        "player-board",
        playerBoard,
        false
    );


    createBoardHTML(
        "enemy-board",
        enemyBoard,
        true
    );

}



/*
Сообщения игроку
*/

function showMessage(text) {


    const message =
    document.getElementById("game-message");


    if (message) {

        message.innerText = text;

    }

}
/* ===== SCRIPT.JS ===== */
/* ЧАСТЬ 2 */
/* Расстановка кораблей */


/*
Размещение всех кораблей
*/

function placeAllShips(board) {


    SHIPS.forEach(ship => {


        let placed = false;


        while (!placed) {


            let x = Math.floor(
                Math.random() * BOARD_SIZE
            );


            let y = Math.floor(
                Math.random() * BOARD_SIZE
            );


            let horizontal =
                Math.random() > 0.5;



            if (
                canPlaceShip(
                    board,
                    x,
                    y,
                    ship.size,
                    horizontal
                )
            ) {


                placeShip(
                    board,
                    x,
                    y,
                    ship.size,
                    horizontal
                );


                placed = true;


            }


        }


    });


}



/*
Проверка возможности поставить корабль
*/

function canPlaceShip(
    board,
    x,
    y,
    size,
    horizontal
) {


    for (let i = 0; i < size; i++) {


        let nx =
        horizontal ? x + i : x;


        let ny =
        horizontal ? y : y + i;



        // Проверка границ

        if (
            nx < 0 ||
            ny < 0 ||
            nx >= BOARD_SIZE ||
            ny >= BOARD_SIZE
        ) {

            return false;

        }



        // Проверка клетки и соседей

        for (
            let yy = ny - 1;
            yy <= ny + 1;
            yy++
        ) {


            for (
                let xx = nx - 1;
                xx <= nx + 1;
                xx++
            ) {


                if (
                    yy >= 0 &&
                    xx >= 0 &&
                    yy < BOARD_SIZE &&
                    xx < BOARD_SIZE
                ) {


                    if (
                        board[yy][xx].ship
                    ) {

                        return false;

                    }


                }


            }


        }


    }


    return true;

}



/*
Установка корабля на поле
*/

function placeShip(
    board,
    x,
    y,
    size,
    horizontal
) {


    for (let i = 0; i < size; i++) {


        let nx =
        horizontal ? x + i : x;


        let ny =
        horizontal ? y : y + i;



        board[ny][nx].ship = true;


    }


}



/*
Проверка поражения кораблей
*/

function checkWin(board) {


    for (let y = 0; y < BOARD_SIZE; y++) {


        for (let x = 0; x < BOARD_SIZE; x++) {


            if (
                board[y][x].ship &&
                !board[y][x].hit
            ) {

                return false;

            }


        }


    }


    return true;

}
