Chart.defaults.global.legend.display = false;

// langue dates
moment.locale('fr');


// CHARTS CAS,REA, DECES
var jour_debut = 166;

var option_chart_1 = {
    layout: {
        padding: {
         bottom: -19,
         left: -6
    }},
    tooltips : {
        intersect: false
    },
    scales: {
    xAxes: [{
        gridLines: {
            display: true,
        drawOnChartArea: false,
        tickMarkLength: 5
        },
        ticks : {
            fontStyle: 'bold',
            minRotation: 45,
        },
        type: 'time',
        time: {
            parser: "YYYY-MM-DD",
            unit: 'month',
            bounds: 'ticks',
            unitStepSize: 1,
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
            fontStyle: 'bold',
        }
    }]
}}

var option_chart_2 = 
{
    layout: {
        padding: {
         bottom: -19,
         left: -6
    }},
    tooltips : {
        intersect: false
    },
    scales: {
    xAxes: [{
        gridLines: {
            display: true,
        drawOnChartArea: false,
        tickMarkLength: 5
        },
        ticks : {
            fontStyle: 'bold',
            minRotation: 45,
        },
        type: 'time',
        time: {
            parser: "YYYY-MM-DD",
            unit: 'day',
            bounds: 'ticks',
            unitStepSize: 10,
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
            fontStyle: 'bold',
        }
    }]
}}

var option_chart_3 = 
{
    layout: {
        padding: {
         bottom: -19,
         left: -6
    }},
    tooltips : {
        intersect: false
    },
    scales: {
    xAxes: [{
        gridLines: {
            display: true,
        drawOnChartArea: false,
        tickMarkLength: 5
        },
        ticks : {
            fontStyle: 'bold',
            minRotation: 45,
        },
        type: 'time',
        time: {
            parser: "YYYY-MM-DD",
            unit: 'day',
            bounds: 'ticks',
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
            fontStyle: 'bold',
        }
    }]
}}


// Chart cas
var ctx = document.getElementById( "Chart_cas").getContext('2d');

var cas_gradient = ctx.createLinearGradient(0, 0, 0, 400);
cas_gradient.addColorStop(0, 'blue');
cas_gradient.addColorStop(1, 'white');


    var chart_cas = new Chart(ctx, {
        data: {
            labels: dates.slice(jour_debut, dates.length),
            datasets: [{
                type: 'line',
                label: 'moyenne nouveaux cas',
                backgroundColor: cas_gradient,
                borderColor: 'rgb(10, 10, 230)',
                pointRadius: function(context) {
                    if (context.dataIndex == context.dataset.data.length-1) {
                        return 2;
                    }else{       
                        return 0;
                    }
                },
                borderWidth:3,
                pointHitRadius: 5,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 5,
                data: nouveaux_cas.slice(jour_debut,dates.length)
            }]
        },
        options: option_chart_1
    });


// slider chart cas
$( function() {
    $( "#slider_chart_cas" ).slider({
      range: true,
      min: 0,
      max: dates.length,
      values: [ jour_debut, dates.length - 1],
      slide: function( event, ui) {
        if(ui.values[ 1 ] - ui.values[ 0 ] > 1){
            if (ui.values[ 1 ] - ui.values[ 0 ] < 21){
                chart_cas.options = option_chart_3;
            }
            else if (ui.values[ 1 ] - ui.values[ 0 ] < 67){
                chart_cas.options = option_chart_2;
                }
            else{
                chart_cas.options = option_chart_1;
            }
            chart_cas.data.labels = dates.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_cas.data.datasets[0].data = nouveaux_cas.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_cas.update();
        } else {
            return false
        }
      }
    });
  });


// Chart rea
var rea_gradient = ctx.createLinearGradient(0, 0, 0, 400);
rea_gradient.addColorStop(0, 'darkorange');
rea_gradient.addColorStop(1, 'white');

var ctx = document.getElementById('Chart_rea').getContext('2d');
    var chart_rea = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.slice(jour_debut, dates.length),
            datasets: [{
                label: 'patients en réanimations',
                backgroundColor: rea_gradient,
                borderColor: 'rgb(230, 115, 10)',
                pointRadius: function(context) {
                    if (context.dataIndex == context.dataset.data.length-1) {
                        return 2;
                    }else{       
                        return 0;
                    }
                },
                borderWidth:3,
                pointHitRadius: 5,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 5,
                data: rea.slice(jour_debut, dates.length)
            }]
        },
        options: option_chart_1
    });

