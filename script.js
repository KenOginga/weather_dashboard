var $city = document.getElementById("city-name");
var $temp = document.getElementById("temperature");
var $humidity = document.getElementById("humidity");
var $wind = document.getElementById("windSpeed");
var $uvIndex = document.getElementById("uvIndex");
var weatherIcon = document.getElementById("weatherIcon")

var $history = document.getElementById("history");
var userInput = document.getElementById("cityNameInput");
var searchBtn = document.getElementById("search-button");
var clearBtn = document.getElementById("clear-history");

var searchHistory = JSON.parse(localStorage.getItem("search")) || [];


// function requests data object from the domain using api indicated below.
let cityName = "";

function clickSearch () {
  
    searchBtn.addEventListener("click",function() {
        
        cityName = userInput.value
        console.log(cityName)
        // displayWeather();

        // searchHistory.push(searchName);
        // localStorage.setItem("search",JSON.stringify(searchHistory));

        // renderHistory();
    })
}

function displayWeather(){

    var apiKey = "d23412729adafb949bbb5ff717b9363e";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response){
        console.log(response)
        // to display name of the city and date. Used moment.js to display the current date.
       $city.innerHTML = (response.data.name + (mmoment().format('MMMM Do YYYY')));
        weatherIcon.innerHTML = response.data.weather[0].icon;
        // asigning the weather parameters their html
        $temp.innerHTML = "Temperature: " + (response.data.main.temp - 273.15) * 1.80 + 32;
        $humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        $wind.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

        var lat = response.data.coord.lat;
        var lon = response.data.coord.lon;
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
        
        $.ajax({
            url: uvQueryURL,
            method: "GET"
          }).then(function(uvResponse){
        
            var uv = document.createElement("span");
            uv.setAttribute("class","badge badge-danger");
            uv.innerHTML = uvResponse.data[0].value;
            $uvIndex.innerHTML = "UV Index: ";
            $uvIndex.append(uv);
        });
    })
    
   

    clearBtn.addEventListener("click",function() {
        searchHistory = [];
        renderHistory();
    })
 
    function renderHistory() {
        $history.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            var cityHistory = document.createElement("input");
            // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
            cityHistory.setAttribute("type","text");
            cityHistory.setAttribute("readonly",true);
            cityHistory.setAttribute("class", "form-control d-block bg-white");
            cityHistory.setAttribute("value", searchHistory[i]);
            cityHistory.addEventListener("click",function() {
                displayWeather(cityHistory.value);
            })
            $history.append(cityHistory);
        }
    }
    renderSearchHistory();
    
    if (searchHistory.length > 0) {
        displayWeather(searchHistory[searchHistory.length - 1]);
    }

   
   
} 