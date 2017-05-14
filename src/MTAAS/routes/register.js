
/*
 * GET home page.
 */

//making sure no CORS erroe come thrugh browser
var mysql = require('./mysql');

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

exports.register = function(req, res){
	console.log("I am inside register POST request");

	console.log(req.body);
	
	var UserRegisterQuery = "INSERT INTO login (fname, lname, email, password, register_time, loginr_time," +
			"account_active, verified_flag) " +
			"VALUES (   '" + req.body.fname + 
						"','" + req.body.lname + 
						"','" + req.body.email + 
						"','" + req.body.password +
						"','" + req.body.date +
						"','" + req.body.date +
						"','" + "FALSE" + 
						"','" + "TRUE" + "')";

	console.log("QUERY to enter user details is: " + UserRegisterQuery);

	mysql.fetchData(function(err, results) {

		if (err) {
			throw err;
		} else {
			if (results.length > 0) {

				console.log("something went wrong!");
				var json_responses = {
					"statusCode" : 200
				};
				res.send(json_responses);

			} else {

				console.log("tenant details inserted!");
				json_responses = {
					"statusCode" : 401
				};
				res.send(json_responses);

			}
		}
	}, UserRegisterQuery);
	
	
};
