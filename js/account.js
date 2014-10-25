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
          console.log(response.id);
        });

      };
var id;

(function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
function statusChangeCallback(response) {
		console.log("hey!");
		FB.api('/me', function(response) {
			if (response && !response.error) {
		          		id = response.id;
		          		console.log(id);
		        }
		});
	}


function sendRequest() {
	console.log(id);
	var form = document.getElementById("groupID");
	form = form.value;
	var button = document.getElementsByClassName("input-group-btn");
	console.log(form);
	var myLat;
	var myLng;
		if (navigator.geolocation) { 
				navigator.geolocation.getCurrentPosition(function(position) {
					console.log("hi!!!!");
					myLat = position.coords.latitude;
					myLng = position.coords.longitude;
					sendPOST(myLat, myLng, id, form);

				});
				
		}
		
}
function sendPOST(myLat, myLng, id, form) {
	var request = new XMLHttpRequest();
	request.open('POST', 'http://gatherup.herokuapp.com/createEvent', true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send("eventID=" + form + "&user=" + id + "&lat=" + myLat + "&lng=" + myLng);
	var myEvents = document.getElementById("events").getElementsByClassName("list-group-item");
	request = new XMLHttpRequest();
	request.open('GET', 'http://gatherup.herokuapp.com/currentAccepted?user='+id, true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	request.send(null);
	var myGatherings = new Array();
	myGatherings = request.responseText;
	if(myGatherings.length == 1) {
		myEvents[0].innerHTML = form;
	}
	else {
		for(var i =0; i < myGatherings.length; i++) {
			document.getElementById("events").getElementsByClassName("list-group").innerHTML += "<li class='list-group-item'>" + form + "</li>";
		}
	}

}


