
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

        if(parametre.isDisplayed()){
            parametre.hide(callback);
        }
    }
}

function recuperationVaccinsUser(){

    showLoading();

    getMyVaccinations(function(result){

        console.log(result);

        if(result.success){
            
            

        }else{
            alert("Une erreur est survenue lors de la récupération de la liste des vaccinations");
        }

        hideLoading();
    });

}