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
        getRivisions: function(){
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
        set: function(data){
            document = data;
        },
        setRevisions: function(data){
            document.revisions = data;
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
        edit: function(document_id, data) {
            return $http.put(config.apiURL + "/documents/" + document_id, data);
        },
        delete: function(document_id) {
            return $http.delete(config.apiURL + "/documents/" + document_id);
        }

    };

});
