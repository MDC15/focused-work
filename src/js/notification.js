class NotificationManager {
  constructor() {
    this.container = document.getElementById("notificationContainer");
    this.audio = document.getElementById("alarm-sound");
  }

  // Hiển thị thông báo với nội dung message
  showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.innerText = message;

    this.container.appendChild(notification);
    // Bắt buộc reflow để trigger hiệu ứng
    void notification.offsetWidth;
    notification.classList.add("show");

    // Phát âm thanh thông báo
    this.audio.play();

    // Sau 3 giây, ẩn và loại bỏ thông báo
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);

    // Cố gắng đưa cửa sổ trình duyệt lên trước (lưu ý: hành động này có thể bị chặn)
    window.focus();
  }
}

// Khởi tạo NotificationManager toàn cục
const notificationManager = new NotificationManager();
