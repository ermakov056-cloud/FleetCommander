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
