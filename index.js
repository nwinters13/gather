var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var mongoose = require('mongoose');
var json = require('json');
var express = require('express')
var app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);
var parser = require('body-parser');
app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))
app.use(parser.urlencoded());
app.use(parser.json());


var mongoURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://http://gatherup.herokuapp.com/47950/heroku_app30983226';

var db = mongoose.createConnection(mongoURI);



app.get('/', function (request, response) {
		res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

  response.send('Hello World!')
});

app.get('/index.html', function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection ("lobbies", function (er, collection) {
			collection.find({}).sort().toArray(function (err, array) {
				res.send(array);
			});
		});
	});  
});

 app.listen(app.get('port'), function() {
   console.log("Node app is running at localhost:" + app.get('port'))
 });


app.post('/invitePerson', function(req, res) {
		res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection ("users", function (er, collection) {
			var name = req.body.user;
			var user = collection.find({user: name}).toArray(function (err, r){
					 if (r.length == 0) {
					 	collection.insert({"user": name}, function (err, rz){
					 		res.send(200);
					 	});
					 } else {
					 	var eventID = req.body.eventID;
					 	if (eventID) {
					 		var invites = new Array();
					 		if (r[0].invited == null) {
					 			invites.push(eventID);
					 		}
					 		else {
					 			var accepted = new Array();
					 			if (r[0].accepted != null) {
					 				accepted = r[0].accepted;
					 			}
					 			invites = r[0].invited;
					 			var needToAdd = true;
					 			for (j = 0; j < accepted.length; j++) {
					 				if (accepted[j] == eventID) {
					 					needToAdd = false;
					 				}
					 			}
					 			for (j = 0; j < invites.length; j++) {
					 				if (invites[j] == eventID) {
					 					needToAdd = false
					 				}
					 			}
								if (needToAdd) {
					 				invites.push(eventID);
					 			}
					 		}
				  		 	collection.update({"user": name}, {"user": name, "invited": invites, "accepted": r[0].accepted, "currentlyViewing": r[0].currentlyViewing}, function(e, q) {});
					 		res.send(202);
					 	}
					 }
			});
		});
	});
});  

app.post('/login', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection ("users", function (er, collection) {
			var name = req.body.user;
			var user = collection.find({user: name}).toArray(function (err, r){
				if (r.length == 0) {
				 	collection.insert({"user": name}, function (err, rz){
				 		res.send(200);
				 	});
				} 
				res.send(200);	
			});
		});
	});
}); 


app.post('/decline', function(req, res) {
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection ("users", function (er, collection) {
			var name = req.body.user;
			var user = collection.find({user: name}).toArray(function (err, r){
				if (r.length == 0) {
				 	collection.insert({"user": name}, function (err, rz){
				 		res.send(200);
				 	});
				} else {
					var eventID = req.body.eventID;
					if (eventID) {
						var invites = new Array();
						invites = r[0].invited;
						for (j = 0; j < invites.length; j++) {
							if (invites[j] == eventID) {
								invites.splice(j, 1);
							}
						}
						collection.update({"user": name}, {"user": name, "invited": invites, "accepted": r[0].accepted, "currentlyViewing": r[0].currentlyViewing}, function(e, q) {});
						res.send(202);
					}
				}
			});
		});
	});
}); 


app.post('/accept', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection ("users", function (er, collection) {
			var name = req.body.user;
			var user = collection.find({user: name}).toArray(function (err, r){
				if (r.length == 0) {
				 	collection.insert({"user": name}, function (err, rz){
				 		res.send(200);
				 	});
				} else {
					var eventID = req.body.eventID;
					if (eventID) {
						var currEvent;
						var invites = new Array();
						invites = r[0].invited;
						for (j = 0; j < invites.length; j++) {
							if (invites[j] == eventID) {
								currEvent = invites.splice(j, 1);
							}
						}
						var accepted = new Array();
						if (r[0].accepted != null) {
							accepted = r[0].accepted;
						}
						if (currEvent != null) {
							accepted.push(currEvent[0]);
							collection.update({"user": name}, {"user": name, "invited": invites, "accepted": accepted, "currentlyViewing": r[0].currentlyViewing}, function(e, q) {});
						}
						res.send(202);
					}
				}
			});
		});
	});
}); 

