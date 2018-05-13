function WeatherController(){
	var wc = this;
	var weatherService = new WeatherService();

	weatherService.getWeather(function(weather){
		//What can you do with this weather object?
		var kelTemp = weather.main.temp
		var farTemp = (9/5*(kelTemp - 273) + 32).toFixed(2)
		var celTemp = (kelTemp - 273).toFixed(2)
		var template = `
		<div class="weather">
			<img src="http://openweathermap.org/img/w/${weather.weather[0].icon}.png">
			<h3 id="temp">${farTemp}<span>&#8457;</span></h3>
			<h4>${weather.name}</h4>
		</div>`
		document.getElementById('weather').innerHTML = template
		document.getElementById('welcome-weather').innerText = `The Weather today is, ${weather.weather[0].description}`
	})

}
