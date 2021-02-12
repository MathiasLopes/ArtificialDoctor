const { getConnection } = require('../../requestBase');
var OutilsDate = require('../../outils/date');

function getListVirus(callback){

    try{
        getConnection(function (connection){

            connection.query("select * from virus order by nom", function (error, results, fields){
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

function setLastDateVisiteAtNow(idvirus, callback){

    try{
        getConnection(function (connection){

            connection.query("UPDATE virus SET dateDerniereVisite = '" + OutilsDate.getDateNowSQL() + "' where id = ?", idvirus, function (error, results, fields){
                if(typeof(callback) !== "undefined"){
                    if(error){
                        callback({success: false, message: error});
                    }else{
                        callback({success: true, message: results});
                    }
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la mise à jour de la date de visite d'un virus"});
    }

}

//permet de récupérer la liste complete des virus
exports.getListVirus = getListVirus;

//permet de mettre à jour la date de derniere visite d'un virus à NOW
exports.setLastDateVisiteAtNow = setLastDateVisiteAtNow;