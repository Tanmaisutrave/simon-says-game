let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;
let acceptingInput = false;

let statusText = document.getElementById("status");
let allBtns = document.querySelectorAll(".btn");
let restartBtn = document.getElementById("restart");

function startGame() {
    if (!started) {
        started = true;
        level = 0;
        gameSeq = [];
        statusText.innerText = "Game Started!";
        setTimeout(levelUp, 500);
    }
}

document.addEventListener("keydown", startGame);
document.addEventListener("click", startGame);

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => btn.classList.remove("flash"), 200);
}

function levelUp() {
    userSeq = [];
    level++;
    statusText.innerText = `Level ${level}`;

    acceptingInput = false;

    let randColor = btns[Math.floor(Math.random() * 4)];
    gameSeq.push(randColor);

    playSequence();
}

function playSequence() {
    let i = 0;

    let interval = setInterval(() => {
        let color = gameSeq[i];
        let btn = document.getElementById(color);

        btnFlash(btn);
        i++;

        if (i >= gameSeq.length) {
            clearInterval(interval);
            acceptingInput = true;
        }
    }, 600);
}

function btnPress() {
    if (!started || !acceptingInput) return;

    let btn = this;
    let color = btn.id;

    userSeq.push(color);
    userFlash(btn);

    checkAnswer(userSeq.length - 1);
}

function checkAnswer(idx) {
    if (userSeq[idx] !== gameSeq[idx]) {
        gameOver();
        return;
    }

    if (userSeq.length === gameSeq.length) {
        acceptingInput = false;
        setTimeout(levelUp, 1000);
    }
}

function gameOver() {
    statusText.innerText = `❌ Game Over! Your score: ${level}`;

    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 400);

    setTimeout(() => {
        reset();
        statusText.innerText = "Press any key to start";
    }, 3000);
}

function reset() {
    started = false;
    acceptingInput = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

allBtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});
restartBtn.addEventListener("click", function () {

    reset();

    statusText.innerText = "Restarting...";

    setTimeout(() => {
        started = true;
        levelUp();
    }, 500);
});