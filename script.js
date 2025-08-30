const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");

const apiKey = "f40d4a88e99fcc668cbcc4d04608cfd4";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;
    if (city) {
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    console.log(data);

    const {name: city, 
        main :{temp,humidity}, 
        weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const weatherDisplay = document.createElement("p");
    const WeatherEmoji = document.createElement("h1");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temperature: ${(temp).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    weatherDisplay.textContent = `Description: ${description}`;
    WeatherEmoji.textContent = getWeatherEmoji(id);

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    weatherDisplay.classList.add("weatherDisplay");
    WeatherEmoji.classList.add("WeatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(weatherDisplay);
    card.appendChild(WeatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌩️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "☔";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId > 800):
            return "☁️";
        default:
            return "🌍";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}