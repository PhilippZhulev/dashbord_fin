function Focus_tile () {
 
	/*this.readData=function(){
		var counter=0;
		var that=this;
        var arr ="focus";

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
	}
*/
    this.readData = function(a) {
        try{
        this.refresh();
        var incoming_data =window.data.focus// this.globalSettings[a[0]];
        //console.log("incoming_data: "+incoming_data);
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
            screen_data.push(obj)
        }

        //собираем табличку из источника
        var table_body ="";
        for(var i=0;i<incoming_data.length;i++)
        {   


                table_body+= 
                '                                        <div class="focus_block swiper-slide">' +
                '                                            <div class="container">' +
                '                                                <div class="row">' +
                '                                                    <div class="col-12">' +
                '                                                        <span class="tiles__wrapper__tile_title_small">'+incoming_data[i].category+'</span>' +
                    '                                                    <button type="button" class="btn-open-modal my_super_info_btn" data-target="focus'+i+'" data-title="'+incoming_data[i].category+'"></button>' +
                '                                                        <strong class="tiles__wrapper__tile_values v_'+incoming_data[i].color1+'">'+incoming_data[i].fact+'<span class="smal_val">'+incoming_data[i].text2+'</span>' +
                '                                                            <br>' +
                '                                                            <span>'+incoming_data[i].mera+'</span>' +
                '                                                        </strong>' +
                '                                                    </div>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                         </div>'
             //console.log(table_body);
        } 
        /**/

        // console.log(table_body);



        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_7"],
            html:
'                                  <div class="tiles__wrapper__tile">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-12">' +
'                                                    <span class="tiles__wrapper__tile_title">Фокус</span><div class="scroll_hint"></div> ' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                       <div class="scroll_block" style="height: 585px;">'+
'                                           <div class="swiper-container it_w sw_focus" id="wrapper_1" style="height: 100%; overflow-y: auto;">'+
'                                               <div class="swiper-wrapper" style="padding-bottom: 15px">' + table_body +
'                                               </div>' +
'                                           </div>' +
'                                        </div>' +
'                                    </div>'

        });

        new iScroll('wrapper_1',{
            snap: true,
            momentum: false,
            hScrollbar: false,
            vScrollbar: false
        });
        }
        catch(e){
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
