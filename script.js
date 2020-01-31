var today = moment().format("MM/DD/YYYY"); //MOMENT.JS
var cities = []; //ARRAY FOR SEARCH HISTORY
var APIKey = "32d1a95e4ae747e702a3edc1ffb42eda";
var weatherKey = "&units=imperial&APPID=32d1a95e4ae747e702a3edc1ffb42eda" 
var lat
var long
var forecastIndex = 0;

// FUNCTION TO CHANGE WEATHER FOR EACH CITY
function displayWeatherInfo(city) { // DISPLAYS INFO
    $("#current").empty();
    $(".five-day").empty();
    $(".forecast-head").empty();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + weatherKey;
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response, lat, long) { 
        var lat = response.coord.lat;
        var long = response.coord.lon;
        var cityTemp = Math.round(response.main.temp);
        var cityTempIcon = response.weather[0].icon;
        var cityTempIconURL = "http://openweathermap.org/img/w/" + cityTempIcon + ".png";
        var cityHumidity = response.main.humidity;
        var cityWindSpeed = response.wind.speed;
        $("#current").empty();//
        var CityLat = lat;
        var CityLong = long;
        

        // CALL LONG/LAT FOR UVI
            var queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + CityLat + "&lon=" + CityLong;
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                $("#current")
                    .append($("<h2>").html(city + " (" + today + ")" + "<img src=" + cityTempIconURL + ">")) //ADD NAME, ICON, DATE
                    .append($("<p>").html("Temperature: " + cityTemp + " °F")) // ADD TEMP
                    .append($("<p>").html("Humidity: " + cityHumidity + "%"))// ADD HUMIDITY
                    .append($("<p>").html("Windspeed: " + cityWindSpeed + " MPH"))// ADD WIND
                    .append($("<p>").html("<p>UV Index: <span id = current-UV><nbsp>" + response.value + "<nbsp></span></p>"))
            });
    });


    // 5 DAY FORECAST

    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + weatherKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $(".five-day").empty();//
        $(".forecast-head").empty();//
        $(".forecast-head")

            .append($("<h2>").text("5-Day Forecast:"))
        for (i = 0; i <= 4; i++) {
            var nextDay = moment().add(1 + i, 'days').format('DD/MM/YYYY');
            var cityIconForecast = response.list[i].weather[0].icon;
            var cityIconURLForecast = "http://openweathermap.org/img/w/" + cityIconForecast + ".png";
            var cityTempForecast = Math.round(response.list[i].main.temp);
            var cityHumidityForecast = response.list[i].main.humidity;
            $(".five-day")
                .append($("<div>").addClass("col-sm-2 days")
                    .append($("<p>").html(nextDay))// ADD DAY
                    .append($("<img src=" + cityIconURLForecast + ">")) // ADD ICON
                    .append($("<p>").html("Temp: " + cityTempForecast + " °F"))// ADD TEMP
                    .append($("<p>").html("Humidity: " + cityHumidityForecast + "%")))// ADD HUMIDITY
       
        }
    });

}

// SEARCH HISTORY BUTTONS
function renderButtons() {
    var cityInitial = $("#city-input").val().trim();
    var citySearch=cityInitial.charAt(0).toUpperCase() + cityInitial.substring(1);
        if (cities.indexOf($("#city-input").val().trim()) === -1) {
                 $("#search-history").append($("<button>").addClass("past-city").attr("city-name",citySearch ).text(citySearch))
                 cities.push(citySearch);
        }

    $(".past-city").on("click", function () {
        displayWeatherInfo($(this).attr("city-name"));
    }) 
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
    var city = $("#city-input").val().trim();
    displayWeatherInfo(city);
    renderButtons();

     
});

function newFunction() {
    console.log("new function");
    displayWeatherInfo();
}