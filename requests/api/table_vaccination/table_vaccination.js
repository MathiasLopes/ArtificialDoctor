const { getConnection } = require('../../requestBase');
var OutilsDate = require('../../outils/date');

function getVaccinationByIdVaccinAndIdUser(vaccinid, userid, callback){

    try{
        getConnection(function (connection){

            connection.query("select * from vaccination where utilisateurs_id = ? and vaccin_id = ?", [userid, vaccinid], function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération d'une vaccination pour un utilisateur: " + vaccinid + "/" + userid});
    }

}

function removeVaccination(idvaccin, iduser, callback){

    try{
        getConnection(function (connection){

            connection.query("delete from vaccination where utilisateurs_id = ? and vaccin_id = ?", [iduser, idvaccin], function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la suppression d'une vaccination: " + vaccinid + "/" + userid});
    }

}

function addVaccination(idvaccin, iduser, callback){

    try{
        getConnection(function (connection){

            var post  = {utilisateurs_id: iduser, vaccin_id: idvaccin};
            connection.query("insert into vaccination SET ?", post, function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de l'ajout d'une vaccination': " + vaccinid + "/" + userid});
    }

}

exports.getVaccinationByIdVaccinAndIdUser = getVaccinationByIdVaccinAndIdUser;
exports.addVaccination = addVaccination;
exports.removeVaccination = removeVaccination;