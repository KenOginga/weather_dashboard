
// function that listens to clicks on the search button.
$("#search-button").on("click",function(event) {
    
        event.preventDefault();
    
    
    var cityName = $("#cityNameInput").val();
    var apiKey = "&appid=d23412729adafb949bbb5ff717b9363e";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;

    // current weather API request.
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){

        // populating the weather parameters into the html for dislay by the web page.
        $("#city-name").text(response.name + " " + moment().subtract(10, 'days').calendar());
        $("#temperature").text("Temperature: " + Math.floor(response.main.temp - 273.15) * 1.80 + 32) + "°F";
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#weatherIcon").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    })
    
    function currentForecast(){
  
        // Five day forecast API request.

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey,
            method: "GET"
        }).then(function(forecastResponse){
            $(".forecast").empty();

        // functions that retrieves the weather data for the next 24 hours after the API request for the next five days.
           for ( var i = 4; i < forecastResponse.list.length; i += 8){

                // creating variables and html elements to populate the forecast data.
                var results = forecastResponse.list;
                var forecastTemp = Math.floor((results[i].main.temp - 273.15) * 1.80 + 32);
                var date = results[i].dt_txt.split(" ")[0];

                var card = $("<div>").addClass("card col-md-3 m-0 bg-primary text-white");
                var cardBody = $("<div>").addClass("card-body p-3");
                var cityDate = $("<h4>").addClass("card-title").text(date);
                var temperature = $("<p>").addClass("card-text").text("Temperature: " + forecastTemp + " °F");
                var humidity = $("<p>").addClass("card-text").text("Humidity: " + results[i].main.humidity + "%");
                var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                    
                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $(".forecast").append(card);
           };
        })
    } currentForecast();
   
})