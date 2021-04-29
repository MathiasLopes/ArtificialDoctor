const { getConnection } = require("./requestBase");
const table_utilisateurs = require("./api/table_utilisateurs/table_utilisateurs");

//permet de connecté l'utilisateur en session
function createSession(req, utilisateur){

    var result = {success: false, message: "KO"};

    try{
        
		req.session.userconnected = true;
        req.session.utilisateur = utilisateur;
      	result = {success: true, message: "Session créé"};

    }catch(e){
      	result = {success: false, message: e.message};
    }

    return result;

}

//permet de déconnecté l'utilisateur en session
function removeSession(req){

    var result = {success: false, message: "KO"};

    try{
        
        req.session.destroy();

      	result = {success: true, message: "L'utilisateur a bien été déconnecté"};

    }catch(e){
      	result = {success: false, message: e.message};
    }

    return result;
}

//permet de savoir si l'utilisateur est connecté ou non 
function userIsConnected(req){
    return req.session.userconnected;
}

//permet de mettre à jour les informations de l'utilisateur stocké en session avec les informations de la base de données
function updateUserInfo(req, callback){
    table_utilisateurs.getUserById(req.session.utilisateur.id, function(result){
        if(result.success && result.message.length > 0){
            req.session.utilisateur = result.message[0];
            callback({success:true, message:"Date de naissance mise à jour"});
        }else{
            callback({success:false, message: "Une erreur est survenue lors de la mise à jour de la date de naissance, recharger la page pour résoudre le problème"});
        }
    });
}

exports.createSession = createSession;
exports.removeSession = removeSession;
exports.userIsConnected = userIsConnected;
exports.updateUserInfo = updateUserInfo;