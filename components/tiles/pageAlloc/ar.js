function Ar_tile () {
    this.reDraw = function(a) {
        console.warn("ar_chart");
        try {
        this.refresh();
        var incoming_data =  window.data.alloc_zatrat
      
        ;//this.globalSettings[a[0]];
        var globalSettings = this.globalSettings;


            var screen_data=[];

        for(var i=0;i<incoming_data.length;i++)
        {
            var obj={};
            obj.screen=incoming_data[i].screen;
            obj.tile=incoming_data[i].tile;
            obj.block=incoming_data[i].block;
            obj.category=incoming_data[i].category;
            obj.fact=incoming_data[i].fact;
            obj.plan=incoming_data[i].plan;
            obj.fact_prev=incoming_data[i].fact_prev;
            obj.mera=incoming_data[i].mera;
            obj.color1=incoming_data[i].color1;
            obj.proc1=incoming_data[i].proc1;
            obj.text1=incoming_data[i].text1;
            obj.color2=incoming_data[i].color2;
            obj.proc2=incoming_data[i].proc2;
            obj.text2=incoming_data[i].text2;
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
                obj.plan=screen_data[i].plan;
                obj.fact=screen_data[i].fact;
                obj.fact_prev=screen_data[i].fact_prev;
                obj.addClass=screen_data[i].addClass;
                parent_prev = JSON.parse(JSON.stringify(obj));
                parent_assigned = true;
            }else{
                obj.name=screen_data[i].category;
                obj.plan=screen_data[i].plan;
                obj.fact=screen_data[i].fact;
                obj.fact_prev=screen_data[i].fact_prev;
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
        globals.kroTableElms = JSON.parse(JSON.stringify(table_tmp));
        //console.log(JSON.stringify(table_tmp));

        /*globals.kroTableElms = [
            {
                parent: "Прямые расходы",
                fact: "121.2",
                plan: "-8.6",
                fact_proc: "6.6",
                children: [
                    {
                        name: "Персонал",
                        fact: "84,7",
                        plan: "+0,2%",
                        fact_proc: "+0,3%",
                        addclass: "staff_click",
                        link: true
                    },
                    {
                        name: "Недвижимость",
                        fact: "11,2",
                        plan: "-1,1%",
                        fact_proc: "-9,0%",
                        addclass: "prop_click",
                        link: true
                    },
                    {
                        name: "ИТ",
                        fact: "10,4",
                        plan: "-2,0%",
                        fact_proc: "-16,2%"
                    },
					{
                        name: "Бизнес-расходы",
                        fact: "5,1",
                        plan: "-1,6%",
                        fact_proc: "-23,7%"
                    },
					{
                        name: "Налоги",
                        fact: "3,7",
                        plan: "-0,6%",
                        fact_proc: "-13,2%"
                    },
					{
                        name: "Благотворительность",
                        fact: "0,9",
                        plan: "-0,5%",
                        fact_proc: "-35,7%"
                    },
					{
                        name: "Транспорт",
                        fact: "0,5",
                        plan: "-0,2%",
                        fact_proc: "-28,6%"
                    },
					{
                        name: "Маркетинг",
                        fact: "0,4",
                        plan: "-0,2%",
                        fact_proc: "-36,4%"
                    },
					{
                        name: "Прочие",
                        fact: "3,84",
                        plan: "-5,2%",
                        fact_proc: "-25,0%"
                    }
                ]
            }
        ];*/

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
                    '       <span class="collapse__table__title">'+ childArr[ic].fact +'</span>' +
                    '   </div>' +
                    '   <div class="col-2">' +
                    '       <span class="collapse__table__title">'+ childArr[ic].plan +'</span>' +
                    '   </div>' +
                    '   <div class="col-2">' +
                    '       <span class="collapse__table__title">'+ childArr[ic].fact_prev +'</span>' +
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
                '               <span class="collapse__table__title">'+ Arr[inc].fact +'</span>' +
                '           </div>' +
                '           <div class="col-2">' +
                '               <span class="collapse__table__title">'+ Arr[inc].plan +'</span>' +
                '           </div>' +
                '           <div class="col-2">' +
                '               <span class="collapse__table__title">'+ Arr[inc].fact_prev +'</span>' +
                '           </div>' +
                '       </div>' +
                '</div>' +
                '<div class="collapse_container">' +
                    childs (Arr[inc].children) +
                '</div>';
            }
            return element;
        }


        globals.renderComponent(globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_1"],
            html:
'                                <div class="tiles__wrapper__tile">' +
'                                    <div class="container">' +
'                                        <div class="row">' +
'                                            <div class="col-12">' +
'                                                <span class="tiles__wrapper__tile_title">Аллокация центрам прибыли<span>млрд. руб</span></span>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                    <div class="collapse__table border_bt">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-6">' +
'                                                </div>' +
'                                                <div class="col-2">' +
'                                                    <span class="collapse__table__title">1-Заголовок</span>' +
'                                                </div>' +
'                                                <div class="col-2">' +
'                                                    <span class="collapse__table__title">2-Заголовок</span>' +
'                                                </div>' +
'                                                <div class="col-2">' +
'                                                    <span class="collapse__table__title">3-Заголовок</span>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                     <div class="border_bt_table_1"></div>' +
'                                    </div>' +
'                                    <div class="collapse__table">' +
'                                        <div class="container">' +
'                                            <div class="collapse_wrap kro_collpse">' +
                                                collapseElements(globals.kroTableElms) +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                </div>'
        });



        globals.Collapse(".kro_collpse .kro_collapse_t", {open: true});

    }catch(e){
            globals.renderComponent (globalSettings, {
                tag : "div",
                className : ["tiles__wrapper__item", "item_1"],
                html:
                '<div class="tiles__wrapper__tile i_err_404">' +
                '   <span>Нет данных...</span>' +
                '</div>'
            });
            console.warn(e);
    }




    }
}
