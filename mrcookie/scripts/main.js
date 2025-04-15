export function setupDarkModeToggle() {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;
  
    if (localStorage.getItem("darkMode") === "enabled") {
      body.classList.add("dark-mode");
    }
  
    toggleButton?.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      localStorage.setItem(
        "darkMode",
        body.classList.contains("dark-mode") ? "enabled" : "disabled"
      );
    });
  }
  
  export function updateFooterDate() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const lastMod = document.querySelector(".last-modified");
    if (lastMod) lastMod.textContent = `Last Access: ${formattedDate}`;
  }
  
  export function setupHamburgerMenu() {
    const menuButton = document.querySelector("#menu");
    const nav = document.querySelector("#animeteme");
  
    if (menuButton && nav) {
      menuButton.addEventListener("click", () => {
        nav.classList.toggle("open");
        menuButton.classList.toggle("open");
      });
    }
  }
  
  export function displayVisitMessage(message) {
    const visitMessageContainer = document.createElement("div");
    visitMessageContainer.textContent = message;
    visitMessageContainer.classList.add("visit-message");
    visitMessageContainer.setAttribute("aria-live", "polite");
  
    const messageTarget = document.getElementById("visit-message-container");
    if (messageTarget) messageTarget.appendChild(visitMessageContainer);
  }
  
  export function trackLastVisit() {
    const lastVisitDate = localStorage.getItem("lastVisit");
    const currentVisitDate = Date.now();
  
    if (!lastVisitDate) {
      displayVisitMessage("Welcome to our Website! Thanks for your visit!");
    } else {
      const timeDiff = currentVisitDate - parseInt(lastVisitDate);
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  
      const message =
        daysDiff < 1
          ? "Back so soon! Awesome."
          : `You last visited ${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;
  
      displayVisitMessage(message);
    }
  
    localStorage.setItem("lastVisit", currentVisitDate);
  }