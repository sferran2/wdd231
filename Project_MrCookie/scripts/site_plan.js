const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;
const currentDate = new Date();
const formattedDate = currentDate.toLocaleString();
document.querySelector('.last-modified').textContent = `Last Access: ${formattedDate}`;