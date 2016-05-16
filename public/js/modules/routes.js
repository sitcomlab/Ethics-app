var app = angular.module("routes", []);


app.config(function($routeProvider) {
	$routeProvider

		// HOME (LOGIN)
		.when("/", {
			templateUrl: "/js/templates/login.html",
			controller: "LoginController"
		})

		// RECOVER
		.when("/recover", {
			templateUrl: "/js/templates/recover.html",
			controller: "RecoverController"
		})

		// DOCS
		.when("/docs", {
			templateUrl: "/js/templates/docs/list.html",
			controller: "DocListController"
		})
		.when("/docs/:doc_id/edit", {
			templateUrl: "/js/templates/docs/edit.html",
			controller: "DocEditController"
		})
		.when("/docs/:doc_id", {
			templateUrl: "/js/templates/docs/summary.html",
			controller: "DocSummaryController"
		})

		.otherwise({
			redirectTo: "/"
		});
});
