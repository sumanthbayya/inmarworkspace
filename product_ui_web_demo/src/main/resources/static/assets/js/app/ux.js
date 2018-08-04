productApp.controller("uxController",["$scope",function($scope) {
						
						$scope.selected = [];
						$scope.selectdt=false; 
						$scope.tableData = [{
							id: "1",
							type : "Executive",
							name : "Ann Brown",
							title :"CEO",
							phone:"1234567891",
							ext:"+91",
							fax:"+442427321",
							email:"annbrown@dummy.com"
						},
						{
							id: "2",
							type : "Inmar AR",
							name : "Mary Smith",
							title :"Vice President Sales",
							phone:"1234567891",
							ext:"+91",
							fax:"+442427321",
							email:"marysmith@dummy.com"
						},
						{
							id: "3",
							type : "Executive",
							name : "Jhon Doe",
							title :"CTO",
							phone:"1234567891",
							ext:"+91",
							fax:"+442427321",
							email:"jhondoe@dummy.com"
						},
						{
							id: "4",
							type : "Daily",
							name : "Nicholas Dan",
							title :"Product Manager",
							phone:"1234567891",
							ext:"+91",
							fax:"+442427321",
							email:"nicholas@dummy.com"
						},
						{
							id: "5",
							type : "Other",
							name : "Nick Jonas",
							title :"VP Marketing",
							phone:"1234567891",
							ext:"+91",
							fax:"+442427321",
							email:"nickjonas@dummy.com"
						}];
						
						$scope.contactData = $scope.tableData;	
						$scope.rowCollection=$scope.tableData;
						
						
						// Function for getting selected data
						$scope.dataadd=false;
						$scope.select = function(id) {

							var found = $scope.selected.indexOf(id);
							if(found == -1) {
								$scope.selected.push(id);
								
							}
							else {
								$scope.selected.splice(found, 1);
								if($scope.selected.length == 0   ){
								}
							}


						}
						
						
						
						//adding new row
						$scope.addcollection=[];
						$scope.processAddRow = function(){
							
							$scope.contactData = []; 
							$scope.rowCollection=[];
							$scope.dataadd=true;
							$scope.selectdt=true; 
							$scope.addFlag=true;
							$scope.addcollection.push({ 
								'id':$scope.addcollection.length+1,
								type : null,
								name : null,
								title :null,
								phone:null,
								ext:null,
								fax:null,
								email:null
							}); 
							angular.forEach($scope.addcollection, function(val) {
								var found = $scope.selected.indexOf(val.id);
								if(found == -1) $scope.selected.push(val.id);
							});
							$scope.contactData=$scope.addcollection;
							$scope.rowCollection=$scope.addcollection;
						
						};
						//Saving Row data
						$scope.processSave = function(collection){
							$scope.flag=false;
													   
							$scope.newDataList=[];
							$scope.addedDataList=[];
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
							
							if($scope.newDataList.length>0){
								$scope.contactData.push($scope.newDataList);
								
							}else{
																						
								$scope.$digest();  
							}

						};					
							
						}]);
