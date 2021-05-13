
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
                recuperationVaccinsUser();
            }, 20);
        }

        if(actualite.isDisplayed())
            actualite.hide(callback);

        if(vaccin.isDisplayed()){
            vaccin.hide(callback);
        }
    }
}

function recuperationVaccinsUser(){

    showLoading();

    getMyVaccinations(function(result){

        if(result.success){            
            var vaccinations = result.message;
            var htmlVaccinations = genereHtmlForVaccinations(vaccinations);
            $("#content-vaccins").html(htmlVaccinations);
        }else{
            alert("Une erreur est survenue lors de la récupération de la liste des vaccinations");
        }

        hideLoading();
    });
}

//genere le code html pour afficher la liste des vaccinations
function genereHtmlForVaccinations(vaccinations){

    var htmlToReturn = '';

    htmlToReturn += "<div><p><font size='5'>Bienvenue, vous êtes à présent dans votre espace personnel.</font size></p>Cet espace est dédié aux vaccins auxquelles vous vous êtes abonné dans la page Actualité. Vous y retrouvez l'intégralité des vaccins que vous avez ajoutés. Le nom du vaccin et le virus, la maladie, l'infection... y seront affichés et contre quoi vous avez subi une infection.<p>Il restera plus que la date à mettre pour avoir un historique de vos vaccins.</p></div>"
    if(vaccinations.length == 0)
    {
        htmlToReturn += '<div class="noVaccination">' + 
            '<br>Vous n\'êtes abonné à aucun vaccin' +
            '</div>';
    }

    for(var i = 0; i < vaccinations.length; i++){

        var uneVaccination = vaccinations[i];
        var infoVaccin = uneVaccination.vaccin[0];

        htmlToReturn += '<div class="uneVaccination">' + 
                            '<p>- <b>' + infoVaccin.nom + '</b> : fait le <input id="vaccinInputDateNaissance" type="date" /> contre <b>' + infoVaccin.virus.nom + '</b>. <span class="buttonArtificialDoctor buttonParam" onclick="updateDateVaccinEffectue();">Mettre à jour</span></p>'
                        '</div>';
    }

    return htmlToReturn;
}

const vaccin = {
    isDisplayed: function(){
        return $("#content-body").hasClass("vaccin");
    },
    hide: function(callback){
        $("#content-body").removeClass("vaccin");
        setTimeout(function(){
            $("#content-vaccin").hide();
            if(typeof(callback) !== "undefined")
                callback();
        }, 210);
    }, 
    show: function(){
        $(".tab").removeClass("selected");
        $("#tabvaccins").addClass("selected");

        //la callback a appelé en fonction de ce qu'on veut afficher
        var callback = function(){

            //gestion des conteneurs
            $("#content-vaccin").show();

            //timeout pour laisser les show s'executer avant de terminer l'affichage
            setTimeout(function(){
                $("#content-body").addClass("vaccin");
                initInformationsVaccin();
            }, 20);
        }

        if(actualite.isDisplayed())
            actualite.hide(callback)

        if(vaccins.isDisplayed())
            vaccins.hide(callback);
    }
}

function initInformationsVaccin(){

    showLoading();

    getMe(function(result){

        hideLoading();

        if(result.success){
            remplissageInformationVaccin(result.message[0]);
        }else{
            alert("Une erreur est survenue : " + result.message);
        }
    });
}

function remplissageInformationVaccin(infosVaccin){
    $("#paramInputIdentifiant").val(infosVaccin.identifiant);
    $("#paramInputDateVaccin").val(infosVaccin.dateVaccin != "" ? infosVaccin.dateVaccin.split("T")[0] : "");
}

function updateDateVaccinEffectue(){

    var dateVaccin = $("#paramInputDateVaccin").val();
    
    if(verifieDateVaccinIsValid(dateVaccin)){
        setNewDateNaissance(new Date(dateVaccin).toISOString(), function(data){
            if(data.success){
                alert("Date du vaccin sauvegardé");
            }else{
                alert("Une erreur est survenue lors de l'enregistrement de votre date du vaccin");
            }
        });
    }

    //sinon besoin de rien car tout a été géré dans la vérification
}

function verifieDateVaccinIsValid(dateVaccinFormatSQL){

    var annee = parseInt(dateVaccinFormatSQL.split("-")[0]);
    var mois = parseInt(dateVaccinFormatSQL.split("-")[1]);
    var jour = parseInt(dateVaccinFormatSQL.split("-")[2]);

    var dateNow = new Date();
    var dateVaccinEnDateTime = new Date();

    dateVaccinEnDateTime.setFullYear(annee);
    dateVaccinEnDateTime.setMonth(mois-1);
    dateVaccinEnDateTime.setDate(jour);

    if(dateVaccinEnDateTime > dateNow){
        alert("La date que vous avez saisi est plus grande que la date actuel");
        return false;
    }

    if(dateVaccinEnDateTime.getFullYear() != annee || (dateVaccinEnDateTime.getMonth() + 1) != mois || dateVaccinEnDateTime.getDate() != jour)
    {
        alert("La date de naissance que vous avez saisi n'est pas valide");
        return false;
    }

    /*if((dateNow.getFullYear() - dateVaccinEnDateTime.getFullYear()) > 120){
        alert("Vous ne pouvez pas avoir plus de 120 ans");
        return false;
    }*/

    return true;
}