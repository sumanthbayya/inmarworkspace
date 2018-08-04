/**
 * 
 */
/** DataTable Request User Search Start  */


productApp.controller('requestUserDetailsDatatable', ['$scope','userRequestService','$window','blockUI','$timeout','$translate','$rootScope',function($scope,userRequestService,$window,blockUI,$timeout,$translate,$rootScope) {
	var dt=new Date();
   $scope.itemsByPage = 10;
  $scope.collection = [];
  $scope.approveRow; 
  
  $scope.isAuthorized=function(screenN,functionN)
  {
	 
	$scope.authflag=false; 
	$scope.keepgoing=true;
	  angular.forEach($rootScope.screenFunctionList, function(row){
		if($scope.keepgoing){
			
	        if(row.screenName==screenN && row.functionName==functionN)
	        	{
	        	$scope.authflag=true;
	        	$scope.keepgoing=false;
	        	}
		}
	   });
	  return $scope.authflag;
  }
  $scope.init = function () {
	  userRequestService.getRequestData().then(
  			function(data){
					 $scope.collection=data;
			    	  $scope.displayed = [].concat($scope.collection);
					$scope.$digest();
  			},
  			function()
				{
					alert('error');
				}
  			);
    }
  
  $scope.refreshUser=function ()
  {
	  userRequestService.getRequestData().then(
	  			function(data){
						 $scope.collection=data;
				    	  $scope.displayed = [].concat($scope.collection);
						$scope.$digest();
	  			},
	  			function()
					{
						alert('error');
					}
	  			); 
  }
  
  $scope.redirectApproval = function(approveRow){
      $rootScope.approveRowValue=approveRow;
            $window.location.href = '#!requestUserApprove';
  }
}]);

/** User Request Service Start   */

