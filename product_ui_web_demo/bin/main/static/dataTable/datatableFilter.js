productApp.directive('onFilter', function () {
    return {
        require: '^stTable',
        scope: {
            onFilter: '='
        },
        link: function (scope, element, attr, ctrl) {

            scope.$watch(function () {
                return ctrl.tableState().search;
            }, function (newValue, oldValue) {
                scope.onFilter(ctrl);
            }, true);
        }
    };
});