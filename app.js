function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let temp = document.querySelector("#temperature");
  let getCity = document.querySelector("#city");
  let getDescription = document.querySelector("#description");
  let getPressure = document.querySelector("#pressure");
  let getHumidity = document.querySelector("#humidity");
  let getWind = document.querySelector("#wind");
  let getDate = document.querySelector("#date");
  let getIcon = document.querySelector("#icon");

  celsiusTemp = response.data.main.temp;

  temp.innerHTML = Math.round(celsiusTemp);
  getCity.innerHTML = response.data.name;
  getDescription.innerHTML = response.data.weather[0].description;
  getPressure.innerHTML = response.data.main.pressure;
  getHumidity.innerHTML = response.data.main.humidity;
  getWind.innerHTML = Math.round(response.data.wind.speed);
  getDate.innerHTML = formatDate(response.data.dt * 1000);
  getIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getIcon.setAttribute("alt", response.data.weather[0].description);
}

function getCitySearch(city) {
  let apiKey = "0fefecfff7743ed79bf57c1c1fd8a871";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function searchLocation(event) {
  event.preventDefault();
  let getCityInput = document.querySelector("#enter-city");
  getCitySearch(getCityInput.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  getCelsius.classList.remove("active");
  getFahrenheit.classList.add("active");
  let showFahrenheitTemp = Math.round((celsiusTemp * 9) / 5 + 32);
  let getTemperature = document.querySelector("#temperature");
  getTemperature.innerHTML = showFahrenheitTemp;
}

function displayCelsius(event) {
  event.preventDefault();
  getCelsius.classList.add("active");
  getFahrenheit.classList.remove("active");
  let getTemperature = document.querySelector("#temperature");
  getTemperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#get-form");
form.addEventListener("submit", searchLocation);

let getFahrenheit = document.querySelector("#fa-units");
getFahrenheit.addEventListener("click", displayFahrenheit);

let getCelsius = document.querySelector("#ca-units");
getCelsius.addEventListener("click", displayCelsius);

getCitySearch("Lagos");