// slider chart rea
$( function() {
    $( "#slider_chart_rea" ).slider({
      range: true,
      min: 0,
      max: dates.length,
      values: [ jour_debut, dates.length],
      slide: function( event, ui) {
        if(ui.values[ 1 ] - ui.values[ 0 ] > 1){
            if (ui.values[ 1 ] - ui.values[ 0 ] < 21){
                chart_rea.options = option_chart_3;
            }
            else if (ui.values[ 1 ] - ui.values[ 0 ] < 67){
                chart_rea.options = option_chart_2;
                }
            else{
                chart_rea.options = option_chart_1;
            }
            chart_rea.data.labels = dates.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_rea.data.datasets[0].data = rea.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_rea.update();
        } else {
            return false
        }
      }
    });
  });

// Chart décès
var dc_gradient = ctx.createLinearGradient(0, 0, 0, 400);
dc_gradient.addColorStop(0, 'red');
dc_gradient.addColorStop(1, 'white');

var ctx = document.getElementById('Chart_dc').getContext('2d');
    var chart_dc = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.slice(jour_debut, dates.length),
            datasets: [{
                label: 'moyenne des décès',
                backgroundColor: dc_gradient,
                borderColor: 'red',
                pointRadius: function(context) {
                    if (context.dataIndex == context.dataset.data.length-1) {
                        return 2;
                    }else{       
                        return 0;
                    }
                },
                borderWidth:3,
                pointHitRadius: 5,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 5,
                data: incid_dc.slice(jour_debut, dates.length)
            }]
        },
        options: option_chart_1
    });

// slider chart deces
$( function() {
    $( "#slider_chart_dc" ).slider({
      range: true,
      min: 0,
      max: dates.length,
      values: [ jour_debut, dates.length],
      slide: function( event, ui) {
        if(ui.values[ 1 ] - ui.values[ 0 ] > 1){
            if (ui.values[ 1 ] - ui.values[ 0 ] < 21){
                chart_dc.options = option_chart_3;
            }
            else if (ui.values[ 1 ] - ui.values[ 0 ] < 67){
                chart_dc.options = option_chart_2;
                }
            else{
                chart_dc.options = option_chart_1;
            }
            chart_dc.data.labels = dates.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_dc.data.datasets[0].data = incid_dc.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_dc.update();
        } else {
            return false
        }
      }
    });
  });


// Chart solde rea ( à partir du 01/07)

var options_chart_rea_1 = {
    tooltips: {
        intersect: false,
        displayColors: false
    },           
    scales: {
    xAxes: [{
       ticks : {
            fontStyle: 'bold',
            minRotation:45
       },
       type: 'time',
       time: {
          parser: "YYYY-MM-DD",
          unit: 'month',
          unitStepSize: 1,
          displayFormats: {
             'month': '01-MMM',
          }
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
                }},
            fontStyle: 'bold',
        }
    }]
}}

var options_chart_rea_2 = {
    tooltips: {
        intersect: false,
        displayColors: false
    },           
    scales: {
    xAxes: [{
       ticks : {
            fontStyle: 'bold',
            minRotation:45
       },
       type: 'time',
       time: {
          parser: "YYYY-MM-DD",
          unit: 'day',
          unitStepSize: 10,
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
            callback: function(label, index, labels) {
                if(label>0){
                    return '+' + label
                }else{
                    return label
                }},
            fontStyle: 'bold',
        }
    }]
}}

var options_chart_rea_3 = {
    tooltips: {
        intersect: false,
        displayColors: false
    },           
    scales: {
    xAxes: [{
       ticks : {
            fontStyle: 'bold',
            minRotation:45
       },
       type: 'time',
       time: {
          parser: "YYYY-MM-DD",
          unit: 'day',
          unitStepSize: 2,
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
            callback: function(label, index, labels) {
                if(label>0){
                    return '+' + label
                }else{
                    return label
                }},
            fontStyle: 'bold',
        }
    }]
}}


