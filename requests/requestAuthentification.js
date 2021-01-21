var mysql = require('mysql');
var url = require('url');
var requestBase = require('./requestBase');
const { getPublicKeyFromPem, verifyAuthSignature, makeKeyPair } = require('../crypto-utils')
const { connection } = require('./requestBase');

//methode permettant l'inscription à l'utilisateur
function inscription(req, callback){

    try {

        var identifiant = req.body.username;

        //verification de la taille des characteres
        if(identifiant.length > 249){
            callback({success: false, message: "L'identifiant ne peut pas excéder être égale ou supérieur à 250 charactères"});
        }else{
                
            //verification que l'identifiant n'existe pas, on inscrit l'utilisateur
            identifiantExist(identifiant, function(idExist){

                if(!idExist){
                    
                    var certificat = JSON.stringify(req.body.publicKey);

                    //recuperation du certificat à stocker en base de données
                    //var certificat = JSON.stringify(getPublicKeyFromPem(req.body.publicKey));

                    //on ajoute la ligne dans la table utilisateur
                    insertionUserInTableUtilisateur(identifiant, certificat);

                    callback({success: true, message: "Utilisateur inscrit !"});

                }else{
                    callback({success: false, message: "L'identifiant saisi existe déjà"});
                }

            });
        }
    } catch (err) {
        callback({success: false, message: "Erreur serveur inscription : " + err.message});
    }
}

//methode permettant de recuperer la ligne utilisateur dans la table utilisateur
function getIdentifiant(identifiant, callback){
    connection.query("select * from utilisateurs where identifiant = ?", identifiant, function (error, results, fields){
        callback(results);
    });
}

function identifiantExist(identifiant, callback){
    getIdentifiant(identifiant, function(listeIdentifiants){
        if(listeIdentifiants.length > 0){
            callback(true);
        }else{
            callback(false);
        }
    });
}

//permet d'insérer un nouvelle utilisateur avec uniquement les informations identifiant et certificat
function insertionUserInTableUtilisateur(identifiant, certificat){
    var post  = {identifiant: identifiant, certificat: certificat};
    connection.query("insert into utilisateurs SET ?", post);
}

//permet de s'assurer que l'utilisateur utilise les bonnes informations pour se connecter afin de valider la connexion
function connexion(req, callback){

    try{

        //on recupere la ligne identifiant dans la table
        getIdentifiant(req.body.username, async function(utilisateur){

            //on s'assure qu'il y a bien un resultat
            if(utilisateur.length > 0){

                //on recupere la premiere ligne directement qui est sensé être l'utilisateur ciblé
                utilisateur = utilisateur[0];
                
                //on recupere le certificat au bon format
                var certificat = getPublicKeyFromPem(JSON.parse(utilisateur.certificat));

                console.log(certificat);

                //on verifie que la signature passé par l'utilisateur correspond avec la methode necessaire
                try{
                    await verifyAuthSignature(certificat, req.body.message, req.body.signature);

                    //si on arrive ici c'est que l'utilisateur à le bon mot de passe
                    callback({success: true, message: "L'utilisateur est connecté"});

                }catch(e){
                    callback({success: false, message: "Mot de passe est erroné"});
                }

            }else{
                callback({success: false, message: "L'utilisateur n'éxiste pas"});
            }

        });
    }catch(e){
        callback({success: false, message: "Erreur serveur connexion : " + e.message});
    }

}

exports.inscription = inscription;
exports.connexion = connexion;