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
/* ===== SCRIPT.JS ===== */
/* ЧАСТЬ 3 */
/* Стрельба и логика боя */


/*
Выстрел игрока
*/

function playerShoot(x, y) {


    // Проверка хода

    if (!playerTurn) {

        return;

    }



    let cell = enemyBoard[y][x];



    // Нельзя стрелять повторно

    if (cell.hit) {

        showMessage("Вы уже стреляли сюда");

        return;

    }



    cell.hit = true;



    if (cell.ship) {


        playerHits++;


        showMessage("Попадание! Стреляйте ещё");


        animateShot(
            "enemy-board",
            x,
            y
        );



        if (checkWin(enemyBoard)) {


            endGame(true);


            return;

        }



    } else {


        showMessage("Промах");


        playerTurn = false;


        setTimeout(
            enemyShoot,
            1000
        );


    }



    drawBoards();

}




/*
Ход компьютера
*/

function enemyShoot() {


    let x;

    let y;



    do {


        x = Math.floor(
            Math.random() * BOARD_SIZE
        );


        y = Math.floor(
            Math.random() * BOARD_SIZE
        );



    } while (
        playerBoard[y][x].hit
    );



    let cell =
    playerBoard[y][x];



    cell.hit = true;



    if (cell.ship) {


        enemyHits++;


        showMessage(
            "Компьютер попал!"
        );



        if (
            checkWin(playerBoard)
        ) {


            endGame(false);


            return;

        }



        setTimeout(
            enemyShoot,
            800
        );



    } else {


        showMessage(
            "Компьютер промахнулся. Ваш ход"
        );


        playerTurn = true;


    }



    drawBoards();


}




/*
Анимация выстрела
*/

function animateShot(
    boardId,
    x,
    y
) {


    const board =
    document.getElementById(boardId);



    if (!board) return;



    let index =
    y * BOARD_SIZE + x;



    let cell =
    board.children[index];



    if (cell) {


        cell.classList.add(
            "shot"
        );


        setTimeout(() => {

            cell.classList.remove(
                "shot"
            );

        },400);


    }

}




/*
Конец игры
*/

function endGame(playerWin) {


    if (playerWin) {


        showMessage(
            "🎉 Вы победили!"
        );


    } else {


        showMessage(
            "💥 Компьютер победил"
        );


    }


    playerTurn = false;


    saveGameResult(playerWin);

}



/*
Сохранение результата
*/

function saveGameResult(win) {


    let stats =
    JSON.parse(
        localStorage.getItem(
            "fleetStats"
        )
    ) || {

        wins:0,

        loses:0

    };



    if (win) {

        stats.wins++;

    } else {

        stats.loses++;

    }



    localStorage.setItem(
        "fleetStats",
        JSON.stringify(stats)
    );

}
/* ===== SCRIPT.JS ===== */
/* ЧАСТЬ 4 */
/* Меню и управление экранами */


/*
Показать экран
*/

function showScreen(screenId) {


    const screens =
    document.querySelectorAll(".screen");


    screens.forEach(screen => {

        screen.style.display = "none";

    });



    const screen =
    document.getElementById(screenId);



    if (screen) {

        screen.style.display = "flex";

    }

}



/*
Начать новую игру
*/

function newGame() {


    showScreen("game-screen");


    startGame();


}



/*
Вернуться в меню
*/

function returnToMenu() {


    showScreen("menu-screen");


}



/*
Загрузка статистики
*/

function loadStats() {


    let stats =
    JSON.parse(
        localStorage.getItem(
            "fleetStats"
        )
    ) || {

        wins:0,

        loses:0

    };



    const wins =
    document.getElementById(
        "wins-count"
    );


    const loses =
    document.getElementById(
        "loses-count"
    );



    if (wins) {

        wins.innerText =
        stats.wins;

    }



    if (loses) {

        loses.innerText =
        stats.loses;

    }


}



/*
Очистка статистики
*/

function clearStats() {


    localStorage.removeItem(
        "fleetStats"
    );


    loadStats();


    showMessage(
        "Статистика очищена"
    );

}



/*
Загрузка игры после открытия страницы
*/

window.onload = function() {


    showScreen(
        "menu-screen"
    );


    loadStats();


    const start =
    document.getElementById(
        "start-button"
    );


    if (start) {


        start.onclick =
        newGame;


    }



    const menu =
    document.getElementById(
        "menu-button"
    );


    if (menu) {


        menu.onclick =
        returnToMenu;


    }



};
/* ===== SCRIPT.JS ===== */
/* ЧАСТЬ 5 */
/* Ручная расстановка кораблей */


/* Текущий выбранный корабль */

let selectedShip = null;

let shipDirection = "horizontal";

let placedShips = 0;



/*
Выбор корабля
*/

function selectShip(index) {


    selectedShip = SHIPS[index];


    document
    .querySelectorAll(".ship-card")
    .forEach(card => {

        card.classList.remove(
            "selected"
        );

    });



    let card =
    document.querySelector(
        `[data-ship="${index}"]`
    );


    if (card) {

        card.classList.add(
            "selected"
        );

    }


}



/*
Поворот корабля
*/

function rotateShip() {


    if (
        shipDirection === "horizontal"
    ) {

        shipDirection = "vertical";


    } else {


        shipDirection = "horizontal";


    }



    showMessage(
        "Направление изменено"
    );

}



/*
Попытка поставить корабль
*/

function placePlayerShip(
    x,
    y
) {


    if (!selectedShip) {


        showMessage(
            "Выберите корабль"
        );


        return;

    }



    if (
        canPlaceShip(
            playerBoard,
            x,
            y,
            selectedShip.size,
            shipDirection === "horizontal"
        )
    ) {



        placeShip(
            playerBoard,
            x,
            y,
            selectedShip.size,
            shipDirection === "horizontal"
        );



        placedShips++;


        showMessage(
            "Корабль установлен"
        );



        drawBoards();



        if (
            placedShips >= SHIPS.length
        ) {


            showMessage(
                "Все корабли готовы!"
            );


        }



    } else {


        showMessage(
            "Сюда нельзя поставить корабль"
        );


    }


}



/*
Случайная расстановка игрока
*/

function randomPlayerShips() {


    playerBoard =
    createEmptyBoard();



    placeAllShips(
        playerBoard
    );


    placedShips =
    SHIPS.length;



    drawBoards();



    showMessage(
        "Корабли расставлены"
    );


}



/*
Начать бой после подготовки
*/

function startBattle() {


    if (
        placedShips < SHIPS.length
    ) {


        showMessage(
            "Сначала расставьте корабли"
        );


        return;

    }



    enemyBoard =
    createEmptyBoard();



    placeAllShips(
        enemyBoard
    );



    showScreen(
        "game-screen"
    );


    playerTurn = true;



    drawBoards();



    showMessage(
        "Ваш ход"
    );

}



/*
Обработка клика по своему полю
*/

function setupBoardClick(
    x,
    y
) {


    placePlayerShip(
        x,
        y
    );

}
