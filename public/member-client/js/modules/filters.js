var app = angular.module("filters", []);

/**
 * timestamp filter
 */
app.filter('timestamp', function() {
    return function(timestamp) {
        return new Date(timestamp);
    };
});