var ctx = document.getElementById('Chart_solde_rea').getContext('2d');
    var chart_solde_rea = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.slice(104), 
            datasets: [{
                label: 'solde',
                borderColor: 'black',
                pointRadius: function(context) {
                    if (context.dataIndex == context.dataset.data.length-1) {
                        return 2;
                    }else{       
                        return 0;
                    }
                },
                pointHoverRadius : 2,
                pointHitRadius: 5,
                pointBackgroundColor: 'grey',
                borderWidth:0.4,
                pointHoverRadius: 2,
                pointHoverBorderWidth: 2,
                fill: 'origin',
                lineTension: 0.2,
                data: solde_rea.slice(104)
            }]
        },
        plugins: [{
            beforeRender: function(c, options) {
                var dataset = c.data.datasets[0];
                var yScale = c.scales['y-axis-0'];
                var yPos = yScale.getPixelForValue(0);
    
                var gradientFill = c.ctx.createLinearGradient(0, 0, 0, c.height);
                gradientFill.addColorStop(0, 'red');
                gradientFill.addColorStop((yPos / c.height)*0.8, '#FF5F5F');
                gradientFill.addColorStop((yPos / c.height)*0.95, '#FF9595');
                gradientFill.addColorStop((yPos / c.height)*0.995, '#FFA8A8');
                gradientFill.addColorStop((yPos / c.height)*1, '#FFCDCD');
                gradientFill.addColorStop((yPos / c.height)*1.005, '#DAFFB5');
                gradientFill.addColorStop((yPos / c.height)* 1.2, 'chartreuse');
                gradientFill.addColorStop(1, 'green');
    
                var model = c.data.datasets[0]._meta[Object.keys(dataset._meta)[0]].$filler.el._model;
                model.backgroundColor = gradientFill;
            }
            }],
        options: options_chart_rea_1
    });

// slider chart solde rea
$( function() {
    $( "#slider_chart_solde_rea" ).slider({
      range: true,
      min: 0,
      max: dates.length,
      values: [ jour_debut, dates.length],
      slide: function( event, ui) {
        if(ui.values[ 1 ] - ui.values[ 0 ] > 5){
            if (ui.values[ 1 ] - ui.values[ 0 ] < 21){
                chart_solde_rea.options = options_chart_rea_3;
            }
            else if (ui.values[ 1 ] - ui.values[ 0 ] < 67){
                chart_solde_rea.options = options_chart_rea_2;
                }
            else{
                chart_solde_rea.options = options_chart_rea_1;
            }
            chart_solde_rea.data.labels = dates.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_solde_rea.data.datasets[0].data = solde_rea.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_solde_rea.update();
        } else {
            return false
        }
      }
    });
  });


// Chart taux de positivité

options_chart_positivite_1 = {
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
            callback: function(label, index, labels) {
                      return label +' %'
                },
            fontStyle: 'bold',
        }
    }]
}}

options_chart_positivite_2 = {
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
            callback: function(label, index, labels) {
                      return label +' %'
                },
            fontStyle: 'bold',
        }
    }]
}}

options_chart_positivite_3 = {
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
            callback: function(label, index, labels) {
                      return label +' %'
                },
            fontStyle: 'bold',
        }
    }]
}}



var purple_gradient = ctx.createLinearGradient(0, 0, 0, 600);
purple_gradient.addColorStop(0, '#4A0766');
purple_gradient.addColorStop(1, '#9F18D8');

var ctx = document.getElementById('Chart_tx_positivite').getContext('2d');
    var chart_positivite = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.slice(jour_debut,dates.length),
            datasets: [{
                label: 'taux de positivité',
                backgroundColor: purple_gradient,
                borderColor: purple_gradient,
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
                data: tx_positivite.slice(jour_debut,dates.length)
            }]
        },
        options: options_chart_positivite_1
    });

// slider chart solde rea
$( function() {
    $( "#slider_chart_positivite" ).slider({
      range: true,
      min: 0,
      max: dates.length,
      values: [ jour_debut, dates.length],
      slide: function( event, ui) {
        if(ui.values[ 1 ] - ui.values[ 0 ] > 5){
            if (ui.values[ 1 ] - ui.values[ 0 ] < 21){
                chart_positivite.options = options_chart_positivite_3;
            }
            else if (ui.values[ 1 ] - ui.values[ 0 ] < 67){
                chart_positivite.options = options_chart_positivite_2;
                }
            else{
                chart_positivite.options = options_chart_positivite_1;
            }
            chart_positivite.data.labels = dates.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_positivite.data.datasets[0].data = tx_positivite.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_positivite.update();
        } else {
            return false
        }
      }
    });
  });



