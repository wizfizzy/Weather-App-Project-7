function displayTemperature(response) {
  console.log(response.data);
  let temp = document.querySelector("#temperature");
  let getCity = document.querySelector("#city");
  let getDescription = document.querySelector("#description");
  let getPressure = document.querySelector("#pressure");
  let getHumidity = document.querySelector("#humidity");
  let getWind = document.querySelector("#wind");
  temp.innerHTML = Math.round(response.data.main.temp);
  getCity.innerHTML = response.data.name;
  getDescription.innerHTML = response.data.weather[0].description;
  getPressure.innerHTML = response.data.main.pressure;
  getHumidity.innerHTML = response.data.main.humidity;
  getWind.innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "0fefecfff7743ed79bf57c1c1fd8a871";
let city = "paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);


