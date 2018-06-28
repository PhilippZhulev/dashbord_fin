function Opex_tile () {
 
	/*this.readData=function(){
		var counter=0;
		var that=this;
        var arr ="opex$$_$$opex_graph_data";

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
											that.reDraw(a);
										},arr
									);
		}else{
			this.globalSettings.Settings.break=undefined;
		}
	}*/

    this.readData = function(a) {
        try{
        this.refresh();
        var incoming_data = window.data.opex;//this.globalSettings[a[0]];
        var globalSettings = this.globalSettings;
       
        var screen_data=[];

        for(var i=0;i<incoming_data.length;i++)
        {
            var obj={} 
            obj.screen=incoming_data[i].screen;
            obj.tile=incoming_data[i].tile;
            obj.block=incoming_data[i].block;
            obj.category=incoming_data[i].category;
            obj.fact=incoming_data[i].fact;
            obj.plan=incoming_data[i].plan;
            obj.mera=incoming_data[i].mera;
            obj.color1=incoming_data[i].color1;
            obj.proc1=incoming_data[i].proc1;
            obj.text1=incoming_data[i].text1;
            obj.color2=incoming_data[i].color2;
            obj.proc2=incoming_data[i].proc2;
            obj.text2=incoming_data[i].text2;
            obj.arrow1=incoming_data[i].arrow1;
            obj.arrow2=incoming_data[i].arrow2;
            screen_data.push(obj)
            
        }
        //var expData=JSON.parse("["+this.globalSettings.Settings.cir_data+"]");
        //console.log(screen_data[0].mera);
   
        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_2"],
            html:
'                                    <div class="tiles__wrapper__tile i_tile_opex">' +
'                                        <div class="tiles__wrapper__tile_inner click_btn">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title">'+screen_data[0].tile+'</span><div class="touch_hint"></div><strong class="tiles__wrapper__tile_values">'+screen_data[0].fact+'<br><span>'+screen_data[0].mera+'</span></strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                            <div class="tiles__wrapper__tile_footer">' +
'                                            <div class="tiles__wrapper__arrows">' +
'                                                <span class="'+screen_data[0].color1+" "+screen_data[0].arrow1+'"><span><span>'+screen_data[0].proc1+'</span> '+screen_data[0].text1+'</span></span><span class="'+screen_data[0].color2+" "+screen_data[0].arrow2+'"><span><span>'+screen_data[0].proc2+'</span> '+screen_data[0].text2+'</span></span>' +
'                                            </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="tiles__wrapper__tile_chart" id="opex"></div>' +
'                                        <div class="tiles__wrapper__tile_legend">' +
'                                            <span class="legend__item"><i style="background: #61DB96"></i>ПАО</span>' +
'                                            <span class="legend__item"><i style="background: #F5A623"></i>ДО SBI</span>' +
'                                            <span class="legend__item"><i style="background: #6EC7F7"></i>ЦБ</span>' +
'                                            <span class="legend__item"><i style="background: #2ACED0"></i>Прочее</span>' +
'                                        </div>' +
'                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm opex_modal_btn_wow" data-target="opex_m" data-title="Изменение OPEX по Группе 3М17 vs 3М18" data-middle="true">' +
'                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
'                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
'                                                        </svg>' +
'                                                    </button>' +
'                                    </div>'
        });

        globals.navigation({
            btn : ".click_btn",
            page : ".p_opex_l2",
            callback: function () {
                globalSettings.Settings.result = ".p_opex_l2";
                globalSettings.that_c.firePropertiesChangedAndEvent(["SettingsTP"], "tech1");
            }
        });



        var graph_data = window.data.opex_graph_data//this.globalSettings[a[1]];
        var globalSettings2 = this.globalSettings;
      // console.log(graph_data);
        var screen_data=[];

        for(var i=0;i<graph_data.length;i++)
        {
            var obj={}
            obj.screen=graph_data[i].screen;
            obj.tile=graph_data[i].tile;
            obj.block=graph_data[i].block;
            obj.category=graph_data[i].category;
            obj.fact=graph_data[i].fact;
            obj.plan=graph_data[i].plan;
            obj.mera=graph_data[i].mera;
            obj.color1=graph_data[i].color1;
            obj.proc1=graph_data[i].proc1;
            obj.text1=graph_data[i].text1;
            obj.color2=graph_data[i].color2;
            obj.proc2=graph_data[i].proc2;
            obj.text2=graph_data[i].text2;
            screen_data.push(obj)
        }
            //console.log(screen_data[1].fact);

        /*Начало JS бублика OPEX*/
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

        		var chart = AmCharts.makeChart( "opex", {


                    "type": "pie",
                    "fontFamily": "'Open Sans', sans-serif",
                    "startAngle": 10,
                    "categoryField": "category",
                    "balloonText":"[[category]]:<br>[[value]] млрд. руб",
                    "thousandsSeparator": " ",
                    "startDuration":0,
                    "outlineThickness":1,
                    "outlineAlpha":1,
                    "outlineColor":"#36414d",
                    "sequencedAnimation":false,
                    "percentPrecision":0,
                    "labelText": "[[value]]",
                   // "labelsEnabled": false,
                    "titleField": "category",
                    "valueField": "fact",
                    "allLabels": [],
                    "color":"#a1abb8",
                    "innerRadius":"70%",
                    "fontSize":13,
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
                    "labelRadius": 10,
                    "titles": [],
                    "colors":  finishedColors  ,
        			"dataProvider": screen_data

        });
        /*Конец JS бублика OPEX*/




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


    /*конец this.reDraw = function()*/
    }
/*конец function Opex_tile ()*/
}
