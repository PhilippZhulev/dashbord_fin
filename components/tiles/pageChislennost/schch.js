function Schch_tile () {
    /*this.reDraw=function(){
        console.warn("schch_chart");
        var counter=0;
        var that=this;
        var arr ="schtch1$$_$$schtch2$$_$$schtch_total";
        if(!this.globalSettings.Settings.break)
        {
            that.callZTLFunction("getCache",
                function(data)
                {
                    var a=arr.split('$$_$$');
                    var d= data.split('$$_$$');
                    that.globalSettings.Settings.break=true;
                    for(var i=0;i<d.length;i++)
                    {
                        that.globalSettings[a[i]]=JSON.parse(d[i]);
                    }
                    that.reDrawTile(a);
                },arr
            );
        }else{
            this.globalSettings.Settings.break=undefined;
        }
    }*/

    this.reDraw = function(a) {
        console.warn("schch_chart");
        try {
            this.refresh();
            var data = window.data.schtch1;// this.globalSettings[a[0]];
            var data1 = window.data.schtch2;// this.globalSettings[a[1]];
            var data_total = window.data.schtch_total;// this.globalSettings[a[2]];

            for (var i = 0; i < data_total.length; i++) {
                data_total[i]["column-2"] = 100;
                data_total[i]["column-1"] = data_total[i].fact_prev;

            }
            for (var i = 0; i < data.length; i++) {
                data[i]["column-2"] = data[i].plan;
                data[i]["column-1"] = data[i].fact;

            }
            for (var i = 0; i < data1.length; i++) {
                data1[i]["column-2"] = data1[i].plan;
                data1[i]["column-1"] = data1[i].fact;

            }
            var globalSettings = this.globalSettings;


            /* [
                 {
                     "category": "ИТОГО",
                     "column-1": "89",
                     "column-2": "100"
                 }
             ]*/


            //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

            globals.renderComponent(globalSettings, {
                tag: "div",
                className: ["tiles__wrapper__item", "item_6"],
                html:
                '   <div class="tiles__wrapper__tile">' +
                '       <div class="container">' +
                '          <div class="row">' +
                '              <div class="col-12">' +
                '                   <span class="tiles__wrapper__tile_title">Структура численности<span>тыс. чел.</span><div class="scroll_hint" style="left: 210px!important;"></div></span>' +
                '                                        <div class="legend_dchtch">' +
                '                                            <span class="legend__item"><i style="background: #6EC7F7"></i>Факт</span>' +
                '                                            <span class="legend__item"><i style="background: #A0AAB7"></i>План</span>' +
                '                                        </div>' +
                '                   <button type="button" class="btn btn-outline-info btn-abc btn-sm btn_schch"></button>' +
                '              </div>' +
                '          </div>' +
                '      </div>' +

                // '	   <div id="schch_g_1"></div>' +
                '      <div class="chart_element__container schch" id="schch">' +
                '           <div class="chart_element__chart schch_lay_1 active" id="scroll_schch_1">' +
                '                   <div class="chart_do" id="schch_g_2" style="height:'+(data.length*50)+'px;"></div>' +
                '           </div>' +
                '           <div class="chart_element__chart schch_lay_2" id="scroll_schch_2">' +
                '                   <div class="chart_do" id="schch_lay_2" style="height:'+(data1.length*50)+'px;padding-left: 19px;"></div>' +
                '           </div>' +
                '      </div>' +


                // '				<div id="schch_g_1"></div>' +
                // '      <div class="chart_element__container schch">' +
                // '           <div class="chart_element__chart schch_lay_1 active">' +
                // '				<div id="schch_g_2"></div>' +
                // '			</div>' +
                // '           <div class="chart_element__chart schch_lay_2" id="schch_lay_2">' +
                // '				<div id="schch_g_2_lay_2"></div>' +
                // '			</div>' +
                // '      </div>' +
                '   </div>'
            });

            var sc = ['scroll_schch_1','scroll_schch_2'];
            for(var j = 0; j < sc.length;j++) {
                new iScroll(sc[j], {
                    snap: true,
                    momentum: false,
                    hScrollbar: false,
                    vScrollbar: false
                });
            }

            globals.chartSlideController({
                btnClass: "btn_schch",
                blockClass: ".schch .chart_element__chart"
            });

            // var chart = AmCharts.makeChart("schch_g_1", {
            //     "type": "serial",
            //     "fontFamily": "'Open Sans', sans-serif",
            //     "categoryField": "category",
            //     "rotate": true,
            //     "colors": [
            //         "#A0AAB7",
            //         "#6EC7F7",
            //         "#B0DE09",
            //         "#0D8ECF",
            //         "#2A0CD0",
            //         "#CD0D74",
            //         "#CC0000",
            //         "#00CC00",
            //         "#0000CC",
            //         "#DDDDDD",
            //         "#999999",
            //         "#333333",
            //         "#990000"
            //     ],
            //     "color": "#A0AAB7",
            //     "fontSize": 13,
            //     "categoryAxis": {
            //         "gridPosition": "start",
            //         "axisThickness": 0,
            //         "gridAlpha": 0,
            //         "gridThickness": 0
            //     },
            //     "trendLines": [],
            //     "graphs": [
            //         {
            //             "balloonText": "",
            //             "fillAlphas": 1,
            //             "fillColors": "#6D7B87",
            //             "fixedColumnWidth": 15,
            //             "id": "AmGraph-2",
            //             "labelOffset": 5,
            //             "labelPosition": "left",
            //             "labelText": "",
            //             "title": "graph 2",
            //             "type": "column",
            //             "valueField": "column-2"
            //         },
            //         {
            //             "balloonText": "[[category]]: Факт [[fact]]/ План [[plan]]",
            //             "color": "#000000",
            //             "fillAlphas": 1,
            //             "fixedColumnWidth": 15,
            //             "id": "AmGraph-1",
            //             "labelPosition": "left",
            //             "labelText": "[[value]]%",
            //             "title": "graph 1",
            //             "type": "column",
            //             "valueField": "column-1"
            //         }
            //     ],
            //     "guides": [],
            //     "valueAxes": [
            //         {
            //             "id": "ValueAxis-1",
            //             "stackType": "3d",
            //             "minimum": 0,
            //             "axisThickness": 0,
            //             "gridAlpha": 0,
            //             "gridThickness": 0,
            //             "labelsEnabled": false,
            //             "title": ""
            //         }
            //     ],
            //     "allLabels": [],
            //     "balloon": {},
            //     "titles": [],
            //     "dataProvider": data_total
            // });

            var chart = AmCharts.makeChart("schch_g_2", {
                "type": "serial",
                "marginRight": 40,
                "fontFamily": "'Open Sans', sans-serif",
                "categoryField": "category",
                "columnSpacing": 2,
                "rotate": true,
                "marginTop": 0,
                "theme": "black",
                "categoryAxis": {
                    "gridPosition": "start",
                    "autoGridCount": false,
                    "axisAlpha": 0,
                    "axisThickness": 2,
                    "color": "#A0AAB7",
                    "fontSize": 13,
                    "gridAlpha": 0,
                    "gridCount": 12,
                    "gridThickness": 0
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "Факт:[[value]]",
                        "color": "#BEBEBE",
                        "fillAlphas": 1,
                        "fillColors": "#6EC7F7",
                        "fixedColumnWidth": 10,
                        "fontSize": 13,
                        "id": "AmGraph-1",
                        "labelOffset": 10,
                        "labelPosition": "right",
                        "labelText": "[[value]]",
                        "lineAlpha": 0,
                        "showAllValueLabels": true,
                        "showBulletsAt": "open",
                        "title": "graph 1",
                        "type": "column",
                        "valueAxis": "ValueAxis-1",
                        "valueField": "column-1"
                    },
                    {
                        "balloonText": "План:[[value]]",
                        "color": "#BEBEBE",
                        "fillAlphas": 1,
                        "fillColors": "#A0AAB7",
                        "fixedColumnWidth": 10,
                        "fontSize": 13,
                        "id": "AmGraph-2",
                        "labelOffset": 10,
                        "labelPosition": "right",
                        "labelText": "[[value]]",
                        "lineAlpha": 0,
                        "showAllValueLabels": true,
                        "showBulletsAt": "open",
                        "title": "graph 2",
                        "type": "column",
                        "valueField": "column-2"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        //"logarithmic": true,
                        "position": "right",
                        "axisAlpha": 0,
                        "axisThickness": 0,
                        "gridAlpha": 0,
                        "labelsEnabled": false,
                        "tickLength": 0
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider":data
                // "dataProvider": [
                //     {
                //         "name": "1",
                //         "column-2": 129.8
                //     },
                //     {
                //         "name": "2",
                //         "column-1": 129.8,
                //         "column-2": 135
                //     },
                //     {
                //         "name": "3",
                //         "column-1": 129.8,
                //         "column-2": 123.5
                //     },
                //     {
                //         "name": "4",
                //         "column-1": 123.5,
                //         "column-2": 122.4
                //     },
                //     {
                //         "name": "5",
                //         "column-1": 110,
                //         "column-2": 121.2
                //     }
                // ]
            });

            var chart = AmCharts.makeChart("schch_lay_2", {
                "type": "serial",
                "marginRight": 40,
                "fontFamily": "'Open Sans', sans-serif",
                "categoryField": "category",
                "columnSpacing": 2,
                "rotate": true,
                "marginTop": 0,
                "theme": "black",
                "categoryAxis": {
                    "gridPosition": "start",
                    "autoGridCount": false,
                    "axisAlpha": 0,
                    "axisThickness": 2,
                    "color": "#A0AAB7",
                    "fontSize": 13,
                    "gridAlpha": 0,
                    "gridCount": 12,
                    "gridThickness": 0
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "Факт:[[value]]",
                        "color": "#BEBEBE",
                        "fillAlphas": 1,
                        "fillColors": "#6EC7F7",
                        "fixedColumnWidth": 10,
                        "fontSize": 13,
                        "id": "AmGraph-1",
                        "labelOffset": 10,
                        "labelPosition": "right",
                        "labelText": "[[value]]",
                        "lineAlpha": 0,
                        "showAllValueLabels": true,
                        "showBulletsAt": "open",
                        "title": "graph 1",
                        "type": "column",
                        "valueAxis": "ValueAxis-1",
                        "valueField": "column-1"
                    },
                    {
                        "balloonText": "План:[[value]]",
                        "color": "#BEBEBE",
                        "fillAlphas": 1,
                        "fillColors": "#A0AAB7",
                        "fixedColumnWidth": 10,
                        "fontSize": 13,
                        "id": "AmGraph-2",
                        "labelOffset": 10,
                        "labelPosition": "right",
                        "labelText": "[[value]]",
                        "lineAlpha": 0,
                        "showAllValueLabels": true,
                        "showBulletsAt": "open",
                        "title": "graph 2",
                        "type": "column",
                        "valueField": "column-2"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                       // "logarithmic": true,
                        "position": "right",
                        "axisAlpha": 0,
                        "axisThickness": 0,
                        "gridAlpha": 0,
                        "labelsEnabled": false,
                        "tickLength": 0
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider":data1
            });
        }catch(e){
            globals.renderComponent (globalSettings, {
                tag : "div",
                className : ["tiles__wrapper__item", "item_6"],
                html:
                '<div class="tiles__wrapper__tile i_err_404">' +
                '   <span>Нет данных...</span>' +
                '</div>'
            });
            console.warn(e);
        }
    }
}
