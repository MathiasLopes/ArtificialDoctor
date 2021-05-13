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
                initInformationsUser();
            }, 20);
        }

        if(actualite.isDisplayed())
            actualite.hide(callback)

        if(vaccins.isDisplayed())
            vaccins.hide(callback);
    }
}

function initInformationsUser(){

    showLoading();

    getMe(function(result){

        hideLoading();

        if(result.success){
            remplissageInformationUser(result.message[0]);
        }else{
            alert("Une erreur est survenue : " + result.message);
        }
    });
}

function remplissageInformationUser(infosUser){
    $("#paramInputIdentifiant").val(infosUser.identifiant);
    $("#paramInputDateNaissance").val(infosUser.dateNaissance != "" ? infosUser.dateNaissance.split("T")[0] : "");
}

function updateParamDateNaissance(){

    var dateNaissance = $("#paramInputDateNaissance").val();
    
    if(verifieDateNaissanceIsValid(dateNaissance)){
        setNewDateNaissance(new Date(dateNaissance).toISOString(), function(data){
            if(data.success){
                alert("Date de naissance sauvegardé");
            }else{
                alert("Une erreur est survenue lors de l'enregistrement de votre date de naissance");
            }
        });
    }

    //sinon besoin de rien car tout a été géré dans la vérification
}

function verifieDateNaissanceIsValid(dateNaissanceFormatSQL){

    var annee = parseInt(dateNaissanceFormatSQL.split("-")[0]);
    var mois = parseInt(dateNaissanceFormatSQL.split("-")[1]);
    var jour = parseInt(dateNaissanceFormatSQL.split("-")[2]);

    var dateNow = new Date();
    var dateNaissanceEnDateTime = new Date();

    dateNaissanceEnDateTime.setFullYear(annee);
    dateNaissanceEnDateTime.setMonth(mois-1);
    dateNaissanceEnDateTime.setDate(jour);

    if(dateNaissanceEnDateTime > dateNow){
        alert("La date que vous avez saisi est plus grande que la date actuel");
        return false;
    }

    if(dateNaissanceEnDateTime.getFullYear() != annee || (dateNaissanceEnDateTime.getMonth() + 1) != mois || dateNaissanceEnDateTime.getDate() != jour)
    {
        alert("La date de naissance que vous avez saisi n'est pas valide");
        return false;
    }

    if((dateNow.getFullYear() - dateNaissanceEnDateTime.getFullYear()) > 120){
        alert("Vous ne pouvez pas avoir plus de 120 ans");
        return false;
    }

    return true;
}