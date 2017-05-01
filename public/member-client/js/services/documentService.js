var app = angular.module("documentService", []);


// Document service
app.factory('$documentService', function($http, $log, config, $authenticationService) {

    var document;

    return {
        copy: function(document) {
            return {
                document_id: document.institute_id,
                document_title: document.document_title,
                user_id: document.user_id,
                status: document.status
            };
        },
        get: function() {
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
        setNotes: function(data){
            document.notes = data;
        },
        setFiles: function(data){
            document.files = data;
        },
        retrieve: function(document_id) {
            return $http.get(config.apiURL + "/documents/" + document_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(document_id, data) {
            return $http.put(config.apiURL + "/documents/" + document_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        changeStatus: function(document_id, data){
            return $http.put(config.apiURL + "/documents/" + document_id + "/status", data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        generateFiles: function(document_id) {
            return $http.get(config.apiURL + "/documents/" + document_id + "/files", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(document_id){
            return $http.delete(config.apiURL + "/documents/" + document_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
