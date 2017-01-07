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
		.when("/documents/:document_id/id", {
			templateUrl: "/js/templates/document_id.html",
			controller: "documentIdController"
		})
		.when("/documents/:document_id/title", {
			templateUrl: "/js/templates/document_title.html",
			controller: "documentTitleController"
		})
		.when("/documents/:document_id/delete", {
			templateUrl: "/js/templates/document_delete.html",
			controller: "documentDeleteController"
		})
		.when("/documents/:document_id/user", {
			templateUrl: "/js/templates/user.html",
			controller: "userController"
		})

		// Status
		.when("/documents/:document_id/status/0", {
			redirectTo: "/documents/:document_id/status/1"
		})
		.when("/documents/:document_id/status/1", {
			templateUrl: "/js/templates/document_status_1.html",
			controller: "statusController_1"
		})
		.when("/documents/:document_id/status/2", {
			templateUrl: "/js/templates/document_status_2.html",
			controller: "statusController_2"
		})
		.when("/documents/:document_id/status/3", {
			templateUrl: "/js/templates/document_status_3.html",
			controller: "statusController_3"
		})
		.when("/documents/:document_id/status/4", {
			templateUrl: "/js/templates/document_status_4.html",
			controller: "statusController_4"
		})
		.when("/documents/:document_id/status/5", {
			templateUrl: "/js/templates/document_status_5.html",
			controller: "statusController_5"
		})
		.when("/documents/:document_id/status/6", {
			templateUrl: "/js/templates/document_status_6.html",
			controller: "statusController_6"
		})
		.when("/documents/:document_id/status/7", {
			templateUrl: "/js/templates/document_status_7.html",
			controller: "statusController_7"
		})

		// Committee
		.when("/committee", {
			templateUrl: "/js/templates/committee.html",
			controller: "committeeController"
		})

		.otherwise({
			redirectTo: "/"
		});

	$locationProvider.html5Mode(config.html5Mode);
});
