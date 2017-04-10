var app = angular.module("ethics-app", [

    // App Settings
    "config",

    // External Modules
    "ngRoute",
    "ngSanitize",
    "pascalprecht.translate",
    "angular-momentjs",
    "underscore",

    // Own Modules
    "filters",
    "routes",
    "languages",

    // Services
    "authenticationService",
    "documentsService",
    "memberService",
    "userService",
    "universityService",
    "instituteService",
    "researchGroupService",
    /*"courseService",
    "documentService",
    "revisionService",
    "descriptionService",
    "concernService",
    "commentService",
    "reviewService",
    "recoveryService",
    "fileService",*/

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
