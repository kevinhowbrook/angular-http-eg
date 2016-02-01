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
 $http({
    method : "GET",
    cache: true,
    url : jsonsrc + "/api/node"
   }).then(function mySucces(response) {
      $scope.allnodes = response.data;
      $scope.loaded = true;
      

       $scope.filter = {};

        $scope.getCategories = function () {
            return ($scope.allnodes || []).map(function (w) {
                return w.category;
            }).filter(function (w, idx, arr) {
                return arr.indexOf(w) === idx;
            });
        };
        
        $scope.filterByCategory = function (node) {
            return $scope.filter[node.category] || noFilter($scope.filter);
        };
        
        function noFilter(filterObj) {
            for (var key in filterObj) {
                if (filterObj[key]) {
                    return false;
                }
            }
            return true;
        }  
    
      
    }, function myError(response) {
      $scope.allNodes = 'Error connecting';
  });
    // $scope.allnodes = [
    //     { name: "This is node 1", category: "plant" },
    //     { name: "Another title is this one", category: "weed" },
    //     { name: "This is Another title", category: "weed" },
    //     { name: "And finally a fourth title", category: "flower" }
          
    // ];
             
});
