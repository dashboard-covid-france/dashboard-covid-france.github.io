Chart.defaults.global.legend.display = false;

// langue dates
moment.locale('fr');

// Chart taux de positivité

options_chart_total_vaccin_1 = {
    layout: {
        padding: {
          right: 10
        }
    },
    tooltips : {
        intersect: false
    },
    scales: {
    xAxes: [{
       ticks : {
            fontStyle: 'bold'
       },
       type: 'time',
       time: {
          parser: "YYYY-MM-DD",
          unit: 'month',
          unitStepSize: 1,
          displayFormats: {
             'month': '01-MMM',
             'day': 'DD-MMM'
          }
       }
    }],
    yAxes: [{
        gridLines: {
            display:true
        },
        ticks: {
            beginAtZero: true,
            fontStyle: 'bold',
        }
    }]
}}

options_chart_total_vaccin_2 = {
    layout: {
        padding: {
          right: 10
        }
    },
    tooltips : {
        intersect: false
    },
    scales: {
    xAxes: [{
       ticks : {
            fontStyle: 'bold'
       },
       type: 'time',
       time: {
          parser: "YYYY-MM-DD",
          unit: 'day',
          unitStepSize: 20,
          displayFormats: {
              'month': '01-MMM',
             'day': 'DD-MMM',
          }
       }
    }],
    yAxes: [{
        gridLines: {
            display:true
        },
        ticks: {
            beginAtZero: true,
            fontStyle: 'bold',
        }
    }]
}}

options_chart_total_vaccin_3 = {
    layout: {
        padding: {
          right: 10
        }
    },
    tooltips : {
        intersect: false
    },
    scales: {
    xAxes: [{
       ticks : {
            fontStyle: 'bold'
       },
       type: 'time',
       time: {
          parser: "YYYY-MM-DD",
          unit: 'day',
          unitStepSize: 2,
          displayFormats: {
              'month': '01-MMM',
             'day': 'DD-MMM',
          }
       }
    }],
    yAxes: [{
        gridLines: {
            display:true
        },
        ticks: {
            beginAtZero: true,
            fontStyle: 'bold',
        }
    }]
}}




var ctx = document.getElementById('Chart_total_vaccin').getContext('2d');

var green_gradient = ctx.createLinearGradient(0, 0, 0, 600);
green_gradient.addColorStop(0, 'green');
green_gradient.addColorStop(1, 'chartreuse');

    var chart_total_vaccin = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates_vaccin,
            datasets: [{
                label: 'nombre de français vaccinés',
                backgroundColor: green_gradient,
                borderColor: green_gradient,
                fill: 'false',
                pointRadius: function(context) {
                    if (context.dataIndex == context.dataset.data.length-1) {
                        return 2;
                    }else{       
                        return 0;
                    }
                },
                borderWidth:5,
                pointHoverRadius: 5,
                pointHitRadius: 5,
                pointHoverBorderWidth: 5,
                data: chiffres_vaccin
            }]
        },
        options: options_chart_total_vaccin_3
    });

// slider chart total_vaccin
$( function() {
    $( "#slider_chart_total_vaccin" ).slider({
      range: true,
      min: 0,
      max: dates_vaccin.length,
      values: [ 0, dates_vaccin.length],
      slide: function( event, ui) {
        if(ui.values[ 1 ] - ui.values[ 0 ] > 1){
            if (ui.values[ 1 ] - ui.values[ 0 ] < 21){
                chart_total_vaccin.options = options_chart_total_vaccin_3;
            }
            else if (ui.values[ 1 ] - ui.values[ 0 ] < 67){
                chart_total_vaccin.options = options_chart_total_vaccin_2;
                }
            else{
                chart_total_vaccin.options = options_chart_total_vaccin_1;
            }
            chart_total_vaccin.data.labels = dates_vaccin.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_total_vaccin.data.datasets[0].data = chiffres_vaccin.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_total_vaccin.update();
        } else {
            return false
        }
      }
    });
  });


  // CHART SOLDE VACCINATIONS PAR REG

var ctx = document.getElementById('Chart_solde_vaccin').getContext('2d');

// colors
var myColors_2=[];

var green_gradient = ctx.createLinearGradient(0, 0, 0, 600);
green_gradient.addColorStop(0, 'green');
green_gradient.addColorStop(1, 'chartreuse');

var red_gradient = ctx.createLinearGradient(0, 0, 0, 600);
red_gradient.addColorStop(0, 'white');
red_gradient.addColorStop(1, 'red');

$.each(solde_vaccin_reg, function( index,value ) {
  if(value < 0){
  	 myColors_2[index]=red_gradient;
  }else{
  	myColors_2[index]=green_gradient;
  }
});

// Chart
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: regions,
            datasets: [{
                label: 'variation du nombre de personnes vaccinées pour 100k hab vs J-1',
                backgroundColor: myColors_2,
                data: solde_vaccin_reg,
                datalabels: {
                    align: 'end',
                    color: function(context) {
                      return context.dataset.borderColor;
                    },
                    font: {
                      size: 10,
                      weight: 'bold'
                    },
                    formatter: function(value) {
                      return value ;
                    }
                  }
            }]
        },
        options: { 
            layout: {
                padding: {
                    top: 10,
                    bottom: 10
                }
            },
            scales: {
            xAxes: [{
                gridLines: {
                    display:false,
                },
                display: true,
                ticks: {
                    labelOffset: 25,
                    fontStyle: 'bold',
                    fontSize: 14,
                    maxRotation: 30,
                }
            }],
            yAxes: [{
                gridLines: {
                    display:true
                },
                ticks: {
                    callback: function(label, index, labels) {
                        if(label>0){
                            return '+' + label
                        }else{
                            return label
                        }
                    },
                    fontStyle: 'bold',
                }
            }]
        },
        showTooltips: true,
        tooltips: {
            backgroundColor: 'rgba(0,0,0,1)',
            callbacks: {
                label: function(tooltipItem) {
                    if (tooltipItem.yLabel < 0){
                        return regions[tooltipItem.index] + ' : ' + tooltipItem.yLabel;
                    }else{
                        return regions[tooltipItem.index] + ' : +' + tooltipItem.yLabel;
                    }
                },
                footer: function(tooltipItem) {
                    if (tooltipItem.yLabel < 0){
                        return 'solde J-1 : ' + solde_vaccin_reg[tooltipItem[0].index] ;
                    }else{
                        return 'solde J-1 : ' + solde_vaccin_reg[tooltipItem[0].index] ;
                    }
                }
         }},
        responsive: true,
                
    }
});