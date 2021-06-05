// Create the chart
function buildNbVaccinationForVirus() {

    getJsonNbVaccinationForVirus(function (jsonNbVaccinationForVirus) {

        if (jsonNbVaccinationForVirus != null) {

            var jsonData = [];
            for (var i = 0; i < jsonNbVaccinationForVirus.length; i++) {
                jsonData.push({
                    name: jsonNbVaccinationForVirus[i].nom,
                    y: jsonNbVaccinationForVirus[i].nb,
                });
            }

            // Create the chart
            Highcharts.chart('container_nbvaccinationforvirus', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Nombre de vaccinations contre les virus'
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
                    pointFormat: '<span style="color:{point.color}"><b>{point.y}</b></span> vaccination(s) contre <span style="color:{point.color}">{point.name}</span><br/>'
                },

                series: [
                    {
                        name: "Nombre de vaccination contre les virus",
                        colorByPoint: true,
                        data: jsonData
                    }
                ]
            });

        } else {
            console.log("Impossible de récupérer les données sur la popularité des virus");
        }
    });
}

function getJsonNbVaccinationForVirus(callback) {
    $.post({
        url: "/api/stats/nbvaccinationforvirus"
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
