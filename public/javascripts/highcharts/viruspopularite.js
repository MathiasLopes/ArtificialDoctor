// Create the chart
function buildVirusPopulriteChart(){

    getJsonVirusPopulariteChart(function(jsonVirusPopularite){

        if(jsonVirusPopularite != null)
        {
         
            console.log(jsonVirusPopularite);

            //on recupere le nb total de visite
            var nbTotalVisite = 0;
            for(var i = 0; i < jsonVirusPopularite.length; i++)
            {
                nbTotalVisite+=jsonVirusPopularite[i].nb;
            }

            var jsonData = [];
            for(var i = 0; i < jsonVirusPopularite.length; i++)
            {
                jsonData.push({
                    name: jsonVirusPopularite[i].nom,
                    y: parseFloat(((jsonVirusPopularite[i].nb/nbTotalVisite)*100).toFixed(1)),
                });
                jsonVirusPopularite[i].nb = parseFloat(((jsonVirusPopularite[i].nb/nbTotalVisite)*100).toFixed(1));
            }

            jsonData.sort(function(a, b){
                return b.y - a.y;
            });

            jsonData = jsonData.slice(0, 10);


            
        Highcharts.chart('container_popularityvirus', {
            chart: {
            type: 'column'
            },
            title: {
            text: 'Popularité des virus'
            },
            subtitle: {
            text: ''
            },
            accessibility: {
            announceNewData: {
                enabled: true
            }
            },
            xAxis: {
            type: 'category'
            },
            yAxis: {
            title: {
                text: 'Total percent market share'
            }
        
            },
            legend: {
            enabled: false
            },
            plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
                }
            }
            },
        
            tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },
        
            series: [
            {
                name: "Browsers",
                colorByPoint: true,
                data: jsonData
            }
            ]
      });

        }else{
            console.log("Impossible de récupérer les données sur la popularité des virus");
        }
    });
}

function getJsonVirusPopulariteChart(callback){
    $.post({
        url: "/api/stats/viruspopularity"
    })
    .done(function(data){
        if(data.success)
            callback(data.message);
        else
            callback(null);
        
    })
    .fail(function(data){
        callback(null);
    })
}

//buildVirusPopulriteChart();