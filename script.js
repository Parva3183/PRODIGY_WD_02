let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let paused = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        running = true;
        paused = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    display.innerHTML = `${(hours > 9 ? hours : "0" + hours)}:${(minutes > 9 ? minutes : "0" + minutes)}:${(seconds > 9 ? seconds : "0" + seconds)}.${milliseconds > 9 ? milliseconds : "0" + milliseconds}`;
}

function pauseTimer() {
    if (!paused && running) {
        clearInterval(tInterval);
        paused = true;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    paused = false;
    display.innerHTML = "00:00:00";
    startTime = null;
    laps.innerHTML = "";
}

function recordLap() {
    if (running || paused) {
        const lapTime = document.createElement('li');
        lapTime.innerText = display.innerHTML;
        laps.appendChild(lapTime);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);
