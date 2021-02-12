var allVirus = null;

//une fois que la page est prete
$(function(){
    
    //on recupere la liste des virus que l'on affiche à l'écran de l'utilisateur
    buildListeVirus(function(){
        selectFirstVirus(); //on selectionne le premier virus de la liste
    });

})

function selectFirstVirus(){
    $($(".option_virus")[0]).click();
}

function buildListeVirus(callback){
    getListeVirus(function(result){
        if(result.success){
            var htmlToAdd = getHtmlListeVirus(result.message);
            $("#content-list-virus").html(htmlToAdd);
            callback();
        }else{
            alert("Une erreur est survenue : " + result.message);
        }
    });
}

function getHtmlListeVirus(listevirus){
    var htmlToReturn = "";

    allVirus = listevirus;

    for(var i = 0; i < listevirus.length; i++){
        var unVirus = listevirus[i];
        htmlToReturn += '<div class="option_virus" onclick="initInfosSelectedVirus(' + unVirus.id + ', \'' + unVirus.tradNomVirus.split("'").join("") + '\', this)">' + unVirus.nom + '</div>';
    }

    return htmlToReturn;
}

function initInfosSelectedVirus(id, nomanglais, obj){

    showLoading();

    //affichage des infos du virus provenant de la base de données
    showInfosSelectedVirus(id);

    //on gere le systeme de class pour la selection des virus
    addClassToSelectedInList(obj, "option_virus", "selected");

    //recuperation des articles en rapport avec ce virus
    getArticles(nomanglais, function(){
        hideLoading(); //on cache le loading quand les articles sont affichés
    });
}

//supprime la class selected de toutes les options virus et ajoute la class selected à l'obj passé en parametre
function addClassToSelectedInList(obj, classOfList, classToSelect){
    $("." + classOfList).removeClass(classToSelect);
    if(typeof(obj) !== "undefined")
        $(obj).addClass(classToSelect);
}

function showInfosSelectedVirus(id){

    //on recupere le virus
    var virus = getVirusById(id, allVirus);

    if(virus != null){

        virusVisited(id);

        $("#virus-nom").html(virus.nom);
        $("#virus-dateapparition").html("Date d'apparition : " + (virus.dateApparition != null ? virus.dateApparition.split("-")[0] : "Inconnue"));
        $("#virus-type").html("Type : " + virus.type);
        $("#virus-description").html(virus.description);

    }
 
}

function getArticles(data, callback){

    call_newyorktime(data, function(result){
        
        $("#list-articles").html("");

        if(result.success){

            result = result.message;

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
        }else{

            console.log(result.message);

        }

        callback();
    });
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

//methode permettant de gérer les fenetres actualités
const actualite = {
    hide: function(callback){
        $("#content-body").removeClass("actualite");
        setTimeout(function(){
            $("#content-list-virus").hide();
            $("#content-selected-virus").hide();       
            if(typeof(callback) !== "undefined")
                callback();
        }, 210);
    },
    show: function(callback){
        $(".tab").removeClass("selected");
        $("#tabactualite").addClass("selected");
        $("#content-list-virus").show();
        $("#content-selected-virus").show();
        setTimeout(function(){
            $("#content-body").addClass("actualite");
            if(typeof(callback) !== "undefined")
                callback();
        }, 20);
               
    }
}

//methodes permettant de gérer les fenetres vaccins
const vaccins = {
    hide: function(){

    },
    show: function(){
        $(".tab").removeClass("selected");
        $("#tabvaccins").addClass("selected");
        actualite.hide(function(){
            //a voir pour afficher les div necessaire ou la class necessaire
        });
    }
}