
// e80f67133f09a88799707360e64bc4ef
$(document).ready(function(){
    //created weather planning document
    // variables created for city conditions and city herstory
    var searchHerstoryContainer = $('#past-searches');
    var searchForm = $('#search-form');
    var currentWeatherContainer = $('#current-weather');
    var fiveDayForecastContainer = $('#five-day');
    var searchValueInput = $('#search-value');
    var apiKey = 'e80f67133f09a88799707360e64bc4ef';
    var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    var baseUrl2 = 'http://openweathermap.org/img/w/';
    var iconBaseUrl = 'http://openweathermap.org/img/w/';
    var searchHerstory = [];

// Form to search by city
    searchForm.submit(function( event ) {
        event.preventDefault();
        console.log(event);
    //Use This for form submitted
        var formValues = $(this).serializedArray();
        var city = formValues[0].value;
    //Creating Element for Jquery
        var searchWordDiv = $('<button type="button" class=" btn past-search-word">');
        searchWordDiv.click(function(event) {
            event.preventDefault();
            var value = event.target
            var value =$(this).text();
            console.log(value);
            
        });
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
                var windDiv = $("<div class='wind-name'>");
                var humidityDiv = $("<div class='humidity-name'>");
                var weatherImg = $("<img class='icon-name' />");
                
                dayDIV.text(day);
                weatherImg.attr('src', iconURL)
                
                // cityNameDiv.text(cityName);
                tempDiv.text("Temperature: " + temp);
                windDiv.text("Wind Speed: " + wind.speed + "MPH")
                humidityDiv.text("Humidity: " + humidity + "%");
            
                //Combining values to create a more presentable container
                rowDiv.append(humidityDiv);
                rowDiv.append(dayDiv);
                rowDiv.append(tempDiv);
                rowDiv.append(windDiv);
                rowDiv.append(weatherImg);
            }
        
        });
    
}
    //function searchForFiveDayForecastWeather(city) {
    function retrieveSearchHistory() {
        if (localStorage.getItem('searchHerstory')) {
            searchHerstory = JSON.parse(localStorage.getItem('searchHerstory'));
            for (var i = 0; i < searchHerstory.length; i++) {
                var searchWordDiv = $('<button type="button" class="btn-past-search-word">');
                searchWordDiv.click(function(event) {
                   event.preventDefault();
                   var value = $(this).text();
                   console.log(value); 
                });
                searchWordDiv.text(searchHerstory[i]);
                searchHerstoryContainer.append(searchTermDiv);
            }
        }
    }
    $('.past-search-word').click(function(event) {
        event.preventDefault();
        console.log9event.target);
    })

        retrieveSearchHertory();
}
