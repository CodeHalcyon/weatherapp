const apiKey = '6ba19b4008d63fe1a05146f7f7c7a724';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const unsplashApiKey = '7DepzrS81PUGF5juqjT1G9TD7tlNmZwKFWujfMuM0kI';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherBackground = document.getElementById('weatherBackground'); 
searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
        fetchCityImage(location);
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function fetchCityImage(city) {
    const url = `${unsplashApiUrl}?query=${city}&orientation=landscape&client_id=${unsplashApiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.urls.regular;
            weatherBackground.style.backgroundImage = `url(${imageUrl})`; 
        })
        .catch(error => {
            console.error('Error fetching city image:', error);
        });
}
