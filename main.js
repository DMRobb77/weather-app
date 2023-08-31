import { 
        unitToggle,
        swapBackground,
        updateCurrentWeather,
        updateForecast 
    } from "./DOM-manipulation.js";

unitToggle();

const weatherKey = "3d357309cff44dd49f0215131232208";

function getCurrentData(data){
    const {current} = data;
    return current;
}

function getForecastData({data, day}){
    const forecastday = data.forecast.forecastday[day];
    console.log(`Here's the forceast ${data.forecast.forecastday[day]}`);
    return forecastday;
}

function getCurrentWeather(location){
    const currentRequest = `https://api.weatherapi.com/v1/forecast.json?key=${
     weatherKey  }&q=${  location  }`;
    fetch(currentRequest, {mode: 'cors'})
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        swapBackground({condition:getCurrentData(data).condition.code,
             isDay: getCurrentData(data).is_day});

        updateCurrentWeather({location: data.location, 
            current: getCurrentData(data)});
    })
    .catch((err) => {
        console.log(err);
    });
}

function getForecast(location){
    const currentRequest = `https://api.weatherapi.com/v1/forecast.json?key=${
     weatherKey  }&q=${  location  }&days=3`;
    fetch(currentRequest, {mode: 'cors'})
    .then((response) => response.json())
    .then(data => {
        for (let i = 0; i < 3; i += 1){
            updateForecast({forecast: getForecastData({data, day:i}),
             day: i})
        }
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
        getCurrentWeather(inputLocation);
        getForecast(inputLocation);
    });


getCurrentWeather('london');
getForecast('london');