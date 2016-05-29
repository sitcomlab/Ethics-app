var app = angular.module("init", []);


app.run(function($translate, $log, config) {

    $log.debug("* Initialising Application ... ");
    $log.debug("* Set Language to: English");
    $translate.use(config.appLanguage);

});
