let currentTime = new Date();

function formatDate(date) {
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

  let currentDate = date.getDate();
  let currentDay = days[date.getDay()];
  let currentYear = date.getFullYear();
  let currentMonth = months[date.getMonth()];
  let currentHours = date.getHours();
  let currentMinutes = date.getMinutes();

  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }

  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }

  let formattedDate = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear} | ${currentHours}:${currentMinutes}`;
  return formattedDate;
}

function currentCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#search-city");
  cityName.value = cityName.value.toLowerCase();
  cityName.value = cityName.value.trim();
  let cityNameCap = cityName.value[0].toUpperCase();
  let cityNameRest = cityName.value.slice(1);
  let cityFullName = cityNameCap + cityNameRest;
  let cityOutput = document.querySelector(".search-city-output");
  cityOutput.innerHTML = `${cityFullName}`;
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityFullName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let temperature = parseFloat(currentTemp.innerHTML);
  let fahrenheitTemp = Math.round(temperature * 1.8 + 32);
  currentTemp.innerHTML = `${fahrenheitTemp}°`;
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let temperature = parseFloat(currentTemp.innerHTML);
  let celsiusTemp = Math.round((temperature - 32) * 0.5556);
  currentTemp.innerHTML = `${celsiusTemp}°`;
}

function showWeather(response) {
  console.log(response);
  let name = response.data.name;
  let nameElement = document.querySelector(".search-city-output");
  nameElement.innerHTML = `${name}`;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = `${temperature}°`;
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = `${description}`;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;
  let maxTemp = Math.round(response.data.main.temp_max);
  let maxTempElement = document.querySelector("#current-high");
  maxTempElement.innerHTML = `H: ${maxTemp}° |`;
  let minTemp = Math.round(response.data.main.temp_min);
  let minTempElement = document.querySelector("#current-low");
  minTempElement.innerHTML = `L: ${minTemp}°`;
}

function getCurrentButton(event) {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
  let currentLat = position.coords.latitude;
  let currentLong = position.coords.longitude;
  let apiKey = "ac209dae1f283fb332a5bb7f50b0f468";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLat}&lon=${currentLong}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

//Calling date and time
let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = formatDate(currentTime);

//Replacing city name
let citySearch = document.querySelector("#city-name");
citySearch.addEventListener("submit", currentCity);

//Conversion Celsius-Fahrenheit
let celUnit = document.querySelector("#celsius-link");
celUnit.addEventListener("click", convertToCelsius);

let farUnit = document.querySelector("#fahrenheit-link");
farUnit.addEventListener("click", convertToFahrenheit);

//Current location
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentButton);
