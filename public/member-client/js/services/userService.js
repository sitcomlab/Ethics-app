var app = angular.module("userService", []);


// User service
app.factory('$userService', function($http, $log, config, $authenticationService) {

    var users;
    var filter = {
        offset: 0,
        limit: 2, // TEST 50
        blocked: false
    };
    var full_count = 0;

    return {
        init: function(){
            return {
                email_address: "",
                title: null,
                first_name: "",
                last_name: "",
                institute_id: null,
                blocked: false
            };
        },
        copy: function(user){
            return {
                user_id: user.user_id,
                email_address: user.email_address,
                title: user.title,
                first_name: user.first_name,
                last_name: user.last_name,
                institute_id: user.institute_id,
                blocked: user.blocked
            };
        },
        get: function(){
            return users;
        },
        getFilter: function(){
            return filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            users = data;
        },
        setFilter: function(data) {
            filter = data;
        },
        setCount: function(data) {
            full_count = data;
        },
        list: function(filter) {
            var query = "?offset=" + filter.offset + "&limit=" + filter.limit + "&blocked=" + filter.blocked + "&";

            // TODO: Add orderby

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/users" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/users" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(user_id){
            return $http.get(config.apiURL + "/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(user_id, data){
            return $http.put(config.apiURL + "/users/" + user_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(user_id){
            return $http.delete(config.apiURL + "/users/" + user_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
