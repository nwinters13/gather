var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var mongoose = require('mongoose');
var json = require('json');
var express = require('express')
var app = express();
var parser = require('body-parser');
app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))
app.use(parser.urlencoded());
app.use(parser.json());


var mongoURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://http://gatherup.herokuapp.com/47950/heroku_app30983226';

var db = mongoose.createConnection(mongoURI);



app.get('/', function (request, response) {
  response.send('Hello World!')
});

app.get('/index.html', function(req, res) {
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

// app.post('/submit.json', function (req, res) {
// 	 res.header("Access-Control-Allow-Origin", "*");
// 	 res.header("Access-Control-Allow-Headers", "*");
// 	 mongo.Db.connect(mongoURI, function(err, db) {
// 	 	db.collection("lobbies", function(er, collection) {
// 	 		var user = (req.body.user);
// 	 		collection.insert({"user": user}, function (err, r){});	
// 	 		res.send(req.body.user);
// 	 	});
// 	 });
// 	res.send(200);
// });


app.post('/invitePerson', function(req, res) {
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
					 			var accepted = r[0].accepted;
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
				  		 	collection.update({"user": name}, {"user": name, "invited": invites}, function(e, q) {});
					 		res.send(202);
					 	}
					 }
			});
		});
	});
});  

app.post('/login', function(req, res) {
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