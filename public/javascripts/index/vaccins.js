
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

    htmlToReturn += '<div>Vous êtes à présent dans votre espace. Cet espace est dédié aux vaccins que vous avez pu effectuer. Le nom et la date vous seront affichés.</div>'
    
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
                            '<p>- <b>' + infoVaccin.nom + '</b> vous a été administré le ' + '<b>DATE à METTRE </b>' + 'dans le cadre du vaccin contre ' + '<b>VIRUS à METTRE</b></p>'
                        '</div>';
    }

    return htmlToReturn;
}