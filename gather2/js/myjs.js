var myLat = 0;
var myLng = 0;
var request = new XMLHttpRequest();
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
			zoom: 15, 
			center: me,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
var map;
var marker;
var infowindow = new google.maps.InfoWindow();
var places;




function init()
{
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	getMyLocation();
}

function getMyLocation()
			{
				if (navigator.geolocation) { 
						myLat = 42.4069;
						myLng = -71.1198;
						renderMap();
	
				}
				else {
					alert("Geolocation is not supported by your web browser.  What a shame!");
				}
			}

function renderMap()
{
	me = new google.maps.LatLng(myLat, myLng);
				
	map.panTo(me);
					
}
