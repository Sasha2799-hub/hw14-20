const tempStr = document.querySelector(".temp");
const weatherStr = document.querySelector(".weather");
const btnShow = document.querySelector(".btn-show");
const input = document.querySelector(".input");
const nameCity = document.querySelector(".title-text");

function getWeather() {
  const currentValue = nameCity.textContent.trim();
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=ec4e6c16c54001f3da910e8e64164b4f&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data && data.weather && data.weather.length) {
        const iconWeather = data.weather[0].icon;
        const iconLink = `https://openweathermap.org/img/wn/${iconWeather}@2x.png`;
        document.querySelector("#icon").src = iconLink;

        tempStr.textContent = `Temperature: ${data.main.temp}°C`;
        weatherStr.textContent = `Weather: ${data.weather[0].main}`;
      }
    })
    .catch((error) => {
      alert("Its incorrect name of city");
    });
}

function showWeather() {
  const inputValue = input.value.trim();
  if (inputValue !== "" && inputValue !== null) {
    nameCity.textContent = inputValue;
    input.value.textContent = "";
    const btn = document.querySelector(".btn-renew");
    if (!btn) {
      const button = document.createElement("button");
      document.querySelector(".name-box").appendChild(button);
      button.classList.add("btn-renew", "btn");
      button.textContent = "Renew";
      button.addEventListener("click", getWeather);
    }
  }
  getWeather();
}

btnShow.addEventListener("click", showWeather);
