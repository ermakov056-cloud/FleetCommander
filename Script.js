/* =====================================
   FLEET COMMANDER
   Финальный script.js
   Часть 1/4
===================================== */


const SIZE = 10;


const SHIPS = [
    {name:"4 палубы", size:4},
    {name:"3 палубы", size:3},
    {name:"3 палубы", size:3},
    {name:"2 палубы", size:2},
    {name:"2 палубы", size:2},
    {name:"2 палубы", size:2},
    {name:"1 палуба", size:1},
    {name:"1 палуба", size:1},
    {name:"1 палуба", size:1},
    {name:"1 палуба", size:1}
];


let playerBoard;

let enemyBoard;


let selectedShip = null;

let direction = "horizontal";


let playerTurn = true;

let gameStarted = false;



/* Создание пустого поля */

function createBoard(){

    let board=[];


    for(let y=0;y<SIZE;y++){

        board[y]=[];

        for(let x=0;x<SIZE;x++){

            board[y][x]={

                ship:false,

                hit:false

            };

        }

    }


    return board;

}



/* Запуск новой игры */

function newGame(){


    playerBoard=createBoard();

    enemyBoard=createBoard();


    placeAllShips(enemyBoard);


    gameStarted=false;


    showScreen(
        "setup-screen"
    );


    drawBoards();


    showMessage(
        "Расставьте корабли"
    );


}



/* Показ экранов */

function showScreen(id){


    document
    .querySelectorAll(".screen")
    .forEach(s=>{

        s.style.display="none";

    });



    let screen=
    document.getElementById(id);


    if(screen){

        screen.style.display="flex";

    }

}



/* Сообщение */

function showMessage(text){


    let box=
    document.getElementById(
        "game-message"
    );


    if(box){

        box.innerText=text;

    }

}
/* =====================================
   FLEET COMMANDER
   Часть 2/4
===================================== */


/* Проверка размещения корабля */

function canPlaceShip(
    board,
    x,
    y,
    size,
    horizontal
){


    for(let i=0;i<size;i++){


        let nx =
        horizontal ? x+i : x;


        let ny =
        horizontal ? y : y+i;



        if(
            nx<0 ||
            ny<0 ||
            nx>=SIZE ||
            ny>=SIZE
        ){

            return false;

        }



        for(
            let yy=ny-1;
            yy<=ny+1;
            yy++
        ){


            for(
                let xx=nx-1;
                xx<=nx+1;
                xx++
            ){


                if(
                    yy>=0 &&
                    xx>=0 &&
                    yy<SIZE &&
                    xx<SIZE
                ){


                    if(
                        board[yy][xx].ship
                    ){

                        return false;

                    }


                }


            }


        }


    }


    return true;

}



/* Установка корабля */

function placeShip(
    board,
    x,
    y,
    size,
    horizontal
){


    for(let i=0;i<size;i++){


        let nx =
        horizontal ? x+i : x;


        let ny =
        horizontal ? y : y+i;



        board[ny][nx].ship=true;


    }


}



/* Автоматическая расстановка */

function placeAllShips(board){


    SHIPS.forEach(ship=>{


        let placed=false;



        while(!placed){


            let x=
            Math.floor(
                Math.random()*SIZE
            );


            let y=
            Math.floor(
                Math.random()*SIZE
            );


            let horizontal=
            Math.random()>0.5;



            if(
                canPlaceShip(
                    board,
                    x,
                    y,
                    ship.size,
                    horizontal
                )
            ){


                placeShip(
                    board,
                    x,
                    y,
                    ship.size,
                    horizontal
                );


                placed=true;

            }


        }


    });


}



/* Выбранный корабль */

function selectShip(index){


    selectedShip =
    SHIPS[index];



    document
    .querySelectorAll(".ship-card")
    .forEach(card=>{

        card.classList.remove(
            "selected"
        );

    });



    let card=
    document.querySelector(
        `[data-ship="${index}"]`
    );


    if(card){

        card.classList.add(
            "selected"
        );

    }


}



/* Поворот корабля */

function rotateShip(){


    if(direction==="horizontal"){

        direction="vertical";

    }else{

        direction="horizontal";

    }


    showMessage(
        "Направление изменено"
    );

}



/* Установка корабля игроком */

