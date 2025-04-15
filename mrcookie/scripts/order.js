import {
    setupDarkModeToggle,
    updateFooterDate,
    setupHamburgerMenu,
    trackLastVisit
  } from './main.js';
  
  document.addEventListener("DOMContentLoaded", function () {
    setupDarkModeToggle();
    updateFooterDate();
    setupHamburgerMenu();
    trackLastVisit();
  });
  
document.addEventListener("DOMContentLoaded", function () {
    const url = 'data/cookies.json';
    const cardsContainer = document.querySelector("#cards");
    const tableContainer = document.getElementById("menu-table-container");
    const gridViewBtn = document.getElementById("grid-view");
    const listViewBtn = document.getElementById("list-view");

    let allCookies = [];
    let cart = {};
    if (localStorage.getItem("restoreCart") === "true") {
        cart = JSON.parse(localStorage.getItem("cookieCart")) || {};
        localStorage.removeItem("restoreCart"); 
    } else {
        cart = {};
    }

    async function fetchCookiesData() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            allCookies = data.cookies;

            if (cardsContainer) displayCookies(allCookies);
            if (tableContainer) renderTable(allCookies);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function updateCartDisplay() {
        const orderList = document.getElementById("order-list");
        const totalDisplay = document.getElementById("order-total");
        const cartCount = document.getElementById("cart-count");

        orderList.innerHTML = "";
        let total = 0;
        let count = 0;

        // BIG COOKIE GROUP
        let bigGroup = document.createElement("div");
        bigGroup.classList.add("cart-group", "big-group");

        let bigHeader = document.createElement("div");
        bigHeader.classList.add("cart-section-header");
        bigHeader.textContent = "BIG COOKIES";
        bigGroup.appendChild(bigHeader);

        let hasBig = false;
        Object.values(cart).forEach(item => {
            if (item.size === "Big") {
                hasBig = true;
                const li = document.createElement("li");
                li.classList.add("cart-item");

                li.innerHTML = `
                    <div class="cart-item-details"><strong>${item.name}</strong></div>
                    <div class="cart-item-controls">
                        <span>${item.quantity}</span>
                        <span>$${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                `;
                bigGroup.appendChild(li);
                total += item.quantity * item.price;
                count += item.quantity;
            }
        });

        if (!hasBig) {
            const emptyBig = document.createElement("div");
            emptyBig.classList.add("empty-box");
            emptyBig.textContent = "Big Sweeten your cart — pick your Big cookies!";
            bigGroup.appendChild(emptyBig);
        }

        orderList.appendChild(bigGroup);

        // MINI COOKIE GROUP
        let miniGroup = document.createElement("div");
        miniGroup.classList.add("cart-group", "mini-group");

        let miniHeader = document.createElement("div");
        miniHeader.classList.add("cart-section-header");
        miniHeader.textContent = "MINI COOKIES";
        miniGroup.appendChild(miniHeader);

        let hasMini = false;
        Object.values(cart).forEach(item => {
            if (item.size === "Mini") {
                hasMini = true;
                const li = document.createElement("li");
                li.classList.add("cart-item");

                li.innerHTML = `
                    <div class="cart-item-details"><strong>${item.name}</strong></div>
                    <div class="cart-item-controls">
                        <span>${item.quantity}</span>
                        <span>$${(item.quantity * item.price).toFixed(2)}</span>
                    </div>
                `;
                miniGroup.appendChild(li);
                total += item.quantity * item.price;
                count += item.quantity;
            }
        });

        if (!hasMini) {
            const emptyMini = document.createElement("div");
            emptyMini.classList.add("empty-box");
            emptyMini.textContent = "Craving something sweet? Add some Mini cookies now!";
            miniGroup.appendChild(emptyMini);
        }

        orderList.appendChild(miniGroup);

        totalDisplay.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = count;
        localStorage.setItem("cookieCart", JSON.stringify(cart));
    }

    function displayCookies(cookies) {
        cardsContainer.innerHTML = ""; 

        cookies.forEach(cookie => {
            let card = document.createElement("section");
            card.classList.add("cookie-card");

            let image = document.createElement("img");
            image.src = cookie.image;
            image.alt = `${cookie.name} image`;
            image.loading = "lazy";
            image.classList.add("cookie-img");

            let info = document.createElement("div");
            info.classList.add("cookie-info");

            let title = document.createElement("h3");
            title.textContent = cookie.name;

            let description = document.createElement("p");
            description.textContent = cookie.description;

            let priceWrapper = document.createElement("div");
            priceWrapper.classList.add("cookie-sizes");

            // Big Cookie Controls
            let bigWrapper = document.createElement("div");
            bigWrapper.classList.add("size-control");

            let bigLabel = document.createElement("p");
            bigLabel.textContent = `Big Cookie $${parseFloat(cookie.price_large).toFixed(2)}`;

            let bigControls = document.createElement("div");
            bigControls.classList.add("counter");

            let bigMinus = document.createElement("button");
            bigMinus.textContent = "–";
            let bigQty = document.createElement("span");
            const savedBig = cart[`${cookie.name}-big`];
            bigQty.textContent = savedBig ? savedBig.quantity : "0";        
            let bigPlus = document.createElement("button");
            bigPlus.textContent = "+";

            const bigKey = `${cookie.name}-big`;
            bigMinus.addEventListener("click", () => {
                let current = parseInt(bigQty.textContent);
                if (current > 0) {
                    bigQty.textContent = current - 1;
                    if (cart[bigKey]) {
                        cart[bigKey].quantity--;
                        if (cart[bigKey].quantity === 0) delete cart[bigKey];
                        updateCartDisplay();
                    }
                }
            });

            bigPlus.addEventListener("click", () => {
                let current = parseInt(bigQty.textContent);
                bigQty.textContent = current + 1;
                cart[bigKey] = cart[bigKey] || {
                    name: cookie.name,
                    size: "Big",
                    price: parseFloat(cookie.price_large),
                    quantity: 0
                };
                cart[bigKey].quantity++;
                updateCartDisplay();
            });

            bigControls.append(bigMinus, bigQty, bigPlus);
            bigWrapper.append(bigLabel, bigControls);

            // Mini Cookie Controls
            let miniWrapper = document.createElement("div");
            miniWrapper.classList.add("size-control");

            let miniLabel = document.createElement("p");
            miniLabel.textContent = `Mini Cookie $${parseFloat(cookie.price_mini).toFixed(2)}`;

            let miniControls = document.createElement("div");
            miniControls.classList.add("counter");

            let miniMinus = document.createElement("button");
            miniMinus.textContent = "–";
            let miniQty = document.createElement("span");
            const savedMini = cart[`${cookie.name}-mini`];
            miniQty.textContent = savedMini ? savedMini.quantity : "0";
            let miniPlus = document.createElement("button");
            miniPlus.textContent = "+";

            const miniKey = `${cookie.name}-mini`;
            miniMinus.addEventListener("click", () => {
                let current = parseInt(miniQty.textContent);
                if (current > 0) {
                    miniQty.textContent = current - 1;
                    if (cart[miniKey]) {
                        cart[miniKey].quantity--;
                        if (cart[miniKey].quantity === 0) delete cart[miniKey];
                        updateCartDisplay();
                    }
                }
            });

            miniPlus.addEventListener("click", () => {
                let current = parseInt(miniQty.textContent);
                miniQty.textContent = current + 1;
                cart[miniKey] = cart[miniKey] || {
                    name: cookie.name,
                    size: "Mini",
                    price: parseFloat(cookie.price_mini),
                    quantity: 0
                };
                cart[miniKey].quantity++;
                updateCartDisplay();
            });

            miniControls.append(miniMinus, miniQty, miniPlus);
            miniWrapper.append(miniLabel, miniControls);

            priceWrapper.append(bigWrapper, miniWrapper);
            info.append(title, description, priceWrapper);
            card.append(image, info);
            cardsContainer.appendChild(card);
        });
    }

    function renderTable(cookies) {

        const isMobileView = window.innerWidth >= 320 && window.innerWidth <= 640; 

        let table = document.createElement("table");
        table.setAttribute("border", "2");
        table.style.width = "100%";
        table.style.borderCollapse = "collapse";

        let thead = document.createElement("thead");

        if (isMobileView){
            thead.innerHTML = `
            <tr>
            <th>Name</th>
            <th>Price Big </th>
            <th>Qty</th>
            <th>Price Mini</th>
            <th>Qty</th>
            </tr>
        `;
        } else {
         thead.innerHTML = `
            <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price Big Cookie </th>
            <th>Qty</th>
            <th>Price Mini Cookie</th>
            <th>Qty</th>
          </tr>
        `;
        }
        table.appendChild(thead);

        let tbody = document.createElement("tbody");

        cookies.forEach((cookie, index) => {
            let row = document.createElement("tr");

            if (isMobileView){
                row.innerHTML = `
                    <td>${cookie.name}</td>
                    <td>${parseFloat(cookie.price_large).toFixed(2)}</td>
                    <td><input type="number" min="0" value="${cart[`${cookie.name}-big`]?.quantity || 0}" class="qty-input" data-name="${cookie.name}" data-size="large"></td>
                    <td>${parseFloat(cookie.price_mini).toFixed(2)}</td>
                    <td><input type="number" min="0" value="${cart[`${cookie.name}-big`]?.quantity || 0}" class="qty-input" data-name="${cookie.name}" data-size="mini"></td>
                `;
            } else {
                row.innerHTML = `
                <td>${cookie.name}</td>
                <td>${cookie.description}</td>
                <td>${parseFloat(cookie.price_large).toFixed(2)}</td>
                <td><input type="number" min="0" value="${cart[`${cookie.name}-big`]?.quantity || 0}" class="qty-input" data-name="${cookie.name}" data-size="large"></td>
                <td>${parseFloat(cookie.price_mini).toFixed(2)}</td>
                <td><input type="number" min="0" value="${cart[`${cookie.name}-big`]?.quantity || 0}" class="qty-input" data-name="${cookie.name}" data-size="mini"></td>
            `;
            }

            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        tableContainer.appendChild(table);

        const inputs = table.querySelectorAll('.qty-input');
        inputs.forEach(input => input.addEventListener('input', handleQuantityChangeFromTable));
    }

    function handleQuantityChangeFromTable(e) {
        const input = e.target;
        const name = input.dataset.name;
        const size = input.dataset.size === "large" ? "Big" : "Mini";
        const quantity = parseInt(input.value);

        const cookie = allCookies.find(c => c.name === name);
        if (!cookie) return;

        const key = `${name}-${size.toLowerCase()}`;
        const price = size === "Big" ? parseFloat(cookie.price_large) : parseFloat(cookie.price_mini);

        if (quantity > 0) {
            cart[key] = {
                name: name,
                size: size,
                quantity: quantity,
                price: price
            };
        } else {
            delete cart[key];
        }

        updateCartDisplay();
    }

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

    fetchCookiesData();
    updateCartDisplay();

    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function () {
            localStorage.setItem("cookieCart", JSON.stringify(cart));
        });
    }

    const continueBtn = document.querySelector(".checkout-btn");
    if (continueBtn) {
        continueBtn.addEventListener("click", () => {
            localStorage.setItem("cookieCart", JSON.stringify(cart));
        });
    }

});
