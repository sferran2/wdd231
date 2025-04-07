document.addEventListener("DOMContentLoaded", () => {
    const heroImages = [
      "images/fam1.webp", "images/fam2.webp", "images/fam3.webp",
      "images/fam4.webp", "images/fam5.webp", "images/fam6.webp",
      "images/fam7.webp", "images/fam8.webp", "images/fam9.webp",
      "images/fam10.webp", "images/fam11.webp", "images/fam12.webp",
      "images/fam13.webp"
    ];
  
    let currentIndex = 0;
    const heroGrid = document.getElementById("heroFlipGrid");
  
    function createCard(imgSrc) {
      const card = document.createElement("div");
      card.classList.add("flip-card");
  
      const front = document.createElement("div");
      front.classList.add("flip-card-front");
      const frontImg = document.createElement("img");
      frontImg.src = imgSrc;
      front.appendChild(frontImg);
  
      const back = document.createElement("div");
      back.classList.add("flip-card-back");
      const backImg = document.createElement("img");
      backImg.src = imgSrc; // placeholder, updated on flip
      back.appendChild(backImg);
  
      card.appendChild(front);
      card.appendChild(back);
  
      return card;
    }
  
    function initializeGrid() {
      for (let i = 0; i < 5; i++) {
        const index = (currentIndex + i) % heroImages.length;
        const card = createCard(heroImages[index]);
        heroGrid.appendChild(card);
      }
      currentIndex = (currentIndex + 5) % heroImages.length;
    }
  
    function flipCards() {
      const cards = document.querySelectorAll(".flip-card");
  
      cards.forEach((card, i) => {
        setTimeout(() => {
          const newIndex = (currentIndex + i) % heroImages.length;
          const backImg = card.querySelector(".flip-card-back img");
          backImg.src = heroImages[newIndex];
  
          card.classList.add("flip");
  
          // After animation, swap back image to front
          setTimeout(() => {
            const frontImg = card.querySelector(".flip-card-front img");
            frontImg.src = heroImages[newIndex];
            card.classList.remove("flip");
          }, 800); // match the CSS flip duration
        }, i * 300); // staggered flip
      });
  
      currentIndex = (currentIndex + 5) % heroImages.length;
    }
  
    initializeGrid();
    setInterval(flipCards, 6000);
  });
  