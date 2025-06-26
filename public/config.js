var app = angular.module("config", []);

// Constants
app.constant("config", {
    appName: "Ethics-app",
    appSubnames: {
        user_client: "Ethics-app",
        member_client: "Ethics-app | Committee",
    },
    appGithub: "https://github.com/sitcomlab/Ethics-app",
    appVersion: "v1.0",
    appLanguage: 'en_US',
    appYear: moment().format("YYYY"),
    timeZone: "Europe/Berlin",
    debugMode: true,
    html5Mode: true,
    serverMode: 'production',
    serverSettings: {
        development: {
            host: 'http://localhost',
            port: 5000,
            apiPath: "/api",
            uploadPath: "/upload/",
            memberClientPath: '/member-client',
            userClientPath: '/user-client'
        },
        production: {
            host: 'https://giv-ethics-app.uni-muenster.de',
            port: 443,
            apiPath: "/app/api",
	    uploadPath: "/app/upload/",
            memberClientPath: '/app/member-client',
            userClientPath: '/app/user-client'
        }
    },
    getUploadEndpoint: function(){
        if(this.serverMode === 'production'){
            return this.serverSettings.production.host + ":" + this.serverSettings.production.port + this.serverSettings.production.uploadPath
        } else {
            return this.serverSettings.development.host + ":" + this.serverSettings.development.port + this.serverSettings.development.uploadPath
        }
    },
    getApiEndpoint: function(){
        if(this.serverMode === 'production'){
            return this.serverSettings.production.host + ":" + this.serverSettings.production.port + this.serverSettings.production.apiPath
        } else {
            return this.serverSettings.development.host + ":" + this.serverSettings.development.port + this.serverSettings.development.apiPath
        }
    },
    getURL: function(client){
        switch (client) {
            case 'member': {
                if(this.serverMode === 'production'){
                    return this.serverSettings.production.host + ":" + this.serverSettings.production.port + this.serverSettings.production.memberClientPath
                } else {
                    return this.serverSettings.development.host + ":" + this.serverSettings.development.port + this.serverSettings.development.memberClientPath
                }
                break;
            }
            case 'user': {
                if(this.serverMode === 'production'){
                    return this.serverSettings.production.host + ":" + this.serverSettings.production.port + this.serverSettings.production.userClientPath
                } else {
                    return this.serverSettings.development.host + ":" + this.serverSettings.development.port + this.serverSettings.development.userClientPath
                }
                break;
            }
            default: {
                if(this.serverMode === 'production'){
                    return this.serverSettings.production.host + ":" + this.serverSettings.production.port
                } else {
                    return this.serverSettings.development.host + ":" + this.serverSettings.development.port
                }
                break;
            }
        }
    }
});
