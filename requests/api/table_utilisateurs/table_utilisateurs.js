const { getConnection } = require('../../requestBase');

function getUserById(iduser){

    try{
        getConnection(function (connection){

            connection.query("select * from utilisateurs where iduser = ? limit 1", iduser, function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    if(results.length > 0){
                        results[0].identifiant = null;
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

exports.getUserById = getUserById;
