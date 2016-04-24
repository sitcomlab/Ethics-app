var app = angular.module("ethics-app");


// LIST
app.controller("DocListController", function($scope, $location, $docService, $filter, $ngBootbox) {

    // API
    $scope.loadData = function() {
        $docService.list().success(function(response) {
            $scope.docs = response;
        }).error(function(err) {
            $scope.err = err;
        });
    };

    // INIT
    $scope.docs = [];
    $scope.loadData();


    // CLEAN DOCS-ARRAY
    $scope.clean = function() {
        $scope.docs = [];
    }


    // DELETE
    $scope.delete = function(doc) {

        var attention = $filter('translate')('DIALOG_ATTENTION');
        var message_1 = $filter('translate')('DIALOG_DELETE_DOC');
        var message_2 = $filter('translate')('DIALOG_DELETE_END');

        var button_cancel = $filter('translate')('BUTTON_CANCEL');
        var button_ok = $filter('translate')('BUTTON_OK');

        $ngBootbox.customDialog({
            message: message_1 + ' <kbd>' + doc.doc_id + '</kbd> ' + message_2,
            title: '<i class="fa fa-exclamation-triangle"></i>&nbsp;&nbsp;' + attention,
            buttons: {
                warning: {
                    label: button_cancel,
                    className: "btn-secondary",
                    callback: function() {}
                },
                success: {
                    label: button_ok,
                    className: "btn-primary",
                    callback: function() {
                        $ruleService.delete(doc._id)
                            .success(function(response) {
                                delete $scope.doc;
                                //$location.url("/docs");
                                $scope.loadData();
                            })
                            .error(function(err) {
                                $scope.err = err;
                            });
                    }
                }
            }
        });
    };
});
