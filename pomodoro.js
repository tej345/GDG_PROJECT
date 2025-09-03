let timer;
let timeLeft = 25 * 60;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timeDisplay.textContent = 
    `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        alert("Time’s up! Take a break 🕒");
        isRunning = false;
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();
}

function notifyUser() {
    if ("Notification" in window && Notification.permission === "granted") {
        new Notification(" Time’s up!", {
            body: "Take a break or start the next session.",
        });
    }
    let audio = new Audio("sounds/spaceship.wav"); 
    audio.play();
}

// notification permission 
document.addEventListener("DOMContentLoaded", () => {
    if ("Notification" in window) {
        Notification.requestPermission();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    if(localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }

    const toggle = document.getElementById("theme-toggle");
    if(toggle) {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if(document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }
});


startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay();
