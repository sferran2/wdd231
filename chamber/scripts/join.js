document.addEventListener("DOMContentLoaded", function () {
    // Dark mode
    const toggleButton = document.getElementById("dark-mode-toggle");
    const body = document.body;

    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
    }

    toggleButton?.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", body.classList.contains("dark-mode") ? "enabled" : "disabled");
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

    // Footer
    const currentYear = new Date().getFullYear();
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = currentYear;

    const formattedDate = new Date().toLocaleString();
    const lastModified = document.querySelector('.last-modified');
    if (lastModified) lastModified.textContent = `Last Access: ${formattedDate}`;

    // Hamburger menu
    const menuButton = document.querySelector('#menu');
    const nav = document.querySelector('#animeteme');
    if (menuButton && nav) {
        menuButton.addEventListener('click', () => {
            nav.classList.toggle('open');
            menuButton.classList.toggle('open');
        });
    }

    // Set timestamp if field exists
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        const now = new Date().toISOString();
        timestampField.value = now;
    }

    // Modal dialog for membership benefits
    const dialog = document.getElementById('dialogBox2');
    const content = document.getElementById('dialog-content');
    const closeBtn = document.getElementById('closeButton1');

    const benefits = {
        np: `<h3>Non Profit Membership</h3>
            <ul>
                <li>Free directory listing on the Chamber website</li>
                <li>Access to monthly networking mixers</li>
                <li>Participation in community events</li>
                <li>Quarterly nonprofit spotlight feature</li>
                <li>Free training on nonprofit fundraising tools</li>
            </ul>`,
        bronze: `<h3>Bronze Membership</h3>
            <ul>
                <li>All Non-Profit benefits</li>
                <li>Priority placement in the directory</li>
                <li>Access to member-only events</li>
                <li>One social media promotion per quarter</li>
                <li>Business listed in welcome email to new members</li>
            </ul>`,
        silver: `<h3>Silver Membership</h3>
            <ul>
                <li>All Bronze benefits</li>
                <li>2 spotlight features per year on the Chamber homepage</li>
                <li>Discounted vendor booths at local events</li>
                <li>Free attendance to one training workshop per quarter</li>
                <li>Opportunity to co-host Chamber events</li>
            </ul>`,
        gold: `<h3>Gold Membership</h3>
            <ul>
                <li>All Silver benefits</li>
                <li>Dedicated business profile page with backlinks</li>
                <li>Premium placement on homepage and directory</li>
                <li>Unlimited social media spotlights</li>
                <li>Free banner ad placement on Chamber site for 1 month</li>
                <li>Invitation to exclusive leadership luncheons</li>
                <li>Priority sponsorship opportunities</li>
            </ul>`
    };

    if (dialog && content) {
        document.querySelectorAll('[data-membership]').forEach(button => {
            button.addEventListener('click', () => {
                const level = button.getAttribute('data-membership');
                content.innerHTML = benefits[level];
                dialog.showModal();
            });
        });

        closeBtn?.addEventListener('click', () => dialog.close());
    }

    // Display form results only on thankyou.html
    if (window.location.pathname.includes("thankyou.html")) {
        const myInfo = new URLSearchParams(window.location.search);
        const results = document.querySelector('#results');
        if (results) {
            results.innerHTML = `
            <h3>Welcome, ${myInfo.get('first') || ''} ${myInfo.get('last') || ''}!</h3>
            <p><strong>Title:</strong> ${myInfo.get('title') || 'Not provided'}</p>
            <p><strong>Organization:</strong> ${myInfo.get('organization') || 'Not provided'}</p>
            <p><strong>Email:</strong> ${myInfo.get('email') || 'Not provided'}</p>
            <p><strong>Phone:</strong> ${myInfo.get('phone') || 'Not provided'}</p>
            <p><strong>Membership Level:</strong> ${myInfo.get('membership') || 'Not provided'}</p>
            <p><strong>Description:</strong> ${myInfo.get('description') || 'Not provided'}</p>
            <p><em>Form submitted on: ${myInfo.get('timestamp') || 'Unknown'}</em></p>
            `;
        }
    }
});
