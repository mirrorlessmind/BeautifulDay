// e80f67133f09a88799707360e64bc4ef
$(document).ready(function(){
    //created weather planning document
    // variables created for city conditions and city herstory
    var searchForm = $('#search-form');
    var searchHistoryContainer = $('#past-searches');
    var currentWeatherContainer = $('#current-weather');
    var fiveDayForecastContainer = $('#five-day');
    var searchValueInput = $('#search-value');
    var apiKey = 'e80f67133f09a88799707360e64bc4ef';
    var uvIndexBaseUrl ='https://api.openweathermap.org/data/2.5/onecall?';
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    var baseUrl2 = 'http://openweathermap.org/img/w/';
    var iconBaseUrl = 'http://openweathermap.org/img/w/';
    var searchHistory = [];

// Form to search by city
    searchForm.submit(function( event ) {
        event.preventDefault();
        console.log(event);
    //Use This for form submitted
        var formValues = $(this).serializedArray();
        var city = formValues[0].value;
    //Creating Element for Jquery
        var searchWordDiv = $('<button type="button" class="btn past-search-word">');
        searchWordDiv.click(function(event) {
            event.preventDefault();
            var value = event.target
            var value =$(this).text();
        //Form value Display
            searchForFiveDayForecastWeather(value);
            searchForCurrentCityWeather(value);
            console.log(value);
            
        });
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        searchWordDiv.text(city);
        searchHistoryContainer.append(searchWordDiv);
        console.log(formValues, city);
        //Form Value display
        searchForCurrentCityWeather(city);
        searchForFiveDayForecastWeather(city);
});
        //Use Api Key to search with function Use Moment for date
        function searchForCurrentCityWeather(city) {
        var fullUrl = baseUrl + "q=" + city + "&units=imperial" + "&appid" + apiKey;
        console.log(fullUrl);
        fetch(fullUrl).then(function (response){
            return response.json();
        })
        //variables for current weather defined
            .then(function (data){
                console.log(data);
                var cityName = data.name;
                var temp = data.main.temp;
                var wind =data.wind;
                var weather = data.weather;
                var humidity = data.main.humidity;
            //text to display for weather components
                var cityNameDiv = $("<div class='city-name'>");
                var tempDiv = $("<div class='temp-name'>");
                var windDiv = $("<div class='wind-name'>");
                var humidityDiv = $("<div class='humidity-name'>");
                var weatherImg = $("<img class='icon-name' />");
                //Defining the divs info to display
                cityNameDiv.text(name);
                weatherImg.attr('src', iconURL)
                tempDiv.text("Temperature: " + temp + " °F");
                windDiv.text("Wind Speed: " + wind.speed + "MPH")
                humidityDiv.text("Humidity: " + humidity + "%");
            
                //Combining values to create a more presentable container
                currentWeatherContainer.append(humidityDiv);
                currentWeatherContainer.append(cityNameDiv);
                currentWeatherContainer.append(tempDiv);
                currentWeatherContainer.append(windDiv);
                currentWeatherContainer.append(weatherImg);
            });
        
        };
    
      // five day forecast
      function searchForFiveDayForecastWeather(city) {
        fiveDayForecastContainer.html("");
        // using api create a url for search
        currentWeatherContainer.html("");
        var forecastUrl = baseUrl2 + "q=" + city + "&units=imperial" +  "&appid=" + apiKey;
        fetch(forecastUrl).then(function(responseFromOpenWeatherMapUnprocessed) {
           return responseFromOpenWeatherMapUnprocessed.json() 
        }).then(function(data) {
            console.log("Five Day Forecast" , data);
            var coordinate = data.city.coord;
            getUvIndex(coords.lat, coords.lon);
            // create loop
            for (var i=0; i < data.list.length; i++) {
                // only use weather at 3 pm
                var isThreeOClock = data.list[i].dt_txt.search("15:00:00");
                var cityName = data.city.name;
                if (isThreeOClock > -1) {
                    // variables for five day forecast
                    var forecast = data.list[i];
                    var temp = forecast.main.temp;
                    var humidity = forecast.main.humidity;
                    var weather = forecast.weather;
                    // create a url for the weather icon
                    var iconUrl = iconBaseUrl + weather[0].icon + ".png";
                    var wind = forecast.wind;
                    var day = moment(forecast.dt_txt).format("dddd, MMMM Do");
                    // create divs for necessary data
                    var rowDiv = $('<div class="col-2">' );
                    var dayDiv = $('<div class="day-name">');
                    var tempDiv = $('<div class="temp-name">');
                    var humidityDiv = $('<div class="humidity-name">');
                    var weatherDiv = $('<img class="icon-name">');
                    var windDiv = $('<div class="wind-name">');
                    weatherDiv.attr("src" , iconUrl);
                    dayDiv.text(day);
                    tempDiv.text("Temperature: " + temp + " °F");
                    humidityDiv.text("Humidity: " + humidity + "%");
                    windDiv.text("Wind Speed: " + wind.speed + " MPH");
                    // Assign info for the divs
                    rowDiv.append(weatherDiv);
                    rowDiv.append(dayDiv);
                    rowDiv.append(tempDiv);
                    rowDiv.append(humidityDiv);
                    rowDiv.append(windDiv);
                    fiveDayForecastContainer.append(rowDiv);
                }
            }
        });
    }

    //function searchForFiveDayForecastWeather(city) {
    function retrieveSearchHistory() {
        if (localStorage.getItem('searchHistory')) {
            searchHerstory = JSON.parse(localStorage.getItem('searchHistory'));
            for (var i = 0; i < searchHistory.length; i++) {
                var searchWordDiv = $('<button type="button" class="btn-past-search-word">');
                searchWordDiv.click(function(event) {
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
