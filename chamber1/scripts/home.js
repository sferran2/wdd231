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

    // Footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    document.querySelector('.last-modified').textContent = `Last Access: ${formattedDate}`;

    // Hamburguer button
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

    // bussiness cards
    const url = 'data/members.json';
    const cardsContainer = document.querySelector("#cards");
    let allBusinesses = [];

    async function fetchBusinessData() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            allBusinesses = data.businesses;
            displayRandomBusinesses(allBusinesses); 

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    function displayRandomBusinesses(businesses) {
        cardsContainer.innerHTML = ""; 

        const shuffledBusinesses = [...businesses].sort(() => 0.5 - Math.random());
        const randomFour = shuffledBusinesses.slice(0, 4); 

        randomFour.forEach(business => { 
            let card = document.createElement("section");

            let logo = document.createElement("img");
            logo.setAttribute("src", business.imageurl);
            logo.setAttribute("loading", "lazy");
            logo.setAttribute("alt", `${business.companyName} Logo`);

            logo.setAttribute("width", "200");
            logo.setAttribute("height", "200");

            let phoneNumber = document.createElement("p");
            phoneNumber.textContent = `Phone: ${business.phoneNumber}`;

            let address = document.createElement("p");
            address.textContent = `Address: ${business.address}`;

            let website = document.createElement("a");
            website.href = business.website;
            website.textContent = business.website;
            website.target = "blank";
            website.style.color = "black";
            website.style.font = "7px";

            let status = document.createElement("p");
            status.innerHTML = `Membership Status: "${business.status}"`;
            status.style.color = "#264653f";
            status.style.fontSize = "18px"; 
            status.style.fontWeight = "bold"; 

            card.append(logo, phoneNumber, address, website, status);
            cardsContainer.appendChild(card);
        });
    }

    fetchBusinessData();

    // event cards
    const url1 = "data/events.json";
    const cardsEventsContainer = document.querySelector("#cardsEventsContainer");
    let allEvents = [];

    async function fetchEventsData() {
        try {
            const response = await fetch(url1);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            allEvents = data.events;

            if (cardsEventsContainer) displayEvents(allEvents);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    function displayEvents(events) {
        cardsEventsContainer.innerHTML = "";

        events.forEach(event => {
            let cardEvents = document.createElement("section");
            cardEvents.classList.add("event-card");

            let dateContainer = document.createElement("div");
            dateContainer.classList.add("date-container");

            let month = document.createElement("div");
            month.classList.add("month");
            month.textContent = new Date(event.date).toLocaleString('default', { month: 'short' });

            let day = document.createElement("div");
            day.classList.add("day");
            day.textContent = new Date(event.date).getDate();

            let year = document.createElement("div");
            year.classList.add("year");
            year.textContent = new Date(event.date).getFullYear();

            dateContainer.append(month, day, year);

            let eventDetails = document.createElement("div");
            eventDetails.classList.add("event-details");

            let eventName = document.createElement("p");
            eventName.classList.add("event-name");
            eventName.textContent = `${event.eventName}`;

            let description = document.createElement("p");
            description.classList.add("event-description");
            description.textContent = `${event.description}`;

            let eventTime = document.createElement("p");
            eventTime.classList.add("event-time");

            let startTime = new Date(`2000-01-01T${event.startTime}`);
            let endTime = new Date(`2000-01-01T${event.endTime}`);

            let formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            let formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

            eventTime.textContent = `${new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })} ${formattedStartTime} - ${formattedEndTime} EDT`;

            eventDetails.append(eventName, description, eventTime);

            cardEvents.append(dateContainer, eventDetails);
            cardsEventsContainer.appendChild(cardEvents);
        });
    }

    fetchEventsData();

    // weather (Current and Forecast)
    const myDescription = document.querySelector('#description');
    const myTemperatureHigh = document.querySelector('#temperatureHigh');
    const myTemperatureLow = document.querySelector('#temperatureLow');
    const myHumidity = document.querySelector('#humidity');
    const mysunrise = document.querySelector('#sunrise');
    const mysunset = document.querySelector('#sunset');
    const myGraphic = document.querySelector('#graphic');
    const day1 = document.querySelector('#day1');
    const day2 = document.querySelector('#day2');
    const day3 = document.querySelector('#day3');

    const openWeatherKey = "c820b79ff4d675488ba8cc02a605f47f";
    const weatherApiKey = "34f72d582c6149c7977171819252003";
    const myLat = "7.116865805880203";
    const myLong = "-73.12519920828564";

    // OpenWeatherMap
    const openWeatherCurrentUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${openWeatherKey}&units=imperial`;

    // WeatherAPI.com Forecast
    const weatherApiForecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${myLat},${myLong}&days=3`;

    async function fetchWeatherData() {
        try {

            const currentWeatherResponse = await fetch(openWeatherCurrentUrl);
            if (!currentWeatherResponse.ok) {
                throw new Error(`OpenWeatherMap Current Weather API error: ${currentWeatherResponse.status}`);
            }
            const openWeatherData = await currentWeatherResponse.json();


            const forecastWeatherResponse = await fetch(weatherApiForecastUrl);
            if (!forecastWeatherResponse.ok) {
                throw new Error(`WeatherAPI.com Forecast API error: ${forecastWeatherResponse.status}`);
            }
            const weatherApiForecastData = await forecastWeatherResponse.json();

            console.log("OpenWeatherMap Current Weather Data:", openWeatherData);
            console.log("WeatherAPI.com Forecast Weather Data:", weatherApiForecastData);

            displayCurrentWeather(openWeatherData);
            displayForecastWeather(weatherApiForecastData);

        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    function displayCurrentWeather(data) {
        const allDescriptions = data.weather.map(event => {
            return event.description.charAt(0).toUpperCase() + event.description.slice(1);
        });
        myDescription.innerHTML = allDescriptions.join(", ");

        myTemperatureHigh.innerHTML = `High: ${Math.round(data.main.temp_max)}&deg;F`;
        myTemperatureLow.innerHTML = `Low: ${Math.round(data.main.temp_min)}&deg;F`;
        myHumidity.innerHTML = `Humidity: ${data.main.humidity}&#37`;
        mysunrise.innerHTML = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
        mysunset.innerHTML = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}`;
        const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        myGraphic.setAttribute('src', iconsrc);
        myGraphic.setAttribute('alt', data.weather[0].description);
    }

    function displayForecastWeather(data) {
        const forecastDays = data.forecast.forecastday;

        if (forecastDays && forecastDays.length >= 3) {

            day1.innerHTML = `Today: ${Math.round(forecastDays[0].day.maxtemp_f)}&deg;F`;

            const day2Date = new Date(forecastDays[1].date);
            const day2Name = day2Date.toLocaleDateString('en-US', { weekday: 'long' });
            day2.innerHTML = `${day2Name}: ${Math.round(forecastDays[1].day.maxtemp_f)}&deg;F`;

            const day3Date = new Date(forecastDays[2].date);
            const day3Name = day3Date.toLocaleDateString('en-US', { weekday: 'long' });
            day3.innerHTML = `${day3Name}: ${Math.round(forecastDays[2].day.maxtemp_f)}&deg;F`;
        } else {
            console.error("Forecast data is incomplete or missing.");
        }
    }

    fetchWeatherData();
});

