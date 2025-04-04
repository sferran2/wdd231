// GENERAL

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

    const lastVisitDate = localStorage.getItem("lastVisit");
    const currentVisitDate = Date.now();

    if (!lastVisitDate) {
        displayVisitMessage("Welcome!");
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

    // DIRECTORY

    const url = 'data/members.json';
    const cardsContainer = document.querySelector("#cards");
    const tableContainer = document.getElementById("business-table-container");

    let allBusinesses = [];

    async function fetchBusinessData() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            allBusinesses = data.businesses;

            if (cardsContainer) displayBusinesses(allBusinesses);
            if (tableContainer) renderTable(allBusinesses);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function displayBusinesses(businesses) {
        cardsContainer.innerHTML = ""; 

        businesses.forEach(business => {
            let card = document.createElement("section");

            let logo = document.createElement("img");
            logo.setAttribute("src", business.imageurl);
            logo.setAttribute("loading", "lazy");
            logo.setAttribute("alt", `${business.companyName} Logo`);

            logo.setAttribute("width", "200");
            logo.setAttribute("height", "200"); 

            let address = document.createElement("p");
            address.textContent = `Address: ${business.address}`;

            let phoneNumber = document.createElement("p");
            phoneNumber.textContent = `Phone: ${business.phoneNumber}`;

            let website = document.createElement("a");
            website.href = business.website;
            website.textContent = business.website;
            website.target = "blank";
            website.style.color = "black";
            website.style.font = "7px";
            website.style.fontWeight = "bold";

            let email = document.createElement("p");
            email.innerHTML = `Email: <a href="mailto:${business.email}">${business.email}</a>`;

            card.append(logo, address, phoneNumber, website, email);
            cardsContainer.appendChild(card);
        });
    }

    function renderTable(businesses) {
        let table = document.createElement("table");
        table.setAttribute("border", "1");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        let thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>Company Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
            </tr>
        `;
        table.appendChild(thead);

        let tbody = document.createElement("tbody");

        businesses.forEach(business => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${business.companyName}</td>
                <td>${business.address}</td>
                <td>${business.phoneNumber}</td>
                <td><a href="${business.website}" target="_blank">${business.website}</a></td>
            `;
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        tableContainer.appendChild(table);
    }

    fetchBusinessData();
});

document.addEventListener("DOMContentLoaded", function () {
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");
    const cardsContainer = document.getElementById("cards");
    const tableContainer = document.getElementById("business-table-container");

  
    tableContainer.style.display = "none";

    gridViewBtn.addEventListener("click", function () {
        tableContainer.style.display = "none";
        cardsContainer.style.display = "grid";
        cardsContainer.classList.add("grid");
        listViewBtn.classList.remove("active");
        gridViewBtn.classList.add("active");
    });

    listViewBtn.addEventListener("click", function () {
        tableContainer.style.display = "block";
        cardsContainer.style.display = "none";
        gridViewBtn.classList.remove("active");
        listViewBtn.classList.add("active");
    });
});

