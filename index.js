var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var json = require('json');
var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))

app.use(express.static(__dirname + '/public'))



var lobbyURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://http://gatherup.herokuapp.com/lobbies';

var lobbyDB = mongo.db(lobbyURI);

// var userURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://http://gatherup.herokuapp.com/users';
// var userDB = mongo.Db.connect(userURI, function(err, dbConn) {
// 	userDB = dbConn;
// });





app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/index.html', function(req, res) {
  res.send(lobbyURI);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

app.post('/submit.json', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	mongo.Db.connect(lobbyURI, function(err, lobbyDB) {
		db.collection("lobbies", function(er, collection) {
			var user = (req.body.user);
			collection.insert({"user": user});	
			//res.send(200);
		})
	res.send(200);
	});
});
