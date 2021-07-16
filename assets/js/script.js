var APIKey="975b6c913fd1bac8d093c8550b538f26";
var searchCity = $('input[name="city"]');
var searchBtn =$('#search');
//var cityLatitute = 0;
//var cityLongitude = 0;
var cityLatitute=0; var cityLongitude=0;

var temp;
var wind;
var humidity;
var uvIndex;
var cloud;

//forecast = http://api.openweathermap.org/data/2.5/forecast?q=Adelaide&cnt=5&appid=975b6c913fd1bac8d093c8550b538f26




//---->var fetU="http://api.openweathermap.org/data/2.5/forecast/daily?q=Adelaide&cnt=5&appid="+ APIKey;
//http://api.openweathermap.org/data/2.5/forecast/daily?q=Adelaide&cnt=5&appid=975b6c913fd1bac8d093c8550b538f26
//-----
// fetch(fetU)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       }
//     );



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
                        
                        cityLatitute = JSON.stringify(data.coord.lat);
                        cityLongitude= JSON.stringify(data.coord.lon);
                        console.log(temp)
                        console.log(wind);
                        console.log(humidity);
                        console.log(weatherCon);
                        console.log(cityLatitute+ " "+cityLongitude);

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






// fetch(apiUrl)
//     .then(function (response) {
//       if (response.ok) {
//         response.json().then(function (data) {
//           displayRepos(data, user);
//         });
//       } else {
//         alert('Error: ' + response.statusText);
//       }
//     })
//     .catch(function (error) {
//       alert('Unable to connect to GitHub');
//     });
//var fetchUrl="http://api.openweathermap.org/data/2.5/weather?q=" + "Adelaide"+ "&units=metric&lat="+latitute+"&lon="+longitute+"&appid=" + APIKey;
//var fetchUrl1="https://api.openweathermap.org/data/2.5/onecall?lat=6.9319&lon=79.8478&exclude=daily,minutely,hourly,alerts&appid=975b6c913fd1bac8d093c8550b538f26";
// console.log(fetchUrl1);
// fetch(fetchUrl1)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
  

// });

//     }

// var fetchUrl="http://api.openweathermap.org/data/2.5/weather?q=" + "colombo"+ "&units=metric&appid=" + APIKey;


// console.log(fetchUrl);
// fetch(fetchUrl)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
//   temp=data.main.temp;
//   wind=data.wind.speed;
//   humidity=data.main.humidity;
//   var weatherCon =data.weather[0].main;
//   var uvindex=0; //need to find this
//   var latitute = data.coord.lat;
//   var longitute= data.coord.lon;
//   console.log(temp)
//   console.log(wind);
//     console.log(humidity);
//     console.log(weatherCon);
//     console.log (latitute + "  "+longitute);

// });

//====var fetchUrl1="https://api.openweathermap.org/data/2.5/onecall?lat=6.9319&lon=79.8478&exclude=daily,minutely,hourly,alerts&appid=975b6c913fd1bac8d093c8550b538f26";
// console.log(fetchUrl1);
// fetch(fetchUrl1)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data);
  

// });



// });




