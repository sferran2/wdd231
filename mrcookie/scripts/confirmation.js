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

document.addEventListener("DOMContentLoaded", () => {
  const formData = JSON.parse(localStorage.getItem("orderFormData")) || {};
  const cart = JSON.parse(localStorage.getItem("cookieCart")) || {};

  document.getElementById("full-name").textContent = `${formData.fname} ${formData.lname}`;
  document.getElementById("phone").textContent = formData.phone || "N/A";
  document.getElementById("email").textContent = formData.email;
  document.getElementById("pickup-date").textContent = formData.date;
  document.getElementById("pickup-time").textContent = formData.time;
  document.getElementById("payment-type").textContent = formData.paytype;

  if (formData.paytype && formData.paytype.toLowerCase() === "transfer") {
    const bankInfo = document.getElementById("bank-info");
    if (bankInfo) {
      bankInfo.style.display = "block";
    }
  }

  const commentsEl = document.getElementById("comments");
  if (commentsEl) {
    commentsEl.textContent = formData.comments?.trim() || "No additional comments provided.";
  }

  const summaryListBig = document.getElementById("summary-list-big");
  const summaryListMini = document.getElementById("summary-list-mini");
  let total = 0;

  if (summaryListBig && summaryListMini) {
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
        summaryListBig.appendChild(li);
      } else if (item.size === "Mini") {
        summaryListMini.appendChild(li);
      }

      total += item.quantity * item.price;
    });

    document.getElementById("summary-total").textContent = total.toFixed(2);
  }

  localStorage.removeItem("orderFormData");
  localStorage.removeItem("cookieCart");
});


