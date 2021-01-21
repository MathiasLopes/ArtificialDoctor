var mysql = require('mysql');
var serverConfig = require('../ServerConfig.js');

//Information de connexion à la base de données
var connection = new mysql.createConnection({
	host     : (serverConfig.getAllInfosConnectionSql()).host,
	user     : (serverConfig.getAllInfosConnectionSql()).user,
	password : (serverConfig.getAllInfosConnectionSql()).password,
	database : (serverConfig.getAllInfosConnectionSql()).database,
	port:(serverConfig.getAllInfosConnectionSql()).port
});

//Information de connexion à la base de données
exports.connection = connection;

