import {temples} from '../data/temples.js'
//console.log(temples)

import {url} from '../data/temples.js'
//console.log(url)

const showHere = document.querySelector('#showHere')
const mydialog = document.querySelector('#mydialog')
const mytitle = document.querySelector('#mydialog h2')
const myinfo = document.querySelector('#mydialog p')
const myclose = document.querySelector('#mydialog button')

myclose.addEventListener("click",() => {
    mydialog.close()
});

function displayItems(data){
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img')
        photo.src = `${url}${x.path}`
        photo.alt = x.name
      photo.addEventListener('click',() => showStuff(x));  
        showHere.appendChild(photo)
    });
}
displayItems (temples)

function showStuff(x) {
    mytitle.innerHTML = x.name
    myinfo.innerHTML = `Dedicated: ${x.dedicated} by ${x.person}. <br> Number: ${x.number}.`;

    const xPos = event.clientX;
    const yPos = event.clientY;

    mydialog.style.left = `${xPos}px`;
    mydialog.style.top = `${yPos}px`;
    
    mydialog.showModal()  
}
