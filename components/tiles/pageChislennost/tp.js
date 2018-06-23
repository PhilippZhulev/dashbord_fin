function Tp_tile () {

    /*this.reDraw=function(){
        console.warn("Up_tile");
        var counter=0;
        var that=this;
        var arr ="tp";
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
            this.refresh();
            var incoming_data = window.data.tp; //this.globalSettings[a[0]];
            var globalSettings = this.globalSettings;

            globals.renderComponent(globalSettings, {
                tag: "div",
                className: ["tiles__wrapper__item", "item_2"],
                html:
                '                                    <div class="tiles__wrapper__tile">' +
                '                                        <div class="container">' +
                '                                            <div class="row">' +
                '                                                <div class="col-12">' +
                '                                                    <span class="tiles__wrapper__tile_title">Текучесть персонала</span><br>' +
                '                                                    <strong class="tiles__wrapper__tile_values">' + incoming_data[0].fact + '<span class="smal_val">%</span></strong>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="tiles__wrapper__tile_footer">' +
                '                                            <div class="tiles__wrapper__arrows">' +
                '                                                <span class="'+incoming_data[0].color1+" "+incoming_data[0].arrow1+'"><span><span>'+incoming_data[0].proc1+'</span> '+incoming_data[0].text1+'</span></span><span class="'+incoming_data[0].color2+" "+incoming_data[0].arrow2+'"><span><span>'+incoming_data[0].proc2+'</span> '+incoming_data[0].text2+'</span></span>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                    </div>'
            });


        }catch(e){
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
    }

}
