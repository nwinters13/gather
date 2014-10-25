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

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    //FB.Event.subscribe('auth.login', login_event);

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
    }
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      window.location = "index.html";
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
      window.location = "index.html";
    } 
  }

function inviteFriendsToGroup() {
alert('inviting');
//for friends that already use
FB.api("/me/friends",
  function (response) {
    if (response && !response.error) {
      var container = document.getElementById('myModal');
    }
  }
);
//for friends that do not
}