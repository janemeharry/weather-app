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

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let updatedCity = document.querySelector("#bold-city");
  if (updatedCity == null) {
    updatedCity.innerHTML = "London";
  } else {
    updatedCity.innerHTML = city.value;
  }
}

function changeFarenheit(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#farenheit");
  let celsius = document.querySelector("#celsius");
  let celsiusTemp = document.querySelector("#celsius-temp");
  let farenheitTemp = celsiusTemp.innerHTML * (9 / 5) + 32;
  celsiusTemp.innerHTML = farenheitTemp;
  farenheit.innerHTML = `°C`;
  celsius.innerHTML = `°F`;
}

function changeCelsius(event) {
  event.preventDefault();
  let farenheit = document.querySelector("#farenheit");
  let celsius = document.querySelector("#celsius");
  let celsiusTemp = document.querySelector("#celsius-temp");
  celsiusTemp.innerHTML = 30;
  farenheit.innerHTML = `°F`;
  celsius.innerHTML = `°C`;
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", updateCity);

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", changeFarenheit);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

updateTime();
updateDate();
