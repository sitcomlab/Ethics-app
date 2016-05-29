var app = angular.module("config", []);

/**
 * Constants
 */
app.constant("config", {
    appName: "Ethics-app",
    appVersion: "1.0",
    appReleaseYear: 2016,
    appLanguage: 'en_US',
    appDevelopers: [
        {
            "name": "Nicholas Schiestel",
            "github": "https://github.com/nicho90"
        },
        {
            "name": "Heinrich Löwen",
            "github": "https://github.com/heinrichloewen"
        }
    ],
    appGithub: "https://github.com/sitcomlab/Ethics-app",
    apiURL: "/api",
    timeZone: "+0100"
});
