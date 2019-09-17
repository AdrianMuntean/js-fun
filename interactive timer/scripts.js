let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const buttonsPlus = document.querySelectorAll('[data-time-plus]');
let now;
let then;

function timer(seconds) {
    //clear any existing timers
    clearInterval(countdown);

    now = Date.now();
    then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}
function startPlusTimer() {
    const seconds = parseInt(this.dataset.timePlus);
    let secondsLeft = 0;
    if (then) {
        secondsLeft = Math.round((then - Date.now()) / 1000);
    }

    timer(secondsLeft + seconds);
}


buttons.forEach(button => button.addEventListener('click', startTimer));
buttonsPlus.forEach(button => button.addEventListener('click', startPlusTimer));

document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutesRead = this.minutes.value;
    
    console.log(minutesRead);
    if (!Number.isInteger(parseInt(minutesRead))) {
        this.minutes.placeholder = 'Not valid value';
        this.reset();
        return;
    }
    this.minutes.placeholder = 'Enter minutes';
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});