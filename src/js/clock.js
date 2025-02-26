
class Clock {
    constructor() {
        this.hoursElement = document.getElementById('hours');
        this.minutesElement = document.getElementById('minutes');
        this.secondsElement = document.getElementById('seconds');
        this.startClock();
    }

    update() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        this.hoursElement.textContent = hours;
        this.minutesElement.textContent = minutes;
        this.secondsElement.textContent = seconds;
    }

    startClock() {
        this.update();
        setInterval(() => this.update(), 1000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Clock();
});

