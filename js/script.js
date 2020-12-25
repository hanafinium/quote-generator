document.getElementById('submit-button').disabled = true;
let qt = document.getElementById('quote');
let auth = document.getElementById('author');
let btn = document.getElementById('gn-btn');
let tempC = document.getElementById('temperatureC');
let tempF = document.getElementById('temperatureF');

//Geolocation and temperature data fetching and display
(function position() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(posSuccess, posFail)
    } else {
        console.log('geolocation not supported by browser')
    }

    function posSuccess(location) {
        //getting coordinates
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
            //AJAX request to fetch weather data
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${owAPIKEY}`)
            .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                throw new Error('something wrong happened');
            }
            })
            .then((jsonData) => {
            console.log('all ok');
            console.log(jsonData);
            //Temperature Display
            const celcius = Math.round(jsonData.main.temp);
            const fahrenheit = (celcius * 1.8 + 32);
            tempC.textContent = celcius + "C";
            tempF.textContent = Math.round(fahrenheit) + "F";
            //Weather condition display
            const weather = jsonData.weather[0].main;
            let icon = document.getElementById('weather-icon');
            switch(weather) {
                case 'Clear': icon.classList.add('fas','fa-sun');
                break;
                case 'Snow': icon.classList.add('far', 'fa-snowflake');
                break;
                case 'Rain': icon.classList.add('fas', 'fa-cloud-showers-heavy');
                break;
                case 'Storm': icon.classList.add('fas', 'fa-bolt');
                break;
                case 'Haze': icon.classList.add('fas', 'fa-smog');
                break;
                case 'Clouds': icon.classList.add('fas', 'fa-cloud');
                break;
                default: icon.classList.add('fas', 'fa-ban');
                 }
            })
            .catch((err) => {
            console.log('Error:', err.message)
            })
        }

    function posFail(err) {
        console.log(err.message);
    }
    //QOTD AJAX Request
    function getQuote() {
        fetch('https://quotes.rest/qod?language=en')
            .then((quote) => {
                if(quote.ok) {
                    return quote.json();
                } else {
                    console.log('error retrieving quote')
                }
            })
            .then((quoteJSON) => {
                qt.textContent = quoteJSON.contents.quotes[0].quote;
                auth.textContent = quoteJSON.contents.quotes[0].author;
            })
            .catch((error) => {
                console.log(error.message);
            })
    }
    getQuote();
})();


