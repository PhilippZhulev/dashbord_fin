function Drpp_tile () {
    this.reDraw = function() {
        try {
        this.refresh();
            var globalSettings=this.globalSettings;
        globals.settings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.renderComponent (globalSettings,{
            tag : "div",
            className : ["tiles__wrapper__item", "item_3"],
            html:
            '   <div class="tiles__wrapper__tile">' +
            '       <div class="container">' +
            '          <div class="row">' +
            '              <div class="col-12">' +
            '                   <span class="tiles__wrapper__tile_title">Динамика расходов на персонал<span>млрд. руб</span></span>' +
            '                                        <div class="legend_dchtch">' +
            '                                            <span class="legend__item"><i style="background: #6EC7F7"></i>План</span>' +
            '                                            <span class="legend__item"><i style="background: #61DB96"></i>Факт</span>' +
            '                                        </div>' +              
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '				<div id="drpp_chart_g_1"></div>' +
            '				<div id="drpp_chart_g_2"></div>' +
//            '      <div class="chart_element__chart" id="drpp_chart"></div>' +
            '   </div>'
        });

        var chart = AmCharts.makeChart( "drpp_chart_g_1", {
            "type": "serial",
            "fontFamily": "'Open Sans', sans-serif",
            "fontSize": 13,
            "categoryField": "category",
            "colors": [
                "#6EC7F7"
            ],
            "startDuration": 0,
            "categoryAxis": {
                "labelsEnabled": false,
                "gridPosition": "start",
                "autoGridCount": false,
                "axisColor": "#a0aab7",
                "color": "#A0AAB7",
                "axisThickness": 0,
                "gridThickness": 0
            },
            "trendLines": [],
            "graphs": [
                {
                "balloonText": "[[category]]:[[value]]",
                "bullet": "round",
                "id": "AmGraph-2",
                "labelOffset": 5,
                "labelText": "",
                "labelPosition": "top",
                "color": "#A0AAB7",
                "lineThickness": 2,
                "title": "graph 2",
                "valueField": "line-2"
                }
            ],
            "guides": [],
            "valueAxes": [{
               "id": "ValueAxis-1",
               "axisThickness": 0,
               "gridThickness": 0,
               "labelsEnabled": false,
               "tickLength": 0,
               "title": ""
                           }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
                        "dataProvider": [
                               {
                               "category": "2016",
                               "column-1": "н/д",
                               "line-2": "н/д"
                               },
                               {
                               "category": "2017",
                               "column-1": "324",
                               "line-2": "326"
                               },
                               {
                               "category": "2018",
                               "column-1": "85",
                               "line-2": "328"
                               },
                               {
                               "category": "2019",
                               "column-1": "н/д",
                               "line-2": "н/д"
                               },
                               {
                               "category": "2020",
                               "column-1": "н/д",
                               "line-2": "н/д"
                          }
                        ]
        });

        var chart = AmCharts.makeChart( "drpp_chart_g_2", {
            "type": "serial",
            "fontFamily": "'Open Sans', sans-serif",
            "fontSize": 14,
            "categoryField": "category",
            "colors": [
                "#61DB96"
            ],
            "startDuration": 0,
            "categoryAxis": {
                "gridPosition": "start",
                "autoGridCount": false,
                "axisColor": "#a0aab7",
                "color": "#A0AAB7",
                "axisThickness": 1,
                "gridThickness": 0
            },
            "trendLines": [],
            "graphs": [
                {
                "labelOffset": 7,
                "balloonText": "[[category]]:[[value]]",
                "columnWidth": 0,
                "fillAlphas": 1,
                "fixedColumnWidth": 30,
                "id": "AmGraph-1",
                "labelPosition": "top",
                "color":"#A0AAB7",
                "labelText": "[[value]]",
                "title": "graph 1",
                "type": "column",
                "valueField": "column-1"
                }
            ],
            "guides": [],
            "valueAxes": [{
               "id": "ValueAxis-1",
               "axisThickness": 0,
               "gridThickness": 0,
               "labelsEnabled": false,
               "tickLength": 0,
               "title": ""
                           }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": [
                               {
                               "category": "2016",
                               "column-1": "н/д",
                               "line-2": "н/д"
                               },
                               {
                               "category": "2017",
                               "column-1": "324",
                               "line-2": "326"
                               },
                               {
                               "category": "2018",
                               "column-1": "85",
                               "line-2": "328"
                               },
                               {
                               "category": "2019",
                               "column-1": "н/д",
                               "line-2": "н/д"
                               },
                               {
                               "category": "2020",
                               "column-1": "н/д",
                               "line-2": "н/д"
                          }
                        ]
}); 
}
catch(e){
    globals.renderComponent (globalSettings, {
        tag : "div",
        className : ["tiles__wrapper__item", "item_3"],
        html:
        '<div class="tiles__wrapper__tile i_err_404">' +
        '   <span>Нет данных...</span>' +
        '</div>'
    });
    console.warn(e);
}       
    }
}
