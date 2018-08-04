
productApp.controller("blockUiController",function($scope,$http){
	
    /*$scope.delay = 1000;
	$scope.showBlockUI = false;*/
	
   /* $scope.triggerAjaxCall = function() {
    	$scope.blockUI();
        $http.get('/GetDelayedText?milliSeconds='+$scope.delay).
         success(function(data, status, headers, config) {
            //alert(data);
            //$scope.unBlockUI(); 
         }).error(function(data, status, headers, config) {
        	//alert(data);
        	//$scope.unBlockUI();
         }); 
    };*/
    $scope.blockUI = function() {
    	$scope.showBlockUI = true;
    	$scope.$apply();
    };
    
    $scope.unBlockUI = function() {
    	$scope.showBlockUI = false;
    	$scope.$apply();
    };
    	
	
});
