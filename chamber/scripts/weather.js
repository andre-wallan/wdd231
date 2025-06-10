document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '4a304f6298ccb93ca85f7bf3a7af63a6';
    const city = 'Kampala,UG';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const currentWeatherEl = document.getElementById('current-weather');
    const forecastWeatherEl = document.getElementById('weather-forecast');

    // Fetch current weather
    fetch(weatherUrl)
        .then(response => {
            if (!response.ok) throw new Error('Weather data not found');
            return response.json();
        })
        .then(data => {
            if (!currentWeatherEl) return;

            const tempCelsius = Math.round(data.main.temp);
            const tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);
            const weatherDesc = capitalizeWords(data.weather.map(event => event.description).join(', '));

            currentWeatherEl.innerHTML = `
                <p>${tempCelsius}°C (${tempFahrenheit}°F)</p>
                <p>${weatherDesc}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            `;
        })
        .catch(error => {
            console.error(error);
            if (currentWeatherEl) currentWeatherEl.innerHTML = `<p>Unable to load weather data.</p>`;
        });

    // Fetch 3-day forecast
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) throw new Error('Forecast data not found');
            return response.json();
        })
        .then(data => {
            if (!forecastWeatherEl) return;

            let forecastHTML = '<p>3-Day Forecast:</p>';
            const dailyForecasts = {};

            // Filter data for the closest to noon (12:00 PM) each day
            data.list.forEach(entry => {
                const date = entry.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
                const time = entry.dt_txt.split(" ")[1]; // Extract time (HH:mm:ss)

                if (time.startsWith("12")) {
                    dailyForecasts[date] = entry.main.temp;
                }
            });

            // Get only the next 3 days
            Object.keys(dailyForecasts).slice(0, 3).forEach(date => {
                const tempCelsius = Math.round(dailyForecasts[date]);
                const tempFahrenheit = Math.round((tempCelsius * 9/5) + 32);

                forecastHTML += `<p>${date}: ${tempCelsius}°C (${tempFahrenheit}°F)</p>`;
            });

            forecastWeatherEl.innerHTML = forecastHTML;
        })
        .catch(error => {
            console.error(error);
            if (forecastWeatherEl) forecastWeatherEl.innerHTML = `<p>Unable to load forecast data.</p>`;
        });

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }

    // Update all elements with class "currentyear"
    document.querySelectorAll(".currentyear").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Update the "lastModified" span
    const lastModifiedEl = document.getElementById("lastModified");
    if (lastModifiedEl) {
        lastModifiedEl.textContent = document.lastModified;
    }

    // Hamburger menu logic
    const hamburgerButton = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener("click", () => {
            navMenu.classList.toggle("show");
        });
    }
});
