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
