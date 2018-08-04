function rowSelectAll() {

  return {
    require: '^stTable',
    template: '<input type="checkbox"> ',
    scope: {
      all: '=rowSelectAll',
      selected: '='
          },
    link: function (scope, element, attr) {

      scope.isAllSelected = false;

      element.bind('click', function (evt) {

        scope.$apply(function () {

          scope.all.forEach(function (val) {
          val.isSelected = scope.isAllSelected;
         });
        
        });
       

      });
//checkAll will be enabled/disabled based on this function
      scope.$watchCollection('selected', function(newVal) {
        
        var s = newVal.length;
        var a = scope.all.length;   
        if ((s == a) && s > 0 && a > 0) {
         element.find('input').prop('checked', true);
          scope.isAllSelected = false; 

        } 
        else {
         element.find('input').prop('checked', false);         
          scope.isAllSelected = true;

        }

      });
    }
  };
}

productApp
.directive('rowSelectAll', rowSelectAll)
