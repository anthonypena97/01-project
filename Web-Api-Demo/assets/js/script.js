fetch("https://trailapi-trailapi.p.rapidapi.com/?q-activities_activity_type_name_eq=hiking&limit=1000", {
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
	});