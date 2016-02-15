
var carpoolApp = angular.module('carpoolApp', ['ngRoute', 'Otd']);

carpoolApp.config(function ($routeProvider) {
    $routeProvider
                .when('/',
                {
                    controller: 'MemeberInfoCtrl',
                    templateUrl: 'home.html'
                })
                .when('/home',
                {
                    controller: 'MemeberInfoCtrl',
                    templateUrl: 'home.html'
                })
                .when('/login',
                {
                    controller: 'MemeberInfoCtrl',
                    templateUrl: 'login.html'
                })
                .when('/register',
                {
                    controller: 'MemeberInfoCtrl',
                    templateUrl: 'register.html'
                })
                .when('/carpoolreq',
                {
                    controller: 'PoolReqCtrl',
                    templateUrl: 'carpoolreq.html'
                })
                .when('/searchResults',
                {
                    controller: 'searchResultsCtrl',
                    templateUrl: 'searchResults.html'
                })
                .otherwise({ redirectTo: '/' })
});

carpoolApp.controller('MemeberInfoCtrl', function($scope, $http, $location, $rootScope) {
  $scope.memberInfo = {};
	$scope.registerUser = function() {
    $scope.modalSuccessReg = false;
		$http({
			method: 'POST',
			url: '/registerUser',
			headers: {'Content-Type': 'application/json'},
			data: $scope.memberInfo
		}).then(function success(response) {
        $location.path("/");
        $scope.modalSuccessReg = !$scope.modalSuccessReg;
        $rootScope.modalSuccessReg = true;
		}, function error(response) {

		});
	};
});

carpoolApp.controller('PoolReqCtrl', function($scope, $http) {

	$scope.cpReq = {};

	$scope.postCarpoolReq = function() {
		console.log($scope.memberInfo);
		$http({
			method: 'POST',
			url: '/registerUser',
			headers: {'Content-Type': 'application/json'},
			data: $scope.memberInfo
		}).then(function success(response) {
			console.log(response);
		}, function error(response) {

		});
	};

});


carpoolApp.controller('searchResultsCtrl', function($scope) {
    $scope.members = [
    { "firstname": "Sharon", "lastName": "Cole", "from": "Newyork", "to":"Chicago", "email": "sharon@gmail.com", "contactNumber": "9632587412", "weeklyCommute":["Mon", "Wed", "Tue"]},
    { "firstname": "Dilip", "lastName": "Cole", "from": "Washington", "to":"Sanfransisco", "email": "chanddilip@yahoo.com", "contactNumber": "987456321", "weeklyCommute":["Wed", "Tue"]},
    { "firstname": "Swaroop", "lastName": "Cole", "from": "Machilipatnam", "to":"Gudivada", "email": "kanteti@rediffmail.com", "contactNumber": "9885485757", "weeklyCommute":["Mon", "Wed", "Tue"]},
    { "firstname": "Dinesh", "lastName": "Cole", "from": "Madras", "to":"Banglore", "email": "dineshchand@yahoo.com", "contactNumber": "987456125", "weeklyCommute":["Tue", "Wed", "Fri"]}
]

    //$http.get("/js/carpool/searchResults.json").then(function(response) {
    //    $scope.searchResults = response.data;
    //});

});



carpoolApp.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });