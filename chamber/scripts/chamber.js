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

            let email = document.createElement("p");
            email.innerHTML = `Email: <a href="mailto:${business.email}">${business.email}</a>`;

            card.append(logo, address, phoneNumber, email);
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


