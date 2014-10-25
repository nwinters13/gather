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
				var info = "<!DOCTYPE HTML><html><head><title>test</title></head><body>";
				//res.send((array.length).toString());
				for (var i = 0; i < array.length; i++) {
					info += "<p>" + (array[i].user).toString() + "</p>";
				}
				info = "</body></html>";
				res.send(info);
			});
		});
	});  
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

app.post('/submit.json', function (req, res) {
	 res.header("Access-Control-Allow-Origin", "*");
	 res.header("Access-Control-Allow-Headers", "*");
	 mongo.Db.connect(mongoURI, function(err, db) {
	 	db.collection("lobbies", function(er, collection) {
	 		var user = (req.body.user);
	 		collection.insert({"user": user}, function (err, r){});	
	 		res.send(req.body.user);
	 	});
	 });
	res.send(200);
	});

