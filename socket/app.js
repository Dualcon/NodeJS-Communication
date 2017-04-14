var express = require('express');
var session = require('express-session');
var util = require('util');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

//Mongo DB and connect-mongo:
var db = require('./lib/db/db');
db.createSessionStore(session);

//Express-Session middleware:
var sessionMiddleware = session({
	key: 'express.sid',
	secret: 'my express secret',
	resave: true,
	saveUninitialized: true,
	store: db.getSessionStore() 
});

//Share express-session with socket.io. (Now req.session and socket.request.session have the same information).
io.use(function(socket, next) {
	sessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.static('public'));
app.use(sessionMiddleware);

app.get('/', function (req, res) {
	console.log('Session id: ' + req.session.id);
	res.sendFile(__dirname + '/public/javascripts/angularjs/views/index.html');
});

app.post('/search', function(req, res, next) {
	res.send('TODO: Not implemented.');
});

var clients = {};
io.on('connection', function(socket) {  
	console.log('Client connected...');
	socket.on('join', function(data) {
		addClient(socket);
		console.log(data);
		socket.emit('messages', 'Hello from server');
	});
	socket.on('messages', function(data) {
		sendMessage(socket.request.session.id, data);
	});
});

var addClient = function(socket) {
	// If the client sessionID already exists, add the socket, otherwise create a new one: 
	if (clients.hasOwnProperty(socket.request.session.id)) clients[socket.request.session.id].sockets.push(socket);
	else clients[socket.request.session.id] = {sockets: [socket]}	;
}

var sendMessage = function(sessionID, data) {
	if (! clients.hasOwnProperty(sessionID)) return;
	clients[sessionID].sockets.forEach(function(socket) {
		socket.emit('messages', data);	
	});
};

var port = 3000;
server.listen(port, function() {
	console.log('App running on port ' + port + '.');
});
