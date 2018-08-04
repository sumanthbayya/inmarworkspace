
    productApp.directive('pageSelect', function() {
      return {
        restrict: 'E',
        template: '<input type="text"  style="height: 25px;width:65px;" class="select-page" ng-model="inputPage" ng-change="selectPage(inputPage)">',
        link: function(scope, element, attrs) {
          scope.$watch('currentPage', function(c) {
            scope.inputPage = c;
          });
        }
      }
    });