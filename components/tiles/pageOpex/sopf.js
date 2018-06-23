function Sopf_tile () {


   /* this.reDraw=function(){
        console.warn("sopf_tile");
        var counter=0;
        var that=this;
        var arr ="sopf";
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
                    that.reDrawSopf(a);
                },arr
            );
        }else{
            this.globalSettings.Settings.break=undefined;
        }
    }*/




    this.reDraw = function(disc) {
        this.refresh();
        var data=window.data.sopf;// this.globalSettings[disc[0]];
        var globalSettings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

       /* var data=[
            {"category": "Бизнес функция","val": "74"},
            {"category": "Обеспечивающая функция","val": "32"},
            {"category": "Корпоративный центр","val": "31"},
            {"category": "Дочерние общества","val": "14"}
        ]*/
       var num=0;
       for(var i=0;i<data.length;i++){
           num+=parseFloat(data[i].fact);
       }
        num=Math.round(num);


        globals.renderComponent (globalSettings,{
            tag : "div",
            className : ["tiles__wrapper__item", "item_4"],
            html:
            '   <div class="tiles__wrapper__tile">' +
            '       <div class="container">' +
            '          <div class="row">' +
            '              <div class="col-12">' +
            '                   <span class="tiles__wrapper__tile_title click_btn_sopf">Структура OPEX по функциям/блокам<span>млрд. руб</span></span>' +
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '      <div class="chart_element__container">' +
            '           <div class="chart_element__chart sopf"><span class="chart_value sopf_value">'+num+'</span><div class="chart_element___inner" id="sopf"></div></div>' +
            '           <div class="chart_element__legend sopf">' +
            '                <span class="legend__item"><i style="background: #61DB96"></i>Бизнес функция</span>' +
            '                <span class="legend__item"><i style="background: #F5A623"></i>Обеспечивающая функция</span>' +
            '                <span class="legend__item"><i style="background: #6EC7F7"></i>Корпоративный центр</span>' +
            '                <span class="legend__item"><i style="background: #2ACED0"></i>Дочерние общества</span>' +
            '           </div>' +
            '      </div>' +
            '   </div>'
        });


        globals.navigation({
            btn : ".click_btn_sopf",
            page : ".p_opex",
            callback: function () {
                globalSettings.Settings.result = ".p_opex";
                globalSettings.that_c.firePropertiesChangedAndEvent(["SettingsTP"], "tech1");
            }
        });



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

        var chart = AmCharts.makeChart( "sopf", {
            "type": "pie",
            "fontFamily": "'Open Sans', sans-serif",
			"categoryField": "category",
                    	"balloonText":"[[category]]:<br>[[val]] млрд. руб",
			"thousandsSeparator": " ",
			"startDuration":0,
            "outlineThickness":1,
            "outlineAlpha":1,
            "outlineColor":"#36414d",
			"sequencedAnimation":false,
			"percentPrecision":0,
			"labelText": "[[value]]",
            "labelsEnabled": true,

			"titleField": "category",
			"valueField": "fact",
			"allLabels": [],
			"color":"#a1abb8",
			"innerRadius":"70%",
			"fontSize":13,
			"balloon": {},
			"pullOutRadius": "0%",
			"startRadius": "50%",
			"autoMargins": false,
			// "marginBottom":10,
			// "marginRight":10,
			// "marginLeft":10,
			// "marginTop":10,
            "labelTickAlpha": 0.2,
            "labelTickColor": "#a1abb8",
            "labelRadius": 10,
			"titles": [],
			"colors":  finishedColors  ,
			"dataProvider": data
		});










//////////////////////////
    }
}