productApp.service("userRequestService",['$http',function($http){
	
	this.getRequestData = function() { 
		return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/RequestUserSearch').then(
				function(response){
					resolve(response.data);
				},
				function(error){
					console.log("Inside Request User Search",+data);
					reject([]);
				});
		});
		}
	this.searchRequestUpdate = function(data) {
		 
		return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/RequestUserUpdateSearch',data).then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
		
		
	}
	this.approveUser =function(data)
	{
		console.log(data);
        return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/ApproveUserSave',data).then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
	this.getRoles=function()
	{
      return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/getRoles').then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
	this.getAreaCodes=function()
	{
      return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/getAreaCode').then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
	this.getCountries=function()
	{
      return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/getCountries').then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
	this.getLanguages=function()
	{
      return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/getLanguages').then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
	this.denyUser =function(data)
	{
		console.log(data);
        return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/DenyUserSave',data).then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}

}]);
/** User Request Service End   */


/** Manage Update User Search Start   */
productApp.controller('approveDenyUpdateController', ['$scope','$window','userRequestService','$rootScope',function($scope,$window,userRequestService,$rootScope) {//alert('hi');
    // $scope.countries = [ {key:null,value :"Please Select"},{key:'IN',value : 'India'},{key:'CH',value : 'China'}];
    // $scope.languages = [ {key:null,value : "Please Select"},{key:'EN',value : 'English'},{key:'CH',value : 'Chinese'}];
     $scope.statusList = [ {key:null,value : "Please Select"},{key:"Y",value : "Active"},{key:"N",value : "Inactive"}];
     //$scope.roleUserList = [ {key:null,value : "Please Select"},{key:"ADM",value : "Admin"},{key:"ENG",value : "Engineer"},{key:"OPR",value : "Operator"},{key:"MGR",value : "Manager"}];
     $scope.requestUser;
     $scope.approveorDeny;
     $scope.areaSelectedList=[];
	 $scope.allAreaList=[];
	 
	 $scope.areaSelectedList = [];
		$scope.isDisabled = false;
		$scope.allAreaList = [];

		/*userRequestService.getAreaCodes().then(

		function(data) {
			$scope.allAreaList = data;
			$scope.$digest();
		}, function() {
			alert('error');
		}

		);*/
     userRequestService.getRoles().then(

				function(data){ 
					 $scope.roleUserList=data;
					$scope.$digest();
				},
				function()
				{
					alert('error');
				}
				
			  );
     userRequestService.getCountries().then(

 			function(data){ 
 				 $scope.countries=data;
 				$scope.$digest();
 			},
 			function()
 			{
 				alert('error');
 			}
 			
 		  );
     userRequestService.getLanguages().then(

 			function(data){ 
 				 $scope.languages=data;
 				$scope.$digest();
 			},
 			function()
 			{
 				alert('error');
 			}
 			
 		  );
     $scope.isAuthorized=function(screenN,functionN)
     {
   	 
   	$scope.authflag=false; 
   	$scope.keepgoing=true;
   	  angular.forEach($rootScope.screenFunctionList, function(row){
   		if($scope.keepgoing){
   			
   	        if(row.screenName==screenN && row.functionName==functionN)
   	        	{
   	        	$scope.authflag=true;
   	        	$scope.keepgoing=false;
   	        	}
   		}
   	   });
   	  return $scope.authflag;
     }
		 userRequestService.searchRequestUpdate($rootScope.approveRowValue)
			.then(
				function(data){
					$scope.requestUser=data;									
					/*$scope.areaSelectedList = $scope.requestUser.areaSelectedList;
					
					angular
							.forEach(
									$scope.areaSelectedList ,
									function(value) {
										var index = $scope.allAreaList
										.indexOf(value);
								$scope.allAreaList.splice(index,
										1);
									});
					console.log("finally area list is :"+$scope.allAreaList);*/
					$scope.$digest();
					
				},
				function()
				{
					alert('error');
				}
				);
		 $scope.redirectToBack = function(){
	  		  $window.location.href = '#!requestUserSearch';
	  		}
		
     $scope.approve=function()
 	{
    	 $scope.formData ={
					'userObj':$scope.requestUser
					
			}
    	 
    	/* $scope.formData ={
					'userObj':$scope.requestUser,
					'selectedList':$scope.areaSelectedList
			}*/
    	 $scope.flag=$scope.validate('A');	
    	 if(!$scope.flag)
			{
 		 userRequestService.approveUser($scope.formData)
 			.then(
 				function(data){
 					$scope.message='{{"user.approveSuccessMessage.message" | translate}}';	
 					$scope.$digest();
 				},
 				function()
 				{
 					alert('error');
 					
 				}
 				);
			}
 	}
     $scope.deny=function()
  	{
    	 $scope.formVal ={
					'userObj':$scope.requestUser
					
			}
    	 /*$scope.formVal ={
					'userObj':$scope.requestUser,
					'selectedList':$scope.areaSelectedList
			}*/
  		$scope.flag=$scope.validate('D');
  		if(!$scope.flag)
  			{
  		 userRequestService.denyUser($scope.formVal)
  			.then(
  				function(data){
  					$scope.message='{{"user.denySuccessMessage.message" | translate}}';	
  					$scope.$digest();
  				},
  				function()
  				{
  					alert('error');
  					
  				}
  				);
  	}
  	}
  
     
     $scope.validate=function(text)
     {
    	
     	  $scope.flag = false;
     	  $scope.reqErrMsg=null;
     	  $scope.message=null;
     	  if($scope.requestUser==null || $scope.requestUser.city == '' || $scope.requestUser.city == null){
     	        $scope.reqErrMsg = '{{"User.city.Lable" | translate}}';
     	        $scope.flag = true;
     	  } 
     	 if($scope.requestUser==null || $scope.requestUser.country.key == '' || $scope.requestUser.country.key == null){
   		  if($scope.flag) {
   			  $scope.reqErrMsg += ', {{"User.country.Lable" | translate}}';
   		  }else{
   			  $scope.reqErrMsg = '{{"User.country.Lable" | translate}}';
   			  $scope.flag = true;
   		  }
  	     }
     	 if($scope.requestUser==null || $scope.requestUser.lang.key == '' || $scope.requestUser.lang.key == null){
    		  if($scope.flag) {
    			  $scope.reqErrMsg += ', {{"User.lang.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"User.lang.Lable" | translate}}';
    			  $scope.flag = true;
    		  }
   	     }
     	if(text=='A')
 		{
 	  if($scope.requestUser==null || $scope.requestUser.role.key == '' || $scope.requestUser.role.key == null){
 		  if($scope.flag) {
 			  $scope.reqErrMsg += ', {{"roleMaintenance.role.Lable" | translate}}';
 		  }else{
 			  $scope.reqErrMsg = '{{"roleMaintenance.role.Lable" | translate}}';
 			  $scope.flag = true;
 		  }
	     }
 		}
     	if(!text=='D')
     		{
     	  if($scope.requestUser==null || $scope.requestUser.role.key == '' || $scope.requestUser.role.key == null){
     		  if($scope.flag) {
     			  $scope.reqErrMsg += ', {{"roleMaintenance.role.Lable" | translate}}';
     		  }else{
     			  $scope.reqErrMsg = '{{"roleMaintenance.role.Lable" | translate}}';
     			  $scope.flag = true;
     		  }
    	     }
     		}
     	  if(text=='D')
     		  {
     		  console.log("Inside deny condition");
     	 if($scope.requestUser==null || $scope.requestUser.comments == '' || $scope.requestUser.comments == null){
    		  if($scope.flag) {
    			  $scope.reqErrMsg += ', {{"OEMDevice.comments.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"OEMDevice.comments.Lable" | translate}}';
    			  $scope.flag = true;
    		  }
   	     }
     		  }
     	 /* if($scope.areaSelectedList==null ||$scope.areaSelectedList== '')
		  {
		  if($scope.flag) { 
			  $scope.reqErrMsg +=', {{"common.area.Lable" | translate}}';
		  }
		  else{ 
			  $scope.reqErrMsg = '{{"common.area.Lable" | translate}}';
		     $scope.flag = true; } }*/
     	 if($scope.flag)  {
     		$scope.reqErrMsg += ' {{"User.save.req.err" | translate}}';
     	 }
     	
     	  return $scope.flag;
     	}
}]);





		

	
