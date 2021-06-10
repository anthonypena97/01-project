// Trail Finders
// https://github.com/anthonypena97/01-project

// Trails API: https://rapidapi.com/trailapi/api/trailapi
// Flickr API: https://www.flickr.com/services/api/

// hiking trail search by user longitude and latitude location
// get location
function locationSearch() {

	// reset state select field

	var stateList = document.getElementById("state-select");
	stateList.value = "";

	// reset city text field

	var cityTextField = document.getElementById("city-select");
	cityTextField.value = "City...";

	var coordinatesContainer = document.getElementById("coordinates");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
		coordinatesContainer.innerHTML = "Geolocation is not supported by this browser.";
	};

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			coordinatesContainer.innerHTML = "Geolocation is not supported by this browser.";
		}
	};

	// display coordinates
	function showPosition(position) {
		var latData = position.coords.latitude;
		var lonData = position.coords.longitude;
		coordinatesContainer.innerHTML = "Latitude: " + latData +
			"<br>Longitude: " + lonData;

		// searching for hiking trails using 'trails api' using coordinates
		fetch("https://trailapi-trailapi.p.rapidapi.com/?q-activities_activity_type_name_eq=hiking&radius=25"
			+ "&lon=" + lonData
			+ "&lat=" + latData, {
			"method": "GET",
			"headers": {
				"x-rapidapi-key": "8d516f5377msh83238b25d8f111fp1c55fejsnd6aa548c8ae2",
				"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
			}
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				console.log(data);
				console.log(data.places[0].city + " - " + data.places[0].name);

				// storing state information

				var stateRaw = data.places[0].state;
				var stateData = stateRaw.toLowerCase()
				console.log(stateData);

				var stateName = document.getElementById("stateName");
				stateName.innerHTML = stateRaw

				// displaying first five trails returned

				var trailOne = data.places[0].city + " - " + data.places[0].name;
				var responseContainerEl = document.querySelector('#result-one');
				responseContainerEl.innerHTML = trailOne;

				var trailTwo = data.places[1].city + " - " + data.places[1].name;
				var responseContainerEl = document.querySelector('#result-two');
				responseContainerEl.innerHTML = trailTwo;

				var trailThree = data.places[2].city + " - " + data.places[2].name;
				var responseContainerEl = document.querySelector('#result-three');
				responseContainerEl.innerHTML = trailThree;

				var trailFour = data.places[3].city + " - " + data.places[3].name;
				var responseContainerEl = document.querySelector('#result-four');
				responseContainerEl.innerHTML = trailFour;

				var trailFive = data.places[4].city + " - " + data.places[4].name;
				var responseContainerEl = document.querySelector('#result-five');
				responseContainerEl.innerHTML = trailFive;

				// searching for image with flickr api using stored location data 

				fetch(

					"https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7b6eb8de4551bd2b88abd732cc9daf53" +
					"&tags=" + stateData + "outdoors" + "&format=json&nojsoncallback=1"
				)
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						console.log(data);

						// declaring variable for randomizing photo selection within 100

						if (data.photos.total > 99) {
							var randomSearchMax = 99
						}
						else {
							var randomSearchMax = data.photos.total - 1
							console.log(randomSearchMax)
						}

						var randomSearch = Math.floor(Math.random() * randomSearchMax)
						console.log(randomSearch)

						// flickr json response storage

						var flickrServer = data.photos.photo[randomSearch].server;
						var flickrId = data.photos.photo[randomSearch].id;
						var flickrSecret = data.photos.photo[randomSearch].secret;

						// flickr image url concatination using stored JSON data

						var imageUrl = "https://live.staticflickr.com/" + flickrServer + "/" + flickrId + "_" + flickrSecret + "_" + "m" + ".jpg";
						console.log(imageUrl);

						// displaying image

						var responseContainerEl = document.querySelector("#image");

						responseContainerEl.innerHTML = '';

						var flickrImg = document.createElement('img');
						flickrImg.setAttribute('src', imageUrl);

						responseContainerEl.appendChild(flickrImg);
					});

			})
	};
}

