var app = angular.module("config", []);

// Constants
app.constant("config", {
    appName: "Ethics-app",
    appDevelopers: [{
        name: "Nicholas Schiestel",
        github: "nicho90"
    },{
        name: "Heinrich Löwen",
        github: "heinrichloewen"
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
