
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

exports.createSession = createSession;
exports.removeSession = removeSession;
exports.userIsConnected = userIsConnected;