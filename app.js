var createError = require('http-errors');
var express = require('express');
var path = require('path');
const router = express.Router();
var bodyParser = require('body-parser')
var session = require('express-session');

var app = express();

var pathPublic = __dirname + "/public";

//parse json
app.use(bodyParser.json({limit: '50mb'}));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//session
app.use(session({
	secret:'sessionartificaldoctor',
	resave: true,
	saveUninitialized: true,
}));

app.use(express.static(pathPublic));

router.get("/", function(req, res){
	res.sendFile(path.join(pathPublic+'/webpages/index.html'));
});

router.get("/test", function(req, res){
	res.sendFile(path.join(pathPublic+'/webpages/test.html'));
});

app.use('/', router);


//laissé ces lignes après toutes les routes : 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.sendFile(path.join(pathPublic+'/webpages/notfound.html'));
});

module.exports = app;