// Chart R_effectif

var options_chart_r_1 = {
tooltips: {
    intersect: false,
    mode: 'index',
    filter: function(tooltipItems, data) {
        var label = data.datasets[tooltipItems.datasetIndex].label;
        if (label == "R0") {
          return false;
        } else {
          return true;
        }}
},
legend: {
    display: true
    },
    legend: {
        display: true,
        labels: {
             filter: function(legendItem, data) {
                  return legendItem.datasetIndex != 2
             }
        }
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
      }
   }
}],
yAxes: [{
    gridLines: {
        display:true
    },
    ticks: {
        fontStyle: 'bold',
    }
}],
annotation: {
    annotations: [{
      type: 'line',
      mode: 'horizontal',
      scaleID: 'y-axis-1',
      value: 1,
      borderColor: 'dark',
      borderWidth: 2,
      label: {
        enabled: false,
        content: 'Test label'
      }
    }]
  }
}}

var options_chart_r_2 = {
    tooltips: {
        intersect: false,
        mode: 'index',
        filter: function(tooltipItems, data) {
            var label = data.datasets[tooltipItems.datasetIndex].label;
            if (label == "R0") {
              return false;
            } else {
              return true;
            }}
    },
    legend: {
        display: true
        },
        legend: {
            display: true,
            labels: {
                 filter: function(legendItem, data) {
                      return legendItem.datasetIndex != 2
                 }
            }
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
             'day': 'DD-MMM'
          }
       }
    }],
    yAxes: [{
        gridLines: {
            display:true
        },
        ticks: {
            fontStyle: 'bold',
        }
    }],
    annotation: {
        annotations: [{
          type: 'line',
          mode: 'horizontal',
          scaleID: 'y-axis-1',
          value: 1,
          borderColor: 'dark',
          borderWidth: 2,
          label: {
            enabled: false,
            content: 'Test label'
          }
        }]
      }
    }}

    var options_chart_r_3 = {
        tooltips: {
            intersect: false,
            mode: 'index',
            filter: function(tooltipItems, data) {
                var label = data.datasets[tooltipItems.datasetIndex].label;
                if (label == "R0") {
                  return false;
                } else {
                  return true;
                }}
        },
        legend: {
            display: true
            },
            legend: {
                display: true,
                labels: {
                     filter: function(legendItem, data) {
                          return legendItem.datasetIndex != 2
                     }
                }
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
                 'day': 'DD-MMM'
              }
           }
        }],
        yAxes: [{
            gridLines: {
                display:true
            },
            ticks: {
                fontStyle: 'bold',
            }
        }],
        annotation: {
            annotations: [{
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-1',
              value: 1,
              borderColor: 'dark',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            }]
          }
        }}



var orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
orange_gradient.addColorStop(0, '#FBB034');
orange_gradient.addColorStop(1, '#FFDD00');

var dark_orange_gradient = ctx.createLinearGradient(0, 0, 0, 600);
dark_orange_gradient.addColorStop(0, 'orangered');
dark_orange_gradient.addColorStop(1, 'darkorange');

var r0_line = Array(dates.length).fill(1) ;

var ctx = document.getElementById('Chart_R0').getContext('2d');
    var chart_r0 = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.slice(jour_debut,dates.length),
            datasets: [{
                label: 'R0 estimé à partir des hospitalisations',
                backgroundColor: orange_gradient,
                borderColor: orange_gradient,
                fill: 'false',
                pointRadius: function(context) {
                    if (context.dataIndex == context.dataset.data.length-1) {
                        return 3;
                    }else{       
                        return 0;
                    }
                },
                borderWidth:3,
                pointHitRadius: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 3,
                data: R0_hosp.slice(jour_debut,dates.length)
            },{
                label: 'R0 estimé à partir des entrées en réanimation',
                backgroundColor: dark_orange_gradient,
                borderColor: dark_orange_gradient,
                fill: 'false',
                pointRadius: function(context) {
                    if (context.dataIndex == context.dataset.data.length-1) {
                        return 3;
                    }else{       
                        return 0;
                    }
                },
                borderWidth:3,
                pointHitRadius: 5,
                pointHoverRadius: 5,
                pointHoverBorderWidth: 3,
                data: R0_rea.slice(jour_debut,dates.length)
            },
            {
                label: 'R0',
                backgroundColor: 'dark',
                borderColor: 'dark',
                fill: 'false',
                pointRadius: 0,
                borderWidth:4,
                pointHoverRadius: 0,
                pointHoverBorderWidth: 0,
                data: r0_line.slice(jour_debut,dates.length)
            }]
        },
        options: options_chart_r_1
    });

    // slider chart r0
