var app = angular.module("init", []);


app.run(function($translate, $log, setup) {

    $log.debug("* Initialising Application ... ");
    $log.debug("* Set Language to: English");
    $translate.use(setup.standardLanguage);

});
