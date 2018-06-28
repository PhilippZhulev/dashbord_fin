function Krnp_tile () {
    this.reDraw = function(a) {
        console.warn("krnp")
        try {
            this.refresh();
            var incoming_data =  window.data.krnp;//this.globalSettings[a[0]];
            var globalSettings = this.globalSettings;

            var param= this.globalSettings.Settings.param.split("!!!");

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
                var ny="Факт \'"+(y-1);//Факт 17
            }
            if((param[1]=='42018')&&(param[0]=='План')){
                var cy="Прогноз";//Прогноз
                var ny="План \'"+y;//План 18
            }


            var screen_data=[];

            for(var i=0;i<incoming_data.length;i++)
            {
                var obj={};
                obj.tile=incoming_data[i].tile;
                obj.block=incoming_data[i].block;
                obj.category=incoming_data[i].category;
                obj.data1=incoming_data[i].data1;
                obj.data2=incoming_data[i].data2;
                obj.data3=incoming_data[i].data3;
                obj.isParent=incoming_data[i].isParent;
                obj.addClass=incoming_data[i].addClass;
                screen_data.push(obj)
            }
            //var expData=JSON.parse("["+this.globalSettings.Settings.cir_data+"]");
            //console.log(this.globalSettings.Settings);
            var table_tmp = [];
            var child_tmp = [];
            var parent_prev = {};
            var parent_assigned = false;
            for (i=0;i<screen_data.length;i++){
                var obj={};
                //console.log("Here, boi "+i);
                if(screen_data[i].isParent=="parent"){
                    //console.log("New parent: "+screen_data[i].category+", now exist "+child_tmp.length+" children");
                    if(parent_assigned){
                        parent_prev.children=JSON.parse(JSON.stringify(child_tmp));
                        child_tmp=[];
                        table_tmp.push(JSON.parse(JSON.stringify(parent_prev)));
                        parent_prev = {};
                    }
                    obj.parent=screen_data[i].category;
                    obj.data1=screen_data[i].data1;
                    obj.data2=screen_data[i].data2;
                    obj.data3=screen_data[i].data3;
                    obj.addClass=screen_data[i].addClass;
                    parent_prev = JSON.parse(JSON.stringify(obj));
                    parent_assigned = true;
                }else{
                    obj.name=screen_data[i].category;
                    obj.data1=screen_data[i].data1;
                    obj.data2=screen_data[i].data2;
                    obj.data3=screen_data[i].data3;
                    if(screen_data[i].addClass!=""){
                        obj.addclass=screen_data[i].addClass;
                        obj.link=true;
                    }
                    child_tmp.push(JSON.parse(JSON.stringify(obj)));
                }
            }
            parent_prev.children=JSON.parse(JSON.stringify(child_tmp));
            child_tmp=[];
            table_tmp.push(JSON.parse(JSON.stringify(parent_prev)));
            parent_prev = {};
            globals.krnpTableElms = JSON.parse(JSON.stringify(table_tmp));


            //создать пункты
            function collapseElements(Arr) {

                var element = "";

                function childs (childArr) {
                    var child = "",
                        className,
                        classLink;
                    for(var ic = 0; ic < childArr.length; ic++) {
                        if(childArr[ic].addclass !== undefined) {
                            className = " " + childArr[ic].addclass;
                        }else {
                            className = "";
                        }

                        if(childArr[ic].link === true) {
                            classLink = " " + "this_link";
                        }else {
                            classLink = "";
                        }

                        child +=
                            '<div class="row'+ className +'">' +
                            '   <div class="col-6">' +
                            '       <span class="collapse__table__title' + classLink + '">'+ childArr[ic].name +'</span>' +
                            '   </div>' +
                            '   <div class="col-2">' +
                            '       <span class="collapse__table__title">'+ childArr[ic].data1 +'</span>' +
                            '   </div>' +
                            '   <div class="col-2">' +
                            '       <span class="collapse__table__title">'+ childArr[ic].data2 +'</span>' +
                            '   </div>' +
                            '   <div class="col-2">' +
                            '       <span class="collapse__table__title">'+ childArr[ic].data3 +'</span>' +
                            '   </div>' +
                            '</div>';
                    }
                    return child;
                }

                for(var inc = 0; inc < Arr.length; inc++) {
                    tmp = "";
                    if(Arr[inc].addClass!=""){
                        tmp=" this_link";
                    }
                    element +=
                        '<div class="collapse_title kro_collapse_t">' +
                        '      <div class="row '+Arr[inc].addClass+'">' +
                        '           <div class="col-6">' +
                        '               <span class="collapse__table__title'+tmp+'">'+ Arr[inc].parent +'</span>' +
                        '           </div>' +
                        '           <div class="col-2">' +
                        '               <span class="collapse__table__title">'+ Arr[inc].data1 +'</span>' +
                        '           </div>' +
                        '           <div class="col-2">' +
                        '               <span class="collapse__table__title">'+ Arr[inc].data2 +'</span>' +
                        '           </div>' +
                        '           <div class="col-2">' +
                        '               <span class="collapse__table__title">'+ Arr[inc].data3 +'</span>' +
                        '           </div>' +
                        '       </div>' +
                        '</div>' +
                        '<div class="collapse_container">' +
                        childs (Arr[inc].children) +
                        '</div>';
                }
                return element;
            }


            globals.renderComponent (globalSettings,{
            tag : "div",
            className : ["tiles__wrapper__item", "item_2", "ind_table"],
            html:
            '                                <div class="tiles__wrapper__tile">' +
            '                                    <div class="container">' +
            '                                        <div class="row">' +
            '                                            <div class="col-12">' +
            '                                                <span class="tiles__wrapper__tile_title">Категории расходов на персонал<span>млрд. руб</span></span><div class="scroll_hint"></div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                    <div class="collapse__table border_bt">' +
            '                                        <div class="container">' +
            '                                            <div class="row">' +
            '                                                <div class="col-6">' +
            '                                                </div>' +
            '                                                <div class="col-2">' +
            '                                                    <span class="collapse__table__title">'+cy+'</span>' +
            '                                                </div>' +
            '                                                <div class="col-2">' +
            '                                                    <span class="collapse__table__title">'+ny+'</span>' +
            '                                                </div>' +
            '                                                <div class="col-2">' +
            '                                                    <span class="collapse__table__title">Откл-е</span>' +
            '                                                </div>' +
            '                                            <div class="border_bt_table_1"></div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                    <div class="collapse__table scroller" id="wrapper_4">' +
            '                                        <div class="container" style="padding-bottom: 4px;">' +
            '                                            <div class="collapse_wrap krnp_collpse">' +
                                                            collapseElements(globals.krnpTableElms) +
            '                                            </div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                </div>'
        });
        new iScroll('wrapper_4',{
            snap: true,
            momentum: false,
            hScrollbar: false,
            vScrollbar: false
        });

        globals.Collapse(".krnp_collpse .collapse_title", {open: true});
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
    }
}