$( function() {
    $( "#slider_chart_r0" ).slider({
      range: true,
      min: 0,
      max: dates.length,
      values: [ jour_debut, dates.length],
      slide: function( event, ui) {
        if(ui.values[ 1 ] - ui.values[ 0 ] > 5){
            if (ui.values[ 1 ] - ui.values[ 0 ] < 21){
                chart_r0.options = options_chart_r_3;
            }
            else if (ui.values[ 1 ] - ui.values[ 0 ] < 67){
                chart_r0.options = options_chart_r_2;
                }
            else{
                chart_r0.options = options_chart_r_1;
            }
            chart_r0.data.labels = dates.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_r0.data.datasets[0].data = R0_hosp.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_r0.data.datasets[1].data = R0_rea.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_r0.data.datasets[2].data = r0_line.slice(ui.values[ 0 ] , ui.values[ 1 ] );
            chart_r0.update();
        } else {
            return false
        }
      }
    });
  });




// CHART SOLDE HOSPITALISATIONS PAR DEP

var ctx = document.getElementById('Chart_solde_dep').getContext('2d');

// colors
var myColors_2=[];

var green_gradient = ctx.createLinearGradient(0, 0, 0, 600);
green_gradient.addColorStop(0, 'chartreuse');
green_gradient.addColorStop(1, 'green');

var red_gradient = ctx.createLinearGradient(0, 0, 0, 600);
red_gradient.addColorStop(0, 'red');
red_gradient.addColorStop(1, 'white');

$.each(hosp_dep_var, function( index,value ) {
  if(value < 0){
  	 myColors_2[index]=green_gradient;
  }else{
  	myColors_2[index]=red_gradient;
  }
});

// Chart
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: liste_dep,
            datasets: [{
                label: 'variation du nombre de personnes hospitalisées',
                backgroundColor: myColors_2,
                data: hosp_dep_var,
                datalabels: {
                    align: 'end',
                    color: function(context) {
                      return context.dataset.borderColor;
                    },
                    font: {
                      size: 9,
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
                    display:false
                },
                display: false,
            }],
            yAxes: [{
                gridLines: {
                    display:true
                },
                ticks: {
                    callback: function(label, index, labels) {
                        if(label>0){
                            return '+' + label +' %'
                        }else{
                            return label +' %'
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
                        return noms_dep[tooltipItem.index] + ' : ' + tooltipItem.yLabel + '%';
                    }else{
                        return noms_dep[tooltipItem.index] + ' : +' + tooltipItem.yLabel + '%';
                    }
                },
                footer: function(tooltipItem) {
                    if (tooltipItem.yLabel < 0){
                        return 'solde 7j : ' + hosp_dep_solde[tooltipItem[0].index] ;
                    }else{
                        return 'solde 7j : ' + hosp_dep_solde[tooltipItem[0].index] ;
                    }
                }
         }},
        responsive: true,
        animation: {events: [],
                    duration: 1,
                    onProgress: function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;
                        ctx.font = Chart.helpers.fontString(10, 'bold', Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';
            
                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                if(hosp_dep_var[index]>0){
                                ctx.fillText(liste_dep[index], bar._model.x, bar._model.y - 1);
                                }else{
                                ctx.fillText(liste_dep[index], bar._model.x, bar._model.y + 12);    
                                }
                            });
                        });
                    }
                     }
                
    }
});

   
// hover progress
// $('.progress[data-toggle="tooltip"]').tooltip({
//     animated: 'fade',
//     placement: 'bottom'
// });

