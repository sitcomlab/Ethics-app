var app = angular.module("showErrors", []);


/**
 * Custum directive for validation
 */
app.directive('showErrors', function() {
    return {
        restrict: 'A',
        require: '^form',
        link: function(scope, el, attrs, formCtrl) {
            // find the text box element, which has the 'name' attribute
            var inputEl = el[0].querySelector("[name]");
            // convert the native text box element to an angular element
            var inputNgEl = angular.element(inputEl);
            // get the name on the text box
            var inputName = inputNgEl.attr('name');
            // only apply the has-error class after the user leaves the text box
            inputNgEl.bind('blur', function() {
                el.toggleClass('has-danger', formCtrl[inputName].$invalid);
            });
            // inside the directive's link function from the previous example
            scope.$on('show-errors-check-validity-eng', function() {
                if (formCtrl.$name === 'descriptionFormEng') {
                    el.toggleClass('has-danger', formCtrl[inputName].$invalid);
                }
            });
            scope.$on('show-errors-check-validity-ger', function() {
                if (formCtrl.$name === 'descriptionFormGer') {
                    el.toggleClass('has-danger', formCtrl[inputName].$invalid);
                }
            });
            scope.$on('show-errors-check-validity-ethics', function() {
                if (formCtrl.$name === 'ethicsForm') {
                    el.toggleClass('has-danger', formCtrl[inputName].$invalid);
                }
            });

        }
    };
});
