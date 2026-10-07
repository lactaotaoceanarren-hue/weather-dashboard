// --- Configuration ---
const apiKey = '1938b364c585187a47cf56149299a7bb'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// --- DOM Elements ---
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherIcon = document.getElementById('weather-icon');
const errorMsg = document.getElementById('error-msg');

// --- Fetch Weather Function ---
async function checkWeather(city) {
  errorMsg.style.display = 'none';

  if (!city) return;

  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (!response.ok) {
      throw new Error('City not found or API key activating. Please try again.');
    }

    const data = await response.json();

    document.getElementById('city-name').innerText = data.name;
    document.getElementById('temp').innerText = Math.round(data.main.temp) + '°C';
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('humidity').innerText = data.main.humidity + '%';
    document.getElementById('wind').innerText = data.wind.speed + ' km/h';

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  } catch (error) {
    errorMsg.innerText = error.message;
    errorMsg.style.display = 'block';
  }
}

// --- Event Listeners ---
searchBtn.addEventListener('click', () => {
  checkWeather(cityInput.value.trim());
});

cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    checkWeather(cityInput.value.trim());
  }
});