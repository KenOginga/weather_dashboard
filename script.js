
$("#search-button").on("click",function(event) {
    
    event.preventDefault();
    
    var cityName = $("#cityNameInput").val();
    var apiKey = "&appid=d23412729adafb949bbb5ff717b9363e";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
        $("#city-name").text(response.name + " " + moment().subtract(10, 'days').calendar());
        $("#temperature").text("Temperature: " + Math.floor(response.main.temp - 273.15) * 1.80 + 32) + "°F";
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#weatherIcon").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
    })
    
    function currentForecast(){
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + apiKey,
            method: "GET"
        }).then(function(focastResponse){
            $(".forecast").empty();
           var results = focastResponse.list;
           
           for (let i = 0; i < results.length; i++){
               if(results[i].dt_txt.indexOf("12:00:00") !== -1){
                    var forecastTemp = Math.floor((results[i].main.temp - 273.15) * 1.80 + 32);

                    var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                    var cardBody = $("<div>").addClass("card-body p-3");
                    var cityDate = $("<h4>").addClass("card-title").text(moment().subtract(10, 'days').calendar());
                    var temperature = $("<p>").addClass("card-text").text("Temperature: " + forecastTemp + " °F");
                    var humidity = $("<p>").addClass("card-text").text("Humidity: " + results[i].main.humidity + "%");
                    var image = $("<img>").attr("src", "https://openweathermap.org/img/w/" + results[i].weather[0].icon + ".png")

                    cardBody.append(cityDate, image, temperature, humidity);
                    card.append(cardBody);
                    $(".forecast").append(card);
               }
           }
        })
    } currentForecast();
   
})