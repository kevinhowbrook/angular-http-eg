var app = angular.module('myApp', ['ngRoute' , 'ui.bootstrap']);

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider
     .when('/', {
         templateUrl: './partials/allnodes.html',
         controller: 'myCtrl'
     })
     .when('/node/:id', {
         templateUrl: './partials/node.html',
         controller: 'nodeCtrl'
     })
    
     .otherwise({
         redirectTo: '/'
     });
                $httpProvider.defaults.cache = true;

});

app.controller('myCtrl', function($scope, $http) {
	$scope.totalItems = 64;
  	$scope.currentPage = 4;

  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    $log.log('Page changed to: ' + $scope.currentPage);
  };

  $scope.maxSize = 5;
  $scope.bigTotalItems = 175;
  $scope.bigCurrentPage = 1;
  $scope.loaded = false;
  $http({
    method : "GET",
    cache: true,
    url : "http://dev-kevinsandbox.pantheon.io/api/node"
  	}).then(function mySucces(response) {
      $scope.allNodes = response.data;
      $scope.loaded = true;
      
      
    }, function myError(response) {
      $scope.allNodes = 'Error connecting';
  });
});


app.controller('nodeCtrl', function($scope, $routeParams, $http, $sce) {
  $http({
    method : "GET",
    url : "http://dev-kevinsandbox.pantheon.io/api/node/" + $routeParams.id
  	}).then(function mySucces(response) {
      $scope.title = response.data.title;
      $scope.nid = response.data.nid;
      $scope.body = $sce.trustAsHtml(response.data.body);
      $scope.categories = response.data.categories;
    }, function myError(response) {
      $scope.node = 'loading';
  });
  });


