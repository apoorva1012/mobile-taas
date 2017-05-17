
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


exports.articles = function(req, res){
	console.log("articles GET request");
	
	var getArticles = "SELECT * FROM articles"

	mysql.fetchData(function(err, results) {

		if (err) {
			throw err;
		} else {
			if (results.length > 0) {
								
				console.log(results);
				res.send(results);
			} 
		}
		
	}, getArticles);	
	
};
