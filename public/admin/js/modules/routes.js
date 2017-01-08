var app = angular.module("routes", []);


app.config(function($routeProvider, $locationProvider, config) {
	$routeProvider

		// Home
		.when("/", {
			templateUrl: "/admin/js/templates/login.html",
			controller: "loginController"
		})

		// Documents
		.when("/documents", {
			templateUrl: "/admin/js/templates/documents.html",
			controller: "documentsController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id", {
			templateUrl: "/admin/js/templates/document_review.html",
			controller: "documentController",
			resolve: {
                factory: checkAuthentication
            }
		})

		// Users
		.when("/users", {
			templateUrl: "/admin/js/templates/users.html",
			controller: "usersController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/users/:user_id", {
			templateUrl: "/admin/js/templates/user.html",
			controller: "userController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/new/user/", {
			templateUrl: "/admin/js/templates/new_user.html",
			controller: "userAddController",
			resolve: {
                factory: checkAuthentication
            }
		})

		// Members
		.when("/members", {
			templateUrl: "/admin/js/templates/members.html",
			controller: "membersController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/members/:member_id", {
			templateUrl: "/admin/js/templates/member.html",
			controller: "memberController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/new/member/", {
			templateUrl: "/admin/js/templates/new_member.html",
			controller: "memberAddController",
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
