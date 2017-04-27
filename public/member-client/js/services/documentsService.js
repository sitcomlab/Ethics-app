var app = angular.module("documentsService", []);


// Documents service
app.factory('$documentsService', function($http, $log, config, $authenticationService) {

    var documents;
    var filter = {
        offset: 0,
        limit: 50,
        orderby: "created.desc",
        document_status: "3"
    };
    var full_count = 0;

    return {
        get: function() {
            return documents;
        },
        getFilter: function(){
            return filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data) {
            documents = data;
        },
        setFilter: function(data) {
            filter = data;
        },
        setCount: function(data) {
            full_count = data;
        },
        list: function(filter) {
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "&offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "&limit=" + filter.limit + "&";
            }
            if(filter.document_status !== null){
                query = query + "status=" + filter.document_status + "&";
            } else {
                query = query + "";
            }

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/documents" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByCourse: function(course_id, filter){
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "&offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "&limit=" + filter.limit + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/courses/" + course_id + "/documents" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByUser: function(user_id, filter){
            var query = "?orderby=" + filter.orderby + "&";

            if(filter.offset && filter.offset !== null){
                query = query + "&offset=" + filter.offset + "&";
            }
            if(filter.limit && filter.limit !== null){
                query = query + "&limit=" + filter.limit + "&";
            }

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/users/" + user_id + "/documents" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }

    };

});
