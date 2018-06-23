function Kv_tile () {


   /* this.reDraw=function(){
        console.warn("kv_tile");
        var counter=0;
        var that=this;
        var arr ="kv";
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
            var incoming_data = window.data.kv//this.globalSettings[a[0]];
            var globalSettings = this.globalSettings;

            globals.renderComponent(globalSettings, {
                tag: "div",
                className: ["tiles__wrapper__item", "item_4"],
                html:
                '                                    <div class="tiles__wrapper__tile">' +
                '                                        <div class="container">' +
                '                                            <div class="row">' +
                '                                                <div class="col-12">' +
                '                                                    <span class="tiles__wrapper__tile_title">Лимит РОТ</span><br>' +
                '                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="kv" data-title="Лимит РОТ, млрд. руб" data-scroll="true">' +
                '                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
                '                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
                '                                                        </svg>' +
                '                                                    </button>' +
                '                                                    <strong class="tiles__wrapper__tile_values">' + incoming_data[0].fact + '<br><span>млрд. руб</span></strong>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                        <div class="tiles__wrapper__tile_footer">' +
                '                                            <div class="tiles__wrapper__arrows">' +
                '                                               <span class="'+incoming_data[0].color1+" "+incoming_data[0].arrow1+'"><span><span>'+incoming_data[0].proc1+'</span> '+incoming_data[0].text1+'</span></span><span class="'+incoming_data[0].color2+" "+incoming_data[0].arrow2+'"><span><span>'+incoming_data[0].proc2+'</span> '+incoming_data[0].text2+'</span></span>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                    </div>'
            });
            /* globals.renderComponent ({
                 tag : "div",
                 className : ["tiles__wrapper__item", "item_3"],
                 html:
                 '                                    <div class="tiles__wrapper__tile">' +
                 '                                        <div class="container">' +
                 '                                            <div class="row">' +
                 '                                                <div class="col-12">' +
                 '                                                    <span class="tiles__wrapper__tile_title">Средний разряд</span><br><br>' +
                 '                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="sr" data-title="Динамика среднего разряда, чел.">' +
                 '                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
                 '                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
                 '                                                        </svg>' +
                 '                                                    </button>' +
                 '                                                    <strong class="tiles__wrapper__tile_values">'+incoming_data[0].fact+'<span class="smal_val">%</span></strong>' +
                 '                                                </div>' +
                 '                                            </div>' +
                 '                                        </div>' +
                 '                                        <div class="tiles__wrapper__tile_footer">' +
                 '                                            <div class="tiles__wrapper__arrows">' +
                 '                                                <span class="'+incoming_data[0].color1+'"><span>'+incoming_data[0].proc1+incoming_data[0].mera+' к плану.</span></span>' +
                 '                                            </div>' +
                 '                                        </div>' +
                 '                                    </div>'
             });*/


        }catch(e){
            globals.renderComponent (globalSettings, {
                tag : "div",
                className : ["tiles__wrapper__item", "item_4"],
                html:
                '<div class="tiles__wrapper__tile i_err_404">' +
                '   <span>Нет данных...</span>' +
                '</div>'
            });
            console.warn(e);
        }
    }


}