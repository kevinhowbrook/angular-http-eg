// var app = angular.module('myApp', ['ngRoute' , 'ui.bootstrap']);

// var jsonsrc = 'http://local.kevinsandbox.com'; 

// app.config(function ($routeProvider, $httpProvider) {
//     $routeProvider
//      .when('/', {
//          templateUrl: './partials/allnodes.html',
//          controller: 'myCtrl'
//      })
//      .when('/node/:id', {
//          templateUrl: './partials/node.html',
//          controller: 'nodeCtrl'
//      })
    
//      .otherwise({
//          redirectTo: '/'
//      });
//                 $httpProvider.defaults.cache = true;

// });

// app.controller('myCtrl', function($scope, $http) {
// 	$scope.totalItems = 64;
//   	$scope.currentPage = 4;

//   $scope.setPage = function (pageNo) {
//     $scope.currentPage = pageNo;
//   };

//   $scope.pageChanged = function() {
//     $log.log('Page changed to: ' + $scope.currentPage);
//   };

//   $scope.maxSize = 5;
//   $scope.bigTotalItems = 175;
//   $scope.bigCurrentPage = 1;
//   $scope.loaded = false;
//   $http({
//     method : "GET",
//     cache: true,
//     url : jsonsrc + "/api/node"
//   	}).then(function mySucces(response) {
//       $scope.allNodes = response.data;
//       $scope.loaded = true;
      
      
//     }, function myError(response) {
//       $scope.allNodes = 'Error connecting';
//   });
// });


// app.controller('nodeCtrl', function($scope, $routeParams, $http, $sce) {
//   $http({
//     method : "GET",
//     url : jsonsrc + "/api/node/" + $routeParams.id
//   	}).then(function mySucces(response) {
//       $scope.title = response.data.title;
//       $scope.nid = response.data.nid;
//       $scope.body = $sce.trustAsHtml(response.data.body);
//       $scope.categories = response.data.categories;
//     }, function myError(response) {
//       $scope.node = 'loading';
//   });
//   });


var app = angular.module('myApp', ['ngRoute']);
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
var jsonsrc = 'http://local.kevinsandbox.com'; 

app.controller('myCtrl', function ($scope, $http) {
 // $http({
 //    method : "GET",
 //    cache: true,
 //    url : jsonsrc + "/api/node"
 //   }).then(function mySucces(response) {
      $scope.allnodes = [
        {"nid": "1","uid": "1","title": "Welcome"},
        {"nid": "509","uid": "0","title": "Neque Nunc Quibus","category": ["Scully"]},
        {"nid": "525","uid": "1","title": "Et Nutus Roto Tamen","category": ["Mulder"]},
        {"nid": "530","uid": "1","title": "Exerci Iriure Os","category": ["Mulder","Scully"]}
      ];
      $scope.loaded = true;
      $scope.filter = {};
      $scope.categories = ['Mulder','Scully'];
      // $scope.filterByCategory = function (node) {
      //   for (var key in $scope.filter) {
      //       if ($scope.filter[key] && node.category.indexOf(key.toLowerCase()) < 0) {
      //         return false;
      //       }
      //   }

      //   return true;
      // };

      // $scope.filterByCategory = function (node) {
      //   return $scope.filter[node.category] || noFilter($scope.filter);
      // };

       $scope.filterByCategory = function(node) {
    for (var key in $scope.filter) {
      if ($scope.filter[key] && (!node.category || node.category.indexOf(key) < 0)) {
        return false;
      }
    }

    return true;
  };
  
      function noFilter(filterObj) {
          for (var key in filterObj) {
              if (filterObj[key]) {
                  return false;
              }
          }
          return true;
      };            
});
