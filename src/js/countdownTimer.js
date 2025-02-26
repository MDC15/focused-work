/**
 * CountdownTimer - Class để quản lý bộ đếm ngược
 */
class CountdownTimer {
  constructor() {
    // Lấy các phần tử input
    this.hoursInput = document.getElementById("hours-input");
    this.minutesInput = document.getElementById("minutes-input");
    this.secondsInput = document.getElementById("seconds-input");

    // Lấy phần tử hiển thị thời gian
    this.countdownDisplay = document.getElementById("countdown-timer");

    // Các nút điều khiển
    this.startButton = document.getElementById("start-countdown");
    this.resetButton = document.getElementById("reset-countdown");

    // Thuộc tính bộ đếm thời gian
    this.totalSeconds = 0;
    this.timerInterval = null;
    this.isRunning = false;

    // AudioManager được giả sử đã được định nghĩa bên ngoài
    this.audioManager = new AudioManager();

    // Khởi tạo các sự kiện
    this.initialize();
  }

  /**
   * Khởi tạo bộ đếm ngược
   */
  initialize() {
    if (
      !this.hoursInput ||
      !this.minutesInput ||
      !this.secondsInput ||
      !this.countdownDisplay ||
      !this.startButton ||
      !this.resetButton
    ) {
      console.error("Các phần tử DOM cần thiết không được tìm thấy");
      return;
    }

    // Giới hạn giá trị hợp lệ cho các input
    this.hoursInput.addEventListener("input", () =>
      this.validateInput(this.hoursInput, 0, 23)
    );
    this.minutesInput.addEventListener("input", () =>
      this.validateInput(this.minutesInput, 0, 59)
    );
    this.secondsInput.addEventListener("input", () =>
      this.validateInput(this.secondsInput, 0, 59)
    );

    // Gán sự kiện cho các nút điều khiển
    this.startButton.addEventListener("click", () => this.toggleTimer());
    this.resetButton.addEventListener("click", () => this.resetTimer());
  }

  /**
   * Kiểm tra và điều chỉnh giá trị input
   */
  validateInput(inputElement, min, max) {
    let value = parseInt(inputElement.value);
    if (isNaN(value)) {
      inputElement.value = "";
    } else {
      if (value < min) value = min;
      if (value > max) value = max;
      inputElement.value = value;
    }
  }

  /**
   * Chuyển đổi giữa chạy và tạm dừng bộ đếm ngược
   */
  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
      this.startButton.textContent = "Resume";
    } else {
      if (this.totalSeconds === 0) {
        const hours = parseInt(this.hoursInput.value) || 0;
        const minutes = parseInt(this.minutesInput.value) || 0;
        const seconds = parseInt(this.secondsInput.value) || 0;
        this.totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (this.totalSeconds === 0) return;
      }
      this.startTimer();
      this.startButton.textContent = "Pause";
    }
  }

  /**
   * Bắt đầu bộ đếm ngược
   */
  startTimer() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.updateDisplay();
    this.timerInterval = setInterval(() => {
      this.totalSeconds--;
      if (this.totalSeconds <= 0) {
        this.totalSeconds = 0;
        this.finishTimer();
      }
      this.updateDisplay();
    }, 1000);
  }

  /**
   * Tạm dừng bộ đếm ngược
   */
  pauseTimer() {
    if (!this.isRunning) return;
    clearInterval(this.timerInterval);
    this.isRunning = false;
  }

  /**
   * Đặt lại bộ đếm ngược
   */
  resetTimer() {
    this.pauseTimer();
    this.totalSeconds = 0;
    this.updateDisplay();
    this.startButton.textContent = "Start";
    this.hoursInput.value = "";
    this.minutesInput.value = "";
    this.secondsInput.value = "";
    this.audioManager.stopAlarm();
  }

  /**
   * Khi bộ đếm về 0: dừng timer, phát âm báo thức, hiển thị thông báo và cố gắng đưa trình duyệt lên trước
   */
  finishTimer() {
    this.pauseTimer();
    this.startButton.textContent = "Start";
    this.audioManager.playAlarm();
    // Hiển thị thông báo in-page
    notificationManager.showNotification("Time is up!");
    // Cố gắng đưa cửa sổ trình duyệt lên trước (có thể bị hạn chế tùy trình duyệt)
    window.focus();
  }

  /**
   * Cập nhật giao diện hiển thị thời gian
   */
  updateDisplay() {
    const hours = Math.floor(this.totalSeconds / 3600);
    const minutes = Math.floor((this.totalSeconds % 3600) / 60);
    const seconds = this.totalSeconds % 60;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    this.countdownDisplay.textContent = formattedTime;
  }
}

// Khởi tạo CountdownTimer sau khi DOM load
document.addEventListener("DOMContentLoaded", () => {
  const countdownTimer = new CountdownTimer();
});
