var map;
function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
    yelp();
}

google.maps.event.addDomListener(window, 'load', initialize);



function yelp( ) { //and maybe a string address
	console.log("function started");

	var epiAddress;
	var sRadius;
	var request;
	var consumKey = "qyE-UGFSSgidsbrLfV9PlQ";
	var consumSec = "Ad52o40WbgvY4-Qynjf2OW0DsSY";
	var tok = "paux-4QSmjAw_KSww288lMZGtg9T3qJW";
	var tokSec= "uYLq_B_7FrkpELdynCRFV5-VeMk";

	if (true) { //this converts a geolocation to an address thru gmaps
		
			console.log("conversion from geo to addres begun");
		  //var geoInput = document.getElementById('latlng').value;
		  //var latlngStr = input.split(',', 2);
		  var geocoder;
		  geocoder = new google.maps.Geocoder();
		  var lat =inputLat;
		  var lng = inputLng;
		  var latlng = new google.maps.LatLng(lat, lng);
		  geocoder.geocode({'latLng': latlng}, function(results, status) {
		    if (status == google.maps.GeocoderStatus.OK) {
		    	console.log("test1");
		      if (results[1]) {
		      	console.log("test2");
		        epiAddress = results[1].formatted_address;
		        console.log(results[1].formatted_address);
		       
		      } else {
		        alert('No results found');
		      }
		    } else {
		      alert('Geocoder failed due to: ' + status);
		    }
		  });
		}


	if (mode == "walking") { //set search radius in meters based on mode of transportation
		sRadius = 800;
		console.log("walking radius set");
	}
	if (mode == "driving") {
		sRadius = 1600;
	}
	console.log(term);
	console.log(epiAddress);
	console.log(sRadius);
	var milliseconds = (new Date).getTime(); 
	 

var request = {
					location: latlng,
					radius: '500',
					types: ['food']
				};
				service = new google.maps.places.PlacesService(map);
				service.search(request, callback);
			
			
			// Taken from http://code.google.com/apis/maps/documentation/javascript/places.html
			function callback(results, status)
			{
				if (status == google.maps.places.PlacesServiceStatus.OK) {
					//alert("Got places back!");
					places = results;
					for (var i = 0; i < results.length; i++) {
						createMarker(results[i]);
					}
				}
			}





}