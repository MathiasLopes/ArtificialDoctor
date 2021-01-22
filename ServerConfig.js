var fs = require('fs');

function getAllInfosConnectionSql(callback){

    var server = "prod";

    fs.readFile('./ServerConfigWord.txt', 'utf8', function (err, data) {

        if (err) {
            console.log("une erreur");
            server = "prod";
        }else{
            console.log("pas derreur");
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
            sqlInfos.user = 'root';
            sqlInfos.password = 'root';
            sqlInfos.database = 'artificialdoctor';
            sqlInfos.port = 3306; 
        }

        callback(sqlInfos);
    });
}

exports.getAllInfosConnectionSql = getAllInfosConnectionSql;