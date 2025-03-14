document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    // Check local storage for dark mode preference
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    // Toggle dark mode on button click
    toggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // Save user preference
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });
});

const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;
const currentDate = new Date();
const formattedDate = currentDate.toLocaleString();
document.querySelector('.last-modified').textContent = `Last Access: ${formattedDate}`;

const url = 'data/members.json';
const cards = document.querySelector('#cards');

let allBusinesses = [];

const displayBusinesses = (businesses) => {
    cards.innerHTML = ""; // Clear previous content

    businesses.forEach((business, index) => {
        let card = document.createElement("section");

        // Fix variable name
        let logo = document.createElement("img");
        logo.setAttribute("src", business.imageurl);
        logo.setAttribute("loading", "lazy");

        // Correct textContent assignments
        let address = document.createElement("p");
        address.textContent = `Address: ${business.address}`;

        let phoneNumber = document.createElement("p");
        phoneNumber.textContent = `Phone: ${business.phoneNumber}`;

        let email = document.createElement("p");
        email.textContent = `Email: ${business.email}`;

        // Append elements correctly
        card.appendChild(logo);
        card.appendChild(address);
        card.appendChild(phoneNumber);
        card.appendChild(email);
        cards.appendChild(card);
    });
};

async function getBusinessData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        allBusinesses = data.businesses; 
        displayBusinesses(allBusinesses);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getBusinessData();
