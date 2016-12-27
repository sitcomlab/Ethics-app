var app = angular.module("routes", []);


app.config(function($routeProvider, $locationProvider, config) {
	$routeProvider

		// Home
		.when("/", {
			templateUrl: "/js/templates/login.html",
			controller: "loginController"
		})

		// Document
		.when("/documents/:document_id", {
			templateUrl: "/js/templates/document.html",
			controller: "documentController"
		})

		.otherwise({
			redirectTo: "/"
		});

	$locationProvider.html5Mode(config.html5Mode);
});
