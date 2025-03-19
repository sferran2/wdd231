
const myTown = document.querySelector('#town');
const myDescription = document.querySelector('#description');
const myTemperature = document.querySelector('#temperature');
const myGraphic = document.querySelector('#graphic');

const myKey = "caa7872f9273eefa105cb3fe6e6f02c7"
const myLat = "49.75059458692544" 
const myLong = "6.637667766470931"

const myUrl = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`


async function apiFetch() {
    try{
        const response = await fetch(myUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
          }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    myTown.innerHTML = data.name
    myDescription.innerHTML = data.weather[0].description
    myTemperature.innerHTML = `${data.main.temp}&deg;F`
    const iconsrc =`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    myGraphic.setAttribute('src', iconsrc)
    myGraphic.setAttribute('alt',data.weather[0].description )
}

apiFetch();