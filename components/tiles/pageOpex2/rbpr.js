function Rbpr_tile () {
    this.reDraw = function() {
        try {

        this.refresh();
        console.warn("1111111111111")


        var globalSettings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_2"],
            html:
            '   <div class="tiles__wrapper__tile">' +
            '       <div class="container">' +
            '          <div class="row">' +
            '              <div class="col-12">' +
            '                   <span class="tiles__wrapper__tile_title">Рейтинг блоков по расходам<span>млрд. руб</span></span>' +
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '      <div class="chart_element__container">' +
            '           <div class="chart_element__chart rbpr_chart" id="rbpr_chart"></div>' +
            '      </div>' +
            '   </div>'
        });



        var chart = AmCharts.makeChart( "rbpr_chart", {
            "type": "serial",
            "fontFamily": "'Open Sans', sans-serif",
            "categoryField": "category",
            "rotate": true,
            "colors": [
                "#00CC00"
            ],
            "backgroundColor": "#36414D",
            "categoryAxis": {
                "labelFunction":function(a){return (a.length>18)?a.slice(0,15)+"...":a;},
                    "listeners":[{
                        "event":"rollOverItem",
                        "method":function(event){
                                    event.target.setAttr("cursor", "default");
                                    event.chart.balloon.followCursor(true);
                                    event.chart.balloon.showBalloon(event.serialDataItem.dataContext.category);
                                    event.chart.balloon.fixedPosition=false;
                        }
                    },
                    {
                        "event":"rollOutItem",
                        "method":function(event){ event.chart.balloon.hide();}
                    }
                ],
                "gridPosition": "start",
                "axisAlpha": 0,
                "fontSize":14,
                "color": "#cdcfd2",
                "gridAlpha": 0.46,
                "gridThickness": 0,
                //"offset":25,
                "gridColor": "#a0aab7",
                "autoGridCount": false,
                "inside": true,
                "labelOffset": -200,
                "gridCount": 10000
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[category]]:[[value]]",
                    "color": "#333333",
                    "customBullet": "",
                    "fillAlphas": 1,
                    "color": "#cdcfd2",
                    "lineThickness": 0,
                    "fillColors": "#fa8a84",
                    "fixedColumnWidth": 15,
                    "id": "AmGraph-1",
                    "labelOffset": 10,
                    "fontSize": 14,
                    "labelPosition": "right",
                    "labelText": "[[val]]",
                    "lineColor": "#fa8a84",
                    "negativeFillColors": "#61db96",
                    "negativeLineColor": "#61db96",
                    "title": "graph 1",
                    "type": "column",
                    "valueField": "val"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "labelsEnabled": false,
                    "autoGridCount": false,
                    "gridCount": 10000,
                    //"minMaxMultiplier": 1.05,
                    "title": ""
                }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "listeners":[ /*  {
                    "event":"init",
                    "method":function(event){
                            var dp = event.chart.dataProvider;
                            for(i = 0; i < dp.length; i++){
                                dp[i].val = (+event.chart.dataProvider[i].currFact-+event.chart.dataProvider[i].prevFact).toFixed(2);
                                dp[i].drawVal = event.chart.dataProvider[i].val>0 ? "+"+event.chart.dataProvider[i].val:event.chart.dataProvider[i].val;
                            }
                            event.chart.dataProvider = dp; event.chart.validateData();
                        }
                }   */],
            "dataProvider": [
                {"category": "Корпоративный центр","currFact": "191.26","val": "2.4","drawVal": "","prevFact": "1341.13"},
                {"category": "РБ","currFact": "1072.57","val": "2.1","drawVal": "","prevFact": "6207.18"},
                {"category": "КБ","currFact": "1072.57","val": "1.1","drawVal": "","prevFact": "6207.18"},
                {"category": "Блок Т","currFact": "1072.57","val": "0.7","drawVal": "","prevFact": "6207.18"},
                {"category": "Недвижимость","currFact": "1072.57","val": "0.5","drawVal": "","prevFact": "6207.18"},
                {"category": "Блок HR","currFact": "1651.05","val": "0.5","drawVal": "","prevFact": "51.53"},
                {"category": "Блок Риски","currFact": "69.4","val": "0.4","drawVal": "","prevFact": "926.35"},
                {"category": "Внут. платы","currFact": "4722.61","val": "0.4","drawVal": "","prevFact": "18594.81"},
                {"category": "CIB","currFact": "1072.57","val": "0.1","drawVal": "","prevFact": "6207.18"},
                {"category": "SBI","currFact": "1072.57","val": "0.0","drawVal": "","prevFact": "6207.18"},
                {"category": "УБ","currFact": "1072.57","val": "0.0","drawVal": "","prevFact": "6207.18"},
                {"category": "Цифровой бизнес","currFact": "1072.57","val": "0.0","drawVal": "","prevFact": "6207.18"},
                {"category": "Дочерние компании","currFact": "0.02","val": "-0.1","drawVal": "","prevFact": "477.51"},
                {"category": "ДРПА","currFact": "1072.57","val": "-0.1","drawVal": "","prevFact": "6207.18"},
                {"category": "Блок С","currFact": "198.9","val": "-0.2","drawVal": "","prevFact": "3.85"},
                {"category": "ЦУНДО","currFact": "1072.57","val": "-0.3","drawVal": "","prevFact": "6207.18"}

            ]




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



////////////////////////////
    }
}
