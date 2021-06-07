function myFunction() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	};

	var x = document.getElementById("demo");

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition);
		} else {
			x.innerHTML = "Geolocation is not supported by this browser.";
		}
	};

	function showPosition(position) {
		var latData = position.coords.latitude;
		var lonData = position.coords.longitude;
		x.innerHTML = "Latitude: " + latData +
			"<br>Longitude: " + lonData;
		console.log(lonData);

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
			})
	};
}