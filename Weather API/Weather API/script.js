const apiKey = "10177ff6596de1368b2e950c16b278bf";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".Weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === "404") {
            alert("City not found!");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main;
        if (weatherCondition === "Clouds") {
            weatherIcon.src = "Asserts/clouds.png";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "Asserts/clear.png";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "Asserts/rain.png";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "Asserts/drizzle.png";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "Asserts/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.error("Error fetching weather data: ", error);
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
