let APIKey=secrets.APIKey;
var searchTerm; // This is the variable to store the user input

var temp; var wind; var humidity; var uvIndex_local; var weatherCon; var cityLatitute=0; var cityLongitude=0; var uviColor;
var todayDate=moment().format("YYYY-MM-DD");

var searchCityInput = $('input[name="city"]'); 
var searchBtn =$('#search'); 
var weatherDisplay=$('#display-section');
var headerCity=$('#header-tag');
var tempSpan=$('#temp');
var windSpan=$('#wind');
var humiditySpan=$('#humidity');
var uviSpan=$('#uvi');
var weatherIcon=$('<img>');
var historyButtons=$('#search-history');

var currentWeatherData=[]; // This variable has all the cities searched
var fcDays=["day1","day2","day3","day4","day5"]; 

//########## This function gets the current weather data (except UV-Index) of a given city ##########
function getCurrentWeather(searchTerm)
{
    var currentDataUrl="https://api.openweathermap.org/data/2.5/weather?q=" + searchTerm+ "&units=metric&appid=" + APIKey;
    
    fetch(currentDataUrl).then(function (response)
    {
        if(response.ok)
        {
            response.json().then(function (data) 
            {
                weatherDisplay.removeClass('hide');
                temp = data.main.temp; 
                wind = data.wind.speed; 
                humidity = data.main.humidity; 
                weatherCon = data.weather[0].icon;
                cityLatitute = JSON.stringify(data.coord.lat);
                cityLongitude= JSON.stringify(data.coord.lon);
                   
                displayCurrentWeather(searchTerm,temp,wind,humidity,weatherCon);
                getUVIndex(cityLatitute,cityLongitude);
                getWeatherForecast(searchTerm);            
            });
        }

        else if(response.status==404)
        {
            window.alert("This city does not exist! Please check again.");
            searchCityInput.val("");
        }

        else
        {
            window.alert("Error"+response.statusText);
        }})
        
        .catch(function (error)
        {
            alert("Error :"+error);
        });
}

//########## This function is used to obtain UV Index of the given city and disply the value ###########
function getUVIndex(lat,lon)
{
    var uviUrl= "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat+ "&lon="+ lon+ "&exclude=current,minutely,hourly,alerts&appid=" + APIKey;
    
    fetch(uviUrl).then(function (response){
        if(response.ok)
        {
            response.json().then(function (data) {
            uvIndex_local=data.daily[0].uvi;
            uviSpan.text(uvIndex_local);
           
            if(uvIndex_local<3)
            {
                uviColor="green"; 
                uviSpan.css("background-color", uviColor);   
            }

            else if(uvIndex_local>=3 && uvIndex_local<6)
            {
                uviColor="yellow";
                uviSpan.css("background-color", uviColor);   
            }

            else
            {
                uviColor="red";
                uviSpan.css("background-color", uviColor);  
            }
            
            saveCurrentWeatherData(searchTerm); 
            });
        }

        else if(response.status==404)
        {
            alert("This city does not exist! Please check again.");
        }

        else
        {
            alert("Error"+response.statusText);
        }
    })
    .catch(function (error)
    {
        alert("Unable to connect to Weather");
    });
}

//########## This function displays the current weather data (except UV-Index) of a given city ##########
function displayCurrentWeather(city,temp,wind,humidity,weatherCon)
{
    headerCity.text(city +" "+ todayDate+" ");
    tempSpan.text(temp);
    windSpan.text(wind);
    humiditySpan.text(humidity);  
    weatherIcon.attr("src","https://openweathermap.org/img/w/"+weatherCon+".png");
    headerCity.append(weatherIcon);

    // Check before a button is created for later search
    if(currentWeatherData.includes(city))
    {
        return;
    }

    else
    {
        var cityButton=$('<button>');
        cityButton.addClass('btn btn-secondary btn-sm');
        cityButton.text(city);
        cityButton.attr("city",city);
        historyButtons.append(cityButton);
    }
}

