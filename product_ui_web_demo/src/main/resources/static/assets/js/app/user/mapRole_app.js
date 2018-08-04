 productApp.controller('MapRoleController', ['$scope','$http','$filter','blockUI','$timeout','$translate','mapRoleService','$route','$window','$anchorScroll','$rootScope',
	function($scope,$http,$filter,blockUI,$timeout,$translate, mapRoleService,$route,$window,$anchorScroll,$rootScope) {
	 $scope.selected = []; 
	    $scope.dataadd=false;
	    $scope.saveorUpdateFlag = false;
	    $scope.asteriskFlag = false;
	    $scope.reqErrs = [];
	    $scope.roleVoList=[];
	    $scope.screenVoList=[];
	    $scope.functionDTList=[];
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
	    $scope.mapRoleObj ={
				 
				 'screenSearch':null,
				 'roles':  null,
		         'functionNames': null
	    	}
	    $scope.clearMsg = function(){
	    	$scope.reqErrs = null;
	    } 
	      $scope.mapNewRole=function()
	      {
	    	$scope.mapRole={    			
					screenSearch:{key:null,value:"Please Select"}		    			  			
	    	}
	    	 $scope.selectedFunctionList=[];
	   	      $scope.selectedRoleList=[];
	    	    $scope.data = [];   
		      	$scope.reqErrs = [];
		      	$scope.dataadd=true;
		      	$scope.selectdt=true;
		      	$scope.selected =[];
		      	$scope.asteriskFlag = true;
		      	$scope.reqErrMsg=null;
		      	$scope.mapRoleData.errors=null;
		      	$scope.succMessage=null;
		      	$scope.message=null;
		      	$scope.addcollection.push({
		       		'id':$scope.addcollection.length+1,
		       		'screen' :{"key":null,"value":"Please Select"},
		  			'selectedFunctionVoList'  :[],
		  			'role' :{"key":null,"value":"Please Select"},
		  			'isSelected':true
		       });   
		      	angular.forEach($scope.addcollection, function(val) {
		      	     var found = $scope.selected.indexOf(val.id);
		      	      if(found == -1) $scope.selected.push(val.id);
		      	    });

		      	$scope.saveorUpdateFlag = true;
		      	$scope.data=$scope.addcollection;
		      	$scope.rowCollection=$scope.addcollection;
		      	
		      	console.log($scope.screenVoList);
	      }
	    $scope.loadFunctionName=function(screen)
	    {
	    	console.log(screen.key);
	    	console.log(screen);
	    	console.log(screen.value);
	    	mapRoleService.getFunctionNamesbasedOnScreen(screen)
			.then(
				function(data){
					console.log(data);
					//$scope.functionList= data;
					$scope.functionDTList=data;
					//$scope.functionVoList=data;
					$scope.$digest();
				},
				function()
				{
					alert('error');
				}
				);
	    }
	      $scope.init1=function()
	      {
	    	  $scope.saveorUpdateFlag = false;
			    $scope.data=[];
				$scope.addcollection = [];
		   	    $scope.rowCollection = [];
		   	    $scope.selectedFunctionList=[];
		   	    $scope.selectedRoleList=[];
		     	$scope.dataadd=false;
		     	$scope.selectdt=false;
		     	$scope.selected=[];
		     	$scope.mapRoleData =[];
		     	$scope.reqErrMsg=null;
		     	$scope.reqErrs = [];
		     	$scope.message=""; 
			    $scope.flag =  false;
			    $scope.asteriskFlag = false;
			    var dt=new Date();
				$scope.collection = [];
				$scope.selectedData = [];
				$scope.mapRole;
				$scope.mapRole={
						screenSearch:{key:null,value:"Please Select"}			
				}
				
	    	  mapRoleService.getScreenNames().then(

						function(data) {
							$scope.screenNameList = data;
							//$scope.screenNameDTList=data;
							
							$scope.screenVoList=data;
							//$scope.screenVoList=data;
							console.log($scope.screenVoList);
							$scope.$digest();
						}, function() {
							alert('error');
						}

						); 
	    	  
	    	  mapRoleService.getFunctionNames()
				.then(
					function(data){
						$scope.functionList= data;
						//$scope.functionDTList=data;
						//$scope.functionVoList=data;
						$scope.$digest();
					},
					function()
					{
						alert('error');
					}
					);
	    	  mapRoleService.getRoles()
				.then(
					function(data){
						$scope.roleList= data;
						$scope.roleDTList= data;
						$scope.roleVoList=arrayToSingleSelect(data);
						$scope.$digest();
					},
					function()
					{
						alert('error');
					}
					);
	    	 /* mapRoleService.getScreenNamesDT().then(

						function(data) {
							$scope.screenVoList=arrayToSingleSelect(data);
							//$scope.screenVoList=data;
							console.log($scope.screenVoList);
							$scope.$digest();
						}, function() {
							alert('error');
						}

						); */
	    	  $scope.searchRole(false);
	      }
	      $scope.searchRole=function(succflag)
	      {
	 		 $scope.saveorUpdateFlag = false;
	 		    $scope.data=[];
	 			$scope.addcollection = [];
	 	   	    $scope.rowCollection = [];
	 	     	$scope.dataadd=false;
	 	     	$scope.selectdt=false;
	 	     	$scope.selected=[];
	 	     	$scope.reqErrMsg="";
	 	     	$scope.reqErrs = [];
	 	     	$scope.message=""; 
	 		    $scope.flag =  false;
	 		    $scope.asteriskFlag = false;
	 		    var dt=new Date();
	 			$scope.collection = [];
	 			$scope.selectedData = [];	
	 			
	 			 $scope.mapRoleObj ={
	 					 
	 					 'screenSearch':$scope.mapRole.screenSearch ,
	 					 'roles':  $scope.selectedRoleList,
	 			         'functionNames': $scope.selectedFunctionList
	 		    	}
	 			mapRoleService.srchMapRole($scope.mapRoleObj)
	 		  			.then(
	 		  				function(data){
	 		  					$scope.data= data;
	 		  					$scope.rowCollection= data;
	 		  					
	 		  					if(succflag){
	 		  					 if($scope.data.length == 0){
	 		  					  $scope.reqErrMsg = '{{"common.records.notFound" | translate}}';
	 		  					}
	 		  				}
	 		  					$scope.$digest();
	 		  				},
	 		  				function()
	 		  				{
	 		  					alert('error');
	 		  				}
	 		  				);
	 		
	      }
	      $scope.saveRole=function(collection)
	      {
	    	  
	    	  $scope.flag=false;
	           $scope.reqErrMsg=null;
	           $scope.message=null;
		   	   $scope.selectedData = [];		   
		   	   $scope.newDataList=[];
		       $scope.reqErrs = [];
		       /*$scope.addRoleObj.errors = null ;*/
		       angular.forEach($scope.selected, function(row){	  		
		   	        if(row.selected){
		   	        	
		   	            row.isSelected=true;
		   	        }
		   	        else{
		   	        	
		   	        	row.isSelected=false;
		   	        }
		   	    });
		       
	           angular.forEach(collection, function(row){
	           	if($scope.selected.indexOf(row.id) !== -1) {
	           		$scope.newDataList.push(row);
	           		}
	           });  
	           $scope.selectedData = $scope.newDataList;
	           console.log($scope.newDataList);
	           $scope.flag=$scope.validate($scope.selectedData);
	           console.log("validate flag"+$scope.flag);
	           if(!$scope.flag)
	        	   {
	     		   if(!$scope.selectedData.length == 0){
	     		    if($scope.saveorUpdateFlag){
	     		    	
	     		    	mapRoleService.saveMapRole($scope.selectedData)
	     	 			.then(
	     	 				function(data){
	     	 					$scope.mapRoleData = data;
	     	 					if($scope.mapRoleData.errors.length == 0){
	     	 					$scope.refreshMapRole();
	     	 					$scope.init1();
	     	 					$scope.message ='RoleMaintenance.mapRoleSave.succ';
	     	 				   }
	     	 					$scope.selectedData = null;
	     	 					 $window.scrollTo(0, angular.element('#messages').offsetTop); 
	     	 					$scope.$digest();
	     	 				},
	     	 				function()
	     	 				{
	     	 					alert('save error');
	     	 				}
	     	 				);
	     			   
	     		   }else{
	     			   
	     			  mapRoleService.updateMapRole($scope.selectedData)
	     	 			.then(
	     	 				function(data){
	     	 					$scope.mapRoleData = data;
	     	 					if($scope.mapRoleData.errors.length ==0){
	     	 					$scope.refreshMapRole();
	     	 					$scope.init1();
	     	 					$scope.message ='RoleMaintenance.mapRoleModify.succ';    	 					
	     	 				   }
	     	 					$scope.selectedData = null;
	     	 					 $window.scrollTo(0, angular.element('#messages').offsetTop); 
	     	 					$scope.$digest();
	     	 				},
	     	 				function()
	     	 				{
	     	 					alert('update error');
	     	 				}
	     	 				);
	     		   }
	     		  }else{
	     			
	     			 $scope.reqErrMsg = 'RoleMaintenance.select.err';
	     			 $window.scrollTo(0, angular.element('#messages').offsetTop); 
	     		  }
	        	   }
	      
	      }
	      $scope.removeMapping=function(collection)
	      {
	    	  $scope.flag=false;
	           $scope.reqErrMsg=null;
	           $scope.message=null;
		   	   $scope.selectedData = [];		   
		   	   $scope.newDataList=[];
		       $scope.reqErrs = [];
		       /*$scope.addRoleObj.errors = null ;*/
		      
		       angular.forEach($scope.selected, function(row){	  		
		   	        if(row.selected){
		   	        	
		   	            row.isSelected=true;
		   	        }
		   	        else{
		   	        	
		   	        	row.isSelected=false;
		   	        }
		   	    });
		      
	           angular.forEach(collection, function(row){
	           	if($scope.selected.indexOf(row.id) !== -1) {
	           		$scope.newDataList.push(row);
	           		}
	           });  
	          
	           $scope.selectedData = $scope.newDataList;
	           console.log($scope.newDataList);
	           $scope.flag=$scope.validate($scope.selectedData);
	           console.log("validate flag"+$scope.flag);
	           if(!$scope.flag)
	        	   {
	        	 
	        	   
	     		   console.log($scope.selectedData.length)
	     		   if(!$scope.selectedData.length == 0){
	     		    	
	     		    	mapRoleService.deleteMapRole($scope.selectedData)
	     	 			.then(
	     	 				function(data){
	     	 					$scope.mapRoleData = data;
	     	 					//if($scope.mapRoleData.errors.length == 0){
	     	 					$scope.refreshMapRole();
	     	 					$scope.init1();
	     	 					$scope.message ='RoleMaintenance.mapRoleRemove.succ';
	     	 				   //}
	     	 					
	     	 					$scope.selectedData = null;
	     	 					 $window.scrollTo(0, angular.element('#messages').offsetTop); 
	     	 					$scope.$digest();
	     	 				},
	     	 				function()
	     	 				{
	     	 					alert('save error');
	     	 				}
	     	 				);
	     			   
	     		   
	     		  }else{
	     			
	     			 $scope.reqErrMsg = 'RoleMaintenance.select.err';
	     			 $window.scrollTo(0, angular.element('#messages').offsetTop); 
	     			  
	     		  }
	         
	     	   
	        	   }
	      
	      
	      }
	      $scope.validate =  function($selectedData) {
	    	  /* $scope.roleCodeFlag=false;
	    	   $scope.roleNameFlag=false;*/
	    	   $scope.reqErrMsg=null;
	    	   $scope.reqErrs = [];
	    	  /* $scope.lenErrMsg=null;
	    	  $scope.lenFlag=false;*/
	    	// $scope.letters = /^[A-Za-z]+$/;
	   		 console.log("Inside Validate method "+$selectedData);
	    	   angular.forEach($selectedData, function(row) {
	    		   $scope.flag = false;
	    		   if(row.screen.key == '' || row.screen.key == null){
	    			   $scope.reqErrMsg =  '{{"roleMaintenance.screenName.Lable" | translate}}'; 
	    		       $scope.flag = true;
	    		   }
	    		   if(row.selectedFunctionVoList == '' || row.selectedFunctionVoList == null){
	    			  if($scope.flag) {
	    				 $scope.reqErrMsg += ' , {{"roleMaintenance.function.Lable" | translate}}' ;
	    			  }
	    			  else
	    				  {
	    			   $scope.reqErrMsg = ' {{"roleMaintenance.function.Lable" | translate}}' ;
	    		       $scope.flag = true;
	    				  }
	    		   }
	    		   
	    		   if(row.role.key == '' || row.role.key == null){
		    			  if($scope.flag) {
		    				 $scope.reqErrMsg += ' , {{"roleMaintenance.role.Lable" | translate}}' ;
		    			  }
		    			  else
		    				  {
		    			   $scope.reqErrMsg = ' {{"roleMaintenance.role.Lable" | translate}}' ;
		    		       $scope.flag = true;
		    				  }
		    		   }
	    		   
	    		  
	    		   
	    		  if($scope.reqErrMsg !=null)
	   	            	 {
	   	            	 $scope.reqErrMsg ='{{"DSIDMain.lineNo.label" | translate}}' + ".: ["+row.id+"] " + $scope.reqErrMsg+' {{"User.save.req.err" | translate}}'
	   	            	 }
	   	              
	   	             
	   	            
	    		   if($scope.reqErrMsg != "" && $scope.reqErrMsg!=null){
	    		   $scope.reqErrs.push($scope.reqErrMsg);
	    		   $scope.reqErrMsg=null;
	    		 
	    		   }
	    		 /* if($scope.lenErrMsg != ""){
	    	 		   $scope.reqErrs.push($scope.lenErrMsg);
	    	 		 $scope.lenErrMsg="";
	    	 		   }*/
	    		  
	    		   
	             });
	    	   if($scope.reqErrs.length > 0){
	    		   $scope.flag = true;  
	    		   $window.scrollTo(0, angular.element('#messages').offsetTop); 
	    	   }
	    	   
	    	  
	    	   
	    	   return $scope.flag;
	       
	   }
	      $scope.refreshMapRole=function()
	      {
	    	    $scope.data=[];
				$scope.addcollection = [];
		   	    $scope.rowCollection = [];      
		     	$scope.dataadd=false;
		     	$scope.selectdt=false;
		     	$scope.selected=[];
		     	$scope.reqErrMsg=null;
		     	$scope.succMessage=null;
		     	$scope.message=null;
				$scope.selectedData = [];	
				$scope.reqErrs = [];
				$scope.init1();
				$scope.saveorUpdateFlag = false;
				$scope.mapRoleData; 
				$scope.mapRole={    			
						screenSearch:{key:null,value:"Please Select"}		    			  			
		    	}
	      }
	      $scope.downloadExcelMapRole=function()
	      {

	             
	             if($scope.rowCollection.length>0)
	                    {
	                    
	                    $scope.mRole = {
	                        'maproleList': $scope.rowCollection
	                 }
	              
	                $http.post("http://localhost:9060/EsipService/Role/exportExcelMapRole",$scope.mRole).then(function(response) {
	                    if (response) {
	                          
	                          var today = $filter('date')(new Date(),'yyyy-MM-dd HH_mm_ss');
	                        var fileName='Role_Maintenance_log'+today;
	                          
	                          var anchor = angular.element('<a/>');
	                        anchor.attr({
	                            href: 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + response.data,
	                            target: '_self',
	                            download: fileName});

	                        angular.element(document.body).append(anchor);
	                        anchor[0].click();
	                          
	                    }
	                });
	                
	            
	                    
	                    }else
	                           {
	                           $window.scrollTo(0, angular.element('#Message').offsetTop);
	                           $scope.reqErrMsg='{{"common.records.notFount"  | translate}}'
	                           }
	             
	            
	        
	      }
	      
	      
	      
	      
	   // Function to get data for all selected items
	       $scope.selectAll = function (collection) {
	         // if there are no items in the 'selected' array, 
	         // push all elements to 'selected'
	    	   
	         if ($scope.selected.length === 0) {
	        	 $scope.asteriskFlag = true;
	           angular.forEach(collection, function(val) {
	            $scope.selected.push(val.id); 
	             
	           });
	         // if there are items in the 'selected' array, 
	         // add only those that ar not
	         } else if ($scope.selected.length > 0 && $scope.selected.length !=collection.length) {
	        	 $scope.asteriskFlag = false;
	           angular.forEach(collection, function(val) {
	             var found = $scope.selected.indexOf(val.id);
	             if(found == -1) $scope.selected.push(val.id);
	             
	           });
	           
	         // Otherwise, remove all items
	         } else  {
	        	 $scope.asteriskFlag = false;
	           $scope.selected = [];
	         }
	       };
	       
	       // Function to get data by selecting a single row
	       $scope.select = function(id) {
	    	
	         var found = $scope.selected.indexOf(id); 
	         if(found == -1){
	        	 $scope.asteriskFlag = true;
	        	 $scope.selected.push(id);
	         }
	         else {
	        	 $scope.selected.splice(found, 1);
	        	 if($scope.selected.length == 0	){
	        		 $scope.asteriskFlag = false;  
	        	 }
	            	 
	         }
	         
	       }
	    }]);
 
 productApp.service("mapRoleService",['$http',function($http){
		
		this.srchMapRole = function(data) { 
			return new Promise(function(resolve,reject){
				$http.post('http://localhost:9060/EsipService/Role/MapRoleSearch',data)
				.then(
					function(response){
						resolve(response.data);
					},
					function(error){
						reject([]);
					});
			});
			}
		
		this.saveMapRole = function(data) { 
			return new Promise(function(resolve,reject){
				
				$http.post('http://localhost:9060/EsipService/Role/MapRoleSave',data).then(
					function(response){
						resolve(response.data);
					},
					function(error){
						reject([]);
					});
			});
			
			}
		
		this.updateMapRole = function(data) { 
			return new Promise(function(resolve,reject){
				
				$http.post('http://localhost:9060/EsipService/Role/MapRoleUpdate',data).then(
					function(response){
						resolve(response.data);
					},
					function(error){
						reject([]);
					});
			});
			
			}
		
		this.deleteMapRole = function(data) { 
			return new Promise(function(resolve,reject){
				
				$http.post('http://localhost:9060/EsipService/Role/MapRoleDelete',data).then(
					function(response){
						resolve(response.data);
					},
					function(error){
						reject([]);
					});
			});
			
			}
		
		this.getScreenNames = function() {
			return new Promise(
					function(resolve, reject) {

						$http
								.post(
										'http://localhost:9060/EsipService/Role/getScreenNames')
								.then(function(response) {
									resolve(response.data);
								}, function(error) {
									reject([]);
								});
					});
		}
		this.getScreenNamesDT = function() {
			return new Promise(
					function(resolve, reject) {

						$http
								.post(
										'http://localhost:9060/EsipService/Role/getScreenNamesDT')
								.then(function(response) {
									resolve(response.data);
								}, function(error) {
									reject([]);
								});
					});
		}
		this.getFunctionNames = function() {
			return new Promise(
					function(resolve, reject) {

						$http
								.post(
										'http://localhost:9060/EsipService/Role/getFunctionNames')
								.then(function(response) {
									resolve(response.data);
								}, function(error) {
									reject([]);
								});
					});
		}
		
		
		this.getFunctionNamesbasedOnScreen = function(data) {
			return new Promise(
					function(resolve, reject) {

						$http
								.post(
										'http://localhost:9060/EsipService/Role/getFunctionNamesBasedOnScreen',data)
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
										'http://localhost:9060/EsipService/Role/getRoles')
								.then(function(response) {
									resolve(response.data);
								}, function(error) {
									reject([]);
								});
					});
		}
	}]);
 
 productApp.directive("limitTo", [function() {
	    return {
	        restrict: "A",
	        link: function(scope, elem, attrs) {
	            var limit = parseInt(attrs.limitTo);
	            angular.element(elem).on("keypress", function(e) {
	                if (this.value.length == limit) e.preventDefault();
	            });
	        }
	    }
	}]);