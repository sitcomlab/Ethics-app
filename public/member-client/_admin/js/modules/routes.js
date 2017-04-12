var app = angular.module("routes", []);


app.config(function($routeProvider, $locationProvider, config) {
	$routeProvider

		// Home
		.when("/", {
			templateUrl: "js/templates/login.html",
			controller: "loginController"
		})

		// Account
		.when("/account", {
			templateUrl: "js/templates/account/edit.html",
			controller: "accountEditController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/account/delete", {
			templateUrl: "js/templates/account/delete.html",
			controller: "accountDeleteController",
			resolve: {
                factory: checkAuthentication
            }
		})

		// Documents
		.when("/documents", {
			templateUrl: "js/templates/document/list.html",
			controller: "documentListController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id", {
			templateUrl: "js/templates/document/details.html",
			controller: "documentDetailsController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/edit", {
			templateUrl: "js/templates/document/edit.html",
			controller: "documentEditController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/id", {
			templateUrl: "js/templates/document/edit_id.html",
			controller: "documentEditIdController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/title", {
			templateUrl: "js/templates/document/edit_title.html",
			controller: "documentEditTitleController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/delete", {
			templateUrl: "js/templates/document/edit_delete.html",
			controller: "documentDeleteController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/review", {
			templateUrl: "js/templates/document/review.html",
			controller: "documentReviewController",
			resolve: {
                factory: checkAuthentication
            }
		})

		// Users
		.when("/users", {
			templateUrl: "js/templates/user/list.html",
			controller: "userListController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/users/:user_id", {
			templateUrl: "js/templates/user/details.html",
			controller: "userDetailsController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/users/:user_id/edit", {
			templateUrl: "js/templates/user/edit.html",
			controller: "userEditController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/users/:user_id/delete", {
			templateUrl: "js/templates/user/delete.html",
			controller: "userDeleteController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/new/user/", {
			templateUrl: "js/templates/user/create.html",
			controller: "userCreateController",
			resolve: {
                factory: checkAuthentication
            }
		})

		// Members
		.when("/members", {
			templateUrl: "js/templates/member/list.html",
			controller: "memberListController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/members/:member_id", {
			templateUrl: "js/templates/member/details.html",
			controller: "memberDetailsController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/new/member/", {
			templateUrl: "js/templates/member/create.html",
			controller: "memberCreateController",
			resolve: {
                factory: checkAuthentication
            }
		})

		.otherwise({
			redirectTo: "/"
		});

	$locationProvider.html5Mode(config.html5Mode);
});


/**
 * [checkAuthentication description]
 * @param  {[type]} $q                     [description]
 * @param  {[type]} $location              [description]
 * @param  {[type]} $authenticationService [description]
 * @return {[type]}                        [description]
 */
var checkAuthentication = function ($q, $location, $authenticationService) {
	if ($authenticationService.authenticated()) {
		return true;
	} else {
		// Redirect
		$location.url("/");
	}
};