app.get('/currentInvited', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection("users", function (er, collection) {
			var name = req.query.user;
			var user = collection.find({user: name}).toArray(function (err, r) {
				res.send(r[0].invited);
			});
		});
	});
});

app.get('/currentAccepted', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection("users", function (er, collection) {
			var name = req.query.user;
			var user = collection.find({user: name}).toArray(function (err, r) {
				res.send(r[0].accepted);
			});
		});
	});
});

app.post('/viewingEvent', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection("users", function (er, collection) {
			var name = req.body.user;
			var user = collection.find({user: name}).toArray(function (err, r) {
				var currentlyViewing;
				var eventID = req.body.eventID;
				for (j = 0; j < r[0].accepted.length; j++) {
					if (eventID == r[0].accepted[j]) {
						currentlyViewing = eventID;
					}
				}
				collection.update({"user": name}, {"user": name, "invited": r[0].invited, "accepted": r[0].accepted, "currentlyViewing": currentlyViewing}, function(e, q) {});
				res.send(200);
			});
		});
	});
});


app.post('/createEvent', function (req, res) {
		res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection("lobbies", function (er, collection) {
			var eventObj = collection.find({gathering: req.body.eventID}).toArray(function (err, eventList){
			if (eventList.length > 0) {
				res.send(400);
			}
			else {
				var eventID = req.body.eventID;
				var creator = req.body.user;
				var accepted = new Array();
				var lats = new Array();
				var lngs = new Array();
				accepted.push(creator);
				lats.push(req.body.lat);
				lngs.push(req.body.lng);
				collection.insert({"gathering": eventID, "accepted": accepted, "lats": lats, "lngs": lngs}, function (q, z){});
				res.send(200);	
			}
			});
		});
	});
});

app.post('/acceptEvent', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection("lobbies", function (er, collection) {
			var eventObj = collection.find({gathering: req.body.eventID}).toArray(function (err, eventList){
			if (eventList.length == 0) {
				res.send(400);
			}
			else {
				var eventID = req.body.eventID;
				var user = req.body.user;
				var addUser = true;
				for (j = 0; j < eventList[0].accepted.length; j++) {
					if (eventList[0].accepted[j] == user) {
						addUser = false;
					}
				}
				if (addUser) {
					var accepted = new Array();
					if (eventList[0].accepted != null) {
						accepted = eventList[0].accepted
					}
					var lats = new Array();
					if (eventList[0].lats != null) {
						lats = eventList[0].lats;
					}
					var lngs = new Array();
					if (eventList[0].lngs != null) {
						lngs = eventList[0].lngs
					}
					accepted.push(user);
					lats.push(req.body.lat);
					lngs.push(req.body.lng);
					collection.update({"gathering": eventID}, {"gathering": eventID, "accepted": accepted, "lats": lats, "lngs": lngs}, function (q, z){});
				}
				res.send(200);	
			}
			});
		});
	});
});


app.get('/midpoint', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection("lobbies", function (er, collection) {
			var eventID = req.query.eventID
			var eventObj = collection.find({gathering: eventID}).toArray(function (err, r) {
				if (r.length == 0 || r[0].accepted.length == 0) {
					res.send(400);
				}

				var numUsers = r[0].accepted.length;
				var avgLat = 0;
				var avgLng = 0;
				var LatLng = new Array();
				for (j = 0; j < numUsers; j++) {
					avgLat += r[0].lats[j];
					avgLng += r[0].lngs[j];
				}
				res.send(avgLat);
				avgLat = avgLat/numUsers;
				
				avgLng = avgLng/numUsers;
				LatLng.push(avgLat);
				LatLng.push(avgLng);
				res.send(LatLng);
			});
		});
	});
});


app.get('/acceptedEvent', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");

	mongo.Db.connect(mongoURI, function (err, db) {
		db.collection("lobbies", function (er, collection) {
			var eventID = req.query.eventID;
			var user = collection.find({gathering: eventID}).toArray(function (err, r) {
				res.send(r[0].accepted);
			});
		});
	});
});
