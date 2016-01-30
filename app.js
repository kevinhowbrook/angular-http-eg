var app = angular.module('myApp', []);


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