// Create the chart
function buildNbVaccinByVirus() {
    
    getJsonNbVaccinByVirusChart(function (jsonNbVaccinByVirus) {
       console.log(jsonNbVaccinByVirus) 
        if (jsonNbVaccinByVirus != null) {

            var jsonData = [];
            for (var i = 0; i < jsonNbVaccinByVirus.length; i++) {
                jsonData.push({
                    name: jsonNbVaccinByVirus[i].nom,
                    y: jsonNbVaccinByVirus[i].nb_vaccin,
                });
            }

            // Create the chart
            Highcharts.chart('container_nbvaccinbyvirus', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Nombre de vaccin par virus'
                },
                subtitle: {
                    text: ''
                },

                accessibility: {
                    announceNewData: {
                        enabled: true
                    },
                    point: {
                        valueSuffix: '%'
                    }
                },

                plotOptions: {
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}'
                        }
                    }
                },

                tooltip: {
                    pointFormat: '<span style="color:{point.color}"><b>{point.y}</b></span> nombre des vaccins par <span style="color:{point.color}">{point.name}</span><br/>'
                },

                series: [
                    {
                        name: "Nombre de vaccin ",
                        colorByPoint: true,
                        data: jsonData
                    }
                ]
            });

        } else {
            console.log("Impossible de récupérer les données ");
        }
    });
}

function getJsonNbVaccinByVirusChart(callback) {
    $.post({
        url: "/api/stats/nbvaccinbyrvirus"
    })
        .done(function (data) {
            if (data.success)
                callback(data.message);
            else
                callback(null);

        })
        .fail(function (data) {
            callback(null);
        })
}
