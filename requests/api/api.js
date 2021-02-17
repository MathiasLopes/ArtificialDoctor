
var mysql = require('mysql');
var url = require('url');
const { getConnection } = require('../requestBase');
var table_virus = require('./table_virus/table_virus');
var table_visite = require('./table_visite/table_visite');

//Permet de gérer le nom des requetes que le site peut faire en partant de là
filtreRequest = function(req, callback){

	var result = {success: false, message: "KO"};

	try{
		var urlRequest = url.parse(req.url, true);
		
		console.log(urlRequest.pathname);
		
		switch(urlRequest.pathname){            
            case "/api/getlistvirus": //renvoie la liste complete des virus
                table_virus.getListVirus(function(result){
                    callback(result);
                });
                break;
            case "/api/getinfosvirusbyid":
                table_virus.getAllInfosVirusById(req.body.idvirus, function(result){
                    callback(result);
                });
                break;
            case "/api/visited":
                table_virus.setLastDateVisiteAtNow(req.body.idvirus); // on met a jour la date de visite du virus
                table_visite.virusVisited(req.body.idvirus, function(result){ callback(result); }) // on insere une ligne dans la table visite
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