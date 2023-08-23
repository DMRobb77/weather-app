const weatherKey = "3d357309cff44dd49f0215131232208";
let currentLocation = 'london';


function getCurrentWeather(){
    const currentRequest = `https://api.weatherapi.com/v1/current.json?key=${
     weatherKey  }&q=${currentLocation}`;
    fetch(currentRequest, {mode: 'cors'})
    .then((response) => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
}

function getForecast(){
    const currentRequest = `https://api.weatherapi.com/v1/forecast.json?key=${
     weatherKey  }&q=${  currentLocation  }&days=3`;
    fetch(currentRequest, {mode: 'cors'})
    .then((response) => response.json())
    .then(data => {
        console.log(data);
    })
    .catch((err) => {
        console.log(err);
    });
}

function changeLocale(newLocation){
    currentLocation = newLocation;
    getCurrentWeather();
}

function processData(data){
    const processed = {
        condition: data.condition,
        temp_c: data.temp_c,
        temp_f: data.temp_f,
    }
}

getCurrentWeather();
getForecast();