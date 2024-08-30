document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#city_name').value;

    if (!cityName) {
        return showAlert('você precisa digitar uma cidade...')
    }

    const apiKey = `26098fd220f64c486e03276e82cfbc28`
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(cityName)}&appid=${apiKey}&units=metric&lang=pt_br`

    const results = await fetch(apiUrl);
    const json = await results.json();

    console.log(json);

    if (json.cod === 200) {
        showInfo({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            timeIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,

        });
    } else {
        showAlert('Não foi possível localizar...')
    }

});

function showInfo(json) {
    showAlert('');

    document.querySelector("#title").innerHTML = `${json.city}, ${json.country}`;
    document.querySelector("#temp_value").innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>cº</sup>`;
    document.querySelector("#temp_description").innerHTML = `${json.description}`;
    document.querySelector('#temp_img').setAttribute('src', `https://openweathermap.org/img/wn/${json.timeIcon}@2x.png`);
    document.querySelector("#temp_max").innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')}`;
    document.querySelector("#temp_min").innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')}`;
    document.querySelector("#humidity").innerHTML = `${json.humidity.toFixed(1).toString().replace('.', ',')}`;
    document.querySelector("#wind_speed").innerHTML = `${json.windSpeed.toFixed(1).toString().replace('.', ',')}`;
    

}

function showAlert(msg) {
    document.querySelector('#alert').innerHTML = msg;
}