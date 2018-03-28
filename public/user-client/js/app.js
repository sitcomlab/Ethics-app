var app = angular.module("ethics-app", [

    // Import translations
    "en_US",
    "de_DE",
    "pt_PT",

    // Import app settings
    "config",

    // Import external modules (libraries)
    "ngRoute",
    "ngSanitize",
    "pascalprecht.translate",
    "angular-momentjs",
    "underscore",
    "lr.upload",

    // Import own modules
    "filters",
    "routes",

    // Import services
    "authenticationService",
    "universityService",
    "instituteService",
    "courseService",
    "documentService",
    "revisionService",
    "descriptionService",
    "concernService",
    "commentService",
    "reviewerService",
    "userService",
    "recoveryService",
    "fileService",
    "memberService"

]);


/**
 * Configurating application before starting
 */
app.config(function($logProvider, $translateProvider, en_US, de_DE, pt_PT, config) {
    // Logging
    $logProvider.debugEnabled(config.debugMode);

    // Translations
    $translateProvider.translations('en_US', en_US);
    $translateProvider.translations('de_DE', de_DE);
    $translateProvider.translations('pt_PT', pt_PT);

    // Set default language
    $translateProvider.preferredLanguage(config.appLanguage);
    $translateProvider.useSanitizeValueStrategy('sanitize');
});

app.directive('validFile',function(){
  return {
    restrict: 'A',
    require:'ngModel',
    link:function(scope,el,attrs,ngModel){
      //change event is fired when file is selected
      el.bind('change',function(){
        scope.$apply(function(){
          scope[attrs['fileChange']](element[0].files);
          ngModel.$setViewValue(el.val());
          ngModel.$render();
        })
      })
    }
  }
})

//
// fileChange directive because ng-change doesn't work for file inputs.
//
app.directive('fileChange', function() {
return {
  restrict: 'A',
  link: function(scope, element, attrs) {
    element.bind('change', function() {
      scope.$apply(function() {
        scope[attrs['fileChange']](element[0].files);
      })
    })
  },
}
})

/**
 * Start application
 */
app.run(function($translate, $rootScope, config, en_US) {
    $rootScope.config = config;

    // Run with default language
    $translate.use(config.appLanguage);
});
