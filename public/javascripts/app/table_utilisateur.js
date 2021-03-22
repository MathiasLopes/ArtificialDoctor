
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