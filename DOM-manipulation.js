const toggleButton = document.querySelector(".unit-toggle > button");
const body = document.querySelector("body");

function unitToggle() {
    const unitElements = document.querySelectorAll(".units");
    unitElements.forEach(element => {
        element.classList.toggle("hidden");
        console.log(`${element  } is hidden`);
    });
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

// function updateCurrentWeather(current) {



// }


toggleButton.addEventListener('click', unitToggle);

export { unitToggle, swapBackground };