// hiking trail search by state
function stateSearch() {

	// reset city text field

	var cityTextField = document.getElementById("city-select");
	cityTextField.value = "City...";

	// clearing out coordinates

	var coordinatesContainer = document.getElementById("coordinates");
	coordinatesContainer.innerHTML = "";

	// returning state selected

	var stateSelected = document.getElementById('state-select').value;
	console.log(stateSelected);

	// searching for hiking trails using 'trails api' using coordinates

	fetch("https://trailapi-trailapi.p.rapidapi.com/?q-activities_activity_type_name_eq=hiking" +
		"&q[state_cont]=" + stateSelected, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "8d516f5377msh83238b25d8f111fp1c55fejsnd6aa548c8ae2",
			"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
		}
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			console.log(data);
			console.log(data.places[0].city + " - " + data.places[0].name);

			// storing state information

			var stateRaw = data.places[0].state;
			var stateData = stateRaw.toLowerCase()
			console.log(stateData);

			var stateName = document.getElementById("stateName");
			stateName.innerHTML = stateRaw

			// displaying first five trails returned

			var trailOne = data.places[0].city + " - " + data.places[0].name;
			var responseContainerEl = document.querySelector('#result-one');
			responseContainerEl.innerHTML = trailOne;

			var trailTwo = data.places[1].city + " - " + data.places[1].name;
			var responseContainerEl = document.querySelector('#result-two');
			responseContainerEl.innerHTML = trailTwo;

			var trailThree = data.places[2].city + " - " + data.places[2].name;
			var responseContainerEl = document.querySelector('#result-three');
			responseContainerEl.innerHTML = trailThree;

			var trailFour = data.places[3].city + " - " + data.places[3].name;
			var responseContainerEl = document.querySelector('#result-four');
			responseContainerEl.innerHTML = trailFour;

			var trailFive = data.places[4].city + " - " + data.places[4].name;
			var responseContainerEl = document.querySelector('#result-five');
			responseContainerEl.innerHTML = trailFive;

			// searching for image with flickr api using stored location data 

			console.log(stateData)

			fetch(
				"https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7b6eb8de4551bd2b88abd732cc9daf53" +
				"&tags=" + stateData + "nature" + "&format=json&nojsoncallback=1"
			)
				.then(function (response) {
					return response.json();
				})
				.then(function (data) {
					console.log(data);

					// declaring variable for randomizing photo selection within 100

					if (data.photos.total > 99) {
						var randomSearchMax = 99
					}
					else {
						var randomSearchMax = data.photos.total - 1
						console.log(randomSearchMax)
					}

					var randomSearch = Math.floor(Math.random() * randomSearchMax)
					console.log(randomSearch)



					console.log(data.photos.photo[randomSearch].id);

					// flickr json response storage

					var flickrServer = data.photos.photo[randomSearch].server;
					var flickrId = data.photos.photo[randomSearch].id;
					var flickrSecret = data.photos.photo[randomSearch].secret;

					// flickr image url concatination using stored JSON data

					var imageUrl = "https://live.staticflickr.com/" + flickrServer + "/" + flickrId + "_" + flickrSecret + "_" + "m" + ".jpg";
					console.log(imageUrl);

					// displaying image

					var responseContainerEl = document.querySelector("#image");

					responseContainerEl.innerHTML = '';

					var flickrImg = document.createElement('img');
					flickrImg.setAttribute('src', imageUrl);

					responseContainerEl.appendChild(flickrImg);
				});

		})
};

