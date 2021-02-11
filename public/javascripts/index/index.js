//une fois que la page est prete
$(function(){
    
    //on recupere la liste des virus que l'on affiche à l'écran de l'utilisateur
    buildListeVirus();

})

function buildListeVirus(){
    getListeVirus(function(result){
        if(result.success){

            var htmlToAdd = getHtmlListeVirus(result.message);
            $("#content-list-virus").html(htmlToAdd);

        }else{
            alert("Une erreur est survenue : " + result.message);
        }
    });
}

function getHtmlListeVirus(listevirus){
    var htmlToReturn = "";

    for(var i = 0; i < listevirus.length; i++){
        var unVirus = listevirus[i];
        htmlToReturn += '<div class="option_virus" onclick="getArticles(\'' + unVirus.tradNomVirus.split("'").join("") + '\')">' + unVirus.nom + '</div>';
    }

    return htmlToReturn;
}


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