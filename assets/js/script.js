var APIKey="975b6c913fd1bac8d093c8550b538f26";
var searchCity = $('input[name="city"]');
var searchBtn =$('#search');
//var cityLatitute = 0;
//var cityLongitude = 0;
var cityLatitute=0; var cityLongitude=0;
var currentDiv=$('main').children[1];

var temp;
var wind;
var humidity;
var uvIndex;
var cloud;
var currentWeather=[];



//########## Connect to the API and obtain weather data on the click event ###########
searchBtn.on('click',function(event)
{
    event.preventDefault();
    var searchTerm = searchCity.val();
    
    console.log(searchCity.val());//**** */

    if(searchTerm==="")
    {
        window.alert("Please enter a city to obtain weather data.");
    }

    else
    {
        getCurrentWeather(searchTerm);
        getWeatherForecast(searchTerm);
        
        //displayCurrentWeather();
    }
});

//########## This function obtains the current weather data (except UV-Index) of a given city ##########
function getCurrentWeather(searchTerm)
{
    var currentDataUrl="http://api.openweathermap.org/data/2.5/weather?q=" + searchTerm+ "&units=metric&appid=" + APIKey;
    
    console.log(currentDataUrl); //==================================

        fetch(currentDataUrl)
            .then(function (response){
                if(response.ok)
                {
                    response.json().then(function (data) {
                        console.log(data);
                        temp=data.main.temp;
                        wind=data.wind.speed;
                        humidity=data.main.humidity;
                        var weatherCon =data.weather[0].main;
                        var todayDate=moment().format("dd mm yy");
                        
                        cityLatitute = JSON.stringify(data.coord.lat);
                        cityLongitude= JSON.stringify(data.coord.lon);
                        console.log(temp)
                        console.log(wind);
                        console.log(humidity);
                        console.log(weatherCon);
                        console.log(cityLatitute+ " "+cityLongitude);

                        currentWeather.push([searchTerm][temp,wind,humidity,weatherCon]);
                        console.log(currentWeather);


                        // var cityH2=$('<h2>');
                        // var temperatureP=$('<p>');
                        // var windP=$('<p>');
                        // var humidityP=$('<p>');
                        // // var uviP=$('<p>');

                        

    
                        cityH2.text(searchTerm + todayDate+weatherCon);
                        temperatureP.text("Temperature : "+temp+ "<span>&#8451;</span>C");
                        windP.text("Wind :"+wind+" MPH");
                        humidityP.text("Humidity :"+humidity+"%");

                        console.log(humidityP);

                        // currentDiv.append(cityH2);
                        // currentDiv.append(temperatureP);
                        // currentDiv.append(windP);
                        // currentDiv.append(humidityP);


                        getUVIndex(cityLatitute,cityLongitude);
                       
                        
                        
                    });
                }

                else if(response.status==404)
                {
                    //Window.alert('Error: ' + response.statusText);
                    window.alert("City does not exist");
                }

                else
                {
                    window.alert("Error"+response.statusText);
                }
            })
            .catch(function (error)
            {
                alert("Unable to connect to Weather");
            });
           
}

//########## This function is used to obtain UV Index of the given city ###########
function getUVIndex(lat,lon)
{
    var uviUrl= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat+ "&lon="+ lon+ "&exclude=current,minutely,hourly,alerts&appid=" + APIKey;

    fetch(uviUrl).then(function (response){
        if(response.ok)
        {
            response.json().then(function (data) {
            uvIndex=data.daily[0].uvi;
            console.log("uvi" +uvIndex);
            var uviP=$('<p>');
            uviP.text("UV Index"+uvIndex);
            currentDiv.append(uviP);

                     
            });
        }

        else if(response.status==404)
        {
            window.alert("City does not exist");
        }

        else
        {
            window.alert("Error"+response.statusText);
        }
    })
    .catch(function (error)
    {
        alert("Unable to connect to Weather");
    });
}

//########## This function is used to obtain the weather forecast for five days for a given city ###########
function getWeatherForecast(searchTerm)
{
    //var forecastUrl="http://api.openweathermap.org/data/2.5/forecast/daily?q="+searchTerm+"&cnt=5&appid="+ APIKey;
    var forecastUrl="http://api.openweathermap.org/data/2.5/forecast?q="+searchTerm+"&cnt=5&units=metric&appid="+APIKey;

    fetch(forecastUrl).then(function (response){
        if(response.ok)
        {
            response.json().then(function (data) {
            console.log(data);
            });
        }

        else if(response.status==404)
        {
            window.alert("City does not exist");
        }

        else
        {
            window.alert("Error"+response.statusText);
        }
    })
    .catch(function (error)
    {
        alert("Unable to connect to Weather");
    });


}

function displayWeatherData()
{
    var cityH2=$('<h2>');
    var temperatureP=$('<p>');
    var windP=$('<p>');
    var humidityP=$('<p>');
    var uviP=$('<p>');
    
    cityH2.text()

}








