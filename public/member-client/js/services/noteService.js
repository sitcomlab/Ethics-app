var app = angular.module("noteService", []);


// Notes service
app.factory('$noteService', function($http, $log, config, $authenticationService) {

    return {
        get: function(document_id) {
            return $http.get(config.apiURL + "/documents/" + document_id + "/notes", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        save: function(note_id, data) {
            return $http.put(config.apiURL + "/notes/" + note_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
