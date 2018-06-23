function Dchtch_tile () {





   /* this.reDraw=function(){
        console.warn("antoha");
      this.getBuffer("dchtch","reDrawTile");
     /* console.warn("schch_chart");
      var counter=0;
      var that=this;
      var arr ="dchtch";
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
    try {
        console.warn("dchtch_chart");
        this.refresh();
        var data = window.data.dchtch;//this.globalSettings[a[0]];
        var globalSettings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

       
        globals.renderComponent(globalSettings, {
            tag: "div",
            className: ["tiles__wrapper__item", "item_7"],
            html:
            '   <div class="tiles__wrapper__tile">' +
            '       <div class="container">' +
            '          <div class="row">' +
            '              <div class="col-12">' +
            '                   <span class="tiles__wrapper__tile_title">Динамика численности<span>тыс. чел.</span></span>' +
            '                                        <div class="legend_dchtch">' +
            '                                            <span class="legend__item"><i style="background: #61DB96"></i>Банк</span>' +
            '                                            <span class="legend__item"><i style="background: #F5A623"></i>ДЗО</span>' +
            '                                        </div>' +
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '           <div class="chart_element__chart">' +
            '				<div id="dchtch_chart_g_2"></div>' +
            '			</div>' +

            '   </div>'
        });

 

        var chart = AmCharts.makeChart("dchtch_chart_g_2", {
            "type": "serial",
            "fontFamily": "'Open Sans', sans-serif",
            "fontSize": 13,
            "categoryField": "category",
            "colors": [
                "#61DB96",
                "#F5A623"
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
                    "balloonText": "Банк<br>[[category]]:[[value]]",
                    "columnWidth": 0,
                    "fillAlphas": 1,
                    "fixedColumnWidth": 30,
                    "id": "AmGraph-1",
                    "labelPosition": "inside",
                    "labelText": "",
                    "title": "graph 1",
                    "type": "column",
                    "valueField": "fact"
                },
                {
                    "labelOffset": 7,
                    "balloonText": "ДЗО<br>[[category]]:[[value]]",
                    "columnWidth": 0,
                    "fillAlphas": 1,
                    "fixedColumnWidth": 30,
                    "id": "AmGraph-2",
                    "labelPosition": "top",
                    "color": "#A0AAB7",
                    "labelText": "",
                    "title": "graph 1",
                    "type": "column",
                    "valueField": "plan"
                }
            ],
            "guides": [],
            "valueAxes": [{
                "id": "ValueAxis-1",
                "stackType": "regular",
                "axisThickness": 0,
                "gridThickness": 0,
                "labelsEnabled": false,
                "tickLength": 0,
                "totalText": "[[total]]",
                "title": ""
            }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": data
        });
    }catch(e){
        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_7"],
            html:
            '<div class="tiles__wrapper__tile i_err_404">' +
            '   <span>Нет данных...</span>' +
            '</div>'
        });
        console.warn(e);
    }
    }
}
