const { getConnection } = require('../../requestBase');
const dateManager = require('../../outils/date');

function getUserById(iduser, callback){

    try{
        getConnection(function (connection){

            connection.query("select * from utilisateurs where id = ? limit 1", iduser, function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    if(results.length > 0){
                        results[0].certificat = null; //on vide les champs qui ne doivent pas etre envoyé sur le réseau
                    }
                    callback({success: true, message: results}); 
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération de la liste des vaccins pour le virus ayant pour id : " + virusid});
    }

}

function saveNewDateNaissance(dateNaissance, idUser, callback)
{
    try
    {
        //on fait d'abord la verification de la date de naissance pour etre sur que c'est une date de naissance valide
        if(dateManager.verifIfDateNaissanceIsValide(dateNaissance)){
            getConnection(function (connection){
                //on met à jour la date de naissance
                connection.query("update utilisateurs SET dateNaissance = ? where id = " + idUser, dateManager.dateJsToSql(dateNaissance), function (error, results, fields){
                    connection.end();

                    if(error){
                        callback({success: false, message: error});
                    }
                    else{
                        callback({success: true, message: results});
                    }
                });
            });
        }else{
            callback({success: false, message: "La date de naissance n'est pas valide"});
        }
    }
    catch(e)
    {
        console.log(e.message);
        callback({success: false, message:"Une erreur est survenue lors de la mise à jour de la date de naissance de l'utilisateur : " + idUser + " pour la date de naissance : " + dateNaissance + ""});
    }
}

function setNewPassword(publickey, iduser, callback)
{
    try{
        getConnection(function(connection){
            connection.query("update utilisateurs SET certificat = ? where id = " + iduser, publickey, function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }
                else{
                    callback({success: true, message: results});
                }
            });
        });
    }
    catch(e)
    {
        callback({success: false, message:"Une erreur est survenue lors de la mise à jour du mot de passe"});
    }
}

exports.getUserById = getUserById;
exports.saveNewDateNaissance = saveNewDateNaissance;
exports.setNewPassword = setNewPassword;
