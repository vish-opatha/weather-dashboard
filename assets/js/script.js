
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
                        // weatherCon =data.weather[0].description;
                        weatherCon =data.weather[0].icon;
                        console.log(todayDate);
                        console.log("=======================");
                        console.log(data);
                        
                        cityLatitute = JSON.stringify(data.coord.lat);
                        cityLongitude= JSON.stringify(data.coord.lon);
                        saveCurrentWeatherData(searchTerm);
                        
                        
                        

                        displayCurrentWeather(searchTerm,temp,wind,humidity,weatherCon,uvIndex);
                        getUVIndex(cityLatitute,cityLongitude);

                        
                       
                        
                        
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

    var weatherIcon=$('<img>');
    headerCity.text(city +" "+ todayDate+" ");
    tempSpan.text(temp);
    windSpan.text(wind);
    humiditySpan.text(humidity);
   
    var cityButton=$('<button>');
    var headerT=$('#header-tag');
    cityButton.text(city);
    cityButton.attr("city",city);
    cityButton.addClass('btn btn-secondary btn-sm');
    weatherIcon.attr("src","http://openweathermap.org/img/w/"+weatherCon+".png");
    headerT.append(weatherIcon);
    //headerCity.append(weatherIcon);
  
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
            uviSpan.text(uvIndex_local);
           
            if(uvIndex_local<3)
            {
                uviSpan.css("background-color", "green");
            }

            else if(uvIndex_local>=3 && uvIndex_local<6)
            {
                uviSpan.css("background-color", "yellow");
            }

            else
            {
                uviSpan.css("background-color", "red");
            }
            
            



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
    var forecastUrl="http://api.openweathermap.org/data/2.5/forecast?q="+searchTerm+"&units=metric&appid="+APIKey;
    var fcDate; var fcTemp; var fcHumidity; var fcDescription; var fcWind;
    fetch(forecastUrl).then(function (response){
        if(response.ok)
        {
            response.json().then(function (data) {
            var numberOfForecasts = data.list.length;
            var timeStamp=data.list[numberOfForecasts-1].dt_txt.split(" ");
            var a =timeStamp[1];
        
            
            var fcDays=["day1","day2","day3","day4","day5"];
            var j=0;
            for(i=0;i<40;i++)
            {
                
                var b=data.list[i].dt_txt.split(" ");
                if(b[1]===a)
                {
                    var dayTag ="#"+fcDays[j];
                    var dayCounter=1; j++;
                    fcDate=b[0];
                    fcTemp=data.list[i].main.temp;
                    fcHumidity=data.list[i].main.humidity;
                    // fcDescription=data.list[i].weather[i].description;
                    fcDescription=data.list[i].weather[0].icon;
                    fcWind=data.list[i].wind.speed;
                    console.log(data);

                   
                    var fcDivision =$(dayTag);
                    fcDivision.children().eq(0).children().eq(0).text(fcDate);
                    
                    fcDivision.children().eq(2).children().eq(0).text(fcTemp);
                    fcDivision.children().eq(3).children().eq(0).text(fcWind);
                    fcDivision.children().eq(4).children().eq(0).text(fcHumidity);
                    var fcIcon=fcDivision.children().eq(1);
                    fcIcon.attr("src","http://openweathermap.org/img/w/"+fcDescription+".png");

                   
                    dayCounter++;

                }
          

            }
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










