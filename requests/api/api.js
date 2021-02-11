
var mysql = require('mysql');
var url = require('url');
const { getConnection } = require('../requestBase');

//Permet de gérer le nom des requetes que le site peut faire en partant de là
filtreRequest = function(req, callback){

	var result = {success: false, message: "KO"};

	try{
		var urlRequest = url.parse(req.url, true);
		
		console.log(urlRequest.pathname);
		
		switch(urlRequest.pathname){            
            case "/api/getlistvirus": //renvoie la liste complete des virus
                getListVirus(function(result){
                    callback(result);
                });
            break;
			default:
				callback({success: false, message: "La méthode " + urlRequest.pathname + " recherchée n'existe pas"});
        }

    }catch(e){
        console.log("Une erreur est survenue lors du filtrage de la requête : ", e.message);
        callback(result);
    }
}

function getListVirus(callback){

    try{
        getConnection(function (connection){

            connection.query("select * from virus", function (error, results, fields){
                if(error){
                    callback({success: false, message: error});
                }else{
                    callback({success: true, message: results});
                }
            });
        });
    }catch(e){
        callback({success: false, message:"Une erreur est survenue lors de la récupération de la liste des virus"});
    }
}

exports.request = filtreRequest;