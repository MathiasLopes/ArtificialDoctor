function call_newyorktime(param, callback){
    $.get({
        url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + 
        "q=" + param +
        "&fq=news_desk:(\"Health\", \"Science\")" +
        "&api-key=YpmBo9KQaH9aJGWGYKLASNdJiK1fx57Z"
    }).done(function(data){
        callback(data);
    });
}