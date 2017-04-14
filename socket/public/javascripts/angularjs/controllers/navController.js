app.controller("NavController", function($scope, NavService, SocketService) {

	$scope.isLogged = false;

//	Get menu:
	$scope.menu = NavService.menu;

//	Get messages:
	$scope.messages = SocketService.messages;

	// Send message:
	$scope.sendMessage = function(data) {
		SocketService.send('messages', data);
		$scope.data = null;
	};

});
