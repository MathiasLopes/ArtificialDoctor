
var mysql = require('mysql');
var url = require('url');
const { getConnection } = require('../requestBase');
var table_virus = require('./table_virus/table_virus');
var table_visite = require('./table_visite/table_visite');
var table_utilisateurs = require('./table_utilisateurs/table_utilisateurs');
var table_vaccination = require('./table_vaccination/table_vaccination');
var table_vaccin = require('./table_vaccin/table_vaccin');

//Permet de gérer le nom des requetes que le site peut faire en partant de là
filtreRequest = function(req, callback){

	var result = {success: false, message: "KO"};

	try{
		var urlRequest = url.parse(req.url, true);
		
        //on log tous les path qui sont utilisé
		console.log(urlRequest.pathname);
		
		switch(urlRequest.pathname){            
            case "/api/getlistvirus": //renvoie la liste complete des virus
                table_virus.getListVirus(function(result){
                    callback(result);
                });
                break;
            case "/api/getinfosvirusbyid": //recupere les informations d'un virus
                table_virus.getAllInfosVirusById(req.body.idvirus, function(result){
                    callback(result);
                });
                break;
            case "/api/visited": //permet d'ajouter un au compteur d'un virus et dans la table de visite
                table_virus.setLastDateVisiteAtNow(req.body.idvirus); // on met a jour la date de visite du virus
                table_visite.virusVisited(req.body.idvirus, function(result){ callback(result); }) // on insere une ligne dans la table visite
                break;
            case "/api/me": //renvoie les informations de l'utilisateur
                table_utilisateurs.getUserById(req.session.utilisateur.id, function(result){
                    callback(result);
                })
                break;
            case "/api/getvaccination": //renvoie si l'utilisateur a un vaccin en fonction de l'id vaccin donné
                table_vaccination.getVaccinationByIdVaccinAndIdUser(req.body.idvaccin, req.session.utilisateur.id, function(result){
                    callback(result);
                });
                break;
            case "/api/add_or_remove_vaccination": //permet d'ajouter ou supprimer un vaccin en fonction de l'id du vaccin et du boolean donné
                if(req.body.addorremove == "true"){
                    console.log("id vaccin : " + req.body.idvaccin);
                    table_vaccination.addVaccination(req.body.idvaccin, req.session.utilisateur.id, function(result){
                        callback(result);
                    });
                }else{
                    table_vaccination.removeVaccination(req.body.idvaccin, req.session.utilisateur.id, function(result){
                        callback(result);
                    });
                }
                break;
            case "/api/get_my_vaccinations":
                    table_vaccination.getMyVaccinations(req.session.utilisateur.id, function(result){

                        //si on a bien récupéré les vaccins de l'utilisateur, on va récupéré :
                        //- le virus pour lequel il a été vacciné
                        //- les informations sur les vaccins
                        if(result.success && result.message.length > 0){
                            table_vaccin.getInformationsVaccinsByVaccinationsUser(result.message, function(result2){
                                callback(result2);
                            });
                        }
                        else
                            callback(result);
                    })
                break;
			default:
				callback({success: false, message: "La méthode " + urlRequest.pathname + " recherchée n'existe pas"});
        }

    }catch(e){
        console.log("Une erreur est survenue lors du filtrage de la requête : ", e.message);
        callback(result);
    }
}

exports.request = filtreRequest;