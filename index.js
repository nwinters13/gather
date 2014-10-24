var http = require('http');
var path = require('path');

var mongo = require('mongodb');
var json = require('json');
var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 5000))
app.use(app.router);
app.use(express.static(__dirname + '/public'))



var lobbyURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://http://gatherup.herokuapp.com/lobbies';
var lobbyDB = mongo.Db.connect(lobbyUri, function(err, dbConn) {
	lobbyDB = dbConn;
});

var userURI = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://http://gatherup.herokuapp.com/users';
var userDB = mongo.Db.connect(lobbyUri, function(err, dbConn) {
	userDB = dbConn;
});





app.get('/', function(request, response) {
  response.send('Hello World!')
});

app.get('/index.html', function(req, res) {
  res.send(200);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
