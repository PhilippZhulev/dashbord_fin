function Ofi_tile () {
    this.reDraw = function() {
        try {
        this.refresh();
            var globalSettings=this.globalSettings;
        globals.settings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.renderComponent (globalSettings,{
            tag : "div",
            className : ["tiles__wrapper__item", "item_2"],
            html:
            '   <div class="tiles__wrapper__tile">' +
            '       <div class="container">' +
            '          <div class="row">' +
            '              <div class="col-12">' +
            '                   <span class="tiles__wrapper__tile_title">Факторы изменения<span>млрд. руб</span></span>' +
            '                   <button type="button" class="btn btn-outline-info btn-abc btn-sm btn_i_super_mego_ofi">Структура</button>' +
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '      <div class="chart_element__container">' +
            '           <div class="chart_element__container super_ofi">' +
            '                <div class="chart_element__chart do_lay_1 active">' +
            '                   <div class="chart_element__chart ofio_chart" id="ofi_chart"></div>' +
            '                </div>' +
            '                <div class="chart_element__chart do_lay_2">' +
            '                   <div class="chart_element__chart ofio_chart" id="ofi_chart2"></div>' +
            '                </div>' +
            '           </div>' +
            '      </div>' +
            '   </div>'
        });

        var chart = AmCharts.makeChart( "ofi_chart",{
            "type": "serial",
           "fontFamily": "'Open Sans', sans-serif",
           "categoryField": "name",
           "columnWidth": 0.6,
           "color":"#a1abb8",
           "rotate": true,
           "marginRight": 40,
           "theme": "dark",
           "export": {
               "enabled": true
           },
           "categoryAxis": {
               "gridPosition": "start",
               "axisColor": "#a0aab7",
               "color": "#c9cbce",
               "fontSize": 14,
               "gridThickness": 0,
               "axisAlpha": 0
           },
           "trendLines": [],
           "graphs": [
               {
                   "balloonText": "[[category]]:<br>[[value]] млрд. руб",
                   "colorField": "color",
                   "fillAlphas": 0.8,
                   "id": "AmGraph-1",
                   "fixedColumnWidth": 20,
                   "fontSize": 13,
                   "labelText": "[[balloonValue]]",
                   "lineColor": "#36414D",
                   "color": "#DCDDDF",
                   "openField": "open",
                   "type": "column",
                   "valueField": "close"
               }
           ],
           "guides": [],
           "valueAxes": [
               {
                   "axisFrequency": 0,
                   "id": "ValueAxis-1",
                   "logarithmic": true,
                   "color": "#DCDDDF",
                   "axisAlpha": 0,
                   "axisThickness": 0,
                   "gridThickness": 0,
                   "labelOffset": 1,
                   "labelsEnabled": false,
                   "tickLength": 0
               }
           ],
           "allLabels": [],
           "balloon": {},
           "titles": [],
            "dataProvider": [
                           {
                                           "name": "Факт ЗМ 2017",
                                           "open": 60,
                                           "close": 76.8,
                                           "color": "#dfdfdf",
                                           "balloonValue": "76.8"
                           },
                           {
                                           "name": "Удорожание ст-ти<br>перс-ла",
                                           "open": 76.8,
                                           "close": 78.1,
                                           "color": "#6EC7F7",
                                           "balloonValue": "+1.3"
                           },
                           {
                                           "name": "Налоги на з/п",
                                           "open": 78.1,
                                           "close": 79.4,
                                           "color": "#6EC7F7",
                                           "balloonValue": "+1.3"
                           },
                           {
                                           "name": "Индексация",
                                           "open": 79.4,
                                           "close": 81.6,
                                           "color": "#6EC7F7",
                                           "balloonValue": "+2.2"
                           },
                           {
                                           "name": "Расходы соц. хар-ра",
                                           "open": 81.6,
                                           "close": 82.2,
                                           "color": "#6EC7F7",
                                           "balloonValue": "+0.6"
                           },
                           {
                                           "name": "Сокр. рез-ва на отпуск",
                                           "open": 82.2,
                                           "close": 81.7,
                                           "color": "#61db96",
                                           "balloonValue": "-0.5"
                           },
                           {
                                           "name": "Сокр. среднесп. числ.",
                                           "open": 81.7,
                                           "close": 80.3,
                                           "color": "#61db96",
                                           "balloonValue": "-1.4"
                           },
                           {
                                           "name": "Календ. и завыш.<br>рез-вы",
                                           "open": 80.3,
                                           "close": 84.7,
                                           "color": "#6EC7F7",
                                           "balloonValue": "+4.4"
                           },
                           {
                                           "name": "Факт ЗМ 2018",
                                           "open": 60,
                                           "close": 84.7,
                                           "color": "#dfdfdf",
                                           "balloonValue": "84.7"
                           }
            ]
}
);

var chart = AmCharts.makeChart( "ofi_chart2",{
    "type": "serial",
    "fontFamily": "'Open Sans', sans-serif",
    "categoryField": "name",
    "columnWidth": 0.6,
    "color": "#FFFFFF",
    "rotate": true,
    "theme": "dark",
    "export": {
                   "enabled": true
    },
    "categoryAxis": {
                   "gridPosition": "start",
                   "axisColor": "#a0aab7",
                   "color": "#c9cbce",
                   "fontSize":14,
                   "gridThickness": 0,
                   "axisAlpha": 0
    },
    "trendLines": [],
    "graphs": [
                   {
                                   "balloonText": "<span style='color:[[color]]'>[[category]]</span><br><b>[[balloonValue]]</b>",
                                   "colorField": "color",
                                   "fillAlphas": 0.8,
                                   "id": "AmGraph-1",
                                   "fixedColumnWidth":20,
                                   "fontSize":13,
                                   "labelText": "[[balloonValue]]",
                                   "lineColor": "#36414D",
                                   "color": "#DCDDDF",
                                   "openField": "open",
                                   "type": "column",
                                   "valueField": "close"
                   }
    ],
    "guides": [],
    "valueAxes": [
                   {
                                   "axisFrequency": 0,
                                   "id": "ValueAxis-1",
                                   "logarithmic": true,
                                   "color": "#DCDDDF",
                                   "axisAlpha": 0,
                                    "axisThickness": 0,
                                   "gridThickness": 0,
                                   "labelOffset": 1,
                                   "labelsEnabled": false,
                                   "tickLength": 0
                   }
    ],
    "allLabels": [],
    "balloon": {},
    "titles": [],
    "dataProvider": [
                   {
                                   "name": "Факт ЗМ 2017",
                                   "open": 60,
                                   "close": 76.8,
                                   "color": "#dfdfdf",
                                   "balloonValue": "76.8"
                   },
                   {
                                   "name": "ЦА",
                                   "open": 76.8,
                                   "close": 78.1,
                                   "color": "#6EC7F7",
                                   "balloonValue": "+1.3"
                   },
                   {
                                   "name": "ПЦП",
                                   "open": 78.1,
                                   "close": 79.4,
                                   "color": "#6EC7F7",
                                   "balloonValue": "+1.3"
                   },
                   {
                                   "name": "ТБ",
                                   "open": 79.4,
                                   "close": 81.6,
                                   "color": "#6EC7F7",
                                   "balloonValue": "+2.2"
                   },
                   {
                                   "name": "ВСП",
                                   "open": 81.6,
                                   "close": 82.2,
                                   "color": "#6EC7F7",
                                   "balloonValue": "+0.6"
                   },
                   {
                                   "name": "Факт ЗМ 2018",
                                   "open": 60,
                                   "close": 84.7,
                                   "color": "#dfdfdf",
                                   "balloonValue": "84.7"
                   }
    ]
}
);


        globals.chartSlideController({
            btnClass : "btn_i_super_mego_ofi",
            blockClass : ".super_ofi .chart_element__chart"
        });

}
catch(e){
    globals.renderComponent (globalSettings, {
        tag : "div",
        className : ["tiles__wrapper__item", "item_2"],
        html:
        '<div class="tiles__wrapper__tile i_err_404">' +
        '   <span>Нет данных...</span>' +
        '</div>'
    });
    console.warn(e);
}



    }
}