function placePlayerShip(
    x,
    y
){


    if(!selectedShip){

        showMessage(
            "Выберите корабль"
        );

        return;

    }



    if(
        canPlaceShip(
            playerBoard,
            x,
            y,
            selectedShip.size,
            direction==="horizontal"
        )
    ){


        placeShip(
            playerBoard,
            x,
            y,
            selectedShip.size,
            direction==="horizontal"
        );


        drawBoards();


        showMessage(
            "Корабль установлен"
        );


    }else{


        showMessage(
            "Сюда нельзя поставить"
        );


    }


}



/* Случайная расстановка игрока */

function randomPlayerShips(){


    playerBoard=createBoard();


    placeAllShips(
        playerBoard
    );


    drawBoards();


    showMessage(
        "Флот готов"
    );


}
/* =====================================
   FLEET COMMANDER
   Часть 3/4
===================================== */



/* Отрисовка двух полей */

function drawBoards(){


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




/* Создание поля HTML */

function createBoardHTML(
    id,
    board,
    enemy
){


    let container =
    document.getElementById(id);



    if(!container){

        return;

    }



    container.innerHTML="";



    for(let y=0;y<SIZE;y++){


        for(let x=0;x<SIZE;x++){



            let cell =
            document.createElement(
                "div"
            );


            cell.className="cell";


            cell.dataset.x=x;

            cell.dataset.y=y;




            if(
                board[y][x].ship &&
                !enemy
            ){

                cell.classList.add(
                    "ship-part"
                );

            }




            if(
                board[y][x].hit
            ){


                if(
                    board[y][x].ship
                ){

                    cell.classList.add(
                        "hit"
                    );


                }else{


                    cell.classList.add(
                        "miss"
                    );


                }


            }




            if(enemy){


                cell.onclick=function(){


                    playerShoot(
                        x,
                        y
                    );


                };


            }else{


                cell.onclick=function(){


                    if(!gameStarted){

                        placePlayerShip(
                            x,
                            y
                        );

                    }


                };


            }



            container.appendChild(cell);


        }


    }


}



/* Выстрел игрока */

function playerShoot(
    x,
    y
){


    if(!gameStarted){

        return;

    }



    if(!playerTurn){

        return;

    }



    let cell =
    enemyBoard[y][x];



    if(cell.hit){


        showMessage(
            "Вы уже стреляли сюда"
        );


        return;

    }



    cell.hit=true;



    if(cell.ship){


        showMessage(
            "Попадание! Ещё выстрел"
        );


        drawBoards();



        if(checkWin(enemyBoard)){


            endGame(true);


        }


    }else{


        showMessage(
            "Промах"
        );


        playerTurn=false;


        drawBoards();



        setTimeout(
            enemyShoot,
            800
        );


    }


}




/* Ход компьютера */

function enemyShoot(){



    let x;

    let y;



    do{


        x=
        Math.floor(
            Math.random()*SIZE
        );


        y=
        Math.floor(
            Math.random()*SIZE
        );


    }
    while(
        playerBoard[y][x].hit
    );




    let cell =
    playerBoard[y][x];



    cell.hit=true;



    if(cell.ship){


        showMessage(
            "Компьютер попал!"
        );



        if(
            checkWin(playerBoard)
        ){

            endGame(false);

            return;

        }



        setTimeout(
            enemyShoot,
            700
        );


    }else{


        playerTurn=true;


        showMessage(
            "Компьютер промахнулся. Ваш ход"
        );


    }



    drawBoards();


}




/* Проверка победы */

function checkWin(board){



    for(let y=0;y<SIZE;y++){


        for(let x=0;x<SIZE;x++){



            if(
                board[y][x].ship &&
                !board[y][x].hit
            ){

                return false;

            }


        }

    }


    return true;

}




/* Завершение игры */

function endGame(win){


    gameStarted=false;


    let result =
    document.getElementById(
        "result-screen"
    );


    let title =
    document.getElementById(
        "result-title"
    );



    if(win){


        title.innerHTML=
        "🏆 ПОБЕДА";


        title.className=
        "win-title";


        saveResult(true);



    }else{


        title.innerHTML=
        "💥 ПОРАЖЕНИЕ";


        title.className=
        "lose-title";


        saveResult(false);


    }



    if(result){

        result.style.display="flex";

    }


}



/* Сохранение статистики */

function saveResult(win){


    let stats =
    JSON.parse(
        localStorage.getItem(
            "fleetStats"
        )
    )
    ||
    {
        wins:0,
        loses:0
    };



    if(win){

        stats.wins++;

    }else{

        stats.loses++;

    }



    localStorage.setItem(
        "fleetStats",
        JSON.stringify(stats)
    );


}
