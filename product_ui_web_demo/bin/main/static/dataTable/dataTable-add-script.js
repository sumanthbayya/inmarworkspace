
 productApp.controller('editCtrlLayout',  ['$scope' ,'userService','$http',function($scope,userService,$http)  { 

	 
		  $scope.itemsByPage = 10;
	      $scope.dataCountPage=0;  
	      $scope.dataPerPage = 5;//datas per page for lazyloading     
	      
		    $scope.srchDataTable=function(){
		    	 $scope.addcollection=[];		    	   	
		     	$scope.dataadd=false;
		     	$scope.selectdt=false;
		    	userService.srchUserAllServ($scope.user)
	 			.then(
	 				function(data){	 					
	 					$scope.data =data;
						$scope.rowCollection=data;
						$scope.$digest();
	 				},
	 				function()
	 				{
	 					alert('error');
	 				}
	 				);
		    	
		    };  
		   
  // Declare the array for the selected items
  $scope.selected = []; 
  $scope.dataadd=false;
  // Function to get data for all selected items
  $scope.selectAll = function (collection) {
    
    // if there are no items in the 'selected' array, 
    // push all elements to 'selected'
    if ($scope.selected.length === 0) {
      
      angular.forEach(collection, function(val) {
        
       $scope.selected.push(val.id); 
        
      });
      
    // if there are items in the 'selected' array, 
    // add only those that ar not
    } else if ($scope.selected.length > 0 && $scope.selected.length != $scope.data.length) {
      
      angular.forEach(collection, function(val) {
        
        var found = $scope.selected.indexOf(val.id);
        
        if(found == -1) $scope.selected.push(val.id);
        
      });
      
    // Otherwise, remove all items
    } else  {
      
      $scope.selected = [];
      
    }
    
  };
  
  // Function to get data by selecting a single row
  $scope.select = function(id) {
    
    var found = $scope.selected.indexOf(id);
    
    if(found == -1) $scope.selected.push(id);
    
    else $scope.selected.splice(found, 1);
    
  }
  
    //Saving row data
	$scope.save = function(collection){
	 $scope.data = [];		   
  	  var newDataList=[];
	  	angular.forEach($scope.selected, function(row){
	  		alert("$scope.selected--"+$scope.selected);
	        if(row.selected){
	            row.isSelected=true;
	        }
	        else{
	        	row.isSelected=false;
	        }
	    });
        angular.forEach(collection, function(row){
            /*if(row.isSelected){
                newDataList.push(row);
            }*/
        	if($scope.selected.indexOf(row.id) !== -1) {
        		alert("succ"); newDataList.push(row);
        		}
        }); 
        $scope.data = newDataList;
        console.log("row---"+angular.toJson(newDataList));
    };


    
    //Adding new row data
   
    $scope.addcollection=[];
    $scope.addNew = function(){
    	$scope.data = [];   	
    	$scope.dataadd=true;
    	$scope.selectdt=true;
    	$scope.addcollection.push({
    		'id':111,
		    'firstName': "", 
		    'lastName': ""/*,
		    'birthdate': "",
		    'balance': ""  */      
    });   	
    	$scope.data=$scope.addcollection;
    	$scope.rowCollection=$scope.addcollection;
      };
         
      $scope.downloadExcel=function(collection){
        // Prepare Excel data:
 		$scope.fileName = "report";
 		$scope.exportData = [];

 	  // Headers:
 		$scope.exportData.push(["Id","firstName", "lastName"]);
 	  // Data:
 		angular.forEach(collection, function(value, key) {
 			$scope.exportData.push([value.id,value.firstName, value.lastName]);
 		 });		
 		var data=$scope.exportData;
 		exportJsonToExcel(data,"report");
 	  };
 	  
 	    
 	    
 	    	

 	    
   
	}])
	 .service("userService",['$http',function($http){
			
			 //Count query
			this.srchUserCount = function(data) { 
				return new Promise(function(resolve,reject){
					$http.get('http://localhost:9060/EsipService/User/UserDtlList/Count').then(
						function(response){
							resolve(response.data);
						},
						function(error){
							reject([]);
						});
				});
				}
			
			this.srchUserAllServ = function(data) { 
				return new Promise(function(resolve,reject){
					$http.get('http://localhost:9060/EsipService/User/UserDtlList').then(
						function(response){
							resolve(response.data);
						},
						function(error){
							reject([]);
						});
				});
				}
		
   }])
  

