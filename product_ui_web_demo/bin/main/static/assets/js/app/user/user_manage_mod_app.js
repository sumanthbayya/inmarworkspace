/**
 * 
 */
/** Manage User Controller Start */
productApp.controller('manageUserController', [
		'$scope',
		'userManageService',
		'$window',
		'blockUI',
		'$timeout',
		'$translate',
		'$rootScope',
		function($scope, userManageService, $window, blockUI, $timeout,
				$translate, $rootScope) {
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
			// $scope.roleUserList = [ {key:null,value : "Please
			// Select"},{key:"ADM",value : "Admin"},{key:"ENG",value :
			// "Engineer"},{key:"OPR",value : "Operator"},{key:"MGR",value :
			// "Manager"}];
			$scope.flag = false;
			$scope.reqErrMsg = "";
			$scope.reqSrchErrMsg = null;
			$scope.itemsByPage = 10;
			$scope.collection = [];
			$scope.row;
			$scope.errMessage;
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
			$scope.user = {
				roleSearch : {
					key : null,
					value : "Please Select"
				},
				statusSearch : {
					key : null,
					value : "Please Select"
				}
			}
			$scope.changeLanguage = function(lang) {
				$translate.use(lang);
			}
			$scope.refreshUser = function() {
				$scope.user = {
					statusSearch : {
						key : null,
						value : "Please Select"
					},
					roleSearch : {
						key : null,
						value : "Please Select"
					},
					fNameSearch : null,
					cdsidSearch : null,
					lNameSearch : null,
					emailSearch : null
					
				}
				$scope.init();
				$scope.message=""; 
				$scope.reqErrMsg="";
			}

			$scope.searchUser = function(succflag) {
				$scope.message=""; 
				$scope.reqErrMsg="";
				if (!$scope.flag) {
					userManageService.searchUserService($scope.user)
							.then(
									function(data) {
										/*
										 * if(data==null ||data=='') {
										 * $scope.errMessage='{{"common.noRecordsFound.message" |
										 * translate}}'; }
										 */

										$scope.collection = data;
										$scope.displayed = []
												.concat($scope.collection);
										if(succflag){
				 		  					 if(data==null ||data==''){
				 		  						 console.log("insde error message");
				 		  					  $scope.reqErrMsg = '{{"common.records.notFound" | translate}}';
				 		  					}
				 		  				}
										$scope.$digest();
									}, function() {
										alert('error');
									});
				}
				$timeout(function() { /* blockUI.stop(); */
				}, 0);

			}

			$scope.manageUpdateUser = function(row) {
				$rootScope.rowValue = row;
				$window.location.href = '#!manageUserUpdate';
			}

			$scope.init = function() {

				userManageService.getRoles().then(

				function(data) {
					$scope.roleUserList = data;

					$scope.$digest();
				}, function() {
					alert('error');
				}

				);
				$scope.message=""; 
				$scope.reqErrMsg="";
				$scope.searchUser(false);
			}

		} ]);

/** Manage User Controller End */

/** Manage User Service Start */

