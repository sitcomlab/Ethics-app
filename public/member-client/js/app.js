var app = angular.module("ethics-app", [

    // Import translations
    "en_US",
    "de_DE",
    "pt_PT",

    // Import app settings
    "config",

    // Import external modules (libraries)
    "ngRoute",
    "ngSanitize",
    "pascalprecht.translate",
    "angucomplete-alt",
    "angular-momentjs",
    "underscore",

    // Import own modules
    "filters",
    "routes",

    // Import services
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
 * Configurating application before starting
 */
app.config(function($logProvider, $translateProvider, en_US, de_DE, pt_PT, config) {
    // Logging
    $logProvider.debugEnabled(config.debugMode);

    // Translations
    $translateProvider.translations('en_US', en_US);
    $translateProvider.translations('de_DE', de_DE);
    $translateProvider.translations('pt_PT', pt_PT);

    // Set default language
    $translateProvider.preferredLanguage(config.appLanguage);
    $translateProvider.useSanitizeValueStrategy('sanitize');
});


/**
 * Start application
 */
app.run(function($translate, $rootScope, config, en_US) {
    $rootScope.config = config;

    // Run with default language
    $translate.use(config.appLanguage);
});
