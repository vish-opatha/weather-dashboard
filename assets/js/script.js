var APIKey="975b6c913fd1bac8d093c8550b538f26";
var searchCity = $('input[name="city"]');
var temp;
var wind;
var humidity;
var uvIndex;
var cloud;


//var scity =$('#city').val();
// function displayCity(event)
// {
//     event.preventDefault();
// console.log(city);
// }

var searchBtn =$('#search');

searchBtn.on('click',function(event){
    event.preventDefault();
console.log(searchCity.val());
//console.log($('#city'));
//var city="Adelaide";
var fetchUrl="http://api.openweathermap.org/data/2.5/weather?q=" + "darwin"+ "&appid=" + APIKey;

// var fetchUrl="http://api.openweathermap.org/data/2.5/weather?q=" + searchCity.val() + "&appid=" + APIKey;
//var fetchUrl = "cu/data/2.5/weather?q="+ searchCity+ "&appid="+apiKey;

fetch(fetchUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  temp=data.main.temp;
  wind=data.wind.speed;
  humidity=data.main.humidity;
  var weatherCon =data.weather[0].main;
  var uvindex=0; //need to find this
  console.log(temp)
  console.log(wind);
    console.log(humidity);
    console.log(weatherCon);

});



});

//var city="Adelaide";
// var fetchUrl="http://api.openweathermap.org/data/2.5/weather?q=" + searchCity.val() + "&appid=" + APIKey;
// //var fetchUrl = "cu/data/2.5/weather?q="+ searchCity+ "&appid="+apiKey;

// fetch(fetchUrl)
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   console.log(data)});



