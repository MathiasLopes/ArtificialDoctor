const { getConnection } = require("./requestBase");
const table_utilisateurs = require("./api/table_utilisateurs/table_utilisateurs");

//permet de connecté l'utilisateur en session
function createSession(req, utilisateur){

    var result = {success: false, message: "KO"};

    try{
        
		req.session.userconnected = true;
        req.session.utilisateur = utilisateur;

        console.log(req.session);

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
    table_utilisateurs.getUserByIdWithReq(req.session.utilisateur.id, function(result){
        if(result.success && result.message.length > 0){
            req.session.utilisateur = result.message[0];
        }
    });
}

exports.createSession = createSession;
exports.removeSession = removeSession;
exports.userIsConnected = userIsConnected;
exports.updateUserInfo = updateUserInfo;