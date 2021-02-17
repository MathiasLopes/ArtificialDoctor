const { getConnection } = require('../../requestBase');

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

exports.getVaccinsByVirusId = getVaccinsByVirusId;