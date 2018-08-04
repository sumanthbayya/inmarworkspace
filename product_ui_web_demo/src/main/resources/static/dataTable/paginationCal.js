 //Lazyloading Pagination
pagination = function($scope,itemsPerPage,$http) {
      $scope.itemsPerPage =itemsPerPage;
      $scope.currentPage =1;
      $scope.pageTot = 0; 

      $scope.pageTot=Math.ceil($scope.dataCountPage/$scope.itemsPerPage);
      $scope.range = function() {
    	
        var rangeSize =itemsPerPage;
        var ret = [];
        var start;

        start = $scope.currentPage;
       
        if ( start > $scope.pageCount()-rangeSize ) {
          start = $scope.pageCount()-rangeSize;
        
        }

        for (var i=start; i<start+rangeSize; i++) {
          ret.push(i);
        }
        return ret;
      };


      $scope.prevPage = function() {
        if ($scope.currentPage >1) {
          $scope.currentPage--;
        }
      };

      $scope.prevPageDisabled = function() {
        return $scope.currentPage === 1 ? "disabled" : "";
      };

      $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
          $scope.currentPage++;
        }
      };

      $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
      };

      $scope.pageCount = function() {
        return Math.ceil($scope.total/$scope.itemsPerPage);
      };

      $scope.selectPage = function(n) {
    	 
        if (n > 0 && n <=$scope.pageCount()) {
          $scope.currentPage = n;
        }
      };

      $scope.$watch("currentPage", function(newValue, oldValue) {

    	  var  startRowId=0;
    	  var	  endRowId=0;
    	  var	  totalCount=0;
    	  if(newValue==1)
		  {
			  startRowId=1;
			  endRowId=$scope.itemsPerPage;
			  totalCount=15;
		  	  
		  }else
			  {
			  startRowId=(newValue-1)*$scope.itemsPerPage+1;
			  endRowId=((newValue-1)*$scope.itemsPerPage)+$scope.itemsPerPage;
			  totalCount=15;
			  }
//call lazyloading query
    		  $http.get('http://localhost:9060/EsipService/User/UserDtlList/getPageOnClick', {
				  params: {
					  
					  startRowId: startRowId,
					  endRowId: endRowId,
					  totalCount:totalCount
					  
					  }}).then(
				function(response){
					$scope.data = response.data;
					$scope.collection= response.data;
				});
  
        $scope.total = $scope.dataCountPage;
      });
}
