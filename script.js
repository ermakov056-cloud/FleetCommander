/* =====================================
   FLEET COMMANDER
   script.js
   Часть 1
===================================== */

"use strict";

/* ---------- Константы ---------- */

const SIZE = 10;

const SHIPS = [
    { id: 0, size: 4, placed: false },
    { id: 1, size: 3, placed: false },
    { id: 2, size: 3, placed: false },
    { id: 3, size: 2, placed: false },
    { id: 4, size: 2, placed: false },
    { id: 5, size: 2, placed: false },
    { id: 6, size: 1, placed: false },
    { id: 7, size: 1, placed: false },
    { id: 8, size: 1, placed: false },
    { id: 9, size: 1, placed: false }
];

/* ---------- Переменные ---------- */

let playerBoard = [];
let enemyBoard = [];

let selectedShip = null;
let direction = "horizontal";

let playerTurn = true;
let gameStarted = false;

/* ---------- Создание поля ---------- */

function createBoard() {

    const board = [];

    for (let y = 0; y < SIZE; y++) {

        board[y] = [];

        for (let x = 0; x < SIZE; x++) {

            board[y][x] = {

                ship: false,
                hit: false

            };

        }

    }

    return board;

}

/* ---------- Сброс кораблей ---------- */

function resetShips() {

    SHIPS.forEach(ship => {

        ship.placed = false;

    });

}

/* ---------- Показ экрана ---------- */

function showScreen(id) {

    document.querySelectorAll(".screen").forEach(screen => {

        screen.style.display = "none";

    });

    const screen = document.getElementById(id);

    if (screen) {

        screen.style.display = "flex";

    }

}

/* ---------- Сообщение ---------- */

function showMessage(text) {

    const box = document.getElementById("game-message");

    if (box) {

        box.textContent = text;

    }

}

/* ---------- Новая игра ---------- */

function newGame() {

    playerBoard = createBoard();

    enemyBoard = createBoard();

    placeAllShips(enemyBoard);

    resetShips();

    selectedShip = null;

    direction = "horizontal";

    playerTurn = true;

    gameStarted = false;

    showScreen("setup-screen");

    drawBoards();

    showMessage("Выберите корабль и начните расстановку.");

}
/* =====================================
   FLEET COMMANDER
   script.js
   Часть 2
===================================== */

/* ---------- Проверка размещения ---------- */

function canPlaceShip(board, x, y, size, horizontal) {

    for (let i = 0; i < size; i++) {

        const nx = horizontal ? x + i : x;
        const ny = horizontal ? y : y + i;

        if (nx < 0 || ny < 0 || nx >= SIZE || ny >= SIZE) {
            return false;
        }

        for (let yy = ny - 1; yy <= ny + 1; yy++) {

            for (let xx = nx - 1; xx <= nx + 1; xx++) {

                if (
                    yy >= 0 &&
                    yy < SIZE &&
                    xx >= 0 &&
                    xx < SIZE &&
                    board[yy][xx].ship
                ) {
                    return false;
                }

            }

        }

    }

    return true;

}

/* ---------- Размещение корабля ---------- */

function placeShip(board, x, y, size, horizontal) {

    for (let i = 0; i < size; i++) {

        const nx = horizontal ? x + i : x;
        const ny = horizontal ? y : y + i;

        board[ny][nx].ship = true;

    }

}

/* ---------- Автоматическая расстановка ---------- */

