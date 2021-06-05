
function openWindowToFindVaccin() {

    var htmlToFindVaccin = `<div>
                                <div style="margin-top: 15px;margin-left: 20px;">En partenariat avec <a href="https://vitemadose.covidtracker.fr/" target="_blank">ViteMaDose</a>, vous pouvez trouver un rendez-vous dans les centres de vaccinations le plus proche de chez moi.</div>
                                <div style="margin-top: 15px;margin-left: 20px;">Saisir votre numéro de département ou votre code postal :</div>
                                <input id="codedepartement" type="text" placeholder="Numéro de département ou code postal" />
                                <div class="buttonArtificialDoctor buttonParam btSearch" onclick="getListCentreVaccination($('#codedepartement').val());">Rechercher</div>
                                <div id="listCentreVaccination"></div>
                            </div>`;

    new msgBox({
        title: "Trouver un vaccin contre le COVID19",
        message: htmlToFindVaccin,
        width: "725px",
        height: "70%"
    });
}

async function requestCentreVaccination(codedepartement) {

    try {
        return await $.get({
            url: "https://vitemadose.gitlab.io/vitemadose/" + codedepartement + ".json"
        }).done(function (data) {
            return data;
        }).fail(function (data) {
            return "error";
        });
    } catch (e) {
        return "error";
    }
}

async function getListCentreVaccination(codedepartement) {
    if (codedepartement !== "undefined" && codedepartement != null && codedepartement != "") {

        if (codedepartement.length == 5) {
            codedepartement = codedepartement.substr(0, 2);
        }

        showLoading();

        var listCentreVaccination = await requestCentreVaccination(codedepartement);
        console.log(listCentreVaccination);

        if (listCentreVaccination != "error") {

            var htmlToShow = "";

            for (var i = 0; i < listCentreVaccination.centres_disponibles.length; i++) {
                var unCentre = listCentreVaccination.centres_disponibles[i];

                htmlToShow += `<div class="unCentreVaccination">
                                    <div class="datecentre">Prochain rendez-vous : <b>` + new Date(unCentre.prochain_rdv).toLocaleString() + `</b></div>
                                    <div class="nomcentre"><i class="far fa-building"></i><span class="withicone">` + unCentre.nom + `</span></div>
                                    <div class="adressecentre"><i class="fas fa-map-marked-alt"></i><span class="withicone" style="margin-left:10px">` + unCentre.metadata.address + `</span></div>
                                    <div class="nomvaccin"><i class="fas fa-syringe"></i><span class="withicone">` + unCentre.vaccine_type[0] + `</span></div>
                                    <div class="plateforme"><i class="fas fa-globe"></i><span class="withicone">`+ unCentre.plateforme + `</span></div>
                                    <div class="buttonArtificialDoctor buttonParam btSearch" style="width:160px;" onclick="window.open('` + unCentre.url + `', '_blank').focus();">Prendre rendez-vous</div>
                                </div>`;
            }

            $("#listCentreVaccination").html(htmlToShow);

            hideLoading();
        } else {

            hideLoading();
            setTimeout(function(){
                alert("Recherche incorrect, veuillez saisir votre code postal ou le code du département");
            }, 200);
        }

    } else {
        alert("Veuillez saisir un code de département ou votre code postal");
    }
}