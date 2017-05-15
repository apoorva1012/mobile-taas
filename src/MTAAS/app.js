

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var register = require('./routes/register');
var login = require('./routes/login');
var session = require('client-sessions');
var dashboard = require('./routes/dashboard');

var app = express();

//user session management
app.use(session({
	cookieName : 'session',
	secret : 'MTASS_TEST_USER',
	duration : 30 * 60 * 1000, 
	activeDuration : 5 * 60 * 1000,
}));


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.all('*',register.all);
app.options('*',register.options);

app.get('/', routes.index);
app.get('/successLogin', login.redirectToHomepage);


app.post('/register', register.register);
app.post('/login', login.login);
app.post('/logout', login.logout);
app.post('/profile', dashboard.profile);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
