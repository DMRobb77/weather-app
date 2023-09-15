import {
  unitToggle,
  swapBackground,
  updateCurrentWeather,
  updateForecast,
  loadingScreen,
  displayPopup
} from './DOM-manipulation.js';

unitToggle();

const weatherKey = '3d357309cff44dd49f0215131232208';

function getCurrentData(data) {
  const { current } = data;
  return current;
}

function getForecastData({ data, day }) {
  const forecastday = data.forecast.forecastday[day];
  return forecastday;
}

function getCurrentWeather(location) {

  loadingScreen();


  const currentRequest = `https://api.weatherapi.com/v1/forecast.json?key=${
    weatherKey}&q=${location}`;
  fetch(currentRequest, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {

      updateCurrentWeather({
        location: data.location,
        current: getCurrentData(data),
      });

      swapBackground({
        condition: getCurrentData(data).condition.code,
        isDay: getCurrentData(data).is_day,
      });

      loadingScreen();

    })
    .catch((err) => {
      loadingScreen();
      displayPopup();
      console.log(err);
    });
}

function getForecast(location) {
  const currentRequest = `https://api.weatherapi.com/v1/forecast.json?key=${
    weatherKey}&q=${location}&days=3`;
  fetch(currentRequest, { mode: 'cors' })
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 3; i += 1) {
        updateForecast({
          forecast: getForecastData({ data, day: i }),
          day: i,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// Search bar submission
document.querySelector('.location-form').addEventListener(
  'submit',
  (event) => {
    event.preventDefault();
    const inputLocation = document.querySelector('.location-search').value;
    getCurrentWeather(inputLocation);
    getForecast(inputLocation);
    document.querySelector('.location-search').value = '';
  },
);

getCurrentWeather('london');
getForecast('london');