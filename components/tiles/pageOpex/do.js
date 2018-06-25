function Do_tile () {


  /*  this.reDraw=function(){
        console.warn("");
        var counter=0;
        var that=this;
        var arr ="do$$_$$do_inf";
       // this.reDrawTile();


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


    this.reDraw = function(disc) {
        this.refresh();

        var globalSettings = this.globalSettings;
        var dataChart1 = window.data.do;//this.globalSettings[disc[0]];
        var dataChart2 = window.data.do_inf;//this.globalSettings[disc[1]];
      //  var dataAchievements = globalSettings[disc[1]];*/

  

        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");
        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_3"],
            html:
            '   <div class="tiles__wrapper__tile">' +
            '       <div class="container">' +
            '          <div class="row">' +
            '              <div class="col-12">' +
            '                   <span class="tiles__wrapper__tile_title">Динамика OPEX<span>млрд. руб</span></span>' +
            '                   <button type="button" class="btn btn-outline-info btn-abc btn-sm btn_ovi btn_domr">Opex vs Инфл.</button>' +
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '      <div class="chart_element__container do">' +
            '           <div class="chart_element__chart do_lay_1 active">' +
            '                   <div class="legend_do">' +
            '                        <span class="legend__item"><i style="background: #6EC7F7"></i>OPEX</span>' +
//            '                        <span class="legend__item"><i style="background: #fff"></i>Факт</span>' +
            '                   </div>' +
            '                   <div class="chart_do" id="do_lay_1"></div>' +
            '           </div>' +
            '           <div class="chart_element__chart do_lay_2">' +
            '                   <div class="legend_do">' +
            '                        <span class="legend__item"><i style="background: #6EC7F7"></i>OPEX</span>' +
            '                        <span class="legend__item"><i style="background: #fff"></i>Инфл</span>' +
            '                   </div>' +
            '                   <div class="chart_do" id="do_lay_2"></div>' +
            '           </div>' +
            '      </div>' +
            '   </div>'
        });


        globals.chartSlideController({
            btnClass : "btn_ovi",
            blockClass : ".do .chart_element__chart" 
        });




        var chart = AmCharts.makeChart( "do_lay_1", {

            "type": "serial",
            "fontFamily": "'Open Sans', sans-serif",
            "categoryField": "category",
            "zoomOutButtonRollOverAlpha": 0,
            "colors": [
                "#6EC7F7",
                "#6EC7F7"
            ],
            "sequencedAnimation": false,
            "startDuration": 0,
            "color": "#a1abb8",
            "fontSize": 13,
            "categoryAxis": {
                "gridPosition": "start",
                "axisColor": "#a0aab7",
                "color": "#A0AAB7",
                "axisThickness": 1,
                "gridAlpha": 0,
                "gridColor": "#E5E5E5",
                "gridCount": 0,
                "gridThickness": 0,
                "titleColor": "#FFFFFF"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[category]]: [[value]] млрд. руб.",
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletBorderColor": "#6EC7F7",
                    "bulletColor": "#6EC7F7",
                    "fontSize": 13,
                    "bulletSize": 3,
                    "id": "AmGraph-1",
                    "labelText": "[[value]]",
                    "lineThickness": 3,
                    "title": "",
                    "valueField": "fact"
                },
                {
                    "balloonText": "[[category]]: [[value]] млрд. руб.",
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletBorderColor": "#6EC7F7",
                    "bulletColor": "#6EC7F7",
                    "fontSize": 13,
                    "bulletSize": 3,
                    "id": "AmGraph-2",
                    "labelText": "[[value]]",
                    "lineThickness": 3,
                    "title": "",
                    "valueField": "fact"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "precision": 0,
                    "axisAlpha": 0.0,
                    "axisColor": "#E5E5E5",
                    "gridAlpha": 0,
                    "gridThickness": 0,
                    "gridColor": "#E5E5E5",
                    "labelsEnabled":false,
                    "title": "",
                    "titleColor": "#E5E5E5"
                }
            ],
            "allLabels": [],
            "balloon": {
                "fillAlpha": 1,
                "offsetX": 9,
                "shadowAlpha": 0
                },
            "titles": [],
            "dataProvider":dataChart1

        });

        var chart = AmCharts.makeChart( "do_lay_2", {

            "type": "serial",
            "fontFamily": "'Open Sans', sans-serif",
            "categoryField": "category",
            "zoomOutButtonRollOverAlpha": 0,
            "colors": [
                "#6EC7F7",
                "#DFDFDF"
            ],
            "sequencedAnimation": false,
            "startDuration": 0,
            "color": "#a1abb8",
            "fontSize": 13,
            "categoryAxis": {
                "gridPosition": "start",
                "axisColor": "#a0aab7",
                "color": "#A0AAB7",
                "axisThickness": 0.4,
                "gridAlpha": 0,
                "gridColor": "#E5E5E5",
                "gridCount": 0,
                "gridThickness": 0,
                "titleColor": "#FFFFFF"
            },
            "trendLines": [],
            "graphs": [
                {
                    "balloonText": "[[category]]: [[value]]%",
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletBorderColor": "#6EC7F7",
                    "bulletColor": "#6EC7F7",
                    "bulletSize": 3,
                    "id": "AmGraph-1",
                    "fontSize": 13,
                    "labelText": "[[value]]%",
                    "lineThickness": 3,
                    "title": "",
                    "valueField": "fact"
                },
                {
                    "balloonText": "[[category]]: [[value]]%",
                    "bullet": "round",
                    "bulletBorderAlpha": 1,
                    "bulletBorderColor": "#DFDFDF",
                    "bulletColor": "#DFDFDF",
                    "bulletSize": 3,
                    "id": "AmGraph-2",
                    "fontSize": 13,
                    "labelText": "[[value]]%",
                    "lineThickness": 3,
                    "title": "",
                    "valueField": "plan"
                }
            ],
            "guides": [],
            "valueAxes": [
                {
                    "id": "ValueAxis-1",
                    "precision": 0,
                    "axisAlpha": 0.0,
                    "axisColor": "#E5E5E5",
                    "gridAlpha": 0,
                    "gridThickness": 0,
                    "gridColor": "#E5E5E5",
                    "labelsEnabled":false,
                    "title": "",
                    "titleColor": "#E5E5E5"
                }
            ],
            "allLabels": [],
            "balloon": {
                "fillAlpha": 1,
                "offsetX": 9,
                "shadowAlpha": 0
                },
            "titles": [],
            "dataProvider": dataChart2

                    });




///////////////////////////
    }
}
