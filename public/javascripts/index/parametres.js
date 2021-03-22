
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
    $("#paramInputDateNaissance").val(infosUser.dateNaissance);
    
}