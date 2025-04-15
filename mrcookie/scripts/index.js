document.addEventListener("DOMContentLoaded", function () {

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
    
            const currentWeek = new Date().getWeekNumber();
            const index = currentWeek % cookies.length;
            const featured = cookies[index];
    
            const container = document.getElementById('featuredProduct');
            if (!container) return;
    
            container.innerHTML = "";
    
            const card = document.createElement("section");
            card.classList.add("product-week-section");

            const heading = document.createElement("h1");
            heading.classList.add("product-heading");
            heading.textContent = "Our Sweet Star of the Week!";
    
            const image = document.createElement("img");
            image.src = featured.image;
            image.alt = featured.name;
            image.width = 300;
            image.height = 400;
            image.style.gridArea = "image";
            image.loading = "lazy";
    
            const invite = document.createElement("h2");
            invite.innerHTML = featured.featured_invite.replace(/\n/g, "<br>");
            invite.style.gridArea = "ft_invite";
    
            const extra = document.createElement("p");
            extra.textContent = featured.extra_description;
            extra.style.gridArea = "ex_description";
    
            const button = document.createElement("a");
            button.textContent = "Order Now";
            button.href = "order.html";
            button.classList.add("order-now-btn")
            button.style.gridArea = "button";
    
            card.append(image, invite, extra, button);
            container.appendChild(heading);
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

          const heading = document.createElement("h2");
          heading.classList.add("review-heading");
          heading.textContent = "Happy Bites, Happy Hearts!";

 
          const wrapper = document.createElement("div");
          wrapper.classList.add("review-wrapper");

          currentReviews.forEach(review => {
            const card = document.createElement("div");
            card.classList.add("review-card");
     
            const name = document.createElement("h3");
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
