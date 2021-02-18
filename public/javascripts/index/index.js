var allVirus = null;

//une fois que la page est prete
$(function(){
    
    //on recupere la liste des virus que l'on affiche à l'écran de l'utilisateur
    buildListeVirus(function(){
        buildListeTypeVirus(); //on construit la liste des types de virus
    });

})

function buildListeTypeVirus(){

    // on recuepre l'html construit a partir de la liste des types de virus
    var htmlListeTypeVirus = getHtmlWithListeTypeVirus(loadListeTypeVirus());

    $("#content-type-virus-selected").html(htmlListeTypeVirus);
}

function getHtmlWithListeTypeVirus(listeTypeVirus){

    var htmlToReturn = '<label>Type : </label>';

    //on construit l'html avec ces types
    for(var i = 0; i < listeTypeVirus.length; i++){
        htmlToReturn += `<div class="optionFiltreTypeVirus ${i == 0 ? "selected" : ""}" onclick="showTypeVirus('${listeTypeVirus[i]}', this);">${listeTypeVirus[i]}</div>`;
    }

    return htmlToReturn;

}

//permet de recuperer la liste des types de virus a partir de la liste des virus actuellement chargé
function loadListeTypeVirus(){

    var listeTypeVirus = ["Tout"];

    for(var i = 0; i < allVirus.length; i++){
        var unVirus = allVirus[i];
        listeTypeVirus.pushIfNotExist(unVirus.type, function(e){
            return e == unVirus.type;
        });
    }

    return listeTypeVirus;

}

//permet d'afficher uniquement les types de virus  sélectionné
function showTypeVirus(type, obj){

    $(".optionFiltreTypeVirus").removeClass("selected");
    $(obj).addClass("selected");

    if(type != "Tout"){
        //pour afficher uniquement les virus/maladie du type sélectionné
        $(".option_virus").addClass("hide");
        $(".option_virus[data-type='" + type + "']").removeClass("hide");
    }else{
        //pour tout afficher
        $(".option_virus").removeClass("hide");
    }
}

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
        htmlToReturn += '<div class="option_virus" data-type="' + unVirus.type + '" onclick="initInfosSelectedVirus(' + unVirus.id + ', \'' + unVirus.tradNomVirus.split("'").join("") + '\', this)">' + unVirus.nom + '</div>';
    }

    return htmlToReturn;
}

function initInfosSelectedVirus(id, nomanglais, obj){

    showLoading();

    //affichage des infos du virus provenant de la base de données
    showInfosSelectedVirus(id);

    //on gere le systeme de class pour la selection des virus
    addClassToSelectedInList(obj, "option_virus", "selected");

    //on cache la page de bienvenu si elle est affiché
    welcomePage.hide();

    //on cache la page welcome si elle etait affiché
    if(!$("#content-body").hasClass("virus-is-displayed"))
        $("#content-body").addClass("virus-is-displayed");

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
    getVirusById(id, function(data){

        if(data.success && data.message.length > 0){

            var virus = data.message[0];

            if(virus != null){

                virusVisited(id);
        

                console.log(virus.vaccins);

                $("#virus-nom").html(virus.nom);

                setVaccinsInVirusSelected(virus.vaccins);
                $("#virus-dateapparition").html("Date d'apparition : " + (virus.dateApparition != null ? virus.dateApparition.split("-")[0] : "Inconnue"));
                $("#virus-type").html("Type : " + virus.type);
                $("#virus-description").html(virus.description);
        
            }
        }else{
            alert("Une erreur est survenue lors de la récupération des informations du virus");
        }
    });
}

