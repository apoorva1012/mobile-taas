
/*
 * Update Profile.
 */


var mysql = require('./mysql');

//making sure no CORS erroe come thrugh browser
exports.all = function(req, res, next) {
  // add details of what is allowed in HTTP request headers to the response headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', false);
  res.header('Access-Control-Max-Age', '86400');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  // the next() function continues execution and will move onto the requested URL/URI
  next();
};


exports.options = function(req, res) {
  res.sendStatus(200);
};

exports.profile = function(req, res){
	console.log("I am inside dashboard Profile POST request");

	
	var myPassword = req.body.password;
	console.log(myPassword);

	//check if user is already regestered
	
	var alreadyRegesteredQuery = "SELECT username from tester_profile where username = '" + 
								req.session.username + "'";
	
	
	var UserUpdateQuery = "INSERT INTO tester_profile (first_name, last_name, email, address, city, zip_code," +
            "tester_rating, username, " +
			"approve_flag, verified_flag) " +
			"VALUES (   '" + req.body.fname + 
						"','" + req.body.lname + 
						"','" + req.body.email + 
						"','" + req.body.address +
						"','" + req.body.city +
                        "','" + req.body.zip_code +
                        "','" + req.body.tester_rating +
                        "','" + req.session.username +
						"','" + "FALSE" + 
						"','" + "TRUE" + "')";

	console.log("QUERY to update user details is: " + UserUpdateQuery);

	mysql.fetchData(function(err, results) {

		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
				
				console.log(results);
				console.log("Tester already registered!");
				
				
				var json_responses = {
					"statusCode" : 200
				};
				res.send(json_responses);

			} else {

				console.log("you can insert this user");
				
				mysql.fetchData(function(err, results) {

					if (err) {
						throw err;
					} else {
						if (results.length > 0) {
							
							console.log(results);
							console.log("Tester registration error");
							var json_responses = {
								"statusCode" : 200
							};
							res.send(json_responses);

						} else {

							console.log("Tester successfully inserted");
							
							var json_responses = {
									"statusCode" : 401
								};
							res.send(json_responses);
						}
					}
				}, UserUpdateQuery);

			}
		}
		
	}, alreadyRegesteredQuery);
	
	
};
