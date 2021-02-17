var mysql = require('mysql');
var url = require('url');
const { getConnection } = require('./requestBase');
const { getPublicKeyFromPem, verifyAuthSignature, makeKeyPair } = require('../crypto-utils')
var gestionSession = require('./gestionSession');

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

                    //recuperation du certificat à stocker en base de données
                    var certificat = req.body.publicKey;

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
    getConnection(function(connection){
        connection.query("select * from utilisateurs where identifiant = ?", identifiant, function (error, results, fields){
            connection.end();

            if(error){
                console.log("erreur : ", error);
            }

            callback(results);
        });
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
    getConnection(function(connection){
        connection.query("insert into utilisateurs SET ?", post);
        connection.end();
    });
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
                var certificat = getPublicKeyFromPem(utilisateur.certificat);

                //on verifie que la signature passé par l'utilisateur correspond avec la methode necessaire
                try{

                    await verifyAuthSignature(certificat, req.body.message, req.body.signature);

                    utilisateur.certificat = ""; //on enleve le certificat avant de stocker en session

                    if(gestionSession.createSession(req, utilisateur).success){
                        //si on arrive ici c'est que l'utilisateur à le bon mot de passe
                        callback({success: true, message: "L'utilisateur est connecté"});
                    }else{
                        callback({success: false, message: "Une erreur est survenue lors de la création de la session"});
                    }

                
                }catch(e){
                    callback({success: false, message: "Mot de passe est erroné"});
                }

            }else{
                callback({success: false, message: "L'identifiant ou le mot de passe est incorrect"});
            }

        });
    }catch(e){
        callback({success: false, message: "Erreur serveur connexion : " + e.message});
    }

}

//renvoie true si l'utilisateur est connecté
function verification(req, callback){

    try{

        if(gestionSession.userIsConnected(req)){
            callback({success: true, message: "L'utilisateur est connecté"});
        }else{
            callback({success: false, message: "L'utilisateur n'est pas connecté"});
        }

    }catch(e){

        callback({success: false, message: "Erreur serveur verification connexion : " + e.message});
    }

}

//permet de deconnecter l'utilisateur
function deconnexion(req, callback){

    try{

        if(gestionSession.removeSession(req)){
            callback({success: true, message: "L'utilisateur est déconnecté"});
        }else{
            callback({success: false, message: "Une erreur est survenue lors de la déconnexion de l'utilisateur"});
        }

    }catch(e){
        callback({success: false, message: "Erreur serveur verification connexion : " + e.message});
    }

}

exports.inscription = inscription;
exports.connexion = connexion;
exports.verification = verification;
exports.deconnexion = deconnexion;