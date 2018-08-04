productApp.controller('AddRoleController', ['$scope','$http','$filter','blockUI','$timeout','$translate','addRoleService','$route','$window','$anchorScroll','$rootScope',
	function($scope,$http,$filter,blockUI,$timeout,$translate, addRoleService,$route,$window,$anchorScroll,$rootScope) {
	// Declare the array for the selected items
	$scope.selected = []; 
    $scope.dataadd=false;
    $scope.saveorUpdateFlag = false;
    $scope.asteriskFlag = false;
    $scope.reqErrs = [];
    
    $scope.clearMsg = function(){
    	$scope.reqErrs = null;
    }    
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
    
    $scope.init1=function()
	      {
	    	
					    $scope.saveorUpdateFlag = false;
					    $scope.data=[];
						$scope.addcollection = [];
				   	    $scope.rowCollection = [];
				     	$scope.dataadd=false;
				     	$scope.selectdt=false;
				     	$scope.selected=[];
				     	$scope.addRoleObj =[];
				     	$scope.reqErrMsg=null;
				     	$scope.reqErrs = [];
				     	$scope.message=""; 
					    $scope.flag =  false;
					    $scope.asteriskFlag = false;
					    var dt=new Date();
						//$scope.collection = [];
						$scope.selectedData = [];	
						$scope.dataTableStatusList = [{key:"Y",value : "Active"},{key:"N",value : "Inactive"}];
						$scope.addRowStatusList = [{key:"Y",value : "Active"}];
				
				addRoleService.srchAddRole()
		  			.then(
		  				function(data){
		  					$scope.data= data;
		  					$scope.rowCollection= data;
		  					$scope.$digest();
		  				},
		  				function()
		  				{
		  					alert('error');
		  				}
		  				);
				
	      }
	     // $scope.addcollection=[];
	      $scope.addNewRole=function()
	      {
	    	 // alert('add error');
	    	    $scope.data = [];   
		      	$scope.reqErrs = [];
		      	$scope.addRoleObj.errors=null;
		      	$scope.dataadd=true;
		      	$scope.selectdt=true;
		      	$scope.selected =[];
		      	$scope.asteriskFlag = true;
		      	$scope.reqErrMsg=null;
		      	$scope.succMessage=null;
		      	$scope.message=null;
		      	$scope.addcollection.push({
		       		'id':$scope.addcollection.length+1,
		       		'roleCode' :"" ,
		  			'roleName'  :"" ,
		  			'status' :{"key":'Y',"Value":"Active"},
		  			'isSelected':true
		       });   
		      	angular.forEach($scope.addcollection, function(val) {
		      	     var found = $scope.selected.indexOf(val.id);
		      	      if(found == -1) $scope.selected.push(val.id);
		      	    });

		      	$scope.saveorUpdateFlag = true;
		      	$scope.data=$scope.addcollection;
		      	$scope.rowCollection=$scope.addcollection;  
		         };
	     
		      
		         
	      $scope.saveRole=function(collection)
	      {
	    	  //alert('Inside Save');
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
		       //alert(collection.length);
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
	     		    	//alert('Inside Save Flag');
	     		    	addRoleService.saveAddRole($scope.selectedData)
	     	 			.then(
	     	 				function(data){
	     	 					$scope.addRoleObj = data;
	     	 					if($scope.addRoleObj.errors.length == 0){
	     	 					$scope.refreshAddRole();
	     	 					$scope.init1();
	     	 					$scope.message ='RoleMaintenance.addRoleSave.succ';
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
	     			   
	     			  addRoleService.updateAddRole($scope.selectedData)
	     	 			.then(
	     	 				function(data){
	     	 					//alert('Inside Update Flag');
	     	 					$scope.addRoleObj = data;
	     	 					if($scope.addRoleObj.errors.length ==0){
	     	 					$scope.refreshAddRole();
	     	 					$scope.init1();
	     	 					$scope.message ='RoleMaintenance.addRoleModify.succ';    	 					
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
    $scope.validate =  function($selectedData) {
 	   $scope.roleCodeFlag=false;
 	   $scope.roleNameFlag=false;
 	   $scope.reqErrMsg=null;
 	   $scope.reqErrs = [];
 	   $scope.lenErrMsg=null;
 	  $scope.lenFlag=false;
 	// $scope.letters = /^[A-Za-z]+$/;
		 console.log("Inside Validate method "+$selectedData);
 	   angular.forEach($selectedData, function(row) {
 		   $scope.flag = false;
 		   if(row.roleCode == '' || row.roleCode == null){
 			   $scope.reqErrMsg =  '{{"RoleMaintenance.roleCode.label" | translate}}'; 
 			  $scope.roleCodeFlag=true;
 		       $scope.flag = true;
 		   }
 		   
 		   if(row.roleName == '' || row.roleName == null){
 			  if($scope.flag) {
 				 $scope.reqErrMsg += ' , {{"RoleMaintenance.roleName.label" | translate}}' ;
 				 $scope.roleNameFlag=true;
 			  }
 			  else
 				  {
 			   $scope.reqErrMsg = ' {{"RoleMaintenance.roleName.label" | translate}}' ;
 			  $scope.roleNameFlag=true;
 		       $scope.flag = true;
 				  }
 		   }
 		   if(!$scope.roleCodeFlag){
 	              if(row.roleCode !== '' || row.roleCode !== null){
 	                        if(row.roleCode.length>3){       //row.dsId.toString().length>6 change to this if you change type="number"                
 	                             $scope.lenErrMsg = '{{"RoleMaintenance.lengthfield.err" | translate}}';
 	                             $scope.flag = true;
 	                            $scope.lenFlag=true;
 	                       }
 	                   }
 	             if(specialCharacterValidationAlpha(row.roleCode)){
 	            	if($scope.lenFlag) {
 	  			   $scope.lenErrMsg +=  ', {{"RoleMaintenance.specialChar.validate.err" | translate}}';
 	  			  $scope.lenFlag=true;
 	  			$scope.flag = true;
 	            	}
 	            	else
 	            		{
 	            		 $scope.lenErrMsg =  ' {{"RoleMaintenance.specialChar.validate.err" | translate}}';
 	   	  			  $scope.lenFlag=true;
 	   	  			$scope.flag = true;
 	            		}
 	  			   
 	  		   }
 		   }
 		   if(!$scope.roleNameFlag){
 	              if(row.roleName !== '' || row.roleName !== null){
	                        if(row.roleName.length>50){
	                        	if($scope.lenFlag)
	                        		{
	                             $scope.lenErrMsg += ', {{"RoleMaintenance.roleNamelengthfield.err" | translate}} ';
	                             $scope.flag = true;
	                             $scope.lenFlag=true;
	                        		}
	                        	else
	                        		{
	                        		 $scope.lenErrMsg = ' {{"RoleMaintenance.roleNamelengthfield.err" | translate}} ';
		                             $scope.flag = true;
		                             $scope.lenFlag=true;
	                        		}
	                       }
	                   }
 		   }
 		   
 		   if($scope.flag){
	             if($scope.reqErrMsg !=null && $scope.lenErrMsg !=null){
	                     $scope.reqErrMsg ='{{"DSIDMain.lineNo.label" | translate}}' + ".: ["+row.id+"] " + $scope.reqErrMsg+' {{"User.save.req.err" | translate}}'+$scope.lenErrMsg; 
	              }  
	             else if($scope.reqErrMsg !=null)
	            	 {
	            	 $scope.reqErrMsg ='{{"DSIDMain.lineNo.label" | translate}}' + ".: ["+row.id+"] " + $scope.reqErrMsg+' {{"User.save.req.err" | translate}}'
	            	 }
	             else if($scope.lenErrMsg !=null){
                     $scope.reqErrMsg ='{{"DSIDMain.lineNo.label" | translate}}' + ".: ["+row.id+"] " + $scope.lenErrMsg; 
              }  
	             
	            }
 		   if($scope.reqErrMsg != "" && $scope.reqErrMsg!=null){
 		   $scope.reqErrs.push($scope.reqErrMsg);
 		   $scope.reqErrMsg=null;
 		  $scope.lenErrMsg=null;
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
	      $scope.refreshAddRole=function()
	      {
			$scope.data=[];
			$scope.addcollection = [];
	   	    $scope.rowCollection = [];
	   	    $scope.collection=[];
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
			$scope.addRoleObj;
	  	
	      }
	      
	      /*$scope.downloadExcelAddRole=function()
	      {
	    	  var dt = new Date(); 
		  	  $scope.createdDate= (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear()+ " " +dt.getHours()+ ":" +dt.getMinutes() + ":" + dt.getSeconds() ;
	    	  //$scope.fileName = "AddRole"+"_"+$rootScope.userId+"_"+$scope.createdDate;
	    	  $scope.fileName = "AddRole"+"_"+$rootScope.userId;
	    	  $scope.exportData = [];
	    	  $scope.exportData.push(["Role Code", "Role Name","Status","Created Date","Last Updated Date"]);
	    	  angular.forEach($scope.data, function(value, key) {
		   			$scope.exportData.push([value.roleCode, value.roleName,value.status.value,value.createdDate,value.lastUpdatedDate]);
		   		 });
	    	  var displayed=$scope.exportData;
		   		exportJsonToExcel(displayed,$scope.fileName ,"Sheet1");
		   		
		   	   
	      }*/
	      
	      $scope.downloadExcelAddRole = function() {
	    	  
	    	  //alert('Inside download Excel');
	    	  //alert($scope.rowCollection); 
	             if($scope.rowCollection.length>0)
	                    {
	                    
	                    $scope.addRole = {
	                        'addRoleList': $scope.rowCollection
	                 }
	              
	                $http.post("http://localhost:9060/EsipService/Role/exportExcelAddRole",$scope.addRole).then(function(response) {
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
	             
	            
	        };

	      
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
	         } else if ($scope.selected.length > 0 && $scope.selected.length != collection.length) {
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
	  
productApp.service("addRoleService",['$http',function($http){
	
	this.srchAddRole = function() { 
		return new Promise(function(resolve,reject){
			$http.post('http://localhost:9060/EsipService/Role/AddRoleSearch')
			.then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
		}
	
	this.saveAddRole = function(data) { 
		return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/Role/AddRoleSave',data).then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
		
		}
	
	this.updateAddRole = function(data) { 
		return new Promise(function(resolve,reject){
			
			$http.post('http://localhost:9060/EsipService/Role/AddRoleUpdate',data).then(
				function(response){
					resolve(response.data);
				},
				function(error){
					reject([]);
				});
		});
		
		}
}]);