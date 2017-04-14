app.factory('NavService', function () {

	var service = {};

	// Main menu:
	service.menu = [
'<button onclick="window.location.href=\'/\'" ng-show="isLogged == false" class="btn btn-default btn-lg">Login</button>'
];

		return service;
});
