const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const heroText = document.querySelector(".hero-text");

const city = "enugu";
const API_KEY = "b3095bc142aa1e255d675850ae638bfa";
const endPoint = `https://api.openweathermap.org/data/2.5/weather?q=`;

async function getWeather(city) {
  try {
    let response = await fetch(endPoint + city + `&appid=${API_KEY}`);
    if (response.status == 400 || response.status === 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".image-1").style.display = "block";
    } else {
      let data = await response.json();
      console.log(data);
      document.querySelector(".city").innerHTML =
        data.name + ", " + data.sys.country;

      document.querySelector(".weather-display").innerHTML =
        data.weather[0].description;

      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".pressure").innerHTML = data.main.pressure + "Pa";
      document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

      // Get today's date in "Mon Jan 08 2024" format
      let todayDate = new Date().toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      });

      document.querySelector(".desc").innerHTML = `${todayDate}`;
      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "image/clouds.svg";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "image/clear.svg";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "image/rain.svg";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "image/drizzle.svg";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "image/snow.svg";
      } else if (data.weather[0].main == "Thunderstorm") {
        weatherIcon.src = "image/thunderstorm.svg";
      }
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
      document.querySelector(".image-1").style.display = "none";
    }
  } catch (error) {
    document.querySelector(
      ".error"
    ).innerHTML = `<p>Error: Please enter a valide city Name</p>`;
  }
}

searchBtn.addEventListener("click", () => {
  const searchInput = document.querySelector(".search-input");
  const searchButton = document.querySelector(".search-button");
  const dynamicText = document.querySelector(".dynamic-text");

  let animationInterval;

  function updateCity() {
    let newCity = searchInput.value.trim();
    if (newCity) {
      clearInterval(animationInterval); // Stop previous animation
      animateCity(newCity);
    }
  }

  function animateCity(city) {
    dynamicText.innerText = ""; // Clear previous text
    let index = 0;

    animationInterval = setInterval(() => {
      if (index < city.length) {
        dynamicText.innerText = city.slice(0, index + 1);
        index++;
      } else {
        clearInterval(animationInterval); // Stop when full city name is displayed
      }
    }, 300); // Adjust speed as needed
  }

  updateCity();

  getWeather(searchBox.value);
});
