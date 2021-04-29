const { getConnection } = require('../../requestBase');
var OutilDate = require('../../outils/date');
var table_vaccin = require('../table_vaccin/table_vaccin');

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

//permet d'ajouter le vaccin
function addVaccination(req, idvaccin, iduser, callback){

    try{

        //verification que l'age de l'utilisateur est supérieur à l'age de minimum pour un vaccin
        var age = OutilDate.getAgeYearAndMonth(new Date(req.session.utilisateur.dateNaissance));
        
        table_vaccin.getVaccinByVaccinId(idvaccin, function(result){

            var ageMinimumForVaccin = OutilDate.getAgeOfDatabase(result.message[0].ageMinimum);
            
            if(age[0] >= ageMinimumForVaccin[0] && age[1] >= ageMinimumForVaccin[1])
            { 
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
            }else
               callback({success: false, message: "Vous n'avez pas l'age minimum requis pour avoir réalisé ce vaccin."})
        });

    }catch(e){
        console.log(e);
        callback({success: false, message:"Une erreur est survenue lors de l'ajout d'une vaccination': " + idvaccin + "/" + iduser});
    }
}

function getMyVaccinations(iduser, callback){

    try{
        getConnection(function (connection){
            connection.query("select * from vaccination where utilisateurs_id = ?", iduser, function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération de la liste des vaccinations de l'utilisateur : " + userid});
    }

}

exports.getVaccinationByIdVaccinAndIdUser = getVaccinationByIdVaccinAndIdUser;
exports.addVaccination = addVaccination;
exports.removeVaccination = removeVaccination;
exports.getMyVaccinations = getMyVaccinations;