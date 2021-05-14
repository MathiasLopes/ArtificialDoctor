
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

//permet de recuperation la liste des vaccinations de l'utilisateur
function getMyVaccinations(callback){
    $.post({
        url: "/api/get_my_vaccinations"
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    })
}

//permet de modifier la date d'une vaccination
function modifyDateVaccination(idvaccination, dateVaccination, callback){
    $.post({
        url: "/api/modify_date_vaccination",
        data: {
            id: idvaccination,
            date: dateVaccination
        }
    })
    .done(function(data){
        callback(data);
    })
    .fail(function(data){
        callback({success: false, message: data});
    })
}