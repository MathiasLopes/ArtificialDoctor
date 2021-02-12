function call_newyorktime(param, callback){

    var send = false;

    $.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + 
        "q=" + param +
        "&fq=news_desk:(\"Health\", \"Science\")" +
        "&api-key=YpmBo9KQaH9aJGWGYKLASNdJiK1fx57Z"
    }).done(function(data){
        send = true;
        if(data.response.docs.length == 0){
            call_newyorktime_moreresult(param, callback);
        }else{
            callback({success: true, message: data});
        }
    }).always(function(){
        if(!send)
            callback({success: false, message: "Erreur avec l'API New York Times"});
    })
}

function call_newyorktime_moreresult(param, callback){
    $.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + 
        "q=" + param +
        "&api-key=YpmBo9KQaH9aJGWGYKLASNdJiK1fx57Z"
    }).done(function(data){
        send = true;
        callback({success: true, message: data});
    }).always(function(){
        if(!send)
            callback({success: false, message: "Erreur avec l'API New York Times"});
    })
}