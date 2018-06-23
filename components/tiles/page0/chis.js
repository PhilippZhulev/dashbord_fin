function Chis_tile () {
/*	this.readData=function(){
		var counter=0;
		var that=this;
        var arr ="chis";

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
        var incoming_data =window.data.chis//this.globalSettings[a[0]];
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
            className : ["tiles__wrapper__item", "item_3"],
            html:
'                                    <div class="tiles__wrapper__tile click_btn_chis">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-12">' +
'                                                   <span class="tiles__wrapper__tile_title">'+screen_data[0].tile+'</span><strong class="tiles__wrapper__tile_values">'+screen_data[0].fact+'<br><span>'+screen_data[0].mera+'</span></strong>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="tiles__wrapper__tile_footer">' +
'                                            <div class="tiles__wrapper__arrows">' +
'                                                <span class="'+screen_data[0].color1+" "+screen_data[0].arrow1+'"><span><span>'+screen_data[0].proc1+'</span> '+screen_data[0].text1+'</span></span><span class="'+screen_data[0].color2+" "+screen_data[0].arrow2+'"><span><span>'+screen_data[0].proc2+'</span> '+screen_data[0].text2+'</span></span>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                </div>'
        });


        globals.navigation({
            btn : ".click_btn_chis",
            page : ".p_chis",
            callback: function () {
                globalSettings.Settings.result = ".p_chis";
                globalSettings.that_c.firePropertiesChangedAndEvent(["SettingsTP"], "tech1");
            }
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
