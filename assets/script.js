// e80f67133f09a88799707360e64bc4ef
$(document).ready(function () {
    var searchForm = $('#search-form');
    var searchHistoryContainer = $('#past-searches');
    var currentWeatherContainer = $('#current-weather');
    var fiveDayForecastContainer = $('#five-day-forecast');
    //var searchFormInput = $('#search-value');
    var apiKey = 'e80f67133f09a88799707360e64bc4ef';
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    var baseUrl2 = 'http://openweathermap.org/data/2.5/forecast?';
    var uvIndexBaseUrl = "https://api.openweathermap.org/data/2.5/onecall?"
    var iconBaseUrl = 'http://openweathermap.org/img/w/';
    var searchValueInput = $("#search-value");
    var searchHistory = [];

    // Form to search by city
    searchForm.submit(function (event) {
        event.preventDefault();
        console.log(event);
        //Use This is for form submitted
        var formValues = $(this).serializeArray();
        var city = formValues[0].value;
        //Creating Element for Jquery
        //var searchWordDiv = $('<button type="button" class=" btn past-search-word">');
        var searchTermDiv = $('<button type="button" btn btn-primary class="btn-past-search-word">');
            searchTermDiv.click(function(event) {
                event.preventDefault();
                var value = $(this).text();
                searchForCurrentCityWeather(value);
                searchForFiveDayForecastWeather(value);
                console.log(value);
      
    });
    searchHistory.push(city);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    searchTermDiv.text(city);
    searchHistoryContainer.append(searchTermDiv);
    console.log(formValues, city);
    //Form Value display
    searchForCurrentCityWeather(city);
    searchForFiveDayForecastWeather(city);
    searchValueInput.val("");
});
//Use Api to search with function. Moment for date
function searchForCurrentCityWeather(city) {
    currentWeatherContainer.html("");
    var fullUrl = baseUrl + "q=" + city + "&units=imperial" + "&appid" + apiKey;
    console.log(fullUrl);
    fetch(fullUrl).then(function (response) {
        return response.json();
    })
        //variables for current weather defined
        .then(function (data) {
            console.log(data);
            var cityName = data.name;
            var temp = data.main.temp;
            var wind = data.wind;
            var iconUrl = iconBaseUrl + weather[0].icon + '.png';
            var humidity = data.main.humidity;
            var weather = data.weather;
            console.log(data);
            //text to display for weather components
            var cityNameDiv = $("<div class='city-name'>");
            var tempDiv = $("<div class='temp-name'>");
            var windDiv = $("<div class='wind-name'>");
            var humidityDiv = $("<div class='humidity-name'>");
            var weatherDiv = $("<img class='icon-name' />");
            //Defining the divs info to display
            cityNameDIV.text(cityName);
            weatherImg.attr('src', iconUrl);
            tempDiv.text("Temperature: " + temp + " °F");
            windDiv.text("Wind Speed: " + wind.speed + "MPH")
            humidityDiv.text("Humidity: " + humidity + "%");

            //Combining values to create a more presentable container
            currentWeatherContainer.append(cityNameDiv);
            currentWeatherContainer.append(humidityDiv);
            currentWeatherContainer.append(tempDiv);
            currentWeatherContainer.append(windDiv);
            currentWeatherContainer.append(weatherDiv);
        });

};

// five day forecast for the searced city
function searchForFiveDayForecastWeather(city) {
    fiveDayForecastContainer.html("");
    // using api create a url for search
    currentWeatherContainer.html("");
    var forecastUrl = baseUrl2 + "q=" + city + "&units=imperial" + "&appid=" + apiKey;
    fetch(forecastUrl).then(function (responseFromOpenWeatherMapUnProcessed) {
        return responseFromOpenWeatherMapUnprocessed.json()
    }).then(function (data) {
        console.log("Five Day Forecast" , data);
        var coords = data.city.coord;
        console.log(coords);
        getUvIndex(coords.lat, coords.lon);
        // create loop
        for (var i = 0; i < data.list.length; i++) {
            //time based variable based on 3:00pm
            var isThreeOClock = data.list[i].dt_txt.search("15:00:00");
            var cityName = data.city.name;
            if (isThreeOClock > -1) {
                // variables for five day forecast
                var forecast = data.list[i];
                var weather = forecast.weather;
                var temp = forecast.main.temp;
                var humidity = forecast.main.humidity;
                var iconUrl = iconBaseUrl + weather[0].icon + ".png";
                var wind = forecast.wind;
                var day = moment(forecast.dt_txt).format("dddd, MMMM Do");
                console.log(forecast, temp, humidity, weather, wind, day);
                // create divs for necessary data
                var rowDiv = $('<div class="col-2">');
                var dayDiv = $('<div class="day-name">');
                var tempDiv = $('<div class="temp-name">');
                var humidityDiv = $('<div class="humidity-name">');
                var weatherDiv = $('<img class="icon-name">');
                var windDiv = $('<div class="wind-name">');
                weatherImg.attr("src", iconUrl);
                dayDiv.text(day);
                tempDiv.text("Temperature: " + temp + " °F");
                humidityDiv.text("Humidity: " + humidity + "%");
                windDiv.text("Wind Speed: " + wind.speed + " MPH");
                // Assign info for the divs
                rowDiv.append(weatherImg);
                rowDiv.append(windDiv);
                rowDiv.append(dayDiv);
                rowDiv.append(tempDiv);
                rowDiv.append(humidityDiv);
                fiveDayForeCastContainer.append(rowDiv);
            }
        }
    });
}
//UV index help from TA
function getUvIndex(lat, lon) {
    console.log(lat,lon);
    var finalUrl = uvIndexBaseUrl + "lat=" +  lat + "&lon=" + lon + "&exclude=hourly,daily&appid=" + apiKey;
    fetch(finalUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        var uvIndex = data.current.uvi;
        console.log(uvIndex, typeof uvIndex)
        var uvIndexDiv = $('<div class="uv-index-div">');
        var uvIndexSpan = $('<span class="uv-index-number">');
        if (uvIndex < 2) {
            uvIndexSpan.addClass("uv-index-number-low")
        } else if (uvIndex < 5) {
            uvIndexSpan.addClass("uv-index-number-med")
        } else {
            uvIndexSpan.addClass("uv-index-number-high")
        }
        uvIndexSpan.text(uvIndex);
        uvIndexDiv.text("UV Index: ");
        uvIndexDiv.append(uvIndexSpan);
        currentWeatherContainer.append(uvIndexDiv);
    });
}
//function searchForFiveDayForecastWeather(city) {
function retrieveSearchHistory() {
    if (localStorage.getItem('searchHistory')) {
        searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
        for (var i = 0; i < searchHistory.length; i++) {
            var searchWordDiv = $('<button type="button" class="btn btn-primary btn-past-search-word">');
            searchWordDiv.click(function (event) {
                event.preventDefault();
                var value = $(this).text();
                searchForCurrentCityWeather(value);
                searchForFiveDayForecastWeather(value);
            });
            searchWordDiv.text(searchHistory[i]);
            searchHistoryContainer.append(searchWordDiv);
        }
    }
}
retrieveSearchHistory();
});
