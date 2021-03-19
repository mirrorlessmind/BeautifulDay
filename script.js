// e80f67133f09a88799707360e64bc4ef
$(document).ready(function(){
    //created weather planning document
    // variables created for city conditions and city herstory
    var searchHerstoryContainer = $('#past-searches');
    var searchForm = $('#search-form');
    var currentWeatherContainer = $('#current-weather');
    var fiveDayForecastContainer = $('#five-day');
    var apiKey = 'e80f67133f09a88799707360e64bc4ef';
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    var baseUrl2 = 'http://openweathermap.org/img/w/';
    var iconBaseUrl = 'http://openweathermap.org/img/w/';
    var searchHerstory = [];

// Form to search by city
    searchForm.submit(function( event ){
        event.preventDefault();
        console.log(event);
    //Use This for form submitted
        var formValues = $(this).serializedArray();
        var city = formValues[0].value;
    //Creating Element for Jquery
        var searchWordDiv = $('<div class="past-search-word">');
        searchHerstory.push(city);
        localStorage.setItem("searchHerstory", JSON.stringify(searchHerstory));
        searchWordDiv.text(city);
        searchHerstoryContainer.append(searchTermDiv);
        console.log(formValues, city);
    //Form Value display
    searchForCurrentCityWeather(city);
    searchForFiveDayForecastWeather(city);
});
//Use Api Key to search with function
    function searchForCurrentCityWeather(city) {
    var fullUrl = baseUrl + "q=" + city + "&appid" + apiKey;
    console.log(fullUrl);
    fetch(fullUrl).then(function(response){
        return response.json();
    })
    .then(function (data){
            console.log(data);
            var cityName = data.name;
            var temp = data.main.temp;
            var humidity = data.main.humidity;
            var weather = data.weather;
            var wind =data.wind;
            var cityNameDiv = $(",div class='city-name'>");
            var tempDiv = $("<div class='temp-name'>");
            var humidityDiv = $("<div class='humidity-name'>");
            var weatherDiv = $("<div class='icon-name'>");
            var windDiv = $("<div class='wind-name'>");
            cityNameDiv.text(cityName);
            tempDiv.text("Temperature: " + temp);
            humidityDiv.text("Humidity: " + humidity + "%");
            windDiv.text("Wind Speed: " + wind.speed + "MPH")
            currentWeatherContainer.append(cityNameDiv);
            currentWeatherContainer.append(tempDiv);
            currentWeatherContainer.append(humidityDiv);
            currentWeatherContainer.append(windDiv);
            
        });
        }
    function searchForFiveDayForecastWeather(city) {

    }

}

