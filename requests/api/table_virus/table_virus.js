const { getConnection } = require('../../requestBase');
var OutilsDate = require('../../outils/date');
const table_vaccin = require('../table_vaccin/table_vaccin');

function getListVirus(callback){

    try{
        getConnection(function (connection){

            connection.query("select * from virus order by nom", function (error, results, fields){
                connection.end();

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

function getVirusById(idvirus, callback){

    try{
        getConnection(function (connection){

            connection.query("select * from virus where id = ?", idvirus, function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    if(results.length > 0)
                        callback({success: true, message: results});
                    else
                        callback({success: false, message: "Aucun virus retrouvé"})
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération du virus ayant pour id : " + idvirus});
    }

}

function getAllInfosVirusById(idvirus, callback){

    var virus = null;

    //recuperation du virus
    getVirusById(idvirus, function(result){

        if(result.success){

            virus = result.message[0];

            //recuperation des virus du vaccins
            table_vaccin.getVaccinsByVirusId(idvirus, function(result){

                if(result.success){
                    virus.vaccins = result.message;
                    callback({success: true, message: [virus]});
                }else{
                    callback(result);
                }
            });
            
        }else{
            callback(result);
        }
    });
}

function setLastDateVisiteAtNow(idvirus, callback){

    try{
        getConnection(function (connection){

            connection.query("UPDATE virus SET dateDerniereVisite = '" + OutilsDate.getDateNowSQL() + "' where id = ?", idvirus, function (error, results, fields){
                connection.end();
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

//permet de récupérer un seul virus
exports.getVirusById = getVirusById;

//permet de récupérer un seul virus avec toutes les informations
exports.getAllInfosVirusById = getAllInfosVirusById;