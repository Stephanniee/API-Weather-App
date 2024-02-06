const apiKey = "161bba6595c94d245ee0ed01b540c902";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

const weatherImg = document.querySelector(".weather-icon");
const tempName = document.querySelector(".temp");
const cityName = document.querySelector(".city");
const humidityName = document.querySelector(".humidity");
const windName = document.querySelector(".wind");
const inputElement = document.querySelector(".form-control");
const buttonElement = document.querySelector(".fa-search");


async function checkWeather(city) {

    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    console.log(data);
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
}

buttonElement.addEventListener('click', () => {
    checkWeather(inputElement.value);
})
