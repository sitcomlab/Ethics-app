var app = angular.module("ethics-app", [

    // App Settings
    "config",

    // External Modules
    "ngRoute",
    "ngSanitize",
    "ngBootbox",
    "pascalprecht.translate",
    "angular-momentjs",

    // Own Modules
    "filters",
    "routes",
    "languages",

    // Services
    "loginService",
    "documentService",
    "revisionService",
    "descriptionService",
    "concernService",
    "userService",
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