function placeAllShips(board) {

    SHIPS.forEach(ship => {

        let placed = false;

        while (!placed) {

            const x = Math.floor(Math.random() * SIZE);
            const y = Math.floor(Math.random() * SIZE);

            const horizontal = Math.random() < 0.5;

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

/* ---------- Выбор корабля ---------- */

function selectShip(index) {

    if (SHIPS[index].placed) {

        showMessage("Этот корабль уже установлен.");

        return;

    }

    selectedShip = SHIPS[index];

    document
        .querySelectorAll(".ship-card")
        .forEach(card => card.classList.remove("selected"));

    const card = document.querySelector(
        `[data-ship="${index}"]`
    );

    if (card) {

        card.classList.add("selected");

    }

}

/* ---------- Поворот ---------- */

function rotateShip() {

    direction =
        direction === "horizontal"
            ? "vertical"
            : "horizontal";

    showMessage(
        direction === "horizontal"
            ? "Горизонтально"
            : "Вертикально"
    );

}

/* ---------- Расстановка игроком ---------- */

function placePlayerShip(x, y) {

    if (!selectedShip) {

        showMessage("Сначала выберите корабль.");

        return;

    }

    if (
        !canPlaceShip(
            playerBoard,
            x,
            y,
            selectedShip.size,
            direction === "horizontal"
        )
    ) {

        showMessage("Сюда поставить нельзя.");

        return;

    }

    placeShip(
        playerBoard,
        x,
        y,
        selectedShip.size,
        direction === "horizontal"
    );

    selectedShip.placed = true;

    document
        .querySelectorAll(".ship-card")
        .forEach(card => {

            if (
                Number(card.dataset.ship) === selectedShip.id
            ) {

                card.classList.add("placed");
                card.classList.remove("selected");

            }

        });

    selectedShip = null;

    drawBoards();

    const ready = SHIPS.every(ship => ship.placed);

    if (ready) {

        showMessage(
            "Флот готов. Нажмите «Начать бой»."
        );

    } else {

        showMessage(
            "Выберите следующий корабль."
        );

    }

}

/* ---------- Случайная расстановка ---------- */

function randomPlayerShips() {

    playerBoard = createBoard();

    resetShips();

    placeAllShips(playerBoard);

    SHIPS.forEach(ship => ship.placed = true);

    document
        .querySelectorAll(".ship-card")
        .forEach(card => {

            card.classList.add("placed");
            card.classList.remove("selected");

        });

    selectedShip = null;

    drawBoards();

    showMessage("Флот расставлен автоматически.");

}
/* =====================================
   FLEET COMMANDER
   script.js
   Часть 3
===================================== */

/* ---------- Отрисовка полей ---------- */

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

/* ---------- Создание HTML поля ---------- */

function createBoardHTML(id, board, enemy) {

    const container =
        document.getElementById(id);

    if (!container) return;

    container.innerHTML = "";

    for (let y = 0; y < SIZE; y++) {

        for (let x = 0; x < SIZE; x++) {

            const cell =
                document.createElement("div");

            cell.className = "cell";

            if (
                board[y][x].ship &&
                !enemy
            ) {
                cell.classList.add("ship-part");
            }

            if (board[y][x].hit) {

                if (board[y][x].ship) {

                    cell.classList.add("hit");

                } else {

                    cell.classList.add("miss");

                }

            }

            cell.onclick = function () {

                if (enemy) {

                    playerShoot(x, y);

                } else {

                    if (!gameStarted) {

                        placePlayerShip(x, y);

                    }

                }

            };

            container.appendChild(cell);

        }

    }

}

/* ---------- Выстрел игрока ---------- */

function playerShoot(x, y) {

    if (!gameStarted) return;

    if (!playerTurn) return;

    const cell = enemyBoard[y][x];

    if (cell.hit) {

        showMessage(
            "Вы уже стреляли сюда."
        );

        return;

    }

    cell.hit = true;

    drawBoards();

    if (cell.ship) {

        showMessage("Попадание!");

        if (checkWin(enemyBoard)) {

            endGame(true);

            return;

        }

    } else {

        showMessage("Промах.");

        playerTurn = false;

        setTimeout(
            enemyShoot,
            700
        );

    }

}

/* ---------- Выстрел компьютера ---------- */

function enemyShoot() {

    let x;
    let y;

    do {

        x = Math.floor(
            Math.random() * SIZE
        );

        y = Math.floor(
            Math.random() * SIZE
        );

    }
    while (
        playerBoard[y][x].hit
    );

    playerBoard[y][x].hit = true;

    drawBoards();

    if (
        playerBoard[y][x].ship
    ) {

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
            700
        );

    } else {

        playerTurn = true;

        showMessage(
            "Ваш ход."
        );

    }

}

/* ---------- Проверка победы ---------- */

function checkWin(board) {

    for (let y = 0; y < SIZE; y++) {

        for (let x = 0; x < SIZE; x++) {

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

/* ---------- Завершение игры ---------- */

function endGame(win) {

    gameStarted = false;

    const result =
        document.getElementById(
            "result-screen"
        );

    const title =
        document.getElementById(
            "result-title"
        );

    if (win) {

        title.textContent =
            "🏆 Победа";

        title.className =
            "result-title win-title";

        saveResult(true);

    } else {

        title.textContent =
            "💥 Поражение";

        title.className =
            "result-title lose-title";

        saveResult(false);

    }

    if (result) {

        result.style.display = "flex";

    }

}
/* =====================================
   FLEET COMMANDER
   script.js
   Часть 4 (финал)
===================================== */

/* ---------- Начать бой ---------- */

function startBattle() {

    const ready = SHIPS.every(ship => ship.placed);

    if (!ready) {

        alert("Сначала расставьте все корабли!");

        return;

    }

    enemyBoard = createBoard();

    placeAllShips(enemyBoard);

    gameStarted = true;

    playerTurn = true;

    showScreen("game-screen");

    drawBoards();

    showMessage("Ваш ход.");

}

/* ---------- Возврат в меню ---------- */

function returnToMenu() {

    const result =
        document.getElementById("result-screen");

    if (result) {

        result.style.display = "none";

    }

    showScreen("menu-screen");

    loadStats();

}

/* ---------- Статистика ---------- */

function loadStats() {

    const stats = JSON.parse(

        localStorage.getItem("fleetStats")

    ) || {

        wins: 0,

        loses: 0

    };

    document.getElementById("wins-count").textContent =
        stats.wins;

    document.getElementById("loses-count").textContent =
        stats.loses;

}

/* ---------- Сохранение результата ---------- */

function saveResult(win) {

    const stats = JSON.parse(

        localStorage.getItem("fleetStats")

    ) || {

        wins: 0,

        loses: 0

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

/* ---------- Очистка статистики ---------- */

function clearStats() {

    localStorage.removeItem("fleetStats");

    loadStats();

}

/* ---------- Сохранение ---------- */

function saveGame() {

    localStorage.setItem(

        "fleetSave",

        JSON.stringify({

            playerBoard,

            enemyBoard,

            playerTurn,

            gameStarted

        })

    );

}

/* ---------- Загрузка ---------- */

function loadGame() {

    const save =

        localStorage.getItem("fleetSave");

    if (!save) return;

    const data = JSON.parse(save);

    playerBoard = data.playerBoard;

    enemyBoard = data.enemyBoard;

    playerTurn = data.playerTurn;

    gameStarted = data.gameStarted;

}

/* ---------- Автосохранение ---------- */

setInterval(function () {

    if (gameStarted) {

        saveGame();

    }

}, 5000);

/* =====================================
   Подключение ВСЕХ кнопок
===================================== */

function setupButtons() {

    const btnNewGame =
        document.getElementById("new-game");

    if (btnNewGame) {

        btnNewGame.onclick = newGame;

    }

    const btnRandom =
        document.getElementById("random-button");

    if (btnRandom) {

        btnRandom.onclick = randomPlayerShips;

    }

    const btnRotate =
        document.getElementById("rotate-button");

    if (btnRotate) {

        btnRotate.onclick = rotateShip;

    }

    const btnBattle =
        document.getElementById("start-battle");

    if (btnBattle) {

        btnBattle.onclick = startBattle;

    }

    const btnBack =
        document.getElementById("back-menu");

    if (btnBack) {

        btnBack.onclick = returnToMenu;

    }

    const btnClear =
        document.getElementById("clear-stats");

    if (btnClear) {

        btnClear.onclick = clearStats;

    }

    const btnStats =
        document.getElementById("show-stats");

    if (btnStats) {

        btnStats.onclick = loadStats;

    }

}

/* =====================================
   Запуск игры
===================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        playerBoard = createBoard();

        enemyBoard = createBoard();

        setupButtons();

        loadStats();

        showScreen("menu-screen");

        console.log("Fleet Commander запущен.");

    }

);
