
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