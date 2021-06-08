fetch(
	'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=907ee0d56e9b6200aaed9be7e8b6a805&tags=utah&format=json&nojsoncallback=1&auth_token=72157719392081192-5af9f67794a51826&api_sig=e97fa8025a7135788da37d38c3810587'
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
		var url = "https://live.staticflickr.com/" + flickrServer + "/" + flickrId + "_" + flickrSecret + "_" + "m" + ".jpg";
		console.log(url);

	});