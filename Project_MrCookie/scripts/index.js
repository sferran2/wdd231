document.addEventListener("DOMContentLoaded", function () {
    // Dark mode
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    toggleButton?.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    // Footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    document.querySelector('.last-modified').textContent = `Last Access: ${formattedDate}`;

    // Hamburguer button
    const menuButton = document.querySelector('#menu');
    const nav = document.querySelector('#animeteme');
    menuButton.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuButton.classList.toggle('open');
    });

    const lastVisitDate = localStorage.getItem("lastVisit");
    const currentVisitDate = Date.now();

    if (!lastVisitDate) {
        displayVisitMessage("Welcome to our Website! Thanks for your visit!");
    } else {
        const timeDiff = currentVisitDate - parseInt(lastVisitDate);
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            displayVisitMessage("Back so soon! Awesome.");
        } else {
            const dayOrDays = daysDiff === 1 ? "day" : "days";
            displayVisitMessage(`You last visited ${daysDiff} ${dayOrDays} ago`);
        }
    }

    localStorage.setItem("lastVisit", currentVisitDate);

    function displayVisitMessage(message) {
        const visitMessageContainer = document.createElement("div");
        visitMessageContainer.textContent = message;
        visitMessageContainer.classList.add("visit-message");
        visitMessageContainer.setAttribute('aria-live', 'polite');
        document.getElementById("visit-message-container").appendChild(visitMessageContainer);
    }
    const heroImages = [
        'images/mr1.webp',
        'images/mr2.webp',
        'images/mr3.webp',
        'images/mr4.webp',
        'images/mr11.webp',
        'images/mr12.webp',
    ];
    
    let index = 0;
    
    function rotateHeroImages() {
        const hero = document.querySelector('.hero');
        index = (index + 1) % heroImages.length;
        hero.style.backgroundImage = `url('${heroImages[index]}')`;
    }
    
    setInterval(rotateHeroImages, 6000); 
  
})