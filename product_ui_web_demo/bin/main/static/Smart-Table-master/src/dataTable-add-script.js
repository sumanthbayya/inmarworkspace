

angular
  .module('productApp', ['smart-table'])
  .controller('mainCtrl', MainCtrl)

function MainCtrl() { 

  var vm = this;
  
  // Declare the array for the selected items
  vm.selected = []; 
  
  // Function to get data for all selected items
  vm.selectAll = function (collection) {
    
    // if there are no items in the 'selected' array, 
    // push all elements to 'selected'
    if (vm.selected.length === 0) {
      
      angular.forEach(collection, function(val) {
        
        vm.selected.push(val.id); 
        
      });
      
    // if there are items in the 'selected' array, 
    // add only those that ar not
    } else if (vm.selected.length > 0 && vm.selected.length != vm.data.length) {
      
      angular.forEach(collection, function(val) {
        
        var found = vm.selected.indexOf(val.id);
        
        if(found == -1) vm.selected.push(val.id);
        
      });
      
    // Otherwise, remove all items
    } else  {
      
      vm.selected = [];
      
    }
    
  };
  
  // Function to get data by selecting a single row
  vm.select = function(id) {
    
    var found = vm.selected.indexOf(id);
    
    if(found == -1) vm.selected.push(id);
    
    else vm.selected.splice(found, 1);
    
  }
  
    // Generating Smart Table Data Below
    var firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
    var lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
    var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
    var id = 1;

    function generateRandomItem(id) {

      var firstname = firstnames[Math.floor(Math.random() * 3)];
      var lastname = lastnames[Math.floor(Math.random() * 3)];
      var birthdate = dates[Math.floor(Math.random() * 3)];
      var balance = Math.floor(Math.random() * 2000);

      return {
          id: id,
          firstname: firstname,
          lastname: lastname,
          birthdate: new Date(birthdate),
          balance: balance
      }
    }

    vm.rowCollection = [];

    for (id; id < 21; id++) {
        vm.rowCollection.push(generateRandomItem(id));
    }

    
    
    vm.addNew = function()
    {
    	vm.rowCollection.push({ 
        	'id':"",
            'firstname': "", 
            'lastname': "",
            'birthdate': "",
            'balance': "",
        });
    	
    	
    }
    
    vm.data = [].concat(vm.rowCollection);
}
function rowSelectAll() {

	  return {
	    require: '^stTable',
	    template: '<input type="checkbox">',
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

	      scope.$watchCollection('selected', function(newVal) {

	        var s = newVal.length;
	        var a = scope.all.length;

	        if ((s == a) && s > 0 && a > 0) {

	          element.find('input').attr('checked', true);
	          scope.isAllSelected = false;

	        } else {

	          element.find('input').attr('checked', false);
	          scope.isAllSelected = true;

	        }

	      });
	    }
	  };
	}

	angular
	  .module('productApp')
	  .directive('rowSelectAll', rowSelectAll)
	  
	  function rowSelect() {
	  return {
	    require: '^stTable',
	    template: '<input type="checkbox">',
	    scope: {
	        row: '=rowSelect'
	    },
	    link: function (scope, element, attr, ctrl) {

	      element.bind('click', function (evt) {

	        scope.$apply(function () {

	            ctrl.select(scope.row, 'multiple');

	        });

	      });

	      scope.$watch('row.isSelected', function (newValue) {

	        if (newValue === true) {

	            element.parent().addClass('st-selected');
	            element.find('input').attr('checked', true);

	        } else {

	            element.parent().removeClass('st-selected');
	            element.find('input').attr('checked', false);

	        }
	      });
	    }
	  };
	}

	angular
	  .module('productApp')
	  .directive('rowSelect', rowSelect)