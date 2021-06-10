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

function getNbUsers(callback){
    try{
        getConnection(function (connection){

            connection.query("select count(*) as nb from utilisateurs",  function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération du nombre d'utilisateurs totales"});
    }
}

function getNbVisites(callback){
    try{
        getConnection(function (connection){

            connection.query("select count(*) as nb from visite",  function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération du nombre de visites totales"});
    }
}

function getNbVirus(callback){
    try{
        getConnection(function (connection){

            connection.query("select count(*) as nb from virus",  function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération du nombre de virus totales"});
    }
}

function getNbVaccins(callback){
    try{
        getConnection(function (connection){

            connection.query("select count(*) as nb from vaccin",  function (error, results, fields){
                connection.end();

                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération du nombre de vaccins totales"});
    }
}

// nombre des vaccins par virus 

function getNbVaccinsParVirus(callback){
    try{
        getConnection(function(connection){
            connection.query("SELECT virus.nom ,count(*) as nb_vaccin FROM vaccin INNER JOIN virus ON virus.id = vaccin.virus_id GROUP BY virus.nom", function (error, results, fields){
                connection.end();

                if(error){
                    callback({success:false, message: error})
                }else{
                    callback({success: true, message: results})
                }
            });
        });
    }catch(e){
            callback({success: false, message:"Une erreur est survenue lors de la récupération du nombre de vaccins par virus"});
        }
    }

exports.getVirusPopularity = getVirusPopularity;
exports.getNbVirusVaccination = getNbVirusVaccination;
exports.getNbUsers = getNbUsers;
exports.getNbVisites = getNbVisites;
exports.getNbVirus = getNbVirus;
exports.getNbVaccins = getNbVaccins;
exports.getNbVaccinsParVirus = getNbVaccinsParVirus;


