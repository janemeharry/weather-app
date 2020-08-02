function updateTime() {
  let time = document.querySelector("#time");
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  } else {
    minutes = minutes + "";
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
  formattedDate.innerHTML = `${day} ${date}th ${month} ${year}`;
}
function search(city) {
  let apiKey = "cf895dab58ddca90926732862e56006d";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(updateTemperature);
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
  updatedCity.innerHTML = `${apiCity}`;
  temperature.innerHTML = `${updatedTemperature}`;
  forecast.innerHTML = `${updatedForecast}`;
}

function updateGeolocationCity(response) {
  let city = document.querySelector("#bold-city");
  let updatedGeolocationCity = response.data.name;
  city.innerHTML = `${updatedGeolocationCity}`;
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
