var app = angular.module("showWrong", []);


/**
 * Custum directive for validation
 */
 app.directive('showWrong', function() {
     return {
         restrict: 'A',
         require: '^form',
         link: function(scope, el, attrs, formCtrl) {
             // find the text box element, which has the 'name' attribute
             var inputEls = el[0].querySelectorAll("[name]");
             var inputEl1 = inputEls[0];
             var inputEl2 = inputEls[1];
             var inputEl3 = inputEls[2];
             // convert the native text box element to an angular element
             var inputNgEl1 = angular.element(inputEl1);
             var inputNgEl2 = angular.element(inputEl2);
             var inputNgEl3 = angular.element(inputEl3);
             // get the name on the text box
             var inputName1 = inputNgEl1.attr('name');
             var inputName2 = inputNgEl2.attr('name');
             var inputName3 = inputNgEl3.attr('name');
             // only apply the has-error class after the user leaves the text box
             inputNgEl1.bind('blur', function() {
                 el.toggleClass('has-danger', formCtrl[inputName1].$invalid);
             });
             inputNgEl2.bind('blur', function() {
                 el.toggleClass('has-danger', formCtrl[inputName2].$invalid);
             });
             inputNgEl3.bind('blur', function() {
                 el.toggleClass('has-danger', formCtrl[inputName3].$invalid);
             });
             // inside the directive's link function from the previous example
             scope.$on('show-errors-check-validity-ethics', function() {
                 if (formCtrl.$name === 'ethicsForm') {
                     if (formCtrl[inputName1].$invalid) {
                         el.toggleClass('has-danger', formCtrl[inputName1].$invalid);
                     } else if (formCtrl[inputName2].$invalid){
                         el.toggleClass('has-danger', formCtrl[inputName2].$invalid);
                     } else if (formCtrl[inputName3].$invalid){
                         el.toggleClass('has-danger', formCtrl[inputName3].$invalid);
                     }
                 }
             });

         }
     };
 });
