
var carpoolApp = angular.module('carpoolApp', []);

carpoolApp.controller('MemeberInfoCtrl', function($scope, $http) {

	$scope.memberInfo = {firstName:'Dilip'};

	$scope.postMemberInfo = function() {
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
