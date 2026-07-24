const SIZE = 10;

const playerBoard = document.getElementById("playerBoard");
const enemyBoard = document.getElementById("enemyBoard");
const status = document.getElementById("status");

let player = [];
let enemy = [];

function createMatrix() {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
}

function createBoard(boardElement, matrix, editable) {
    boardElement.innerHTML = "";

    for (let y = 0; y < SIZE; y++) {

        for (let x = 0; x < SIZE; x++) {

            const cell = document.createElement("div");
            cell.className = "cell";

            if (editable) {
                cell.onclick = () => {

                    matrix[y][x] = matrix[y][x] ? 0 : 1;

                    cell.classList.toggle("ship");

                };
            }

            boardElement.appendChild(cell);

        }

    }

}

function randomShips(matrix, boardElement, visible) {

    matrix.forEach(row => row.fill(0));

    boardElement.querySelectorAll(".cell").forEach(cell=>{
        cell.className="cell";
    });

    let ships=20;

    while(ships>0){

        let x=Math.floor(Math.random()*10);
        let y=Math.floor(Math.random()*10);

        if(matrix[y][x]==0){

            matrix[y][x]=1;

            if(visible){

                boardElement.children[y*10+x].classList.add("ship");

            }

            ships--;

        }

    }

}

function newGame(){

    player=createMatrix();
    enemy=createMatrix();

    createBoard(playerBoard,player,true);
    createBoard(enemyBoard,enemy,false);

    status.textContent="Подготовьте свой флот";

}

document.getElementById("newGame").onclick=newGame;

document.getElementById("autoPlace").onclick=()=>{

    randomShips(player,playerBoard,true);
    randomShips(enemy,enemyBoard,false);

    status.textContent="Флот готов к бою!";

};

newGame();
