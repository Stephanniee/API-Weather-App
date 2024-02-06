const apiKey = "161bba6595c94d245ee0ed01b540c902";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const weatherImg = document.querySelector(".weather-icon");
const tempName = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidityName = document.querySelector(".humidity strong");
const windName = document.querySelector(".wind strong");
const inputElement = document.querySelector(".form-control");
const buttonElement = document.querySelector(".fa-search");


async function checkWeather(city) {

    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
    
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        const windSpeedInKmh = (data.wind.speed * 3.6).toFixed(2); // Convert m/s to km/h and round to 2 decimal places
        cityName.textContent = data.name;
        tempName.textContent = Math.round(data.main.temp) + "°C";
        humidityName.textContent = data.main.humidity + "%";
        windName.textContent = `${windSpeedInKmh} km/h`; // Display wind speed with units


        if (data.weather[0].main === "Clouds") {
            weatherImg.src = "assets/images/cloud.png";
        } else if (data.weather[0].main === "Clear") {
            weatherImg.src = "assets/images/clear.png";
        } else if (data.weather[0].main === "Rain") {
            weatherImg.src = "assets/images/rain.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherImg.src = "assets/images/drizzle.png";
        } else if (data.weather[0].main === "Mist") {
            weatherImg.src = "assets/images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }

}

function isValidCityName(city) {
    const regex = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    return !regex.test(city);
}

function handleWeatherCheck() {
    const city = inputElement.value.trim(); // Trim leading and trailing whitespace
    if (!city) {
        alert("Please Enter A City Name.");
        return;
    }
    if (!isValidCityName(city)) {
        alert("City Name Should Not Contain Numbers Or Special Characters.");
        return;
    }
    checkWeather(city);
}
inputElement.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        handleWeatherCheck(); 
    }
});

buttonElement.addEventListener('click', () => {
    handleWeatherCheck();
});