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
    "universityService",
    "instituteService",
    "courseService",
    "documentService",
    "revisionService",
    "descriptionService",
    "concernService",
    "commentService",
    //"reviewService",
    "userService",
    "recoveryService",
    "fileService",
    "memberService"

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
