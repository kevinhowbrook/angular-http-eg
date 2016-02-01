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
app.controller('myCtrl', function ($scope) {
    $scope.wines = [
        { name: "Wine A", category: "red" },
        { name: "Wine B", category: "red" },
        { name: "wine C", category: "white" },
        { name: "Wine D", category: "red" },
        { name: "Wine E", category: "red" },
        { name: "wine F", category: "white" },
        { name: "wine G", category: "champagne"},
        { name: "wine H", category: "champagne" }    
    ];
    $scope.filter = {};

    $scope.getCategories = function () {
        return ($scope.wines || []).map(function (w) {
            return w.category;
        }).filter(function (w, idx, arr) {
            return arr.indexOf(w) === idx;
        });
    };
    
    $scope.filterByCategory = function (wine) {
        return $scope.filter[wine.category] || noFilter($scope.filter);
    };
    
    function noFilter(filterObj) {
        for (var key in filterObj) {
            if (filterObj[key]) {
                return false;
            }
        }
        return true;
    }            
});
