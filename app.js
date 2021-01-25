var createError = require('http-errors');
var express = require('express');
var path = require('path');
const router = express.Router();
var bodyParser = require('body-parser')
const crypto = require("crypto");
var session = require('express-session');
var requestAuthentification = require('./requests/requestAuthentification');

var app = express();

var pathPublic = __dirname + "/public";

//parse json
app.use(bodyParser.json({limit: '50mb'}));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

console.log("je passe 1");

//console.log(crypto.randomBytes(16).toString("hex"));

//session
app.use(session({
  genid: function(req) {
    return crypto.randomBytes(16).toString("hex") // use UUIDs for session IDs
  },
	secret:'sessionartificaldoctor',
	resave: true,
	saveUninitialized: true,
}));

console.log("je passe 2");

//route pour toutes les pages de webpages, pour quel ne soit pas accessible
app.get('/webpages/*', (req, res) => res.sendFile(path.join(pathPublic+'/webpages/notfound.html')));

//chemin d'accès au dossier public
app.use(express.static(pathPublic));

//routes du site
//redirection sur la page de login pour le moment lors du lancement sur la racine
app.get('/', (req, res) => res.redirect("/login"))

//route pour aller sur la page de connexion
app.get('/login', (req, res) => res.sendFile(path.join(pathPublic+'/webpages/authentification/login.html')));

//route pour aller sur la page d'inscription
app.get('/register', (req, res) => res.sendFile(path.join(pathPublic+'/webpages/authentification/register.html')));


//constante contenant tous les utilisateurs 
//(en temporaire serveur temps qu'on a pas fait l'enregistrement en base de données des infos)
const users = {}

//methode qui inscrit l'utilisateur
app.post('/register', (req, res) => {
  requestAuthentification.inscription(req, function(reponse){
    res.send(reponse);
  });
})

//methode qui permet de connecter l'utilisateur
app.post('/login', async (req, res) => {
  requestAuthentification.connexion(req, function(reponse){
    console.log(reponse);
    res.send(reponse);
  });
})

/*router.get("/", function(req, res){
	res.sendFile(path.join(pathPublic+'/webpages/index.html'));
});

router.get("/test", function(req, res){
	res.sendFile(path.join(pathPublic+'/webpages/test.html'));
});*/

//app.use('/', router);


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
