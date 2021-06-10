
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

            showNbUsers();
            showNbVisites();
            showNbVirus();
            showNbVaccins();
            buildVirusPopulriteChart();
            buildNbVaccinationForVirus();
            buildNbVaccinByVirus();

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

function showNbUsers(){
    $.post({
        url: "/api/stats/nbusers"
    })
    .done(function (data) {
        if (data.success){
            $("#nbUsers").html(data.message[0].nb);
        }else{
            $("#nbUsers").html(data.message);
        }
    })
    .fail(function (data) {
        $("#nbUsers").html("Erreur lors de la récupération");
    })
}

function showNbVisites(){
    $.post({
        url: "/api/stats/nbvisites"
    })
    .done(function (data) {
        if (data.success){
            $("#nbVisites").html(data.message[0].nb);
        }else{
            $("#nbVisites").html(data.message);
        }

    })
    .fail(function (data) {
        $("#nbVisites").html("Erreur lors de la récupération");
    })
}

function showNbVirus(){
    $.post({
        url: "/api/stats/nbvirus"
    })
    .done(function (data) {
        if (data.success){
            $("#nbVirus").html(data.message[0].nb);
        }else{
            $("#nbVirus").html(data.message);
        }

    })
    .fail(function (data) {
        $("#nbVirus").html("Erreur lors de la récupération");
    })
}

function showNbVaccins(){
    $.post({
        url: "/api/stats/nbvaccins"
    })
    .done(function (data) {
        if (data.success){
            $("#nbVaccins").html(data.message[0].nb);
        }else{
            $("#nbVaccins").html(data.message);
        }

    })
    .fail(function (data) {
        $("#nbVaccins").html("Erreur lors de la récupération");
    })
}
