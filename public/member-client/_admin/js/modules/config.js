var app = angular.module("config", []);

// Constants
app.constant("config", {
    appName: "Ethics-app",
    appSubname: "ADMIN",
    appDevelopers: [{
        name: "Nicholas Schiestel",
        github: "nicho90"
    }],
    appGithub: "https://github.com/sitcomlab/Ethics-app",
    appVersion: "v1.0",
    appLanguage: 'en_US',
    appYear: moment().format("YYYY"),
    apiURL: "/api",
    timeZone: "Europe/Berlin",
    debugMode: false,
    html5Mode: true,
});