//########## This function is gets the weather forecast for five days for a given city and display them ###########
function getWeatherForecast(searchTerm)
{
    var forecastUrl="https://api.openweathermap.org/data/2.5/forecast?q="+searchTerm+"&units=metric&appid="+APIKey;
    var fcDate; var fcTemp; var fcHumidity; var fcDescription; var fcWind;
    fetch(forecastUrl).then(function (response){
        if(response.ok)
        {
            response.json().then(function (data) {
            var fcDays = ["day1","day2","day3","day4","day5"];
            var numberOfForecasts = data.list.length;
            var timeStamp = data.list[numberOfForecasts-1].dt_txt.split(" ");
            var a = timeStamp[1];
            var j = 0;

            var fcData=[];

            for(i = 0; i<numberOfForecasts; i++)
            {
                var b = data.list[i].dt_txt.split(" ");
                if(b[1]===a)
                {
                    var fcDivision =$("#"+fcDays[j]); 
                    var fcIcon=fcDivision.children().eq(1);

                    fcDate=b[0];
                    fcTemp=data.list[i].main.temp;
                    fcHumidity=data.list[i].main.humidity;
                    fcDescription=data.list[i].weather[0].icon;
                    fcWind=data.list[i].wind.speed;                 

                    fcDivision.children().eq(0).children().eq(0).text(fcDate);
                    fcDivision.children().eq(2).children().eq(0).text(fcTemp);
                    fcDivision.children().eq(3).children().eq(0).text(fcWind);
                    fcDivision.children().eq(4).children().eq(0).text(fcHumidity);
                    fcIcon.attr("src","https://openweathermap.org/img/w/"+fcDescription+".png");
                    var c = [fcDate,fcTemp,"https://openweathermap.org/img/w/"+fcDescription+".png",fcWind,fcHumidity];
                    fcData.push(c);
                    j++;
                }
            }

            localStorage.setItem("fc"+searchTerm,JSON.stringify(fcData));
            });
        }

        else if(response.status==404)
        {
            alert("This city does not exist! Please check again.");
        }

        else
        {
            alert("Error"+response.statusText);
        }
    })
    .catch(function (error)
    {
        alert("Unable to connect to Weather");
    });
}

//#########This function is used to save the current weather data in the local storage ############
function saveCurrentWeatherData(city)
{
    var cityTemp = city;
    var city = [];
    city[0] = todayDate;
    city[1] = temp;
    city[2] = wind;
    city[3] = humidity;
    city[4] = "https://openweathermap.org/img/w/"+weatherCon+".png"
    city[5] = uvIndex_local;
    city[6]= uviColor;

    localStorage.setItem(cityTemp,JSON.stringify(city));

    if(currentWeatherData.includes(cityTemp))
    {
        localStorage.setItem('currentWeatherCity',JSON.stringify(currentWeatherData));
    }

    else
    {
        currentWeatherData.push(cityTemp);
        localStorage.setItem('currentWeatherCity',JSON.stringify(currentWeatherData));
    }  
}

//########## EVENT HANDLERS ###########################################################################
//########## Connect to the API and obtain weather data on the click event of search button ###########
searchBtn.on('click',function(event)
{
    event.preventDefault();
    // User input is formatted in the way that it uses camel case
    var cityInput = searchCityInput.val();
    var hasSpaces =cityInput.includes(" ");
    var c="";

    if(hasSpaces)
    {
        var a = cityInput.split(" ");

        for(i=0;i<a.length;i++)
        {
           c = c+a[i].charAt(0).toUpperCase()+a[i].slice(1).toLowerCase()+ " ";
        }
    }

    else
    {
        c = cityInput.charAt(0).toUpperCase()+cityInput.slice(1).toLowerCase();
    }
    

    searchTerm = c.toString();    
    if(searchTerm ==="")
    {
        window.alert("Please enter a city to obtain weather data.");
    }

    else
    {
        getCurrentWeather(searchTerm);
    }
});

//########## Usage of event delegation to retrieve data from local storage related to previously searched cities#########
historyButtons.on('click','button',function(event)
{
    event.preventDefault();
    var searchCity = $(event.target).attr('city');
    var currentWeather = JSON.parse(localStorage.getItem(searchCity));
    var forecastWeather = JSON.parse(localStorage.getItem("fc"+searchCity));
    var weatherIcon=$('<img>');

    searchCityInput.val(searchCity);
    headerCity.text(searchCity +" "+ todayDate+" ");
    tempSpan.text(currentWeather[1]);
    windSpan.text(currentWeather[2]);
    humiditySpan.text(currentWeather[3]);  
    weatherIcon.attr("src",currentWeather[4]);
    uviSpan.text(currentWeather[5]);
    var a = currentWeather[5];

    headerCity.append(weatherIcon);
    
    if(a<3)
    {
        uviColor="green"; 
        uviSpan.css("background-color", uviColor);    
    }

    else if(a>=3 && a<6)
    {
        uviColor="yellow";
        uviSpan.css("background-color", uviColor);   
    }

    else
    {
        uviColor="red";
        uviSpan.css("background-color", uviColor);  
    }

    for(i=0;i<forecastWeather.length;i++)
    {
        var fcDivision =$("#"+fcDays[i]);
        var fcIcon=fcDivision.children().eq(1);
        var dayForecast=forecastWeather[i];
                    
        fcDate=dayForecast[0];
        fcTemp=dayForecast[1];
        fcDescription=dayForecast[2];
        fcWind=dayForecast[3];
        fcHumidity=dayForecast[4];              

        fcDivision.children().eq(0).children().eq(0).text(fcDate);
        fcDivision.children().eq(2).children().eq(0).text(fcTemp);
        fcDivision.children().eq(3).children().eq(0).text(fcWind);
        fcDivision.children().eq(4).children().eq(0).text(fcHumidity);
        fcIcon.attr("src",fcDescription);  
    }
});









