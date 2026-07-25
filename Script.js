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
