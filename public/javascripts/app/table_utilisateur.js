
//permet de récuperer les données de l'utilisateur connecté
function getMe(callback){
    $.post({
        url: "/api/me"
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    })
}

//permet de mettre à jour la date de naissance de l'utilisateur
function setNewDateNaissance(datenaissance, callback){
    $.post({
        url: "/api/user/savedatenaissance",
        data:{
            datenaissance: datenaissance
        }
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    });
}

function setNewPassword(publickey, callback)
{
    $.post({
        url: "/api/user/setnewpassword",
        data:{
            publickey: publickey
        }
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    });
}