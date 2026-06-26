var app = angular.module("config", []);

// Constants
app.constant("config", {
    appName: "Ethics-app",
    appSubnames: {
        user_client: "Ethics-app",
        member_client: "Ethics-app | Committee",
    },
    appGithub: "https://github.com/sitcomlab/Ethics-app",
    appVersion: "v1.0",
    appLanguage: 'en_US',
    appYear: moment().format("YYYY"),
    timeZone: "Europe/Berlin",
    debugMode: true,
    html5Mode: true,
    getOrigin: function() {
        if (typeof window !== 'undefined' && window.location && window.location.origin) {
            return window.location.origin;
        }
        return 'http://localhost:5000';
    },
    // Production is served under /app/ (nginx); direct node access uses no prefix.
    getBasePrefix: function() {
        if (typeof window !== 'undefined' && window.location) {
            var pathname = window.location.pathname;
            if (pathname.indexOf('/app/') === 0 || pathname === '/app') {
                return '/app';
            }
        }
        return '';
    },
    getUploadEndpoint: function() {
        return this.getOrigin() + this.getBasePrefix() + '/upload/';
    },
    getApiEndpoint: function() {
        return this.getOrigin() + this.getBasePrefix() + '/api';
    },
    getURL: function(client) {
        switch (client) {
            case 'member':
                return this.getOrigin() + this.getBasePrefix() + '/member-client';
            case 'user':
                return this.getOrigin() + this.getBasePrefix() + '/user-client';
            default:
                return this.getOrigin();
        }
    }
});
