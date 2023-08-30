import { unitToggle, swapBackground } from "./DOM-manipulation.js";

unitToggle();

const weatherKey = "3d357309cff44dd49f0215131232208";

const conditionIcon = document.getElementById("condition-icon");
const currentLocation = document.getElementById("current-location");

function processData(data){
    const {current} = data;
    console.log(current);
    return current;
}

function getForecast(location){
    const currentRequest = `https://api.weatherapi.com/v1/forecast.json?key=${
     weatherKey  }&q=${  location  }&days=3`;
    fetch(currentRequest, {mode: 'cors'})
    .then((response) => response.json())
    .then(data => {
        conditionIcon.src = processData(data).condition.icon;

        swapBackground({condition:processData(data).condition.code,
             isDay: processData(data).is_day});

             
        currentLocation.textContent = data.location.name;
    })
    .catch((err) => {
        console.log(err);
    });
}

// Search bar submission
document.getElementById("location-form").addEventListener("submit", 
    (event) =>{
        event.preventDefault();

        const inputLocation = document.getElementById("location-input").value;
        getForecast(inputLocation);
    });


getForecast('london');