var OpenWeatherKey = '4178c7c00c8613f9b84c4784af4fff3e';
var locationUrl =  'http://freegeoip.net/json/';
var weatherImage = "";
var imagePhoto = {
   thunder: "./img/weather1.jpg",
   rainy: "./img/weather2.jpg",
   cloudy: "./img/weather3.jpg",
   snow: "./img/weather4.jpg",
   sunny: "./img/weather5.jpg"
};

function selectImage (id) {
   if(id >= 200 && id <= 232) {
       weatherImage = imagePhoto.thunder;
   }
   else if (id >= 300 && id <= 531) {
       weatherImage = imagePhoto.rainy;
   }
   else if (id >= 600 && id <= 622) {
       weatherImage = imagePhoto.snow;
   }
   else if (id >= 801 && id <= 804) {
      weatherImage = imagePhoto.cloudy;
   }
   else if (id === 800) {
      weatherImage = imagePhoto.sunny;
   }
   else {
      weatherImage = imagePhoto.cloudy;
   }
   // we set the background first after the weatherImage has been assigned a value
   // above
   $('html').css('background-image','url(' + weatherImage + ')');
}

function getLocation(){
   $.ajax({
       url : locationUrl,
       dataType: "json",
       success : function(data){
           var country = data['country_name'];
           var city = data['city'];
           var latitude = data['latitude'];
           var longitude = data['longitude'];
           $('#location').html(city + ', ' + country);
           var Weather = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude +"&APPID=" +OpenWeatherKey;
           getWeather(Weather);
        }
    });
}

function getWeather(url){
   $.ajax({
       url:url,
       dataType:"json",
       success: function(data) {
          var weather = data['weather'][0]['main'];
          var temp = data['main']['temp'];
          var icon = data['weather'][0]['icon'];
          var id = data['weather'][0]['id'];
          document.getElementById('icon').src= "http://openweathermap.org/img/w/" + icon + ".png";
          $('#weather').html(weather);
          $('#temp').html(temp);
          // Change F to C, C to F
          var fahrenheit = Math.floor((temp) * 9/5 - 459.67) + '\xB0F';
          var celsius = Math.floor((temp)- 273.15) + '\xB0C';
          var $tempDisplay = $("#temp");
          $tempDisplay.html(celsius);
          $("#button-f").on('click', function() {
             $tempDisplay.html(fahrenheit);
          });
          $("#button-c").on('click', function() {
             $tempDisplay.html(celsius);
          });

          // select background image based on id
          selectImage(id);
       }
   });
};

getLocation();
