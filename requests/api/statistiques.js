const { getConnection } = require('../requestBase');

function getVirusPopularity(callback){

    try{
        getConnection(function (connection){

            connection.query("SELECT nom, count(*) as nb FROM visite, virus where virus_id = virus.id and visite.date > DATE_ADD(NOW(), INTERVAL -2 MONTH) group by nom",  function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération du taux de popularité des virus"});
    }

}

function getNbVirusVaccination(callback)
{
    try{
        getConnection(function (connection){

            connection.query("select virus.nom, count(*) as nb from vaccination, vaccin, virus where vaccination.vaccin_id = vaccin.id and vaccin.virus_id = virus.id group by virus.nom",  function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération du nombre de vaccination réalisé pour un virus"});
    }
}

exports.getVirusPopularity = getVirusPopularity;
exports.getNbVirusVaccination = getNbVirusVaccination;