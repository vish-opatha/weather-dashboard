var APIKey="975b6c913fd1bac8d093c8550b538f26";
var searchCityInput = $('input[name="city"]');
var searchBtn =$('#search');
//var cityLatitute = 0;
//var cityLongitude = 0;
var cityLatitute=0; var cityLongitude=0;
var weatherDisplay=$('#display-section');
var searchTerm;

var temp;
var wind;
var humidity;
var uvIndex;
var cloud;
var weatherCon;
var todayDate=moment().format("DD/MM/YYYY");

var headerCity=$('#header-tag');
var tempSpan=$('#temp');
var windSpan=$('#wind');
var humiditySpan=$('#humidity');
var uviSpan=$('#uvi');

var currentWeatherData=[];

//########## Connect to the API and obtain weather data on the click event ###########
searchBtn.on('click',function(event)
{
    event.preventDefault();
    searchTerm = searchCityInput.val();
        
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
    
    //console.log(currentDataUrl); //==================================

        fetch(currentDataUrl)
            .then(function (response){
                if(response.ok)
                {
                    response.json().then(function (data) {
                        console.log(data);
                        temp=data.main.temp;
                        wind=data.wind.speed;
                        humidity=data.main.humidity;
                        weatherCon =data.weather[0].description;
                        console.log(todayDate);
                        
                        cityLatitute = JSON.stringify(data.coord.lat);
                        cityLongitude= JSON.stringify(data.coord.lon);
                        saveCurrentWeatherData(searchTerm);
                        
                        getUVIndex(cityLatitute,cityLongitude);
                        

                        displayCurrentWeather(searchTerm,temp,wind,humidity,weatherCon,uvIndex);

                        
                       
                        
                        
                    });
                }

                else if(response.status==404)
                {
                    //Window.alert('Error: ' + response.statusText);
                    window.alert("This city does not exist");
                }

                else
                {
                    window.alert("Error"+response.statusText);
                }
            })
            .catch(function (error)
            {
                alert("Error :"+error);
            });
           
}
var count=0;
function displayCurrentWeather(city,temp,wind,humidity,weatherCon,uvIndex)
{

   
    headerCity.text(city + todayDate+ weatherCon);
    tempSpan.text(temp);
    windSpan.text(wind);
    humiditySpan.text(humidity);
   
    var cityButton=$('<button>');
    cityButton.text(city);
    cityButton.attr("city",city);
    cityButton.addClass('btn btn-secondary btn-sm');

  
    var buttons=$('#search-history');

   
    buttons.append(cityButton);
    
}

function saveCurrentWeatherData(city)
{
    var cityToLowerCase = city.toLowerCase();
    var weatherData=temp+","+wind+","+humidity+","+weatherCon;
    var cityToLowerCase = [];
    cityToLowerCase.push(weatherData);
    currentWeatherData.push(city);

    localStorage.setItem(city,JSON.stringify(cityToLowerCase));
    localStorage.setItem('currentWeatherCity',JSON.stringify(currentWeatherData));

}
var uvIndex_local;
//########## This function is used to obtain UV Index of the given city ###########
function getUVIndex(lat,lon)
{
    var uviUrl= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat+ "&lon="+ lon+ "&exclude=current,minutely,hourly,alerts&appid=" + APIKey;
    
    fetch(uviUrl).then(function (response){
        if(response.ok)
        {
            response.json().then(function (data) {
            uvIndex_local=data.daily[0].uvi;
            console.log(uvIndex+"UV INdex line 136");
            console.log("uvi" +uvIndex_local);
            uvIndex=uvIndex_local;
            // var uviP=$('<p>');
            // uviP.text("UV Index"+uvIndex);
            // currentDiv.append(uviP);

            // return uvIndex_local;         
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
    var forecastUrl="http://api.openweathermap.org/data/2.5/forecast?q="+searchTerm+"&units=metric&appid="+APIKey;

    fetch(forecastUrl).then(function (response){
        if(response.ok)
        {
            response.json().then(function (data) {
            // for (i)
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










