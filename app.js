var app = angular.module('myApp', ['ngRoute' , 'ui.bootstrap']);

app.config(function ($routeProvider) {
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

  $http({
    method : "GET",
    url : "http://dev-kevinsandbox.pantheon.io/api/node"
  	}).then(function mySucces(response) {
      $scope.allNodes = response.data;
    }, function myError(response) {
      $scope.allNodes = 'loading';
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


