const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

let allProphets = [];

const displayProphets = (prophets) => {
    cards.innerHTML = "";

    prophets.forEach((prophet, index) => {
        let card = document.createElement("section");

        let fullName = document.createElement("h2");
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        
        let birthDate = document.createElement("p");
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        
        let birthPlace = document.createElement("p");
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        let portrait = document.createElement("img");
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname} – ${index + 1}th Latter-day President`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "250");


        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
};

async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        allProphets = data.prophets; 
        displayProphets(allProphets); 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


const filterByUtah = () => {
    const filtered = allProphets.filter(p => p.birthplace.includes("Utah"));
    displayProphets(filtered);
};

const filterByOutsideUS = () => {
    const usStates = [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
        "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const filtered = allProphets.filter(p => {
        let birthLocation = p.birthplace.split(", ").pop(); 
        return !usStates.includes(birthLocation);
    });

    displayProphets(filtered);
};

const filterBy95Plus = () => {
    const filtered = allProphets.filter(p => {
        let birthYear = parseInt(p.birthdate.split("-")[0]); 
        let deathYear = parseInt(p.death) || new Date().getFullYear(); 
        return (deathYear - birthYear) >= 95;
    });
    displayProphets(filtered);
};

const filterBy10Children = () => {
    const filtered = allProphets.filter(p => parseInt(p.numofchildren) >= 10);
    displayProphets(filtered);
};

const filterBy15Years = () => {
    const filtered = allProphets.filter(p => parseInt(p.length) >= 15);
    displayProphets(filtered);
};

const resetFilters = () => displayProphets(allProphets);

document.getElementById("filter-utah").addEventListener("click", filterByUtah);
document.getElementById("filter-outside-us").addEventListener("click", filterByOutsideUS);
document.getElementById("filter-95plus").addEventListener("click", filterBy95Plus);
document.getElementById("filter-10children").addEventListener("click", filterBy10Children);
document.getElementById("filter-15years").addEventListener("click", filterBy15Years);
document.getElementById("reset").addEventListener("click", resetFilters);


getProphetData();

