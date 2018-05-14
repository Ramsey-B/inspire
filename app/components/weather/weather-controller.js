function WeatherController(){
	var wc = this;
	var weatherService = new WeatherService();

	var farTemp
	var celTemp

	this.changeTemp = function changeTemp(type) {
		var template = ''
		if(type == 'cel') {
			template += `<h3 onclick="app.controllers.weatherController.changeTemp('far')">${celTemp}<span>&#8451;</span></h3>`
		} else {
			template += `<h3 onclick="app.controllers.weatherController.changeTemp('cel')">${farTemp}<span>&#8457;</span></h3>`
		}
		document.getElementById('temp').innerHTML = template
	}

	weatherService.getWeather(function(weather){
		//What can you do with this weather object?
		var kelTemp = weather.main.temp
		farTemp = (9/5*(kelTemp - 273) + 32).toFixed(2)
		celTemp = (kelTemp - 273).toFixed(2)
		var template = `
		<div class="weather">
			<img src="https://openweathermap.org/img/w/${weather.weather[0].icon}.png">
			<div id="temp">
				<h3 onclick="app.controllers.weatherController.changeTemp('cel')">${farTemp}<span>&#8457;</span></h3>
			</div>
			<h4>${weather.name}</h4>
		</div>`
		document.getElementById('weather').innerHTML = template
		document.getElementById('welcome-weather').innerText = `The Weather today is, ${weather.weather[0].description}`
	})

}
