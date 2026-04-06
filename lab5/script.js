document.addEventListener("DOMContentLoaded", function () {

    const difficultySelect = document.getElementById("difficulty");
    const colorSelect = document.getElementById("color");
    const square = document.getElementById("square");
    const scoreEl = document.getElementById("score");
    const timeEl = document.getElementById("time");
    const menu = document.getElementById("menu");
    const gameUI = document.getElementById("gameUI");

    let score = 0;
    let timeLeft = 0;
    let timerID = null;
    let gameActive = false;
    let squareSize = 50;
    let radius = 100;

    function getSettings(diff) {
        const base = Math.min(window.innerWidth, window.innerHeight);

        switch (diff) {
            case "easy":
                return {
                    time: 10,
                    size: 80,
                    radius: base / 3
                };
            case "normal":
                return {
                    time: 5,
                    size: 60,
                    radius: base / 2
                };
            case "hard":
                return {
                    time: 3,
                    size: 40,
                    radius: base
                };
        }
    }
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function moveSquare() {
        const maxX = window.innerWidth - squareSize;
        const maxY = window.innerHeight - squareSize;

        let currentX = square.offsetLeft;
        let currentY = square.offsetTop;

        let minX = Math.max(0, currentX - radius);
        let maxAllowedX = Math.min(maxX, currentX + radius);

        let minY = Math.max(0, currentY - radius);
        let maxAllowedY = Math.min(maxY, currentY + radius);

        let newX = random(minX, maxAllowedX);
        let newY = random(minY, maxAllowedY);

        square.style.left = newX + "px";
        square.style.top = newY + "px";
    }
    function startTimer() {
        clearInterval(timerID);

        timerID = setInterval(function() {
            timeLeft -= 0.1;
            timeEl.textContent = timeLeft.toFixed(1);

            if (timeLeft <= 0) {
                endGame();
            }
        }, 100);
    }

    function endGame() {
        clearInterval(timerID);
        gameActive = false;
        alert("Game over! Your score is  " + score + " points. Reload the page to start a new game.");
    }

    document.getElementById("startBtn").addEventListener("click", function() {
        const diff = difficultySelect.value;
        const color = colorSelect.value;

        if (!diff || !color) return;

        const settings = getSettings(diff);




        menu.style.display = "none";
        gameUI.style.display = "block";
        square.style.display = "block";

        score = 0;
        scoreEl.textContent = score;

        timeLeft = settings.time;
        squareSize = settings.size;
        radius = settings.radius;

        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        square.style.backgroundColor = color;

        square.style.left = "0px";
        square.style.top = "0px";

        gameActive = true;

        startTimer();

    });

    square.addEventListener("click", function() {
        if (!gameActive) return;

        score++;
        scoreEl.textContent = score;

        timeLeft = getSettings(difficultySelect.value).time;

        moveSquare();
    });

});
