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

                var stateRaw = data.places[0].state;
                var stateData = stateRaw.toLowerCase()
                console.log(stateData);

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

                fetch(
                    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=907ee0d56e9b6200aaed9be7e8b6a805" +
                    "&tags=" + stateData + "&format=json&nojsoncallback=1&auth_token=72157719392081192-5af9f67794a51826&api_sig=e97fa8025a7135788da37d38c3810587"
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

            })
    };
}

function myFunction2() {
    fetch("https://trailapi-trailapi.p.rapidapi.com/?q-activities_activity_type_name_eq=hiking&q[state_cont]=Washington", {
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

            var stateRaw = data.places[0].state;
            var stateData = stateRaw.toLowerCase()
            console.log(stateData);

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

            fetch(
                "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=907ee0d56e9b6200aaed9be7e8b6a805" +
                "&tags=" + "utah" + "&format=json&nojsoncallback=1&auth_token=72157719392081192-5af9f67794a51826&api_sig=e97fa8025a7135788da37d38c3810587"
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

        })
};
