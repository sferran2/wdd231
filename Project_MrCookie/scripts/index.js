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

    // 🔸 Hero Image Rotation
    const heroImages = [
        'images/mr1.webp',
        'images/mr2.webp',
        'images/mr3.webp',
        'images/mr4.webp',
        'images/mr11.webp',
        'images/mr12.webp'
    ];

    let index = 0;

    function rotateHeroImages() {
        const hero = document.querySelector('.hero');
        if (hero) {
            index = (index + 1) % heroImages.length;
            hero.style.backgroundImage = `url('${heroImages[index]}')`;
        }
    }

    setInterval(rotateHeroImages, 6000);

    //feature cookie week

    async function loadFeaturedCookie() {
        try {
            const res = await fetch('data/cookies.json');
            const cookiesData = await res.json();
            const cookies = cookiesData.cookies;
    
            // Calculate week number 
            const currentWeek = new Date().getWeekNumber();
            const index = currentWeek % cookies.length;
            const featured = cookies[index];
    
            const container = document.getElementById('featuredProduct');
            if (!container) return;
    
            container.innerHTML = "";
    
            const card = document.createElement("section");
            card.classList.add("product-week-section");
    
            const image = document.createElement("img");
            image.src = featured.image;
            image.alt = featured.name;
            image.width = 300;
            image.height = 400;
            image.style.gridArea = "image";
    
            const invite = document.createElement("h3");
            invite.innerHTML = featured.featured_invite.replace(/\n/g, "<br>");
            invite.style.gridArea = "ft_invite";
    
            const extra = document.createElement("p");
            extra.textContent = featured.extra_description;
            extra.style.gridArea = "ex_description";
    
            const button = document.createElement("button");
            button.textContent = "Order Now";
            button.style.gridArea = "button";
    
            card.append(image, invite, extra, button);
            container.appendChild(card);
        } catch (error) {
            console.error("Error loading featured cookie:", error);
        }
    }
    
    Date.prototype.getWeekNumber = function () {
        const d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    };
    
    loadFeaturedCookie();

    // reviews

    async function loadReviews() {
        try {
          const res = await fetch("data/reviews.json");
          const data = await res.json();
          const allReviews = data.reviews;

          let reviewQueue = JSON.parse(localStorage.getItem("reviewQueue"));
      
          if (!Array.isArray(reviewQueue) || reviewQueue.length < 3) {
            reviewQueue = shuffleArray([...allReviews]);
            localStorage.setItem("reviewQueue", JSON.stringify(reviewQueue));
          }

          const currentReviews = reviewQueue.slice(0, 3);
      
          const remaining = reviewQueue.slice(3);
          localStorage.setItem("reviewQueue", JSON.stringify(remaining));
      
          const container = document.getElementById("reviews");
          container.innerHTML = "";
          currentReviews.forEach(review => {
            const card = document.createElement("div");
            card.classList.add("review-card");
      
            const name = document.createElement("h4");
            name.textContent = review.name;
      
            const date = document.createElement("div");
            date.classList.add("date");
            date.textContent = review.date;
      
            const stars = document.createElement("div");
            stars.classList.add("stars");
            stars.textContent = "★".repeat(Math.round(review.rating)); 
      
            const comment = document.createElement("p");
            comment.textContent = review.comment;
      
            card.append(name, date, stars, comment);
            container.appendChild(card);
          });
      
        } catch (error) {
          console.error("Failed to load reviews:", error);
        }
      }
    
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      
      loadReviews();
      
      
});
