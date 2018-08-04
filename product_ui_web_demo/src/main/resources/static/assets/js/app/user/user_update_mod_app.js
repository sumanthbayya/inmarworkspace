/**
 * 
 */
/**  Update User Search Start   */
productApp.controller('UpdateUserController', ['$scope','userUpdateService','blockUI','$timeout','$translate','$rootScope',function($scope,userUpdateService,blockUI,$timeout,$translate,$rootScope) {
		$scope.pageNav = 'Home>Update Profile';        
        $rootScope.userId;
       // $scope.countries = [ {key:null,value :"Please Select"},{key:'IN',value : 'India'},{key:'CH',value : 'China'}];
        //$scope.languages = [ {key:null,value : "Please Select"},{key:'EN',value : 'English'},{key:'CH',value : 'Chinese'}];
        $scope.statusList = [{key:"Y",value : "Active"},{key:"N",value : "Inactive"}];
       // $scope.roleUserList = [ {key:null,value : "Please Select"},{key:"ADM",value : "Admin"},{key:"ENG",value : "Engineer"},{key:"OPR",value : "Operator"},{key:"MGR",value : "Manager"}];     
        $scope.wslTextDisable=false;
        $scope.flag = false;
        $scope.message;
        $scope.areaSelectedList=[];
   	     $scope.allAreaList=[];
   	
    	$scope.changeLanguage = function(lang){
     	   $translate.use(lang); 
     	  }
    	$scope.updateUser;
    	
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
    	/*userUpdateService.getAreaCodes().then(

    			function(data) {
    				$scope.allAreaList = data;
    				$scope.$digest();
    			}, function() {
    				alert('error');
    			}

    			);*/
    	
    	userUpdateService.getRoles().then(

 				function(data){ 
 					 $scope.roleUserList=data;
 					$scope.$digest();
 				},
 				function()
 				{
 					alert('error');
 				}
 				
 			  );
    	userUpdateService.getCountries().then(

    			function(data){ 
    				 $scope.countries=data;
    				$scope.$digest();
    			},
    			function()
    			{
    				alert('error');
    			}
    			
    		  );
    	userUpdateService.getLanguages().then(

    			function(data){ 
    				 $scope.languages=data;
    				$scope.$digest();
    			},
    			function()
    			{
    				alert('error');
    			}
    			
    		  );
        $scope.init = function () {
        	 
        	userUpdateService.searchUpdate($rootScope.userId)
			.then(
				function(data){					
					console.log(data);
					
					$scope.updateUser=data;									
					/*$scope.areaSelectedList = $scope.updateUser.areaSelectedList;
					
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
          }
        
        $scope.updateUserDetail=function()
    	{
        	 /*$scope.formVal ={
 					'userObj':$scope.updateUser,
 					'selectedList':$scope.areaSelectedList
 			}*/
        	 
        	 $scope.formVal ={
  					'userObj':$scope.updateUser
  			}
        	$scope.flag=$scope.validate();	
       	 if(!$scope.flag)
   			{
        	userUpdateService.updateUserService($scope.formVal)
    			.then(
    				function(data){
    					
    					$scope.message='{{"user.updateSuccessMessage.message" | translate}}';
    					$scope.$digest();
    				},
    				function()
    				{
    					alert('error');
    					
    				}
    				);
   			}
    		
    	}
        
        $scope.validate=function()
        {
        	  $scope.flag = false;
        	  $scope.reqErrMsg=null;
        	  if($scope.updateUser==null || $scope.updateUser.city == '' || $scope.updateUser.city == null){
        	        $scope.reqErrMsg = '{{"User.city.Lable" | translate}}';
        	        $scope.flag = true;
        	  } 
        	 if($scope.updateUser==null || $scope.updateUser.country.key == '' || $scope.updateUser.country.key == null){
      		  if($scope.flag) {
      			  $scope.reqErrMsg += ', {{"User.country.Lable" | translate}}';
      		  }else{
      			  $scope.reqErrMsg = '{{"User.country.Lable" | translate}}';
      			  $scope.flag = true;
      		  }
     	     }
        	 if($scope.updateUser==null || $scope.updateUser.lang.key == '' || $scope.updateUser.lang.key == null){
       		  if($scope.flag) {
       			  $scope.reqErrMsg += ', {{"User.lang.Lable" | translate}}';
       		  }else{
       			  $scope.reqErrMsg = '{{"User.lang.Lable" | translate}}';
       			  $scope.flag = true;
       		  }
      	     }
        	  if($scope.updateUser==null || $scope.updateUser.role.key == '' || $scope.updateUser.role.key == null){
        		  if($scope.flag) {
        			  $scope.reqErrMsg += ', {{"roleMaintenance.role.Lable" | translate}}';
        		  }else{
        			  $scope.reqErrMsg = '{{"roleMaintenance.role.Lable" | translate}}';
        			  $scope.flag = true;
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
/**  Update User Search End   */
		

/**  Update User Service Start   */	
productApp.service("userUpdateService",['$http',function($http){
	this.searchUpdate = function(data) {
		 
		return new Promise(function(resolve,reject){
			console.log(data);
			$http.post('http://localhost:9060/EsipService/User/UpdateUserSearch',data).then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
		
		
	}
	this.updateUserService=function(data)
	{
		
        return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/UpdateUser',data).then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
	this.saveUserService=function(data)
	{
		
        return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/SaveUserReg',data).then(
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
	this.getRolesReg=function()
	{
      return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/getRoleList').then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
	this.getCountriesReg=function()
	{
      return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/getCountriesReg').then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
	this.getLanguagesReg=function()
	{
      return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/User/getLanguagesReg').then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
	}
}]);
/** Update  User Service End   */

productApp.controller('UserRegController', ['$scope','userUpdateService','blockUI','$timeout','$translate','$rootScope',function($scope,userUpdateService,blockUI,$timeout,$translate,$rootScope) {
	$scope.pageNav = 'Home>User Registration';        
    //$rootScope.userId;
    //$scope.countries = [ {key:null,value :"Please Select"},{key:'IN',value : 'India'},{key:'CH',value : 'China'}];
    //$scope.languages = [ {key:null,value : "Please Select"},{key:'EN',value : 'English'},{key:'CH',value : 'Chinese'}];
	$scope.statusList = [ {
		key : null,
		value : "Please Select"
	}, {
		key : "Y",
		value : "Active"
	}, {
		key : "N",
		value : "Inactive"
	} ];
   // $scope.roleUserList = [ {key:null,value : "Please Select"},{key:"ADM",value : "Admin"},{key:"ENG",value : "Engineer"},{key:"OPR",value : "Operator"},{key:"MGR",value : "Manager"}];     
    $scope.wslTextDisable=false;
    $scope.flag = false;
    $scope.message;
    $scope.areaSelectedList=[];
	     $scope.allAreaList=[];
	
	$scope.changeLanguage = function(lang){
 	   $translate.use(lang); 
 	  }
	$scope.regUser;
	$scope.regUser = {
			country : {
				key : null,
				value : "Please Select"
			},
			lang : {
				key : null,
				value : "Please Select"
			},
			status : {
				key : "Y",
				value : "Active"
			},
			role : {
				key : null,
				value : "Please Select"
			}
		}
	/*userUpdateService.getAreaCodes().then(

			function(data) {
				$scope.allAreaList = data;
				$scope.$digest();
			}, function() {
				alert('error');
			}

			);*/
	
	userUpdateService.getRolesReg().then(

				function(data){ 
					 $scope.roleUserList=arrayToSingleSelect(data);
					$scope.$digest();
				},
				function()
				{
					alert('error');
				}
				
			  );
	userUpdateService.getCountriesReg().then(

			function(data){ 
				 $scope.countries=arrayToSingleSelect(data);
				$scope.$digest();
			},
			function()
			{
				alert('error');
			}
			
		  );
	userUpdateService.getLanguagesReg().then(

			function(data){ 
				 $scope.languages=arrayToSingleSelect(data);
				$scope.$digest();
			},
			function()
			{
				alert('error');
			}
			
		  );
   /* $scope.init = function () {
    	 
    	userUpdateService.searchUpdate($rootScope.userId)
		.then(
			function(data){					
				console.log(data);
				
				$scope.updateUser=data;									
				$scope.areaSelectedList = $scope.updateUser.areaSelectedList;
				
				angular
						.forEach(
								$scope.areaSelectedList ,
								function(value) {
									var index = $scope.allAreaList
									.indexOf(value);
							$scope.allAreaList.splice(index,
									1);
								});
				console.log("finally area list is :"+$scope.allAreaList);
				$scope.$digest();
			},
			function()
			{
				alert('error');
			}
			);
      }*/
    
    $scope.userRegSave=function()
	{
    	 $scope.formVal ={
					'userObj':$scope.regUser
			}
    	 
    	/* $scope.formVal ={
					'userObj':$scope.regUser,
					'selectedList':$scope.areaSelectedList
			}*/
    	$scope.flag=$scope.validate();	
   	 if(!$scope.flag)
			{
    	userUpdateService.saveUserService($scope.formVal)
			.then(
				function(data){
					
					$scope.message='{{"user.success.userReg.messsage" | translate}}';
					$scope.$digest();
				},
				function()
				{
					alert('error');
					
				}
				);
			}
		
	}
    
    $scope.validate=function()
    {
    	  $scope.flag = false;
    	  $scope.reqErrMsg=null;
    	  $scope.message=null;
    	  if($scope.regUser==null || $scope.regUser.cdsid == '' || $scope.regUser.cdsid == null){
  	        $scope.reqErrMsg = '{{"User.CdsID.Lable" | translate}}';
  	        $scope.flag = true;
  	  }
    	  if($scope.regUser==null || $scope.regUser.fName == '' || $scope.regUser.fName == null){
    		  if($scope.flag) {
    	        $scope.reqErrMsg += ', {{"User.FirstName.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"User.FirstName.Lable" | translate}}';
    	          $scope.flag = true;
    	  }
    	  } 
    	  if($scope.regUser==null || $scope.regUser.lName == '' || $scope.regUser.lName == null){
    		  if($scope.flag) {
    	        $scope.reqErrMsg += ', {{"User.LastName.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"User.LastName.Lable" | translate}}';
    	          $scope.flag = true;
    	  }
    	  }
    	  if($scope.regUser==null || $scope.regUser.email == '' || $scope.regUser.email == null){
    		  if($scope.flag) {
    	        $scope.reqErrMsg += ', {{"User.email.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"User.email.Lable" | translate}}';
    	          $scope.flag = true;
    	  }
    	  }
    	  if($scope.regUser==null || $scope.regUser.wPhone == '' || $scope.regUser.wPhone == null){
    		  if($scope.flag) {
    	        $scope.reqErrMsg += ', {{"User.workPhone.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"User.workPhone.Lable" | translate}}';
    	          $scope.flag = true;
    	  }
    	  }
    	  if($scope.regUser==null || $scope.regUser.addr1 == '' || $scope.regUser.addr1 == null){
    		  if($scope.flag) {
    	        $scope.reqErrMsg += ', {{"User.addr1.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"User.addr1.Lable" | translate}}';
    	          $scope.flag = true;
    	  }
    	  }
    	  if($scope.regUser==null || $scope.regUser.city == '' || $scope.regUser.city == null){
    		  if($scope.flag) {
    	        $scope.reqErrMsg += ', {{"User.city.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"User.city.Lable" | translate}}';
    	          $scope.flag = true;
    	  }
    	  }
    	 if($scope.regUser==null || $scope.regUser.country.key == '' || $scope.regUser.country.key == null){
  		  if($scope.flag) {
  			  $scope.reqErrMsg += ', {{"User.country.Lable" | translate}}';
  		  }else{
  			  $scope.reqErrMsg = '{{"User.country.Lable" | translate}}';
  			  $scope.flag = true;
  		  }
 	     }
    	 if($scope.regUser==null || $scope.regUser.lang.key == '' || $scope.regUser.lang.key == null){
   		  if($scope.flag) {
   			  $scope.reqErrMsg += ', {{"User.lang.Lable" | translate}}';
   		  }else{
   			  $scope.reqErrMsg = '{{"User.lang.Lable" | translate}}';
   			  $scope.flag = true;
   		  }
  	     }
    	  /*if($scope.regUser==null || $scope.regUser.role.key == '' || $scope.regUser.role.key == null){
    		  if($scope.flag) {
    			  $scope.reqErrMsg += ', {{"roleMaintenance.role.Lable" | translate}}';
    		  }else{
    			  $scope.reqErrMsg = '{{"roleMaintenance.role.Lable" | translate}}';
    			  $scope.flag = true;
    		  }
   	     }*/
    	  /*if($scope.areaSelectedList==null ||$scope.areaSelectedList== '')
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
