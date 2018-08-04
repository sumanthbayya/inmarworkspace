productApp.controller('roleMaintenanceCtrl',['$scope','blockUI','$timeout','$translate', function($scope,blockUI,$timeout,$translate){
	
	$scope.pageNav = 'Home>Role Maintenance';
	
	$scope.screenNames = ["User Registration","Role Maintenance"];
	$scope.selectedScreen=[];
	$scope.functions = ["Save","Upload"];
	$scope.selectedFunction=[];
	$scope.roles = ["Admin","Engineer"];
	$scope.selectedRoles=[];
	
	
	
	$scope.addRole=true;
	$scope.mapRole= false;
	
	
	$scope.addRole=true;
    $scope.toggleEvent1=function(){
 	if($scope.addRole)
 		$scope.mapRole=false;
 	else
 		$scope.mapRole=true;
    }

    $scope.toggleEvent2=function(){
 	if($scope.mapRole)
 		$scope.addRole=false;
 	else
 		$scope.addRole=true;
    }
    
 	$scope.addRole=true;
   

}]);





	    
	



	   
	    
	   

