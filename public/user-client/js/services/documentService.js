var app = angular.module("documentService", []);


// Document service
app.factory('$documentService', function($http, $log, config, $authenticationService) {

    var document;

    return {
        init: function(){
            return {
                email_address: "",
                document_title: "",
                course_id: null
            };
        },
        copy: function(){
            return {
                document_id: document.document_id,
                document_title: document.document_title,
                course_id: document.course_id
            };
        },
        get: function(){
            return document;
        },
        getId: function(){
            if(document === undefined){
                return undefined;
            } else {
                return document.document_id;
            }
        },
        getUserId: function(){
            if(document === undefined){
                return undefined;
            } else {
                return document.user_id;
            }
        },
        getStatus: function(){
            if(document === undefined){
                return undefined;
            } else {
                return document.status;
            }
        },
        getRevisions: function(){
            if(document === undefined){
                return undefined;
            } else if(document.revisions === undefined) {
                return undefined;
            } else {
                return document.revisions;
            }
        },
        getLatestRevision: function(){
            if(document === undefined || document.revisions === undefined){
                return undefined;
            } else {
                return document.revisions[0];
            }
        },
        getFiles: function(){
            if(document === undefined){
                return undefined;
            } else if(document.files === undefined) {
                return undefined;
            } else {
                return document.files;
            }
        },
        set: function(data){
            document = data;
        },
        setRevisions: function(data){
            document.revisions = data;
        },
        setDescriptions: function(revision_id, data){
            for(var i=0; i<document.revisions.length;i++){
                // Find revision
                if(document.revisions[i].revision_id === revision_id){
                    // Attach descriptions
                    document.revisions[i].descriptions = data;
                }
            }
        },
        setConcerns: function(revision_id, data){
            for(var i=0; i<document.revisions.length;i++){
                // Find revision
                if(document.revisions[i].revision_id === revision_id){
                    // Attach concerns
                    document.revisions[i].concerns = data;
                }
            }
        },
        setComments: function(revision_id, data){
            for(var i=0; i<document.revisions.length;i++){
                // Find revision
                if(document.revisions[i].revision_id === revision_id){
                    // Attach review
                    document.revisions[i].comments = data;
                }
            }
        },
        setReviewers: function(revision_id, data){
            for(var i=0; i<document.revisions.length;i++){
                // Find revision
                if(document.revisions[i].revision_id === revision_id){
                    // Attach review
                    document.revisions[i].reviewer = data;
                }
            }
        },
        setFiles: function(data){
            document.files = data;
        },
        create: function(data) {
            return $http.post(config.getApiEndpoint() + "/documents", data);
        },
        retrieve: function(document_id) {
            return $http.get(config.getApiEndpoint() + "/documents/" + document_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        confirmIntro: function(document_id) {
            return $http.get(config.getApiEndpoint() + "/documents/" + document_id + "/intro", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        submit: function(document_id) {
            return $http.get(config.getApiEndpoint() + "/documents/" + document_id + "/submit", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        changeStatusTo1: function(document_id){
            return $http.put(config.getApiEndpoint() + "/documents/" + document_id + "/retract", {status: 1}, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
      
        generateFiles: function(document_id) {
            return $http.get(config.getApiEndpoint() + "/documents/" + document_id + "/files", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(document_id, data) {
            return $http.put(config.getApiEndpoint() + "/documents/" + document_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        delete: function(document_id) {
            return $http.delete(config.getApiEndpoint() + "/documents/" + document_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }

    };

});