// hiking trail search by city
function citySearch() {

	// reset state select field

	var stateList = document.getElementById("state-select");
	stateList.value = "";

	var cityData = document.querySelector('#city-select').value;

	console.log(cityData)

	// clearing out coordinates

	var coordinatesContainer = document.getElementById("coordinates");
	coordinatesContainer.innerHTML = "";

	// searching for hiking trails using 'trails api' using coordinates


	fetch("https://trailapi-trailapi.p.rapidapi.com/?q-activities_activity_type_name_eq=hiking"
		+ "&q[city_cont]=" + cityData, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "8d516f5377msh83238b25d8f111fp1c55fejsnd6aa548c8ae2",
			"x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com"
		}
	})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			if (data.places.length > 0) {

				console.log(data);
				console.log(data.places.length)
				console.log(data.places[0].city + " - " + data.places[0].name);

				// storing state information

				var stateRaw = data.places[0].state;
				var stateData = stateRaw.toLowerCase()
				console.log(stateData);

				var stateName = document.getElementById("stateName");
				stateName.innerHTML = stateRaw

				// displaying first five trails returned

				var trailOne = data.places[0].city + " - " + data.places[0].name;
				var responseContainerEl = document.querySelector('#result-one');
				responseContainerEl.innerHTML = trailOne;

				var trailTwo = data.places[1].city + " - " + data.places[1].name;
				var responseContainerEl = document.querySelector('#result-two');
				responseContainerEl.innerHTML = trailTwo;

				var trailThree = data.places[2].city + " - " + data.places[2].name;
				var responseContainerEl = document.querySelector('#result-three');
				responseContainerEl.innerHTML = trailThree;

				var trailFour = data.places[3].city + " - " + data.places[3].name;
				var responseContainerEl = document.querySelector('#result-four');
				responseContainerEl.innerHTML = trailFour;

				var trailFive = data.places[4].city + " - " + data.places[4].name;
				var responseContainerEl = document.querySelector('#result-five');
				responseContainerEl.innerHTML = trailFive;

				// searching for image with flickr api using stored location data

				fetch(
					"https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7b6eb8de4551bd2b88abd732cc9daf53" +
					"&tags=" + stateData + "outdoors" + "&format=json&nojsoncallback=1"
				)
					.then(function (response) {
						return response.json();
					})
					.then(function (data) {
						console.log(data);

						// declaring variable for randomizing photo selection within 100

						if (data.photos.total > 99) {
							var randomSearchMax = 99
						}
						else {
							var randomSearchMax = data.photos.total - 1
							console.log(randomSearchMax)
						}

						var randomSearch = Math.floor(Math.random() * randomSearchMax)
						console.log(randomSearch)

						// flickr json response storage

						var flickrServer = data.photos.photo[randomSearch].server;
						var flickrId = data.photos.photo[randomSearch].id;
						var flickrSecret = data.photos.photo[randomSearch].secret;

						// flickr image url concatination using stored JSON data

						var imageUrl = "https://live.staticflickr.com/" + flickrServer + "/" + flickrId + "_" + flickrSecret + "_" + "m" + ".jpg";
						console.log(imageUrl);

						// displaying image

						var responseContainerEl = document.querySelector("#image");
						responseContainerEl.innerHTML = '';

						var flickrImg = document.createElement('img');
						flickrImg.setAttribute('src', imageUrl);

						responseContainerEl.appendChild(flickrImg);
					});

			}
			else {
				invalidResponse();
			}
		})
};

function invalidResponse() {
	console.log("error")

	// clearing coordinates
	var coordinatesContainer = document.getElementById("coordinates");
	coordinatesContainer.innerHTML = "";

	// error message

	var stateName = document.getElementById("stateName");
	stateName.innerHTML = "Could not find any trails... Try another search!"

	// clearing image container

	var responseContainerEl = document.querySelector("#image");
	responseContainerEl.innerHTML = '';

	// clearing list

	var responseContainerEl = document.querySelector('#result-one');
	responseContainerEl.innerHTML = "";


	var responseContainerEl = document.querySelector('#result-two');
	responseContainerEl.innerHTML = "";


	var responseContainerEl = document.querySelector('#result-three');
	responseContainerEl.innerHTML = "";


	var responseContainerEl = document.querySelector('#result-four');
	responseContainerEl.innerHTML = "";

	var responseContainerEl = document.querySelector('#result-five');
	responseContainerEl.innerHTML = "";

};