function setVaccinsInVirusSelected(lesVaccins){

    $("#virus-have-vaccin").html(lesVaccins.length > 0 ? lesVaccins.length + " vaccin(s) trouvé(s)" : "Aucun vaccin trouvé");
    $("#virus-have-vaccin").unbind();
    $("#virus-have-vaccin").click(function(){

        //ici affiché une fenêtre avec la liste des vaccins
        var htmlToCreate = '<div>';

        for(var i = 0; i < lesVaccins.length; i++){

            htmlToCreate += ``;

        }

        htmlToCreate += '</div>';

    });
    

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
    isDisplayed: function(){
        return $("#content-body").hasClass("actualite");
    },
    hide: function(callback){
        $("#content-body").removeClass("actualite");
        setTimeout(function(){
            actualite.contentListVirus.hide();
            actualite.contentSelectedVirus.hide();
            actualite.contentSelectedTypeVirus.hide();
            welcomePage.displayNone(true);
            if(typeof(callback) !== "undefined")
                callback();
        }, 210);
    },
    show: function(callback){
        //gestion de la nav bar
        $(".tab").removeClass("selected");
        $("#tabactualite").addClass("selected");

        var callback2 = function(){

            //gestion des conteneurs
            actualite.contentListVirus.show();
            actualite.contentSelectedVirus.show();
            actualite.contentSelectedTypeVirus.show();

            welcomePage.displayNone(false);

            //timeout pour laisser les show s'executer avant de terminer l'affichage
            setTimeout(function(){
                $("#content-body").addClass("actualite");
                if(typeof(callback) !== "undefined")
                    callback();
            }, 20);
        }

        //gestion des autres fenetres pouvant etre affiché
        if(vaccins.isDisplayed())
            vaccins.hide(callback2);

        if(parametre.isDisplayed()){
            parametre.hide(callback2);
        }   
    },
    contentListVirus: { //composant de la fenetre actualité, la div "content-list-virus"
        show: function(){
            $("#content-list-virus").show();
        },
        hide: function(){
            $("#content-list-virus").hide();
        }
    },
    contentSelectedVirus: { //composant de la fenetre actualité, la div "content-selected-virus"
        show: function(){
            $("#content-selected-virus").removeClass("hide");
        },
        hide: function(){
            $("#content-selected-virus").addClass("hide");
        }
    },
    contentSelectedTypeVirus: { //composant de la fenetre actualité, la div "content-type-virus-selected"
        show: function(){
            $("#content-type-virus-selected").removeClass("hide");
        },
        hide: function(){
            $("#content-type-virus-selected").addClass("hide");
        }
    }
}

//methodes permettant de gérer les fenetres vaccins
const vaccins = {
    isDisplayed: function(){
        return $("#content-body").hasClass("vaccins");
    },
    hide: function(callback){
        $("#content-body").removeClass("vaccins");
        setTimeout(function(){
            $("#content-vaccins").hide();
            if(typeof(callback) !== "undefined")
                callback();
        }, 210);
    },
    show: function(){
        $(".tab").removeClass("selected");
        $("#tabvaccins").addClass("selected");

        var callback = function(){
            $("#content-body").addClass("vaccins");
        }

        var callback = function(){

            //gestion des conteneurs
            $("#content-vaccins").show();

            //timeout pour laisser les show s'executer avant de terminer l'affichage
            setTimeout(function(){
                $("#content-body").addClass("vaccins");
            }, 20);
        }

        if(actualite.isDisplayed())
            actualite.hide(callback);

        if(parametre.isDisplayed()){
            parametre.hide(callback);
        }
    }
}

const parametre = {
    isDisplayed: function(){
        return $("#content-body").hasClass("parametres");
    },
    hide: function(callback){
        $("#content-body").removeClass("parametres");
        setTimeout(function(){
            $("#content-parametres").hide();
            if(typeof(callback) !== "undefined")
                callback();
        }, 210);
    }, 
    show: function(){
        $(".tab").removeClass("selected");
        $("#tabparametres").addClass("selected");

        //la callback a appelé en fonction de ce qu'on veut afficher
        var callback = function(){

            //gestion des conteneurs
            $("#content-parametres").show();

            //timeout pour laisser les show s'executer avant de terminer l'affichage
            setTimeout(function(){
                $("#content-body").addClass("parametres");
            }, 20);
        }

        if(actualite.isDisplayed())
            actualite.hide(callback)

        if(vaccins.isDisplayed())
            vaccins.hide(callback);
    }
}

const welcomePage = {
    isDisplayed: function(){ //permet de savoir si la page de bienvenu est affiché
        return !$("#content-body").hasClass("virus-is-displayed");
    },
    hide: function(){ //cache la page de bienvenu pour laisser la place a la page du virus selectionné
        if(welcomePage.isDisplayed())
            $("#content-body").addClass("virus-is-displayed");
    },
    show: function(){ //remplace la page du virus sélectionné par la page de bienvenu
        if(!welcomePage.isDisplayed())
            $("#content-body").removeClass("virus-is-displayed");
    },
    displayNone: function(active){
        if(welcomePage.isDisplayed() && active){
            $("#content-welcome").hide();
        }else if(welcomePage.isDisplayed() && !active){
            $("#content-welcome").show();
        }
    }
}