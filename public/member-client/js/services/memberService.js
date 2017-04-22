var app = angular.module("memberService", []);


// Member service
app.factory('$memberService', function($http, $log, config, $authenticationService) {

    var members;

    return {
        init: function(){
            return {
                username: "",
                password: "",
                title: null,
                first_name: "",
                last_name: "",
                working_group_id: null,
                office_room_number: null,
                office_phone_number: null,
                office_email_address: null,
                subscribed: true,
                former: false
            };
        },
        copy: function(member){
            return {
                member_id: member.member_id,
                username: member.username,
                old_password: "",
                new_password: "",
                title: member.title,
                first_name: member.first_name,
                last_name: member.last_name,
                working_group_id: member.working_group_id,
                office_room_number: member.office_room_number,
                office_phone_number: member.office_phone_number,
                office_email_address: member.office_email_address,
                subscribed: member.subscribed,
                former: member.former
            };
        },
        get: function(){
            return members;
        },
        getByStatus: function(status){
            return _.where(members, { former: status });
        },
        set: function(data){
            members = data;
        },
        list: function() {
            return $http.get(config.apiURL + "/members", {
                headers: {
                    'Authorization': 'Bearer ' + $authenticationService.getToken()
                }
            });
        },
        listByCourse: function(course_id) {
            return $http.get(config.apiURL + "/courses/" + course_id + "/members", {
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
