const { getConnection } = require('../../requestBase');

function getInformationsUsers(iduser){

    

}

//permet initialiser la ligne contenant les informations de l'utilisateur dans cette table
function initInformationsRecord(iduser){

    try{
        getConnection(function (connection){

            connection.query("select * from user_informations where iduser = ?", iduser, function (error, results, fields){
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