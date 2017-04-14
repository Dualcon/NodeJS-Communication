app.factory('SocketService', function ($rootScope) {

	var service = {};

	var socket = io();
	service.messages = [];

	// User connect to server:
	socket.on('connect', function(data) {
		socket.emit('join', 'Hello World from client');
	});

	// Send message:
	service.send = function(eventName, data) {
		socket.emit(eventName, data);
	};

	// Receive message:
	socket.on('messages', function(data) {
		$rootScope.$apply(function () {
			service.messages.push(data);
		});
	});

	return service;
});
