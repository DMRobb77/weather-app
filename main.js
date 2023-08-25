const weatherKey = "3d357309cff44dd49f0215131232208";

const conditionIcon = document.getElementById("condition-icon");
const currentLocation = document.getElementById("current-location");

function getForecast(location){
    const currentRequest = `https://api.weatherapi.com/v1/forecast.json?key=${
     weatherKey  }&q=${  location  }&days=3`;
    fetch(currentRequest, {mode: 'cors'})
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        conditionIcon.src = processData(data).condition.icon;
        currentLocation.textContent = data.location.name;
    })
    .catch((err) => {
        console.log(err);
    });
}

function processData(data){
    const {current} = data;
    return current;
}

document.getElementById("location-form").addEventListener("submit", 
    (event) =>{
        event.preventDefault();

        const inputLocation = document.getElementById("location-input").value;
        getForecast(inputLocation);
    });


getForecast('london');