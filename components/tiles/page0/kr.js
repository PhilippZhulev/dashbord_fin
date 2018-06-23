function Kr_tile () {

	/*this.readData=function(){
		var counter=0;
		var that=this;
        var arr ="kr";

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
        var incoming_data = window.data.kr;//this.globalSettings[a[0]];
        var incoming_data_dzo = window.data.kr_dzo;
        //console.log("incoming_data: "+incoming_data);
        var globalSettings = this.globalSettings;
            var param= this.globalSettings.Settings.param.split("!!!");
            console.warn("stop")
            var y=parseInt(param[1].slice(-2));
            if((param[1]=='12018')&&(param[0]=='Факт')){
                var cy=param[0]+"\'"+y;//Факт 18
                var ny=param[0]+"\'"+(y-1);//Факт 17
                
            }
            if((param[1]=='12018')&&(param[0]=='План')){
                var cy="Факт"+"\'"+y;//Факт 18
                var ny=param[0]+"\'"+y;//План 18
            }
            if((param[1]=='42018')&&(param[0]=='Факт')){
                var cy="Прогноз";//Прогноз
                var ny="Ф \'"+(y-1);//Факт 17
            }
            if((param[1]=='42018')&&(param[0]=='План')){
                var cy="Прогноз";//Прогноз
                var ny="П \'"+y;//План 18
            }


            var screen_data=[];
            var screen_data_dzo=[];

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
        for(var i=0;i<incoming_data_dzo.length;i++)

        {
            var obj={}
            obj.screen=incoming_data_dzo[i].screen;
            obj.tile=incoming_data_dzo[i].tile;
            obj.block=incoming_data_dzo[i].block;
            obj.category=incoming_data_dzo[i].category;
            obj.fact=incoming_data_dzo[i].fact;
            obj.plan=incoming_data_dzo[i].plan;
            obj.mera=incoming_data_dzo[i].mera;
            obj.color1=incoming_data_dzo[i].color1;
            obj.proc1=incoming_data_dzo[i].proc1;
            obj.text1=incoming_data_dzo[i].text1;
            obj.color2=incoming_data_dzo[i].color2;
            obj.proc2=incoming_data_dzo[i].proc2;
            obj.text2=incoming_data_dzo[i].text2;
            screen_data_dzo.push(obj)
        }

        //собираем табличку из источника
        var table_body ="";
        for(var i=0;i<incoming_data.length;i++)
        {
            table_body+= 
            '                                                <div class="row">' +
            '                                                    <div class="col-6">' +
            '                                                        <span class="table_item">'+screen_data[i].category+'</span>' +
            '                                                    </div>' +
            '                                                    <div class="col-2">' +
            '                                                        <span class="table_item">'+screen_data[i].fact+'</span>' +
            '                                                    </div>' +
            '                                                    <div class="col-4">' +
            '                                                        <span class="table_item">'+screen_data[i].plan+'</span>' +
            '                                                    </div>' +
            '                                                </div>' 
            //console.log(table_body);
        } 
        var table_body_dzo ="";
        for(var i=0;i<incoming_data_dzo.length;i++)
        {
            table_body_dzo+= 
            '                                                <div class="row">' +
            '                                                    <div class="col-6">' +
            '                                                        <span class="table_item">'+screen_data_dzo[i].category+'</span>' +
            '                                                    </div>' +
            '                                                    <div class="col-2">' +
            '                                                        <span class="table_item">'+screen_data_dzo[i].fact+'</span>' +
            '                                                    </div>' +
            '                                                    <div class="col-4">' +
            '                                                        <span class="table_item">'+screen_data_dzo[i].plan+'</span>' +
            '                                                    </div>' +
            '                                                </div>' 
            //console.log(table_body);
        }
        /**/

        // console.log(table_body);



        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_5"],
            html:
'                                    <div class="tiles__wrapper__tile">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-12">' +
'                                                    <span class="tiles__wrapper__tile_title">'+screen_data[0].tile+'<span>млрд. руб</span></span>' +
'                                                    <button type="button" class="btn btn-outline-info btn-abc btn-sm  btn_i_super_mego_dzo">ДЗО</button>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="tiles__wrapper__table">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-6"></div>' +
'                                                    <div class="col-2">' +
'                                                        <span class="table_item head_item">'+cy+'</span>' +
'                                                    </div>' +
'                                                    <div class="col-4">' +
'                                                        <span class="table_item head_item">'+ny+'</span>' +
'                                                    </div>' +
'                                                   <div class="table_border"></div>' +
'                                                </div>' +
'                                                 <div class="chart_element__container super_dzo">' +
'                                                     <div class="chart_element__chart do_lay_1 active">' +
                                                            table_body +
'                                                     </div>' +
'                                                     <div class="chart_element__chart do_lay_2">' + 
                                                            table_body_dzo+
'                                                      </div>' +
'                                                 </div>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>'
        });

        globals.chartSlideController({
            btnClass : "btn_i_super_mego_dzo",
            blockClass : ".super_dzo .chart_element__chart"
        });

    }
    catch(e){
        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_5"],
            html:
            '<div class="tiles__wrapper__tile i_err_404">' +
            '   <span>Нет данных...</span>' +
            '</div>'
        });
        console.warn(e);
    }}
}
