
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
        htmlToReturn += `<div class="optionFiltreTypeVirus ${i == 0 ? "selected" : ""}" onclick="showTypeVirus('${listeTypeVirus[i].titre}', this);">${listeTypeVirus[i].titre}</div>`;
    }

    return htmlToReturn;

}

//permet de recuperer la liste des types de virus a partir de la liste des virus actuellement chargé
function loadListeTypeVirus(){

    var listeTypeVirus = [{titre: "Tout", nb: allVirus.length}];

    for(var i = 0; i < allVirus.length; i++){

        var unVirus = allVirus[i];

        //s'il n'est pas dans le table, on le crée
        if(!listeTypeVirus.inArray(function(e){ return e.titre == unVirus.type })){
            listeTypeVirus.push({titre: unVirus.type, nb: 1});
        }else{ //sinon on ajoute 1 au type

            var index = listeTypeVirus.inArrayAt(function(e){ return e.titre == unVirus.type });
            listeTypeVirus[index].nb++;
        }
    }

    listeTypeVirus.sort(GetSortOrderDesc("nb"));

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
        var htmlToCreate = `<div class="virus-liste-vaccin">`;

        if(lesVaccins.length > 0){
            for(var i = 0; i < lesVaccins.length; i++){

                htmlToCreate += `<div class="unvaccin" id="unvaccin${lesVaccins[i].id}" data-idvaccin="${lesVaccins[i].id}">
                                    <div onclick="showOrHideMoreForVaccin(this);" class="content-nom">${lesVaccins[i].nom}<i class="arrow fas fa-chevron-down"></i></div>
                                    <div class="content-more">
                                        <div class="content-description">Description : ${lesVaccins[i].description}</div>
                                        <div class="content-datesortie">Date de commercialisation : ${lesVaccins[i].dateSortie.split("-")[0]}</div>
                                        <div class="content-ageminimum">Age minimum : ${getAge(lesVaccins[i].ageMinimum)}</div>
                                        <div class="content-bt-for-listmesvaccins">
                                            Ajouter à mes vaccins : 
                                            <input data-idvaccin="${lesVaccins[i].id}" onchange="setVaccinInListMesVaccins(this);" class="apple-switch" type="checkbox">
                                        </div>
                                        <br>
                                    </div>
                                </div>`;

            }
        }else{
            htmlToCreate += `<div style="text-align:center;padding:5px;margin-top: 18px;">Aucun vaccin trouvé</div>`;
        }

        htmlToCreate += '</div>';

        var msgbox = new msgBox({
                title: $("#virus-nom").html(), 
                message: htmlToCreate,
                width: "85%",
                height: "70%"
            });
    });
}

//renvoie un string de l'age en fonction du parametre (type float : 18.1 = 18 ans et 1 mois)
function getAge(age)
{
    var ageString = "";

    var annee = age.split(".")[0];
    var mois = age.split(".")[1];

    if(annee > 0){
        ageString = (annee > 1 ? annee + " ans" : annee + " an");
    }

    if(mois > 0)
    {
        if(ageString != "")
            ageString += " ";

        ageString = mois + " mois"
    }

    return ageString;
}

//permet d'afficher le vaccin sélectionné
function showOrHideMoreForVaccin(obj){

    var parent = $(obj).parent();

    //on recupere si l'utilisateur a le vaccin dans sa liste ou non
    userHaveVaccinInList($(parent).data("idvaccin"), function(isVaccined){

        //s'il a le vaccin dans sa liste
        if(isVaccined){
            $("#" + $(parent).attr('id') + " .apple-switch").prop("checked", true);
        }else{ //s'il n'a pas le vaccin dans sa liste
            $("#" + $(parent).attr('id') + " .apple-switch").prop("checked", false);
        }

        //on affiche la description
        if($(parent).hasClass("more")){
            $(parent).removeClass("more");
        }else{
            $(parent).addClass("more");
        }

    });
}

//permet de savoir si l'utilisateur a le vaccin dans sa liste ou non
function userHaveVaccinInList(idvaccin, callback){
    getVaccinationByIdVaccin(idvaccin, function(result){
        if(result.success){
            callback((result.message.length > 0))
        }else{
            callback(false);
        }
    });
}

//permet d'ajouter ou supprimer un vaccin de la liste "mes vaccins" de l'utilisateur
function setVaccinInListMesVaccins(obj){

    var addOrRemove = $(obj).is(":checked");
    var idvaccin = $(obj).data("idvaccin");

    addOrRemoveVaccination(idvaccin, addOrRemove, function(result){
        if(!result.success)
        {
            $(obj).prop("checked", false);
            alert(result.message);
        }
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
                                    <div class="content-titre"><p><div class="titre">Titre : ` + unArticle.headline.main + `</div></p></div>
                                    <div class="content-description"><p><div class="description">Description :</div><div>` + unArticle.snippet + `</div></p></div>
                                    <div class="content-source"><p><div class="source">Source : ` + unArticle.source + `</div></p></div>
                                </div>`;
            }

            $("#list-articles").html(htmlArticles);
        }else{
            //on log pour avoir un suivi s'il y a eu une erreur
            console.log(result.message);
        }

        callback();
    });
}

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
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