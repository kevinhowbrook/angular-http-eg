var app = angular.module('myApp', ['ngRoute']);

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
      $scope.body = $sce.trustAsHtml(response.data.body);
    }, function myError(response) {
      $scope.node = 'loading';
  });

});