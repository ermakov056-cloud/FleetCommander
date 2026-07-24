// Fleet Commander 2.0
// Часть 1

const SIZE = 10;

const SHIPS = [4,3,3,2,2,2,1,1,1,1];

let gameStarted = false;
let playerTurn = true;
let playerShots = [];
let enemyShots = [];

const playerBoard=document.getElementById("playerBoard");
const enemyBoard=document.getElementById("enemyBoard");
const status=document.getElementById("status");

let player=[];
let enemy=[];

function createField(){

    const field=[];

    for(let y=0;y<SIZE;y++){

        field[y]=[];

        for(let x=0;x<SIZE;x++)
            field[y][x]=0;

    }

    return field;

}

function inside(x,y){

    return x>=0 && y>=0 && x<SIZE && y<SIZE;

}

function canPlace(field,x,y,length,horizontal){

    for(let i=0;i<length;i++){

        const xx=horizontal?x+i:x;
        const yy=horizontal?y:y+i;

        if(!inside(xx,yy))
            return false;

        for(let dy=-1;dy<=1;dy++){

            for(let dx=-1;dx<=1;dx++){

                const nx=xx+dx;
                const ny=yy+dy;

                if(inside(nx,ny) && field[ny][nx]==1)
                    return false;

            }

        }

    }

    return true;

}

function placeShip(field,length){

    while(true){

        const horizontal=Math.random()<0.5;

        const x=Math.floor(Math.random()*SIZE);

        const y=Math.floor(Math.random()*SIZE);

        if(!canPlace(field,x,y,length,horizontal))
            continue;

        for(let i=0;i<length;i++){

            if(horizontal)
                field[y][x+i]=1;
            else
                field[y+i][x]=1;

        }

        return;

    }

}

function randomFleet(field){

    for(let y=0;y<SIZE;y++)
        for(let x=0;x<SIZE;x++)
            field[y][x]=0;

    SHIPS.forEach(ship=>placeShip(field,ship));

}
function drawBoards(){

    playerBoard.innerHTML="";
    enemyBoard.innerHTML="";

    for(let y=0;y<SIZE;y++){

        for(let x=0;x<SIZE;x++){

            const p=document.createElement("div");
            p.className="cell";

            if(player[y][x]==1)
                p.classList.add("ship");

            if(enemyShots[y][x]==1)
                p.classList.add("miss");

            if(enemyShots[y][x]==2)
                p.classList.add("hit");

            playerBoard.appendChild(p);

            const e=document.createElement("div");
            e.className="cell";

            if(playerShots[y][x]==1)
                e.classList.add("miss");

            if(playerShots[y][x]==2)
                e.classList.add("hit");

            e.onclick=function(){

                if(!gameStarted) return;

                if(!playerTurn) return;

                if(playerShots[y][x]!=0) return;

                if(enemy[y][x]==1){

                    playerShots[y][x]=2;

                    status.innerHTML="💥 Попадание!";

                }else{

                    playerShots[y][x]=1;

                    status.innerHTML="🌊 Мимо";

                    playerTurn=false;

                    setTimeout(enemyMove,700);

                }

                drawBoards();

            };

            enemyBoard.appendChild(e);

        }

    }

}
function newGame() {

    player = createField();
    enemy = createField();
    playerShots=createShotField();
enemyShots=createShotField();

    randomFleet(player);
    randomFleet(enemy);

    gameStarted = false;
    playerTurn = true;

    drawBoards();

    status.innerHTML =
        "Нажмите «Начать бой»";

}

document
.getElementById("newGame")
.onclick = newGame;

document
.getElementById("autoPlace")
.onclick = function(){

    randomFleet(player);

    drawBoards();

    status.innerHTML =
        "Флот расставлен";

};

newGame();
function createShotField(){

    const arr=[];

    for(let y=0;y<SIZE;y++){

        arr[y]=[];

        for(let x=0;x<SIZE;x++)
            arr[y][x]=0;

    }

    return arr;

}
function enemyMove(){

    while(true){

        const x=Math.floor(Math.random()*SIZE);
        const y=Math.floor(Math.random()*SIZE);

        if(enemyShots[y][x]!=0)
            continue;

        if(player[y][x]==1){

            enemyShots[y][x]=2;
            status.innerHTML="💥 Компьютер попал!";

        }else{

            enemyShots[y][x]=1;
            playerTurn=true;
            status.innerHTML="Ваш ход";

        }

        break;

    }

    drawBoards();

}
document
.getElementById("startGame")
.onclick=function(){

    gameStarted=true;
    playerTurn=true;

    status.innerHTML=
    "🚀 Бой начался! Стреляйте по полю противника.";

}
