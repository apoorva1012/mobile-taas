/**
 * http://usejsdoc.org/
 */
var app = angular.module('app', []);

app.controller("app", function($scope, $http) {
	
	$scope.msg_flag = true;

	$scope.submit = function() {
		console.log("login button pressed; your entered credentials are");
		console.log("uname: " + $scope.uname + "password: " + $scope.password);
		
		if (($scope.uname === undefined) || ($scope.password === undefined)) {
			
			console.log("one of the fields is empty");
			$scope.message = "one of the fields is empty";
			
		} else{
			
			var loginDetails = {
					"email" : $scope.uname,
					"password" : $scope.password
			};
			
			$http({
				method : "POST",
				url : '/login',
				data : JSON.stringify(loginDetails),
				headers: {'Content-Type': 'application/json'}
			
			}).success(function(data) {

				if (data.statusCode === 200) {
					console.log("login successful");
					window.location.assign("/dashboard");
				} else {
					console.log("You Entered Wrong Credentials");
					$scope.message = "You Entered Wrong Credentials";
					$scope.msg_flag = false;
				}
			});
		}
		
	};
	
	$scope.register = function(){
		console.log("register button pressed; show register screen!");
		window.location = "templates/register.html";
		
	};
	
});
