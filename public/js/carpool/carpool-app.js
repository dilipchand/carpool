
var carpoolApp = angular.module('carpoolApp', ['ngRoute']);

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
                .otherwise({ redirectTo: '/' })
});

carpoolApp.controller('MemeberInfoCtrl', function($scope, $http) {



	//$scope.memberInfo = {firstName:'Dilip'};

	$scope.postMemberInfo = function() {
        $scope.showModal = false;
		console.log($scope.memberInfo);
		$http({
			method: 'POST',
			url: '/registerUser',
			headers: {'Content-Type': 'application/json'},
			data: $scope.memberInfo
		}).then(function success(response) {
    
    
        $scope.showModal = !$scope.showModal;
    
			console.log(response);
            //alert('ding dong')
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