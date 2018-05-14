function ImageService() {
	var url = '//bcw-getter.herokuapp.com/?url=';
	var url2 = 'http://www.splashbase.co/api/v1/images/random'
	var apiUrl = url + encodeURIComponent(url2);
	var defaultUrl = {
		large_url: 'https://splashbase.s3.amazonaws.com/unsplash/regular/tumblr_mopqfpSTPN1st5lhmo1_1280.jpg'
	}

	this.getImage = function (callWhenDone) {
		// ^^^^^^^ How do you call this function?
		return $.get(apiUrl, function (res) {
			res = JSON.parse(res)
			callWhenDone(res)
		}).fail(callWhenDone(defaultUrl))//this was my attempt to prevent blank screens but it only works sometimes. Sometimes it catches the error, but then is replaced by a blank screen and then the error pops up again
	}
}
