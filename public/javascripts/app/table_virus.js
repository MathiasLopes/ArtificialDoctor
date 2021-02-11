
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

//permet de récuperer un virus en passant sont id
function getVirusById(id, listevirus){
    for(var i = 0; i < listevirus.length; i++){
        if(listevirus[i].id == id){
            return listevirus[i];
        }
    }
}
