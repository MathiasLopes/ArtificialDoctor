
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
