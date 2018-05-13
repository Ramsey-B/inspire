function QuoteController(){

	var qs = new QuoteService()

	qs.getQuote(function(quote){
		var template = `
		<h5 class="quote-text">${quote.quote}</h5>
		<p class="author text-center">-${quote.author}</p>`
		document.getElementById('quote').innerHTML = template
	})
}
