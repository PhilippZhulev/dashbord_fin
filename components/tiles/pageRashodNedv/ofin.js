function Ofin_tile () {
    this.reDraw = function() {
        try {
        this.refresh();
            var globalSettings = this.globalSettings;
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
            '                   <span class="tiles__wrapper__tile_title">Факторы изменения<span>млрд. руб</span></span>' +
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '      <div class="chart_element__container">' +
            '           <div class="chart_element__chart ofio_chart" id="ofin_chart"></div>' +
            '      </div>' +
            '   </div>'
        });

        var chart = AmCharts.makeChart( "ofin_chart",{
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
                   "name": "Факт 2017",
                   "open": 10,
                   "close": 11.4,
                   "color": "#dfdfdf",
                   "balloonValue": "11.4"
                               },
                               {
                   "name": "Отказ от аренды",
                   "open": 11.0,
                   "close": 11.4,
                   "color": "#61db96",
                   "balloonValue": "-0.4"
                               },
                               {
                   "name": "Выбытие объектов<br>недвижимости",
                   "open": 11.2,
                   "close": 11.4,
                   "color": "#61db96",
                   "balloonValue": "-0.2"
                               },
                               {
                   "name": "Рост тарифов на<br>коммунальные услуги",
                   "open": 11.4,
                   "close": 11.5,
                   "color": "#6EC7F7",
                   "balloonValue": "+0.1"
                               },
                               {
                   "name": "Увеличение переменной<br>части аренды",
                   "open": 11.4,
                   "close": 11.7,
                   "color": "#6EC7F7",
                   "balloonValue": "+0.3"
                               },
                               {
                   "name": "Факт 2018",
                   "open": 10,
                   "close": 11.2,
                   "color": "#dfdfdf",
                   "balloonValue": "11.2"
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
