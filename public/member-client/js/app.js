var app = angular.module("ethics-app", [

    // App Settings
    "config",

    // External Modules
    "ngRoute",
    "ngSanitize",
    "pascalprecht.translate",
    "angucomplete-alt",
    "angular-momentjs",
    "underscore",

    // Own Modules
    "filters",
    "routes",
    "languages",

    // Services
    "authenticationService",
    "documentsService",
    "documentService",
    "memberService",
    "userService",
    "universityService",
    "instituteService",
    "workingGroupService",
    "courseService",
    "revisionService",
    "descriptionService",
    "concernService",
    "commentService",
    "noteService",
    "reviewerService",
    "recoveryService",
    "fileService"

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
