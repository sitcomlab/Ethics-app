var app = angular.module("memberService", []);


// Member service
app.factory('$memberService', function($http, $log, config, $authenticationService) {

    var members;
    var filter = {
        offset: 0,
        limit: 50,
        former: false
    };
    var full_count = 0;

    return {
        init: function(){
            return {
                email_address: "",
                password: "",
                title: null,
                first_name: "",
                last_name: "",
                working_group_id: null,
                office_room_number: null,
                office_phone_number: null,
                office_email_address: null,
                subscribed: true,
                former: false,
                admin: false
            };
        },
        copy: function(member){
            return {
                member_id: member.member_id,
                email_address: member.email_address,
                new_password: false,
                old_password: "",
                password: "",
                title: member.title,
                first_name: member.first_name,
                last_name: member.last_name,
                working_group_id: member.working_group_id,
                office_room_number: member.office_room_number,
                office_phone_number: member.office_phone_number,
                office_email_address: member.office_email_address,
                subscribed: member.subscribed,
                former: member.former,
                admin: member.admin
            };
        },
        get: function(){
            return members;
        },
        getFilter: function(){
            return filter;
        },
        getCount: function(){
            return full_count;
        },
        set: function(data){
            members = data;
        },
        setFilter: function(data) {
            filter = data;
        },
        setCount: function(data) {
            full_count = data;
        },
        list: function(filter) {
            var query = "?offset=" + filter.offset + "&limit=" + filter.limit + "&former=" + filter.former + "&";

            // TODO: Add orderby

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/members" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByUniversity: function(university_id, filter) {
            var query = "?former=" + filter.former + "&";

            // TODO: Add orderby

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/universities/" + university_id + "/members" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByInstitute: function(institute_id, filter) {
            var query = "?former=" + filter.former + "&";

            // TODO: Add orderby

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/institutes/" + institute_id + "/members" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByWorkingGroup: function(working_group_id, filter) {
            var query = "?former=" + filter.former + "&";

            // TODO: Add orderby

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/working_groups/" + working_group_id + "/members" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByCourse: function(course_id, filter) {
            var query = "?former=" + filter.former + "&";

            // TODO: Add orderby

            query = query.slice(0, -1);

            return $http.get(config.apiURL + "/courses/" + course_id + "/members" + query, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        create: function(data){
            return $http.post(config.apiURL + "/members" , data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        retrieve: function(member_id) {
            return $http.get(config.apiURL + "/members/" + member_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        edit: function(member_id, data){
            return $http.put(config.apiURL + "/members/" + member_id, data, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        remove: function(member_id){
            return $http.delete(config.apiURL + "/members/" + member_id, {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        }
    };

});
