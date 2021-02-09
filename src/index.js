function formatDate(timeStamp) {
    let date = new Date(timeStamp);
    let dayIndex = date.getDay();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[dayIndex];
    return `${day}, ${formatHours(timeStamp)}`;
}

function showRequestedWeather(response) {
    console.log(response)
    document.querySelector("#requested-city").innerHTML = response.data.name;
    document.querySelector("#description").innerHTML = (response.data.weather[0].description);
    console.log(response.data.weather[0].description);
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
    document.querySelector("#week-day-time").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#icon").setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#icon").setAttribute(
        "alt",
        response.data.weather[0].description);
    //document.container.style.backgroundImage = "url(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)";

}

function formatHours(timeStamp) {
    let date = new Date(timeStamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
}

function showWeatherForecast(response) {
    console.log(response.data);
    let forecastElement = document.querySelector("#weatherForecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];

        forecastElement.innerHTML += `<div class="col forecast">
     <h3>
      ${formatHours(forecast.dt * 1000)}
      </h3>
      <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
      <div class="weather">
         <strong>${Math.round(forecast.main.temp_max)}</strong>/${Math.round(forecast.main.temp_min)} °C
      </div>
    </div>`;
    }

}

function searchCity(city) {
    let apiKey = "fbcbe926ebc1d92fde0556fd83c4255e";
    let unit = "metric";
    let apiUrl = `
    https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(`${apiUrl}`).then(showRequestedWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeatherForecast);

}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#entered-city").value;
    searchCity(city);
}

let cityForm = document.querySelector("#user-interaction");
cityForm.addEventListener("submit", handleSubmit);

function searchPosition(position) {
    let apiKey = "fbcbe926ebc1d92fde0556fd83c4255e";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let unit = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

    axios.get(apiUrl).then(showRequestedWeather);

}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchPosition);
}

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperature = document.querySelector("#temperature");
    let celsius = temperature.innerHTML;
    let fahrenheit = Math.round((celsius * 9) / 5 + 32);
    document.querySelector("#temperature").innerHTML = ` ${fahrenheit} `;
}

let fahrenheitTemperature = document.querySelector("#fahrenheit");
fahrenheitTemperature.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
    event.preventDefault();
    let farenheit = temperature.innerHTML;
    let celsius = Math.round(((farenheit) - 32) * (5 / 9));
    document.querySelector("#temperature").innerHTML = ` ${celsius} `;
}

searchCity("Varberg");

let celsiusTemperature = document.querySelector("#celsius");
celsiusTemperature.addEventListener("click", convertToCelsius);

let requestLocalWeather = document.querySelector("#localButton");
requestLocalWeather.addEventListener("click", getCurrentLocation);