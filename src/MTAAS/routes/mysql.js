var ejs = require('ejs');
var mysql = require('mysql');

// Put your mysql configuration settings - user, password, database and port
function getConnection() {
	var connection = mysql.createConnection({
		host : 'aws.cbmuqc9mcupo.us-east-1.rds.amazonaws.com',
		user : 'clouduser',
		password : 'cloud123',
		database : 'MTAAS',
		port : 3306
	});
	return connection;
}

function fetchData(callback, sqlQuery) {

	console.log("\nMy SQL Query:" + sqlQuery);

	var connection = getConnection();

	connection.query(sqlQuery, function(err, rows, fields) {
		if (err) {
			console.log("ERROR: " + err.message);
		} else { // return err or result
			console.log("DB Results:" + rows);
			callback(err, rows);
		}
	});
	console.log("\nConnection closed...");
	connection.end();
}

exports.fetchData = fetchData;