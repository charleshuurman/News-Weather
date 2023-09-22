document.getElementById('submit-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value;

    fetchWeather(city);
    fetchNews(city);
});

function fetchWeather(city) {
    const API_KEY = '6e254fd705b0f110c2707d328992bb3b'; // API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Weather API returned ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.textContent = `${data.weather[0].description}, Temp: ${data.main.temp}°C`;
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
        });
}

function fetchNews(city) {
    fetch(`https://gnews.io/api/v4/top-headlines?lang=en&q=${city}&token=d4e8b35cc38082c08825a53cfedbcdb3`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`News API returned ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.articles) {
                const newsInfo = document.getElementById('news-info');
                let newsHtml = '';

                data.articles.forEach(article => {
                    newsHtml += `<p><a href="${article.url}" target="_blank">${article.title}</a></p>`;
                });

                newsInfo.innerHTML = newsHtml;
            } else {
                console.error("Unexpected response structure from News API:", data);
            }
        })
        .catch(error => {
            console.error("Error fetching news:", error);
        });
}
