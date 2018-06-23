function Krpn_tile () {
    this.reDraw = function() {
        try {
        this.refresh();
            var globalSettings = this.globalSettings;
        globals.settings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.krpnTableElms = [
            {
                parent: "Недвижимость",
                fact_curr: "11.2",
                fact_prev_abs: "-1.8%",
                fact_prev_proc: "-9%",
                children: [
                    {
                        name: "Амортизация недвижимости",
                        fact_curr: "2.5",
                        fact_prev_abs: "3.6%",
                        fact_prev_proc: "-2.4%"
                    },
                    {
                        name: "Аренда",
                        fact_curr: "5.2",
                        fact_prev_abs: "-1.9%",
                        fact_prev_proc: "-5.1%"
                    },
                    {
                        name: "Эксплуатация",
                        fact_curr: "3",
                        fact_prev_abs: "-4.4%",
                        fact_prev_proc: "-17.9%"
                    },
                    {
                        name: "Охрана",
                        fact_curr: "0.3",
                        fact_prev_abs: "-9.6%",
                        fact_prev_proc: "-12.4%"
                    },
                    {
                        name: "Прочие расходы на недвижимость",
                        fact_curr: "0.07",
                        fact_prev_abs: "-14.5%",
                        fact_prev_proc: "-43.5"
                    }
                ]
            }
        ];

        //создать пункты
        function collapseElements(Arr) {

            var element = "",
                childrenFunc = "",
                notChild = "",
                notBefore = "";

            function childs (childArr) {
                var child = "";
                for(var ic = 0; ic < childArr.length; ic++) {
                    child +=
                        '<div class="row">' +
                        '   <div class="col-6">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].name +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].fact_curr +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].fact_prev_abs +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].fact_prev_proc +'</span>' +
                        '   </div>' +
                        '</div>';
                }
                return child;
            }

            for(var inc = 0; inc < Arr.length; inc++) {
                if(Arr[inc].children === null) {
                    childrenFunc = "";
                    notChild = " hidden";
                    notBefore = " nobefore";
                }else {
                    childrenFunc = childs (Arr[inc].children);
                }
                element +=
                    '<div class="collapse_title'+ notBefore +'">' +
                    '      <div class="row">' +
                    '           <div class="col-6">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].parent +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].fact_curr +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].fact_prev_abs +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].fact_prev_proc +'</span>' +
                    '           </div>' +
                    '       </div>' +
                    '</div>' +
                    '<div class="collapse_container'+ notChild +'">' +
                    childrenFunc +
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
            '                                                <span class="tiles__wrapper__tile_title">Категории расходов по недвижимости<span>млрд. руб</span></span>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                    <div class="collapse__table border_bt">' +
            '                                        <div class="container">' +
            '                                            <div class="row">' +
            '                                                <div class="col-6">' +
            '                                                </div>' +
            '                                                <div class="col-2">' +
            '                                                    <span class="collapse__table__title">Факт \'18</span>' +
            '                                                </div>' +
            '                                                <div class="col-2">' +
            '                                                    <span class="collapse__table__title">Факт \'17</span>' +
            '                                                </div>' +
            '                                                <div class="col-2">' +
            '                                                    <span class="collapse__table__title">План \'18</span>' +
            '                                                </div>' +
            '                                            <div class="border_bt_table_1"></div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                    <div class="collapse__table"  id="wrapper_5">' +
            '                                        <div class="container" style="padding-bottom: 10px">' +
            '                                            <div class="collapse_wrap kro_collpse">' +
                                                            collapseElements(globals.krpnTableElms) +
            '                                            </div>' +
            '                                        </div>' +
            '                                    </div>' +
            '                                </div>'
        });


        new iScroll('wrapper_5',{
            snap: true,
            momentum: false,
            hScrollbar: false,
            vScrollbar: false
        });

        globals.Collapse(".kro_collpse .collapse_title", {open: true});
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
