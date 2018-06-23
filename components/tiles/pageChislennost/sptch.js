function Sptch_tile () {


    /*this.reDraw=function(){
        console.warn("sptch_chart");
        var counter=0;
        var that=this;
        var arr ="sptch";
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
            console.warn("sptch_chart");
            this.refresh();
            var data = window.data.sptch;
            var num=0;
            for(var i=0;i<data.length;i++){
                num+=parseFloat(data[i].fact)
            }

            num=Math.round(num);

            /*  var data=[
                  {
                      "category": "До 9 грйда",
                      "val": "114.4"
                  },
                  {
                      "category": "10-13 грейды",
                      "val": "67.1"
                  },
                  {
                      "category": "13-15 грейды",
                      "val": "11.0"
                  },
                  {
                      "category": "Грейды 16+",
                      "val": "2.2"
                  }]
      */


            var globalSettings = this.globalSettings;
            //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

            globals.renderComponent(globalSettings, {
                tag: "div",
                className: ["tiles__wrapper__item", "item_6"],
                html:
                '   <div class="tiles__wrapper__tile">' +
                '       <div class="container">' +
                '          <div class="row">' +
                '              <div class="col-12">' +
                '                   <span class="tiles__wrapper__tile_title">Структура персонала<span>тыс. чел.</span></span>' +
                '              </div>' +
                '          </div>' +
                '      </div>' +
                '      <div class="chart_element__container">' +
                //  '           <div class="chart_element__chart col6" id="sptch"></div>' +
                '           <div class="chart_element__chart sopf"><span class="chart_value sopf_value">'+num+'</span><div class="chart_element___inner" id="sptch"></div></div>' +
                '           <div class="chart_element__legend col6">' +
                '                <span class="legend__item"><i style="background: #61DB96"></i>До 9 грейда</span>' +
                '                <span class="legend__item"><i style="background: #F5A623"></i>10-13 грейды</span>' +
                '                <span class="legend__item"><i style="background: #6EC7F7"></i>13-15 грейды</span>' +
                '                <span class="legend__item"><i style="background: #2ACED0"></i>Грейды от 16 +</span>' +
                '           </div>' +
                '      </div>' +
                '   </div>'
            });

            /*Начало JS бублика Персонал*/
            var finishedColors = [
                "#61DB96",
                "#F5A623",
                "#6EC7F7",
                "#2ACED0",
                "#64A7D2",
                "#04D215",
                "#0D52D1",
                "#2A0CD0",
                "#8A0CCF",
                "#CD0D74"];

            var chart = AmCharts.makeChart("sptch", {

                "type": "pie",
                "fontFamily": "'Open Sans', sans-serif",
                "startAngle": 10,
                "categoryField": "category",
                "balloonText": "[[category]]:<br>[[fact]] тыс. чел",
                "thousandsSeparator": " ",
                "startDuration": 0,
                "outlineThickness": 1,
                "outlineAlpha": 1,
                "outlineColor": "#36414d",
                "sequencedAnimation": false,
                "percentPrecision": 0,
                "labelText": "[[fact]]",
                // "labelsEnabled": false,
                "titleField": "category",
                "valueField": "fact",
                "allLabels": [],
                "color": "#a1abb8",
                "innerRadius": "70%",
                "fontSize": 13,
                "balloon": {},
                "pullOutRadius": "0%",
                "startRadius": "50%",
                //"autoMargins": false,
                // "marginBottom":10,
                // "marginRight":10,
                // "marginLeft":10,
                // "marginTop":10,
                "labelTickAlpha": 0.2,
                "labelTickColor": "#a1abb8",
                "labelRadius": 5,
                "titles": [],
                "colors": finishedColors,
                "dataProvider": data

            });
            /*Конец JS бублика персонала*/
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
