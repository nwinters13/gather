  window.fbAsyncInit = function() {
    FB.init({
      appId      : '661502127295972',
      xfbml      : true,
      cookie     : true,  // enable cookies to allow the server to access 
                        // the session
      version    : 'v2.1'
    });

      FB.getLoginStatus(function(response) {
          statusChangeCallback(response);
        });

      };


function sendRequest() {
	var form = document.getElementById("groupID");
	form = form.value;
	var button = document.getElementsByClassName("input-group-btn");
	console.log(form);
	var request = new XMLHttpRequest();
	var id;
	var myLat;
	var myLng;
console.log('hi');
	function statusChangeCallback(response) {
		FB.api('/me', function(response) {
			if (response && !response.error) {
		          		id = response.id;
		        }
		});
	}
	if (navigator.geolocation) { 
				navigator.geolocation.getCurrentPosition(function(position) {
					console.log("hi!!!!");
					myLat = position.coords.latitude;
					myLng = position.coords.longitude;
					console.log("mylat" + myLat);
					console.log("mylng" + myLng);
					sendPOST(myLat, myLng, id, form);

				});
				
		}
		
}
function sendPOST(myLat, myLng, id, eventID) {
	request.open('POST', 'http://gatherup.herokuapp.com/createEvent', true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("eventID=" + form + "&user=" + id);
	var myEvents = document.getElementById("events").getElementsByClassName("list-group-item");
	if(myEvents.length == 1) {
		myEvents[0] = form;
	}
	else {
		document.getElementById("events").getElementsByClassName("list-group").innerHTML += "<li class='list-group-item'>" + form + "</li>";
	}

}


