class SidebarCustomizer {
  constructor() {
    this.sidebarToggle = document.getElementById("sidebarToggle");
    this.sidebar = document.getElementById("sidebar");
    this.bgColorInput = document.getElementById("bgColor");
    this.bgOpacityInput = document.getElementById("bgOpacity");
    this.bgImageInput = document.getElementById("bgImage");

    this.init();
  }

  init() {
    document.body.style.transition = "background 0.3s ease, opacity 0.3s ease";

    this.sidebarToggle.addEventListener("click", () => this.toggleSidebar());
    document.addEventListener("click", (event) =>
      this.closeSidebarOnOutsideClick(event)
    );
    this.bgColorInput.addEventListener("input", (event) =>
      this.updateBackgroundColor(event)
    );
    this.bgOpacityInput.addEventListener("input", (event) =>
      this.updateOpacity(event)
    );
    this.bgImageInput.addEventListener("change", (event) =>
      this.updateBackgroundImage(event)
    );
  }

  toggleSidebar() {
    this.sidebar.classList.toggle("active");
  }

  closeSidebarOnOutsideClick(event) {
    if (
      !this.sidebar.contains(event.target) &&
      !this.sidebarToggle.contains(event.target)
    ) {
      this.sidebar.classList.remove("active");
    }
  }

  updateBackgroundColor(event) {
    document.body.style.backgroundColor = event.target.value;
  }

  updateOpacity(event) {
    const opacity = Math.max(0.1, Math.min(1, parseFloat(event.target.value)));
    document.body.style.opacity = opacity;
  }

  updateBackgroundImage(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.body.style.backgroundImage = `url(${e.target.result})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
      };
      reader.readAsDataURL(file);
    }
  }
}

// Initialize the SidebarCustomizer when DOM is loaded
document.addEventListener("DOMContentLoaded", () => new SidebarCustomizer());
