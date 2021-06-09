fetch(
	'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=eba4d59c3d1445ea6dcd1a28e8cca79f&tags=utah&format=json&nojsoncallback=1'
)
	.then(function (response) {
		return response.json();
	})
	.then(function (data) {
		console.log(data);
		console.log(data.photos.photo[0].id);

		var flickrServer = data.photos.photo[0].server;
		var flickrId = data.photos.photo[0].id;
		var flickrSecret = data.photos.photo[0].secret;

		// Flickr image URL https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg
		var imageUrl = "https://live.staticflickr.com/" + flickrServer + "/" + flickrId + "_" + flickrSecret + "_" + "m" + ".jpg";
		console.log(imageUrl);

		var responseContainerEl = document.querySelector("#image");

		responseContainerEl.innerHTML = '';

		var flickrImg = document.createElement('img');
		flickrImg.setAttribute('src', imageUrl);

		responseContainerEl.appendChild(flickrImg);
	});