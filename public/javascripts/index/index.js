
function getArticles(data){

    showLoading();

    call_newyorktime(data, function(result){
        
        hideLoading();
        
        var htmlArticles = "";

        for(var i = 0; i < result.response.docs.length; i++){
            var unArticle = result.response.docs[i];
            htmlArticles += `<div class="unArticle" onclick="openInNewTab('` + unArticle.web_url + `')">
                                <div class="content-titre"><div class="titre">Titre :</div><div>` + unArticle.headline.main + `</div></div>
                                <div class="content-description"><div class="description">Description :</div><div>` + unArticle.snippet + `</div></div>
                                <div class="content-source"><div class="source">Source :</div><div>` + unArticle.source + `</div></div>
                            </div>`;
        }

        $("#list-articles").html(htmlArticles);
    });

}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}