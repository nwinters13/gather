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
//mongoose.connect(mongoURI);
//var db = mongoose.connection;
var db = mongo.Db.connect(mongoURI, function (error, databaseConnection) {
	db = databaseConnection;
});

var lobbies = db.collection("lobbies", function(er, collection) {
	lobbies = collection;
});

 //var newGoose = require('mongoose');
 //var userURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://http://gatherup.herokuapp.com/users';
 //newGoose.connect(userURI);
// var userDB = newGoose.connection;
// var userDB = mongo.Db.connect(userURI, function(err, dbConn) {
// 	userDB = dbConn;
// });





app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/index.html', function(req, res) {
  //console.log(db);
  res.send(mongoURI);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

app.post('/submit.json', function(req, res) {
	 res.header("Access-Control-Allow-Origin", "*");
	 res.header("Access-Control-Allow-Headers", "*");
	 mongo.Db.connect(mongoURI, function(err, db) {
	 	db.collection("lobbies", function(er, collection) {
	 		var user = (req.body.user);
	 		collection.insert({"user": user});	
	 		res.send(req.body.user);
	 	});
	 });
	res.send(200);
	});

