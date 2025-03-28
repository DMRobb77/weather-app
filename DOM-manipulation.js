const toggleButton = document.querySelector(".unit-toggle > button");
const body = document.querySelector("body");

function unitToggle() {
    const unitElements = document.querySelectorAll(".units");
    unitElements.forEach(element => {
        element.classList.toggle("hidden");
    });
    const toggleIcons = document.querySelectorAll(".toggle-icon img");
    toggleIcons.forEach(element => {
        element.classList.toggle("hidden");
    });

    const selectedUnits = document.querySelectorAll(".unit-display");
    selectedUnits.forEach(element => {
        element.classList.toggle("unselected-units");
    })
}

function swapBackground({condition, isDay}) {
    const imageType = isDay ? 'day' : 'night';
    
    if (condition === 1000) {
        body.style.backgroundImage = `url(clear-${imageType}.jpg)`;
    } else if (condition === 1003) {
        body.style.backgroundImage = `url(partial-${imageType}.jpg)`; 
    } else if (condition >= 1003 && condition <= 1030) {
        body.style.backgroundImage = `url(cloudy-${imageType}.jpg)`; 
    } else if (condition > 1030) {
        body.style.backgroundImage = `url(rainy-${imageType}.jpg)`; 
    } else {
        console.log(`Weather conditions do not match any background image.`);
    }
}

function updateCurrentWeather({location, current}) {

    // Update location
    const locationName = document.querySelector(".current h2");
    locationName.textContent = `${location.name}`;

    const regionName  = document.querySelector(".current h4");
    regionName.textContent = `${location.country === "United States of America" 
        ? location.region : location.country}`;

    // Update time
    const timeText = document.querySelector(".spacetime .time");
    timeText.innerText = `Last updated: ${current.last_updated} local time`;
    
    // Update condition
    const conditionIcon = document.querySelector(".condition > img");
    const conditionText = document.querySelector(".condition > span");
    conditionIcon.src = current.condition.icon;
    conditionText.innerText = current.condition.text;

    // Update temperature
    const tempF = document.querySelector(".current .temp-f");
    const tempC = document.querySelector(".current .temp-c");
    tempF.innerText = `${Math.round(current.temp_f)}°F`;
    tempC.innerText = `${Math.round(current.temp_c)}°C`;

    // Update precip
    const precipIn = document.querySelector(".specifics .precip-in");
    const precipMM = document.querySelector(".specifics .precip-mm");
    precipIn.innerText = `${current.precip_in} in`;
    precipMM.innerText = `${current.precip_mm.toFixed(0)} cm`;

    // Update humidity
    const humidity = document.querySelector(".specifics .humidity span");
    humidity.innerText = `${current.humidity}%`;

    // Update wind
    const windDir = document.querySelector(".specifics .wind-dir");
    const windSpeedMPH = document.querySelector(".specifics .wind-speed-m");
    const windSpeedKPH = document.querySelector(".specifics .wind-speed-k");
    windDir.innerText = current.wind_dir;
    windSpeedMPH.innerText = `${current.wind_mph} mph`;
    windSpeedKPH.innerText = `${current.wind_kph} kph`;
}

function updateForecast({forecast, day}){
    const dayText = document.querySelector(`.day-${ day + 1 } .day`);
    const date = new Date(forecast.date);
    if (day === 0){
        dayText.innerText = "Today";
    } else if (day === 1) {
        dayText.innerText = "Tomorrow";
    } else {
        switch (date.getDay()){
            case 0:
                dayText.innerText = 'Sunday';
                break;
            case 1:
                dayText.innerText = 'Monday';
                break;
            case 2:
                dayText.innerText = 'Tuesday';
                break;
            case 3:
                dayText.innerText = 'Wednesday';
                break;
            case 4:
                dayText.innerText = 'Thursday';
                break;
            case 5:
                dayText.innerText = 'Friday';
                break;
            case 6:
                dayText.innerText = 'Saturday';
                break;
            default:
                dayText.innerText = '';
        }
    }

    // Update Condition
    const conditionIcon = document.querySelector(`.day-${ day + 1 } 
        .condition img`);
    conditionIcon.src = forecast.day.condition.icon;
    const conditionText = document.querySelector(`.day-${ day + 1 } 
        .condition span`);
    conditionText.innerText = forecast.day.condition.text;

    // Update High Temperature
    const highTempF = document.querySelector(`.day-${ day + 1 } div.temp.high 
        span.temp-f`);
    highTempF.innerText =` ${Math.round(forecast.day.maxtemp_f)}°F`;
    const highTempC = document.querySelector(`.day-${ day + 1 } div.temp.high 
        span.temp-c`);
    highTempC.innerText =` ${Math.round(forecast.day.maxtemp_c)}°C`;

    // Update Low Temperatre
    const lowTempF = document.querySelector(`.day-${ day + 1 } div.temp.low 
        span.temp-f`);
    lowTempF.innerText =` ${Math.round(forecast.day.mintemp_f)}°F`;
    const lowTempC = document.querySelector(`.day-${ day + 1 } div.temp.low 
        span.temp-c`);
    lowTempC.innerText =` ${Math.round(forecast.day.mintemp_c)}°C`;

    // Update chance of rain
    const precipChance = document.querySelector(`.day-${ day + 1 } div.precip 
    span.precip-chance`);
    precipChance.innerText = `${ forecast.day.daily_chance_of_snow || 
        forecast.day.daily_chance_of_rain }%`;
}

function loadingScreen() {
    const tempCon = document.querySelectorAll(".current > *," + 
        " .day-1 > *, " +
        ".day-2 > *, " +
        ".day-3 > *");
    tempCon.forEach(element => {
        element.classList.toggle("hidden");
    })
}

function displayPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

toggleButton.addEventListener('click', unitToggle);

export { unitToggle, 
    swapBackground, 
    updateCurrentWeather, 
    updateForecast,
    loadingScreen,
    displayPopup
};