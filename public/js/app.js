var app = angular.module("ethics-app", [

    // Config
    "config",

    // Directives
    "showErrors",
    "showWrong",

    // External Modules
    "ngRoute",
    "pascalprecht.translate",
    "ngBootbox",
    "angular.filter",
    "ui.bootstrap",

    // Own Modules
    "init",
    "routes",
    "filters",
    "languages",
    "docService"
]);


// Config
app.config(function($logProvider) {
    $logProvider.debugEnabled(true);
});
