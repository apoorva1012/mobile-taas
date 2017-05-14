
/*
 * GET home page.
 */

var mysql = require('./mysql');
var bcrypt = require('bcrypt');

exports.login = function(req, res){
	console.log("I am inside login POST request");
	console.log(req.body);
	
	
	
	var passwordQuery = "SELECT password from login where email = '" + 
	req.body.email + "'";
	
	mysql.fetchData(function(err, results) {

		if (err) {
			throw err;
		} else {
			if (results.length > 0) {

				console.log("the user is present in login database");
				
				
				var hashedPassword = results[0].password;
				var enteredPassword = req.body.password;
				console.log(hashedPassword);
				console.log(enteredPassword);
				
				if (bcrypt.compareSync(enteredPassword, hashedPassword)) {
					
					//establish session owner
					console.log("Valid Login: Establish session and go to next page");
					req.session.username = req.body.email;

					var json_responses = {
						"statusCode" : 200
					};
					res.send(json_responses);
					
				} else {
					
					console.log("invalid credentials");
					json_responses = {
							"statusCode" : 401
					};
					res.send(json_responses);
				}

			} else {

				console.log("user is not in database");
				
				json_responses = {
					"statusCode" : 401
				};
				res.send(json_responses);

			}
		}
	}, passwordQuery);
};


exports.redirectToHomepage = function(req, res) {

	console.log("inside redirect to homepage function: " + req.session.username);

	if (req.session.username) {
		res
				.header(
						'Cache-Control',
						'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("TP", {
			username : req.session.username
		});
	} else {
		res.redirect('/');
	}
};


exports.logout = function(req, res) {
	console.log("in destroy session function");
	req.session.destroy();
	res.redirect('/');
};