document.addEventListener("DOMContentLoaded", function () {
    // 🔸 Dark Mode Toggle
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    toggleButton?.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // 🔸 Footer Date
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    const lastMod = document.querySelector('.last-modified');
    if (lastMod) lastMod.textContent = `Last Access: ${formattedDate}`;

    // 🔸 Hamburger Menu
    const menuButton = document.querySelector('#menu');
    const nav = document.querySelector('#animeteme');
    menuButton?.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuButton.classList.toggle('open');
    });

    // 🔸 Last Visit Message
    const lastVisitDate = localStorage.getItem("lastVisit");
    const currentVisitDate = Date.now();

    if (!lastVisitDate) {
        displayVisitMessage("Welcome to our Website! Thanks for your visit!");
    } else {
        const timeDiff = currentVisitDate - parseInt(lastVisitDate);
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        const message = daysDiff < 1
            ? "Back so soon! Awesome."
            : `You last visited ${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;

        displayVisitMessage(message);
    }

    localStorage.setItem("lastVisit", currentVisitDate);

    function displayVisitMessage(message) {
        const visitMessageContainer = document.createElement("div");
        visitMessageContainer.textContent = message;
        visitMessageContainer.classList.add("visit-message");
        visitMessageContainer.setAttribute('aria-live', 'polite');
        const messageTarget = document.getElementById("visit-message-container");
        if (messageTarget) messageTarget.appendChild(visitMessageContainer);
    }
})