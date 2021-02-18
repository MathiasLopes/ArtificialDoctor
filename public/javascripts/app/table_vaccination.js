
//permet de récuperer un virus en passant sont id
function getVaccinationByIdVaccin(idvaccin, callback){
    $.post({
        url: "/api/getvaccination",
        data:{
            idvaccin: idvaccin
        }
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    })
}

//permet d'ajouter ou supprimer un vaccin de la liste mes vaccins de l'utilisateur
function addOrRemoveVaccination(idvaccin, addOrRemove, callback){
    $.post({
        url: "/api/add_or_remove_vaccination",
        data:{
            idvaccin: idvaccin,
            addorremove: addOrRemove
        }
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    })
}
