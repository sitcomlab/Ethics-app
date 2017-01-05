var app = angular.module("routes", []);


app.config(function($routeProvider, $locationProvider, config) {
	$routeProvider

		// Home
		.when("/", {
			templateUrl: "/admin/js/templates/login.html",
			controller: "loginController"
		})
		.when("/documents", {
			templateUrl: "/admin/js/templates/documents.html",
			controller: "documentsController"
		})

		.otherwise({
			redirectTo: "/"
		});

	$locationProvider.html5Mode(config.html5Mode);
});
