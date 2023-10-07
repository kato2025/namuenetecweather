//Create background image array
const backgroundImages = [
    "./images/weather.jpg",
    "./images/weather1.jpg",
    "./images/weather2.jpg",
    "./images/weather3.jpg",
    "./images/weather4.jpg",
    "./images/weather5.jpg"
];
//Randomise background image
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
}
//Set random background image
function setRandomBackgroundImage() {
    const randomImage = getRandomImage();
    document.body.style.backgroundImage = `url(${randomImage})`;
}
document.getElementById("city-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const city = document.getElementById("city-input").value;
    // Show loading message
    document.getElementById("weather-info").innerHTML = "Loading Please Wait!";

    setRandomBackgroundImage();
    getWeather(city);
});
//Fetch weather data from API
function getWeather(city) {
    const apiKey = "565becf7fe3844b586e141407230110";
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    fetch(apiUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
        })
        .then(data => {
            const weatherInfo = `
                <h2>${data.location.name}, ${data.location.country}</h2>
                <p>🚦 Latitude: ${data.location.lat}°N</p>
                <p>🚥 Longitude: ${data.location.lon}°E</p>
                <p>🌡️ Temperature: ${data.current.temp_c}°C</p>
                <p>⛈️ Rainfall: ${data.current.precip_mm} mm</p>
                <p>💦 Humidity: ${data.current.humidity}%</p>
                <p>💨 Wind Speed: ${data.current.wind_kph} km/h</p>
                <p>🛰️ Condition: ${data.current.condition.text}</p>
            `;
            document.getElementById("weather-info").innerHTML = weatherInfo;
        })
        .catch(error => {
            console.error(error);
            document.getElementById("weather-info").innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
    });
}

