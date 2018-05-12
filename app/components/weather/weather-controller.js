function WeatherController(){
	var wc = this;
	var weatherService = new WeatherService();
	
	weatherService.getWeather(function(weather){
		console.log(weather);
		//What can you do with this weather object?
		var kelTemp = weather.main.temp
		var farTemp = (9/5*(kelTemp - 273) + 32).toFixed(2)
		var celTemp = (kelTemp - 273).toFixed(2)
		var template = `<h3>${farTemp}</h3>
		<h4>${weather.name}</h4>`
		document.getElementById('weather').innerHTML = template
	})

}
