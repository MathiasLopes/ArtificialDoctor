var mysql = require('mysql');
var serverConfig = require('../ServerConfig.js');

//Information de connexion à la base de données
function getConnection(callback){
    serverConfig.getAllInfosConnectionSql(function(infos){
        callback(new mysql.createConnection({
            host     : infos.host,
            user     : infos.user,
            password : infos.password,
            database : infos.database,
            port: infos.port
        }));
    });
}

//Information de connexion à la base de données
exports.getConnection = getConnection; //recupere la connexion de maniere asynchrone