productApp
		.service(
				"userManageService",
				[
						'$http',
						function($http) {

							this.searchUserService = function(data) {
								return new Promise(
										function(resolve, reject) {

											$http
													.post(
															'http://localhost:9060/EsipService/User/ManageUserSearch',
															data)
													.then(
															function(response) {
																resolve(response.data);
															},
															function(error) {
																console
																		.log(
																				"Inside ManageUser Search",
																				+data);
																reject([]);
															});
										});
							}
							this.searchManageUpdate = function(data) {

								return new Promise(
										function(resolve, reject) {

											$http
													.post(
															'http://localhost:9060/EsipService/User/ManageUserUpdateSearch',
															data)
													.then(function(response) {
														resolve(response.data);
													}, function(error) {
														reject([]);
													});
										});

							}

							this.saveUpdateUser = function(data) {
								console.log(data);
								console.log(data.disableFlag);
								return new Promise(
										function(resolve, reject) {

											$http
													.post(
															'http://localhost:9060/EsipService/User/ManageUserSave',
															data)
													.then(function(response) {
														resolve(response.data);
													}, function(error) {
														reject([]);
													});
										});
							}
							this.getRoles = function() {
								return new Promise(
										function(resolve, reject) {

											$http
													.post(
															'http://localhost:9060/EsipService/User/getRoles')
													.then(function(response) {
														resolve(response.data);
													}, function(error) {
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
							this.getAreaCodes = function() {
								return new Promise(
										function(resolve, reject) {

											$http
													.post(
															'http://localhost:9060/EsipService/User/getAreaCode')
													.then(function(response) {
														resolve(response.data);
													}, function(error) {
														reject([]);
													});
										});
							}

						} ]);
/** Manage User Service End */

/** Manage Update User Controller Start */
productApp
		.controller(
				'manageUserUpdateController',
				[
						'$scope',
						'$window',
						'userManageService',
						'$rootScope',
						function($scope, $window, userManageService, $rootScope) {// alert('hi');
							/*$scope.countries = [ {
								key : null,
								value : "Please Select"
							}, {
								key : 'IN',
								value : 'India'
							}, {
								key : 'CH',
								value : 'China'
							} ];
							//$scope.languages = [ {
								key : null,
								value : "Please Select"
							}, {
								key : 'EN',
								value : 'English'
							}, {
								key : 'CH',
								value : 'Chinese'
							} ];*/
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
							// $scope.roleUserList = [ {key:null,value : "Please
							// Select"},{key:"ADM",value :
							// "Admin"},{key:"ENG",value :
							// "Engineer"},{key:"OPR",value :
							// "Operator"},{key:"MGR",value : "Manager"}];
							$scope.areaSelectedList = [];
							$scope.isDisabled = false;
							$scope.allAreaList = [];
							
							
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
							

							/*userManageService.getAreaCodes().then(

							function(data) {
								$scope.allAreaList = data;
								$scope.$digest();
							}, function() {
								alert('error');
							}

							);*/

							userManageService.getRoles().then(

							function(data) {
								$scope.roleUserList = data;
								$scope.$digest();
							}, function() {
								alert('error');
							}

							);
							userManageService.getCountries().then(

									function(data){ 
										 $scope.countries=data;
										$scope.$digest();
									},
									function()
									{
										alert('error');
									}
									
								  );
							userManageService.getLanguages().then(

									function(data){ 
										 $scope.languages=data;
										$scope.$digest();
									},
									function()
									{
										alert('error');
									}
									
								  );
							userManageService
									.searchManageUpdate($rootScope.rowValue)
									.then(
											function(data) {
												$scope.manageUser = data;
												/*$scope.areaSelectedList = $scope.manageUser.areaSelectedList;
												
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

											}, function() {
												alert('error');
											});

							$scope.saveUser = function() {
								$scope.manage ={
										'userObj':$scope.manageUser
								}
								
								/*$scope.manage ={
										'userObj':$scope.manageUser,
										'selectedList':$scope.areaSelectedList
								}*/
										 /*'cdsid':$scope.manageUser.cdsid,
										 'fName':$scope.manageUser.fName,
										 'lName':$scope.manageUser.lName,
										 'email':$scope.manageUser.email,
										 'wPhone':$scope.manageUser.wPhone,
										 'addr1':$scope.manageUser.addr1,
										 'adrr2':$scope.manageUser.adrr2,
										 'city':$scope.manageUser.city,
										 'state':$scope.manageUser.state,
										 'pCode':$scope.manageUser.pCode,
										 'country':$scope.manageUser.country,
										 'lang':$scope.manageUser.lang,
										 'role':$scope.manageUser.role,
										 'disableFlag':$scope.manageUser.disableFlag,
										 'areaSelectedList': $scope.areaSelectedList,
							    	}*/ 
								$scope.flag = $scope.validate();
								if (!$scope.flag) {
									userManageService
											.saveUpdateUser($scope.manage)
											.then(
													function(data) {
														$scope.message = '{{"user.updateSuccessMessage.message" | translate}}';
														$scope.$digest();
													}, function() {
														alert('error');

													});
								}

							}
							$scope.redirectToBack = function() {
								$window.location.href = '#!manageUserSearch';
							}
							/*
							 * $scope.changeDisable =function() {
							 * if(data.disableFlag) { $scope.isDisabled=true; }
							 * else { $scope.isDisabled=false; } }
							 */
							$scope.validate = function() {
								$scope.flag = false;
								$scope.reqErrMsg = null;
								  $scope.message=null;
								if ($scope.manageUser == null
										|| $scope.manageUser.city == ''
										|| $scope.manageUser.city == null) {
									$scope.reqErrMsg = '{{"User.city.Lable" | translate}}';
									$scope.flag = true;
								}
								if ($scope.manageUser == null
										|| $scope.manageUser.country.key == ''
										|| $scope.manageUser.country.key == null) {
									if ($scope.flag) {
										$scope.reqErrMsg += ', {{"User.country.Lable" | translate}}';
									} else {
										$scope.reqErrMsg = '{{"User.country.Lable" | translate}}';
										$scope.flag = true;
									}
								}
								if ($scope.manageUser == null
										|| $scope.manageUser.lang.key == ''
										|| $scope.manageUser.lang.key == null) {
									if ($scope.flag) {
										$scope.reqErrMsg += ', {{"User.lang.Lable" | translate}}';
									} else {
										$scope.reqErrMsg = '{{"User.lang.Lable" | translate}}';
										$scope.flag = true;
									}
								}
								if ($scope.manageUser == null
										|| $scope.manageUser.role.key == ''
										|| $scope.manageUser.role.key == null) {
									if ($scope.flag) {
										$scope.reqErrMsg += ', {{"roleMaintenance.role.Lable" | translate}}';
									} else {
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
								 
								if ($scope.flag) {
									$scope.reqErrMsg += ' {{"User.save.req.err" | translate}}';
								}

								return $scope.flag;
							}

						} ]);

/** DataTable Manage User Controller End */

/** Length Directive Start */

productApp.directive("limitTo", [ function() {
	return {
		restrict : "A",
		link : function(scope, elem, attrs) {
			var limit = parseInt(attrs.limitTo);
			angular.element(elem).on("keypress", function(e) {
				if (this.value.length == limit)
					e.preventDefault();
			});
		}
	}
} ]);
/** Length Directive End */

