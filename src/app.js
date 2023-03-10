/////////////////////////////////////////////////////////////// Date and Time
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
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

////////////////////////////////////////////////////////////// Forecast grid

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
          <div class="day__wrapper">
          <div class="day">${formatDay(forecastDay.time)}</div>
          <img class="week__img" src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png" alt="">
          <div class="degrees">
              <span class="degrees__max"> ${Math.round(
                forecastDay.temperature.maximum
              )}°/</span>
              <span class="degrees__min">${Math.round(
                forecastDay.temperature.minimum
              )}°</span>
          </div>
          </div>
        `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

////////////////////////////////////////////////////////////////// Temperature display

function getForecast(city) {
  console.log(city);
  let apiKey = "d6403tbfa60o96cf1f1e80b04d30a39a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  const cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let conditionElement = document.querySelector("#condition");
  const iconElement = document.querySelector("#icon");
  const feelslikeElement = document.querySelector("#feels-like");
  const humidityElement = document.querySelector("#humidity");
  const windElement = document.querySelector("#wind");
  const dateElement = document.querySelector("#date");

  celsiusTemperature = response.data.temperature.current;

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  conditionElement.innerHTML = response.data.condition.description;
  condition = response.data.condition.description;
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);
  feelslikeElement.innerHTML = Math.round(response.data.temperature.feels_like);
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  getForecast(response.data.city);
}

let condition = "";

/////////////////////////////////////////////////////////////////////// Search city

function search(city) {
  const apiKey = "d6403tbfa60o96cf1f1e80b04d30a39a";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  const citysearchElement = document.querySelector("#city-search");
  search(citysearchElement.value);
}

search("Toulouse"); // This is the city the user will see when opening the weather app

const city = document.querySelector("#city");
const form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

////////////////////////////////////////////////////////////////////////// Celsius to Fahrenheit

const celsiusElement = document.querySelector("#temperature");
let celsiusTemperature = "";

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  const fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

const fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

///////////////////////////////////////////////////////////////////////// Fahrenheit to Celsius

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

const celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
