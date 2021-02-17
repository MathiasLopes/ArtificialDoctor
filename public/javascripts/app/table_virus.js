
//permet de récupérer la liste des virus
function getListeVirus(callback){
    $.post({
        url: "/api/getlistvirus"
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    })
}

//permet d'ajouter 1 au compteur
function virusVisited(idvirus){
    $.post({
        url: "/api/visited",
        data:{
            idvirus: idvirus
        }
    }).done(function(data){
        //il ne se passe rien car c'est un compteur pour la base de données
    });
}

//permet de récuperer un virus en passant sont id
function getVirusById(idvirus, callback){
    $.post({
        url: "/api/getinfosvirusbyid",
        data:{
            idvirus: idvirus
        }
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    })
}
