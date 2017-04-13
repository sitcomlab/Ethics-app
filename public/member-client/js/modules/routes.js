var app = angular.module("routes", []);


app.config(function($routeProvider, $locationProvider, config) {
	$routeProvider

		// Home
		.when("/", {
			templateUrl: "js/templates/login.html",
			controller: "loginController"
		})
		/*.when("/recovery", {
			templateUrl: "js/templates/recovery.html",
			controller: "recoveryController"
		})

		// Account
		.when("/account/edit", {
			templateUrl: "js/templates/account/edit.html",
			controller: "accountEditController",
			resolve: {
                factory: checkAuthentication
            }
		})

		// New Document
		.when("/new/document", {
			templateUrl: "js/templates/document/create.html",
			controller: "documentCreateController"
		})*/

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
		.when("/documents/:document_id/overview", {
			templateUrl: "js/templates/document/overview.html",
			controller: "documentOverviewController",
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
		/*.when("/documents/:document_id/settings", {
			templateUrl: "js/templates/document/edit_settings.html",
			controller: "documentEditSettingsController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/delete", {
			templateUrl: "js/templates/document/delete.html",
			controller: "documentDeleteController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/documents/:document_id/id", {
			templateUrl: "js/templates/document/show_id.html",
			controller: "documentShowIdController",
			resolve: {
                factory: checkAuthentication
            }
		})
		*/


		// Committee members
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
		// TODO:
		/*.when("/users/:user_id/edit", {
			templateUrl: "js/templates/user/edit.html",
			controller: "userEditController",
			resolve: {
                factory: checkAuthentication
            }
		})
		// TODO:
		/*.when("/users/:user_id/delete", {
			templateUrl: "js/templates/user/delete.html",
			controller: "userDeleteController",
			resolve: {
                factory: checkAuthentication
            }
		})
		*/

		// New university
		/*.when("/new/university", {
			templateUrl: "js/templates/university/create.html",
			controller: "universityCreateController",
			resolve: {
				factory: checkAuthentication
			}
		})*/

		// Universities
		.when("/universities", {
			templateUrl: "js/templates/university/list.html",
			controller: "universityListController",
			resolve: {
                factory: checkAuthentication
            }
		})
		.when("/universities/:university_id", {
			templateUrl: "js/templates/university/details.html",
			controller: "universityDetailsController",
			resolve: {
                factory: checkAuthentication
            }
		})
		/*.when("/universities/:university_id/edit", {
			templateUrl: "js/templates/university/edit.html",
			controller: "universityEditController",
			resolve: {
                factory: checkAuthentication
            }
		}).when("/universities/:university_id/delete", {
			templateUrl: "js/templates/university/delete.html",
			controller: "universityDeleteController",
			resolve: {
                factory: checkAuthentication
            }
		})*/

		// New institute
		/*.when("/new/institute", {
			templateUrl: "js/templates/institute/create.html",
			controller: "instituteCreateController",
			resolve: {
				factory: checkAuthentication
			}
		})*/

		// Institutes
		.when("/institutes", {
			templateUrl: "js/templates/institute/list.html",
			controller: "instituteListController",
			resolve: {
				factory: checkAuthentication
			}
		})
		.when("/institutes/:institute_id", {
			templateUrl: "js/templates/institute/details.html",
			controller: "instituteDetailsController",
			resolve: {
				factory: checkAuthentication
			}
		})
		/*.when("/institutes/:institute_id/edit", {
			templateUrl: "js/templates/institute/edit.html",
			controller: "instituteEditController",
			resolve: {
				factory: checkAuthentication
			}
		})
		.when("/institutes/:institute_id/delete", {
			templateUrl: "js/templates/institute/delete.html",
			controller: "instituteDeleteController",
			resolve: {
				factory: checkAuthentication
			}
		})*/

		// New research group
		/*.when("/new/working_group", {
			templateUrl: "js/templates/working_group/create.html",
			controller: "workingGroupCreateController",
			resolve: {
				factory: checkAuthentication
			}
		})*/

		// Working groups
		.when("/working_groups", {
			templateUrl: "js/templates/working_group/list.html",
			controller: "workingGroupListController",
			resolve: {
				factory: checkAuthentication
			}
		})
		.when("/working_groups/:working_group_id", {
			templateUrl: "js/templates/working_group/details.html",
			controller: "workingGroupDetailsController",
			resolve: {
				factory: checkAuthentication
			}
		})
		/*.when("/working_groups/:working_group_id/edit", {
			templateUrl: "js/templates/working_group/edit.html",
			controller: "workingGroupEditController",
			resolve: {
				factory: checkAuthentication
			}
		})
		.when("/working_groups/:working_group_id/delete", {
			templateUrl: "js/templates/working_group/delete.html",
			controller: "workingGroupDeleteController",
			resolve: {
				factory: checkAuthentication
			}
		})*/

		// New research group
		/*.when("/new/working_group", {
			templateUrl: "js/templates/working_group/create.html",
			controller: "workingGroupCreateController",
			resolve: {
				factory: checkAuthentication
			}
		})*/

		// Courses
		.when("/courses", {
			templateUrl: "js/templates/course/list.html",
			controller: "courseListController",
			resolve: {
				factory: checkAuthentication
			}
		})
		.when("/courses/:course_id", {
			templateUrl: "js/templates/course/details.html",
			controller: "courseDetailsController",
			resolve: {
				factory: checkAuthentication
			}
		})
		/*.when("/courses/:course_id/edit", {
			templateUrl: "js/templates/course/edit.html",
			controller: "courseEditController",
			resolve: {
				factory: checkAuthentication
			}
		})
		.when("/courses/:course_id/delete", {
			templateUrl: "js/templates/course/delete.html",
			controller: "courseDeleteController",
			resolve: {
				factory: checkAuthentication
			}
		})*/

		// Help
		.when("/help", {
			templateUrl: "js/templates/help.html",
			controller: "helpController"
		})


		// Unknown route
		.otherwise({
			redirectTo: "/"
		});


	// Enable HTML-5-mode
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
	if($authenticationService.isAuthenticated()) {
		return true;
	} else {
		return $location.url("/");
	}
};
