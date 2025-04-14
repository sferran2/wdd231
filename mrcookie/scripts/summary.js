document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cookieCart")) || {};
    const orderList = document.getElementById("order-list");
    const totalDisplay = document.getElementById("order-total");
    const cartCount = document.getElementById("cart-count");

    if (!orderList) {
        console.warn("No element with ID 'order-list' found — skipping cart rendering.");
        return;
    }

    let total = 0;
    let count = 0;

    const bigGroup = document.createElement("div");
    bigGroup.classList.add("cart-group", "big-group");

    const bigHeader = document.createElement("div");
    bigHeader.classList.add("cart-section-header");
    bigHeader.textContent = "BIG COOKIES";
    bigGroup.appendChild(bigHeader);

    let hasBig = false;

    const miniGroup = document.createElement("div");
    miniGroup.classList.add("cart-group", "mini-group");

    const miniHeader = document.createElement("div");
    miniHeader.classList.add("cart-section-header");
    miniHeader.textContent = "MINI COOKIES";
    miniGroup.appendChild(miniHeader);

    let hasMini = false;

    Object.values(cart).forEach(item => {
        const li = document.createElement("li");
        li.classList.add("cart-item");
        li.innerHTML = `
            <div class="cart-item-details"><strong>${item.name}</strong></div>
            <div class="cart-item-controls">
                <span>${item.quantity}</span>
                <span>$${(item.quantity * item.price).toFixed(2)}</span>
            </div>
        `;

        if (item.size === "Big") {
            bigGroup.appendChild(li);
            hasBig = true;
        } else if (item.size === "Mini") {
            miniGroup.appendChild(li);
            hasMini = true;
        }

        total += item.quantity * item.price;
        count += item.quantity;
    });

    if (!hasBig) {
        const emptyBig = document.createElement("div");
        emptyBig.classList.add("empty-box");
        emptyBig.textContent = "Big Sweeten your cart — pick your Big cookies!";
        bigGroup.appendChild(emptyBig);
    }

    if (!hasMini) {
        const emptyMini = document.createElement("div");
        emptyMini.classList.add("empty-box");
        emptyMini.textContent = "Craving something sweet? Add some Mini cookies now!";
        miniGroup.appendChild(emptyMini);
    }

    orderList.appendChild(bigGroup);
    orderList.appendChild(miniGroup);

    totalDisplay.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = count;

    const backBtn = document.querySelector(".back-btn");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            localStorage.setItem("restoreCart", "true");
        });
    }
    const form = document.querySelector("form.fpr1");

    if (form) {
        const fields = form.querySelectorAll("input, textarea");
      
        if (form) {
            const fields = form.querySelectorAll("input, textarea");
          
            fields.forEach(field => {
              field.addEventListener("input", () => {
                const data = {};
                fields.forEach(f => {
                  if (f.type === "radio") {
                    if (f.checked) data[f.name] = f.value;
                  } else {
                    data[f.name] = f.value;
                  }
                });
                localStorage.setItem("tempOrderForm", JSON.stringify(data));
              });
            });
        }
    }
    const confirmBtn = document.getElementById("confirm-btn");

    if (form && confirmBtn) {
        confirmBtn.addEventListener("click", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cookieCart")) || {};
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems === 0) {
            alert("Your box is empty! Please add some cookies before continuing.");
            return;
        }

        const orderFormData = {
            fname: form.querySelector('input[name="fname"]').value,
            lname: form.querySelector('input[name="lname"]').value,
            phone: form.querySelector('input[name="phone"]').value,
            email: form.querySelector('input[name="email"]').value,
            date: form.querySelector('input[name="date"]').value,
            time: form.querySelector('input[name="time"]').value,
            paytype: form.querySelector('input[name="paytype"]:checked').value,
            comments: form.querySelector('textarea[name="comments"]').value,
          };
          
          localStorage.setItem("orderFormData", JSON.stringify(orderFormData));

        window.location.href = "confirmation.html";
        });
    }
    const savedTempData = JSON.parse(localStorage.getItem("tempOrderForm"));
    if (form && savedTempData) {
        Object.entries(savedTempData).forEach(([name, value]) => {
        const field = form.querySelector(`[name="${name}"]`);
        if (field) {
            if (field.type === "radio") {
            const radioToCheck = form.querySelector(`input[name="${name}"][value="${value}"]`);
            if (radioToCheck) radioToCheck.checked = true;
            } else {
            field.value = value;
            }
        }
        });
    }
});
