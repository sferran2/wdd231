document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    toggleButton?.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
    });

    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    document.querySelector('.last-modified').textContent = `Last Access: ${formattedDate}`; 

    const menuButton = document.querySelector('#menu');
    const nav = document.querySelector('#animeteme');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('open'); 
        menuButton.classList.toggle('open'); 
    });

    //Discover Page Cards
    const url = 'data/places.json';
    const cardsContainer = document.querySelector("#interestCards");

    let allPlaces = [];

    async function fetchplacesData() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            allPlaces = data.places;

            if (cardsContainer) displayPlaces(allPlaces);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function displayPlaces(places) {
        cardsContainer.innerHTML = ""; 

        places.forEach(place => {
            let card = document.createElement("section");

            let name = document.createElement("h2");
            name.textContent = place.name;

            let figure = document.createElement("figure");
            let image = document.createElement("img");
            image.setAttribute("width", "300"); 
            image.setAttribute("height", "200")
            image.setAttribute("src", place.image);
            figure.appendChild(image);

            let description = document.createElement("p");
            description.textContent = place.description;

            let address = document.createElement("address");
            address.textContent = place.address;

            let button = document.createElement("button");
            button.textContent = "Learn More";

            card.append(name, figure, description, address, button);
            cardsContainer.appendChild(card);
        });
    }

    fetchplacesData();

    // Last Visit Logic
    const lastVisitDate = localStorage.getItem("lastVisit");
    const currentVisitDate = Date.now(); // Renamed to currentVisitDate

    if (!lastVisitDate) {
        // First visit
        displayVisitMessage("Welcome! Let us know if you have any questions.");
    } else {
        const timeDiff = currentVisitDate - parseInt(lastVisitDate);
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff < 1) {
            displayVisitMessage("Back so soon! Awesome!");
        } else {
            const dayOrDays = daysDiff === 1 ? "day" : "days";
            displayVisitMessage(`You last visited ${daysDiff} ${dayOrDays} ago.`);
        }
    }

    localStorage.setItem("lastVisit", currentVisitDate); // Renamed to currentVisitDate

    // Function to display the visit message (You can customize this)
    function displayVisitMessage(message) {
        const visitMessageContainer = document.createElement("div");
        visitMessageContainer.textContent = message;
        visitMessageContainer.style.backgroundColor = "#EFB366";
        visitMessageContainer.style.padding = "15px";
        visitMessageContainer.style.fontSize = "25px";
        visitMessageContainer.style.textAlign = "center";
        visitMessageContainer.style.marginTop = "20px";
        visitMessageContainer.style.marginLeft = "180px";
        visitMessageContainer.style.marginRight = "185px";
        visitMessageContainer.style.borderRadius = "5px";

        // Add the message to the top of the main container
        document.querySelector("main").prepend(visitMessageContainer);
    }
});




  