var app = angular.module("documentService", []);


// Document service
app.factory('$documentService', function($http, $log, config, $authenticationService) {

    var document;

    return {
        copy: function(document) {
            return {
                document_id: document.document_id,
                document_title: document.document_title,
                user_id: document.user_id,
                status: null
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

                    // Normalize for UI: if English missing but German present, make English fields available locally
                    try {
                        var desc = document.revisions[i].descriptions;
                        if(desc){
                            // Treat German content as displayable in the English slots (client-side only)
                            if((!desc.en_used || desc.en_used === false) && desc.de_used){
                                desc.en_used = true;
                            }
                            // Fill English fallbacks from German if empty (client-side only)
                            desc.en_title = desc.en_title || desc.de_title;
                            desc.en_researcher = desc.en_researcher || desc.de_researcher;
                            desc.en_study_time = desc.en_study_time || desc.de_study_time;
                            desc.en_purpose = desc.en_purpose || desc.de_purpose;
                            desc.en_procedure = desc.en_procedure || desc.de_procedure;
                            desc.en_duration = desc.en_duration || desc.de_duration;
                            desc.en_risks = desc.en_risks || desc.de_risks;
                            desc.en_benefits = desc.en_benefits || desc.de_benefits;
                            desc.en_purpose_and_procedure = desc.en_purpose_and_procedure || desc.de_purpose_and_procedure;
                        }
                    } catch(e){}
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
            return $http.get(config.getApiEndpoint() + "/documents/" + document_id, {
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
        changeStatus: function(document_id, data){
            return $http.put(config.getApiEndpoint() + "/documents/" + document_id + "/status", data, {
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
        remove: function(document_id){
            return $http.delete(config.getApiEndpoint() + "/documents/" + document_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
