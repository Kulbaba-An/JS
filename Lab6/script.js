let maps = [];
let currentMapIndex = -1;

let board = [];
let initialBoard = [];

let moves = 0;
let timer = 0;
let interval;
let cells = [];

let history = [];
let blockMoves = false;

document.addEventListener("DOMContentLoaded", function () {

   
    $ajaxUtils.sendGetRequest("data.json", function (data) {
        maps = data.maps;
        startRandomGame();
    }, true);

    document.getElementById("newGame").onclick = newGame;
    document.getElementById("restart").onclick = restartGame;
   


function createBoard(size) {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    cells = [];

    for (let i = 0; i < size; i++) {
        cells[i] = [];

        for (let j = 0; j < size; j++) {

            let cell = document.createElement("div");
            cell.classList.add("cell");

            cell.addEventListener("click", () => {
                handleClick(i, j);
            });

            boardDiv.appendChild(cell);
            cells[i][j] = cell;
        }
    }
}

function startRandomGame() {
    let newIndex;

    do {
        newIndex = Math.floor(Math.random() * maps.length);
    } while (newIndex === currentMapIndex);

    currentMapIndex = newIndex;
    loadMap(maps[currentMapIndex]);
}

function newGame() {
    blockMoves = false;
    startRandomGame();
}

function restartGame() {
    blockMoves = false;
    board = JSON.parse(JSON.stringify(initialBoard));
    moves = 0;
    timer = 0;
    history = [];

    render();
}

function loadMap(mapObj) {
    board = JSON.parse(JSON.stringify(mapObj.map));
    initialBoard = JSON.parse(JSON.stringify(mapObj.map));


    document.getElementById("target").textContent = mapObj.target;

    moves = 0;
    timer = 0;
    history = [];

    createBoard(5);
    render();

    clearInterval(interval);
    interval = setInterval(function () {
        timer++;
        document.getElementById("time").textContent = timer;
    }, 1000);

    render();
}

function render() {
    document.getElementById("moves").textContent = moves;
    document.getElementById("time").textContent = timer;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {

            if (board[i][j]) {
                cells[i][j].classList.add("on");
                cells[i][j].classList.remove("off");
            } else {
                cells[i][j].classList.add("off");
                cells[i][j].classList.remove("on");
            }

        }
    }
}

function handleClick(i, j) {
    if (blockMoves) return;
    let last = history[history.length - 1];

  
    if (last && last[0] === i && last[1] === j) {
        turnOnOff(i, j);
        history.pop();
        moves--;
    } else {
        turnOnOff(i, j);
        history.push([i, j]);
        moves++;
    }

    render();
    if (isWin()) {
        clearInterval(interval);
        alert("You Win!!");
        blockMoves = true;
      
    }
}

function turnOnOff(i, j) {

    function flip(x, y) {
        if (x >= 0 && x < board.length &&
            y >= 0 && y < board.length) {
           
            board[x][y] = !board[x][y];
        }
    }

    flip(i, j);       
    flip(i + 1, j);   
    flip(i - 1, j);   
    flip(i, j + 1);   
    flip(i, j - 1);   
}
function isWin() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] === true) {
                return false;
            }
        }
    }
    return true;
}
});
