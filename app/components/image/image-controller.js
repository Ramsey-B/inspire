function ImageController() {
	var imgService = new ImageService()
	//Your ImageService is a global constructor function what can you do here if you new it up?
	function drawImg(obj) {
		var imgUrl = `url(${obj.large_url})`
		document.getElementById('body').style.backgroundImage = imgUrl
	}
	
	function getImg() {
		imgService.getImage(drawImg)
	}

	getImg()
}


