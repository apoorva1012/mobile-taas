var app = angular.module('register', []);

app.controller("register", function($scope, $http) {
	console.log("connection established with register app");

	$scope.registerTester = function() {
		console.log("registerTester button pressed; enter user's info in DB");
		console.log("First Name: " + $scope.fnmae + "Last Name: " + $scope.lname + 
				"Email: " + $scope.email + "password: " + $scope.password);
		
		var date  = new Date();
		
		
		if ($scope.password !== $scope.repassword) {
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
					console.log("some error has occurred");
				} else {
					console.log("the user has been successfully registered! Please login");
				}
			});
		}
		
	};
	
});