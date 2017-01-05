var app = angular.module("documentService", []);


// Document service
app.factory('$documentService', function($http, $log, config) {

    var document;

    return {
        init: function(){
            return {
                email_address: "",
                document_title: ""
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
        setDescription: function(revision_id, language, data){
            for(var i=0; i<document.revisions.length;i++){
                // Find revision
                if(document.revisions[i].revision_id === revision_id){
                    // Attach descriptions by language
                    switch(language){
                        case 'en': {
                            document.revisions[i].en = data;
                            break;
                        }
                        case 'de': {
                            document.revisions[i].de = data;
                            break;
                        }
                    }
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
        setFiles: function(data){
            document.files = data;
        },
        copy: function(){
            return {
                document_id: document.document_id,
                document_title: document.document_title
            };
        },
        create: function(user_id, data) {
            return $http.post(config.apiURL + "/users/" + user_id + "/documents", data);
        },
        retrieve: function(document_id) {
            return $http.get(config.apiURL + "/documents/" + document_id);
        },
        confirmIntro: function(document_id) {
            return $http.get(config.apiURL + "/documents/" + document_id + "/intro");
        },
        submit: function(document_id) {
            return $http.get(config.apiURL + "/documents/" + document_id + "/submit");
        },
        generateFiles: function(document_id) {
            return $http.get(config.apiURL + "/documents/" + document_id + "/files");
        },
        edit: function(document_id, data) {
            return $http.put(config.apiURL + "/documents/" + document_id, data);
        },
        delete: function(document_id) {
            return $http.delete(config.apiURL + "/documents/" + document_id);
        }

    };

});
