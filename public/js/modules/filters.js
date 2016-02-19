var app = angular.module("filters", []);

app.filter('timeFilter', function() {
    return function(time) {
        return time.substr(0, 5);
    };
});
