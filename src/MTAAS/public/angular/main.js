/**
 * http://usejsdoc.org/
 */
var app = angular.module('app', []);

app.controller("app", function($scope, $http) {
	
	$scope.msg_flag = true;

	$scope.submit = function() {
		console.log("login button pressed; your entered credentials are");
		console.log("uname: " + $scope.uname + "password: " + $scope.password);
		
		/*if ($scope.uname === "grader" && $scope.password === "password") {
			window.location = "templates/tenant.html";
		} else{
			$scope.msg_flag = false;
			console.log("wrong credentials");
		}*/
	};
	
	$scope.register = function(){
		console.log("register button pressed; show register screen!");
		window.location = "templates/register.html";
		
	};
	
});
