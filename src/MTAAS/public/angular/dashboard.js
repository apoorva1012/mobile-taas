var dashboard = angular.module('dashboard', [ 'ngRoute' ]);
console.log("connected to dashboard.js");

dashboard.controller("dashboard", function($scope, $http) {
	console.log("inside dashboard controller");
});



dashboard.config(function($routeProvider) {
	console.log("inside dashboard route provider");
	$routeProvider.when("/profile", {
		templateUrl : "/templates/profile.html",
		controller : "profile_controller"
	}).when("/projects", {
		templateUrl : "/templates/projects.html",
		controller : "projects_controller"
	}).when("/articles", {
		templateUrl : "/templates/articles.html",
		controller : "articles_controller"
	}).when("/notifications", {
		templateUrl : "/templates/notifications.html",
		controller : "notifications_controller"
	}).when("/emails", {
		templateUrl : "/templates/emails.html",
		controller : "emails_controller"
	}).when("/logout", {
		controller : "logout_controller"
	}).when("/courses", {
		templateUrl : "/templates/courses.html",
		controller : "courses_controller"
	});

});

dashboard.controller("profile_controller", function($scope, $http) {
    
    	$scope.updateTester = function() {
		console.log("registerTester button pressed; enter user's info in DB");
		console.log("First Name: " + $scope.fnmae + "Last Name: " + $scope.lname + 
				"Email: " + $scope.email + "Zip: " + $scope.zip_code + "Rating: " + $scope.tester_rating);
		
		var date  = new Date();

			
			var UserDetails = {
					"fname" : $scope.fname,
					"lname" : $scope.lname,
					"email" : $scope.email,
                    "address" : $scope.address,
					"city" : $scope.city,
                    "zip_code" : $scope.zip_code,
                    "tester_rating" : $scope.tester_rating,
					"date" : date
                
			};
			
			$http({
				method : "POST",
				url : '/profile',
				data : JSON.stringify(UserDetails),
				headers: {'Content-Type': 'application/json'}
			}).success(function(data) {

				if (data.statusCode === 200) {
					console.log("Tester already updated");
					$scope.message = "Tester already updtaed";
					$scope.already_registered_flag = false;
				} else {
					console.log("Tester profile has Been Successfully updated!");
					$scope.message = "Tester profile has Been Successfully updtaed!";
					$scope.already_registered_flag = false;
				}
			});
		
		
	};
    
	console.log("inside profile_controller controller");
});

dashboard.controller("projects_controller", function($scope, $http) {
	console.log("inside projects_controller controller");
});

dashboard.controller("articles_controller", function($scope, $http) {
	console.log("inside articles_controller controller");
	$http.get("/articles")
  	.then(function(response) {
		  $scope.articles = response.data;
		  console.log(JSON.stringify(response.data));
  	});
});

dashboard.controller("notifications_controller", function($scope, $http) {
	console.log("inside notifications_controller controller");
});

dashboard.controller("emails_controller", function($scope, $http) {
	console.log("inside emails_controller controller");
});

dashboard.controller("courses_controller", function($scope, $http){
	$http.get("/courses")
  	.then(function(response) {
		  $scope.courses = response.data;
		  
		  console.log(JSON.stringify(response.data));
  	});
});

dashboard.controller("logout_controller", function($scope, $http) {
	console.log("inside logout_controller controller");
	
	$http({
		method : "post",
		url : '/logout',
		data : {

		}
	}).success(function(data) {
		console.log("logout successful");
	}).error(function(error) {

	});
});
