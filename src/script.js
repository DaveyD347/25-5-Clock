let breakLength = 5;
let sessionLength = 25;
let timeLeft = sessionLength * 60;
let isRunning = false;
let currentLabel = "Session";
let interval;

function updateDisplay() {
    document.getElementById('break-length').textContent = breakLength;
    document.getElementById('session-length').textContent = sessionLength;
    document.getElementById('timer-label').textContent = currentLabel;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(interval);
    } else {
        interval = setInterval(() => {
            if (timeLeft <= 0) {
                currentLabel = currentLabel === "Session" ? "Break" : "Session";
                timeLeft = currentLabel === "Session" ? sessionLength * 60 : breakLength * 60;
                document.getElementById('beep').play();
            } else {
                timeLeft--;
            }
            updateDisplay();
        }, 1000);
    }
    isRunning = !isRunning;
}

document.getElementById('break-decrement').addEventListener('click', function() {
    if (!isRunning && breakLength > 1) {
        breakLength--;
        updateDisplay();
    }
});

document.getElementById('break-increment').addEventListener('click', function() {
    if (!isRunning && breakLength < 60) {
        breakLength++;
        updateDisplay();
    }
});

document.getElementById('session-decrement').addEventListener('click', function() {
    if (!isRunning && sessionLength > 1) {
        sessionLength--;
        timeLeft = sessionLength * 60;
        updateDisplay();
    }
});

document.getElementById('session-increment').addEventListener('click', function() {
    if (!isRunning && sessionLength < 60) {
        sessionLength++;
        timeLeft = sessionLength * 60;
        updateDisplay();
    }
});

document.getElementById('start_stop').addEventListener('click', toggleTimer);

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(interval);
    breakLength = 5;
    sessionLength = 25;
    timeLeft = 25 * 60;
    isRunning = false;
    currentLabel = "Session";
    document.getElementById('beep').pause();
    document.getElementById('beep').currentTime = 0;
    updateDisplay();
});

updateDisplay();
