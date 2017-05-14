var app = angular.module('register', []);

app.controller("register", function($scope, $http) {
	console.log("connection established with register app");
	$scope.already_registered_flag = true;

	$scope.registerTester = function() {
		console.log("registerTester button pressed; enter user's info in DB");
		console.log("First Name: " + $scope.fnmae + "Last Name: " + $scope.lname + 
				"Email: " + $scope.email + "password: " + $scope.password);
		
		var date  = new Date();
		
		if (($scope.password === undefined)){
			$scope.message = "cant enter empty credentials";
			$scope.already_registered_flag = false;
			console.log("cant enter empty credentials");
		}
		
		if ($scope.password !== $scope.repassword) {
			$scope.message = "passwords do not match";
			$scope.already_registered_flag = false;
			console.log("passwords do not match");
		} else {
			
			var UserDetails = {
					"fname" : $scope.fname,
					"lname" : $scope.lname,
					"email" : $scope.email,
					"password" : $scope.password,
					"date" : date
			};
			
			$http({
				method : "POST",
				url : '/register',
				data : JSON.stringify(UserDetails),
				headers: {'Content-Type': 'application/json'}
			}).success(function(data) {

				if (data.statusCode === 200) {
					console.log("user already registered");
					$scope.message = "user already registered";
					$scope.already_registered_flag = false;
				} else {
					console.log("User Has Been Successfully Registered! Please login");
					$scope.message = "User Has Been Successfully Registered! Please login";
					$scope.already_registered_flag = false;
				}
			});
		}
		
	};
	
});