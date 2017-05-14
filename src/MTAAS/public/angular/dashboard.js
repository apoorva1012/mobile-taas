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
	});

});

dashboard.controller("profile_controller", function($scope, $http) {
	console.log("inside profile_controller controller");
});

dashboard.controller("projects_controller", function($scope, $http) {
	console.log("inside projects_controller controller");
});

dashboard.controller("articles_controller", function($scope, $http) {
	console.log("inside articles_controller controller");
});

dashboard.controller("notifications_controller", function($scope, $http) {
	console.log("inside notifications_controller controller");
});

dashboard.controller("emails_controller", function($scope, $http) {
	console.log("inside emails_controller controller");
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