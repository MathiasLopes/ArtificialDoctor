const { getConnection } = require('../../requestBase');
var OutilsDate = require('../../outils/date');

function virusVisited(idvirus, callback){

    try{
        getConnection(function (connection){

            //recuperation de la date now au format SQL
            var dateNow = OutilsDate.getDateNowSQL();

            connection.query("INSERT INTO visite (date, virus_id) VALUES ('" + dateNow + "', " + idvirus + ")",  function (error, results, fields){
                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération de la liste des virus"});
    }

}

exports.virusVisited = virusVisited;
