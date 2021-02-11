var fs = require('fs');

function getAllInfosConnectionSql(callback){

    var server = "prod";

    //permet d'aller chercher le mot clé pour le if/else if plus bas et trouver la config dans le fichier
    //défini ci-dessous
    fs.readFile('./ServerConfigWord.txt', 'utf8', function (err, data) {

        if (err) {
            server = "prod";
        }else{
            server = data;
        }

        var sqlInfos = {};

        if(server == "mathias"){

            sqlInfos.host = 'localhost';
            sqlInfos.user = 'root';
            sqlInfos.password = 'test';
            sqlInfos.database = 'artificialdoctor';
            sqlInfos.port = 3306; 

        }else if(server == "prod"){

            //a configuré
            sqlInfos.host = 'localhost';
            sqlInfos.user = 'artificial';
            sqlInfos.password = 'bonjour';
            sqlInfos.database = 'artificialdoctor';
            sqlInfos.port = 3306; 
        }
        else if(server == "jahel")
        {

            sqlInfos.host = 'localhost';
            sqlInfos.user = 'root';
            sqlInfos.password ="" ;
            sqlInfos.database = 'artificialdoctor';
            sqlInfos.port = 3306; 

        }
        else if(server == "jeremy")
        {

            sqlInfos.host = 'localhost';
            sqlInfos.user = 'artificial';
            sqlInfos.password = 'bonjour';
            sqlInfos.database = 'artificialdoctor';
            sqlInfos.port = 8889; 

        }

        callback(sqlInfos);
    });
}

exports.getAllInfosConnectionSql = getAllInfosConnectionSql;