
const statistiques = {
    isDisplayed: function(){
        return $("#content-body").hasClass("statistiques");
    },
    hide: function(callback){
        $("#content-body").removeClass("statistiques");
        setTimeout(function(){
            $("#content-statistiques").hide();
            if(typeof(callback) !== "undefined")
                callback();
        }, 210);
    },
    show: function(callback){
        //gestion de la nav bar
        $(".tab").removeClass("selected");
        $("#tabstatistiques").addClass("selected");

        var callback2 = function(){

            showLoading();

            //gestion des conteneurs
            $("#content-statistiques").show();

            buildVirusPopulriteChart();
            buildNbVaccinationForVirus();

            hideLoading();

            //timeout pour laisser les show s'executer avant de terminer l'affichage
            setTimeout(function(){
                $("#content-body").addClass("statistiques");
                if(typeof(callback) !== "undefined")
                    callback();
            }, 20);
        }

        //gestion des autres fenetres pouvant etre affiché
        if(vaccins.isDisplayed())
            vaccins.hide(callback2);

        if(actualite.isDisplayed())
            actualite.hide(callback2);

        if(parametre.isDisplayed()){
            parametre.hide(callback2);
        }   
    }
}