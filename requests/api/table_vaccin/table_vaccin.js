const { getConnection } = require('../../requestBase');
const { forAsync } = require('../../outils/async');
const table_virus = require('../table_virus/table_virus');

function getVaccinsByVirusId(virusid, callback){

    try{
        getConnection(function (connection){

            connection.query("select * from vaccin where virus_id = ?", virusid, function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération de la liste des vaccins pour le virus ayant pour id : " + virusid});
    }

}

function getVaccinByVaccinId(vaccinid ,callback){

    try{
        getConnection(function (connection){

            connection.query("select * from vaccin where id = ?", vaccinid, function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    //on recupere le virus lié à ce vaccin
                    table_virus.getVirusById(results[0].virus_id, function(result){
                        if(result.success){
                            results[0].virus = result.message[0];
                            callback({success: true, message: results});
                        }else{
                            callback(result);
                        }
                    });
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération de la liste des vaccins pour le virus ayant pour id : " + virusid});
    }

}

function getInformationsVaccinsByVaccinationsUser(vaccinations, callback){

    try{

        var success = true;
        var vaccinationsToSend = vaccinations;

        //pour chaque vaccination on recupere les informations du vaccin
        forAsync(vaccinations, function(uneVaccination, index, callbackForAsync){
            getVaccinByVaccinId(uneVaccination.vaccin_id, function(result){
                if(result.success){
                    vaccinationsToSend[index].vaccin = result.message;
                    callbackForAsync();
                }else{
                    success = false;
                    callbackForAsync();
                }
            })
        }, function(){
            if(success){
                callback({success: success, message: vaccinationsToSend});
            }
            else{
                callback({success: success, message: "Une erreur est survenue lors de la récupération des informations sur les vaccins de l'utilisateur"});
            }
        });

    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération de la liste des vaccins pour le virus ayant pour id : " + virusid});
    }

}

exports.getVaccinsByVirusId = getVaccinsByVirusId;
exports.getInformationsVaccinsByVaccinationsUser = getInformationsVaccinsByVaccinationsUser;