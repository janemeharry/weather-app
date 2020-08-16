function updateTime() {
  let time = document.querySelector("#time");
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes + "";
  }
  if (hours < 10) {
    hours = "0" + hours;
  } else {
    hours = hours + "";
  }
  time.innerHTML = `${hours}:${minutes}`;
}
function updateDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let formattedDate = document.querySelector(`#date`);
  let today = new Date();
  let day = days[today.getDay()];
  let date = today.getDate();
  let month = months[today.getMonth()];
  let year = today.getFullYear();
  formattedDate.innerHTML = `${day} ${date} ${month} ${year}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastELement = document.querySelector("#forecast");
  let forecast = response.data.list[0];
  forecastELement.innerHTML = `
  <div class="col-sm">
    <h3>${formatHours(forecast.dt * 1000)}</h3>
    <p><img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"/></p>
    <p><strong>${Math.round(forecast.main.temp_max)}°C</strong> | ${Math.round(
    forecast.main.temp_min
  )}°C</p>
    <p>${forecast.weather[0].main}</p>
  </div>
  `;
  forecast = response.data.list[1];
  forecastELement.innerHTML += `
  <div class="col-sm">
    <h3>${formatHours(forecast.dt * 1000)}</h3>
    <p><img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"/></p>
    <p><strong>${Math.round(forecast.main.temp_max)}°C</strong> | ${Math.round(
    forecast.main.temp_min
  )}°C</p>
    <p>${forecast.weather[0].main}</p>
  </div>
  `;
  forecast = response.data.list[2];
  forecastELement.innerHTML += `
  <div class="col-sm">
    <h3>${formatHours(forecast.dt * 1000)}</h3>
    <p><img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"/></p>
    <p><strong>${Math.round(forecast.main.temp_max)}°C</strong> | ${Math.round(
    forecast.main.temp_min
  )}°C</p>
    <p>${forecast.weather[0].main}</p>
  </div>
  `;

  forecast = response.data.list[3];
  forecastELement.innerHTML += `
  <div class="col-sm">
    <h3>${formatHours(forecast.dt * 1000)}</h3>
    <p><img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"/></p>
    <p><strong>${Math.round(forecast.main.temp_max)}°C</strong> | ${Math.round(
    forecast.main.temp_min
  )}°C</p>
    <p>${forecast.weather[0].main}</p>
  </div>
  `;
  forecast = response.data.list[4];
  forecastELement.innerHTML += `
  <div class="col-sm">
    <h3>${formatHours(forecast.dt * 1000)}</h3>
    <p><img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"/></p>
    <p><strong>${Math.round(forecast.main.temp_max)}°C</strong> | ${Math.round(
    forecast.main.temp_min
  )}°C</p>
    <p>${forecast.weather[0].main}</p>
  </div>
  `;
}

function search(city) {
  let apiKey = "cf895dab58ddca90926732862e56006d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let updatedCity = document.querySelector("#bold-city");
  if (updatedCity == null) {
    updatedCity.innerHTML = "London";
  } else {
    updatedCity.innerHTML = city.value;
  }
  search(city.value);
}

function changeFarenheit(event) {
  event.preventDefault();
  let weatherUnit = document.querySelector("#weather-unit");
  let currentTemp = document.querySelector("#current-temp");
  let farenheitTemp = Math.round(currentTemp.innerHTML * (9 / 5) + 32);
  currentTemp.innerHTML = farenheitTemp;
  weatherUnit.innerHTML = `°F`;
}

function changeCelsius(event) {
  event.preventDefault();
  let weatherUnit = document.querySelector("#weather-unit");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round((currentTemp.innerHTML - 32) * (5 / 9));
  weatherUnit.innerHTML = `°C`;
}

function updateTemperature(response) {
  let updatedTemperature = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  let forecast = document.querySelector("#forecast-description");
  let updatedForecast = response.data.weather[0].main;
  let updatedCity = document.querySelector("#bold-city");
  let apiCity = response.data.name;
  let icon = document.querySelector("#icon");
  updatedCity.innerHTML = `${apiCity}`;
  temperature.innerHTML = `${updatedTemperature}`;
  forecast.innerHTML = `${updatedForecast}`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function updateGeolocationCity(response) {
  let city = document.querySelector("#bold-city");
  let updatedGeolocationCity = response.data.name;
  let unit = "metric";
  let apiKey = "cf895dab58ddca90926732862e56006d";
  city.innerHTML = `${updatedGeolocationCity}`;
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city.innerHTML}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function showPosition(position) {
  let apiKey = "cf895dab58ddca90926732862e56006d";
  let unit = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateTemperature);
  axios.get(`${apiUrl}`).then(updateGeolocationCity);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", updateCity);

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", changeFarenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

updateTime();
updateDate();

let currentLocation = document.querySelector("#geolocation");
currentLocation.addEventListener("click", getLocation);

search("New York");
