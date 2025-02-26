class ThemeManager {
  constructor() {
    this.themeSelector = document.getElementById("themeSelector");
    this.initTheme();
    this.bindEvents();
  }

  setTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("clockworkTheme", theme);
  }

  initTheme() {
    const savedTheme = localStorage.getItem("clockworkTheme");
    if (savedTheme) {
      this.setTheme(savedTheme);
      this.themeSelector.value = savedTheme;
    }
  }

  bindEvents() {
    this.themeSelector.addEventListener("change", (e) => {
      this.setTheme(e.target.value);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();
});
