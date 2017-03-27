var app = angular.module("ethics-app", [

    // App Settings
    "config",

    // External Modules
    "ngRoute",
    "ngSanitize",
    "ngBootbox",
    "pascalprecht.translate",
    "angular-momentjs",
    "underscore",

    // Own Modules
    "filters",
    "routes",
    "languages",

    // Services
    "authenticationService",
    //"universityService",
    //"instituteService",
    //"courseService",
    "documentsService",
    "documentService",
    "revisionService",
    "descriptionService",
    "concernService",
    "reviewService",
    "usersService",
    "userService",
    "membersService",
    "memberService",
    //"recoveryService",
    //"fileService"

]);


/**
 * Log Provider
 * turn on/off debug logging
 */
app.config(function($logProvider, config) {
    $logProvider.debugEnabled(config.debugMode);
});


/**
 * Start application
 */
app.run(function($translate, config) {

    // Use Translator and set Language
    $translate.use(config.appLanguage);

});
