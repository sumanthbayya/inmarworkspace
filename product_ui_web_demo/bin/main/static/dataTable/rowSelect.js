function rowSelect() {
  return {
    require: '^stTable',
    template: '<input type="checkbox">',
    scope: {
        row: '=rowSelect',
        selectdt: '='
    },
    link: function (scope, element, attr, ctrl) {
      scope.selectdt=true;
      element.bind('click', function (evt) {
        scope.$apply(function () {
            ctrl.select(scope.row, 'multiple'); 
        });
      
      });
    
      scope.$watch('row.isSelected', function (newValue) {
        if (newValue === true) {
            element.parent().addClass('st-selected');
            element.find('input').prop('checked', true);
            scope.selectdt=true; 
        } else {
            element.parent().removeClass('st-selected');
            element.find('input').prop('checked', false);
            scope.selectdt=false;  
        }
      });
    }
  };
}
productApp
.directive('rowSelect', rowSelect)