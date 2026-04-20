let maps = [];
let currentMapIndex = -1;

let board = [];
let initialBoard = [];

let moves = 0;
let timer = 0;
let interval;
let cells = [];

let history = [];

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
    startRandomGame();
}

function restartGame() {
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

            cells[i][j].classList.toggle("on", board[i][j]);
            cells[i][j].classList.toggle("off", !board[i][j]);

        }
    }
}

function handleClick(i, j) {
    let last = history[history.length - 1];

  
    if (last && last[0] === i && last[1] === j) {
        toggle(i, j);
        history.pop();
        moves--;
    } else {
        toggle(i, j);
        history.push([i, j]);
        moves++;
    }

    render();
    if (isWin()) {
        clearInterval(interval);
        alert("You Win!!");
       newGame();
    }
}

function toggle(i, j) {
    let dirs = [
        [0, 0],
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
    ];

    dirs.forEach(function (d) {
        let x = i + d[0];
        let y = j + d[1];

        if (x >= 0 && x < 5 && y >= 0 && y < 5) {
            board[x][y] = board[x][y] ? 0 : 1;
        }
    });
}
function isWin() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (board[i][j] !== 0) {
                return false;
            }
        }
    }
    return true;
}
});
