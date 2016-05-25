var app = angular.module("ethics-app", [

    // External Modules
    "ngRoute",
    "pascalprecht.translate",
    "ngBootbox",
    "angular.filter",

    // Own Modules
    "init",
    "routes",
    "filters",
    "languages",
    "docService"
]);


// Constants
app.constant("setup", {
    appName: "Ethics-app",
    appDevelopers: ["Nicholas Schiestel", "Heinrich Löwen"],
    appGithub: "",
    appVersion: 1.0,
    apiURL: "/api",
    timeZone: "+0100",
    standardLanguage: 'en_US'
});


// Config
app.config(function($logProvider) {
    $logProvider.debugEnabled(true);
});
