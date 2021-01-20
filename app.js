var createError = require('http-errors');
var express = require('express');
var path = require('path');
const router = express.Router();
var bodyParser = require('body-parser')
var session = require('express-session');
const { getPublicKeyFromPem, verifyAuthSignature, makeKeyPair } = require('./crypto-utils')

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

//chemin d'accès au dossier public
app.use(express.static(pathPublic));

//routes du site
//met à jour la variable app avec une nouvelle route pour la page de connexion/inscription
/*app.get('/', (req, res) => res.send(`
<h1>Register</h1>
<form id='register' method='post' action='/register'>
  <input name=username />
  <input name=password type=password />
  <input type=submit />
</form>
<br />
<h1>Login</h1>
<form id='login' method='post' action='/login'>
  <input name=username />
  <input name=password type=password />
  <input type=submit />
</form>
<script src="/javascripts/authentification/client.js"></script>
`))*/

//route pour aller sur la page de connexion
app.get('/login', (req, res) => res.sendFile(path.join(pathPublic+'/webpages/authentification/login.html')));

//route pour aller sur la page d'inscription
app.get('/register', (req, res) => res.sendFile(path.join(pathPublic+'/webpages/authentification/register.html')));

//constante contenant tous les utilisateurs 
//(en temporaire serveur temps qu'on a pas fait l'enregistrement en base de données des infos)
const users = {}

//methode qui inscrit l'utilisateur
app.post('/register', (req, res) => {
  console.log('DEBUG: Received 1', req.body)
  try {
    users[req.body.username] = getPublicKeyFromPem(req.body.publicKey)

    console.log('DEBUG: Received 2', req.body)
  } catch (err) {
    console.log('ERROR: ', err)
    return res.sendStatus(400)
  }

  console.log("users", users);
  res.sendStatus(201)
})

//methode qui connecte l'utilisateur
app.post('/login', async (req, res) => {
  console.log('DEBUG: Received', req.body)
  const publicKey = users[req.body.username]

  if (!publicKey){ 
    return res.sendStatus(404)
  }
  try {
    await verifyAuthSignature(publicKey, req.body.message, req.body.signature)
  } catch (err) {
    console.log('ERROR: ', err)
    return res.sendStatus(401)
  }
  res.sendStatus(200)
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
