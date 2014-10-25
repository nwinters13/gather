var map;
var places;
var myPlaces;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(42.4055470, -71.1238240)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    setupMap();
}

google.maps.event.addDomListener(window, 'load', initialize);


function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?sensor=true&libraries=places&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript();

function setupMap()
{
	var latlng = new google.maps.LatLng(42.4055470, -71.1238240);
	var request = {
			location: latlng,
			radius: '500',
			types: ['food']
			};
	service = new google.maps.places.PlacesService(map);
	service.search(request, callback);
	alert('setting up');
}
// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
function callback(results, status)
{
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		alert("hi");
		alert("Got places back!");
		alert('phew');
		places = results;
		alert('lol');
		console.log("testing status");
		for (var i = 0; i < 6; i++) {
			console.log(results[i]);
			createMarker(results[i]);
			console.log("created an marker");
			alert(i);
		}
	}
	alert('calling load data');
	loadData();
	alert('done load data');
}
function createMarker(place)
{
	var placeLoc = place.geometry.location;
	var marker = new google.maps.Marker({
		map: map,
		position: place.geometry.location
	});

	google.maps.event.addListener(marker, 'click', function() {
		infowindow.close();
		infowindow.setContent(place.name);
		infowindow.open(map, this);
	});
				
}


function loadData() 
{
	alert('in load data');
	myPlaces = document.getElementById("places").getElementsByClassName("list-group-item");
	for(var i =0; i < 6; i++) {
			myPlaces[i].innerHTML = places[i].name;
	}
	alert('alert');
	var myFriends = document.getElementById("people").getElementsByClassName("list-group-item");
	for(var i =0; i < myFriends.length; i++) {
		alert("myfriends " + i);
		// do something with myFriends[
	}
	alert('leaving!');
}

