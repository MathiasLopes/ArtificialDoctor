//demo ou prod
var server = "demo";

function getAllInfosConnectionSql(){

    var sqlInfos = {};

    if(server == "demo"){
        sqlInfos.host = 'localhost';
        sqlInfos.user = 'root';
        sqlInfos.password = 'test';
        sqlInfos.database = 'artificialdoctor';
        sqlInfos.port = 3306; 

    }else if(server == "prod"){

        //a configuré
        sqlInfos.host = 'localhost';
        sqlInfos.user = 'root';
        sqlInfos.password = 'test';
        sqlInfos.database = 'artificialdoctor';
        sqlInfos.port = 3306; 
    }

    return sqlInfos;
}

exports.getAllInfosConnectionSql = getAllInfosConnectionSql;