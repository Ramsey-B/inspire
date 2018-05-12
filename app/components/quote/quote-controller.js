function QuoteController(){

	var qs = new QuoteService()

	qs.getQuote(function(quote){
		var template = `<h3>${quote.quote}</h3>
		<h4>${quote.author}</h4>`
		document.getElementById('quote').innerHTML = template
	})
}
