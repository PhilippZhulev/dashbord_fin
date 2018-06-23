function Pa_tile () {
    this.reDraw = function() {
        try {
        this.refresh();

        var globalSettings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        
        globals.alloc2TableElms = [
            {
                parent: "Бизнес функция",
                proc: "",
                abs: "",
                children: [
                    {
                        name: "CIB",
                        proc: "0,3",
                        abs: "0,1"
                    },
                    {
                        name: "КБ",
                        proc: "3",
                        abs: "1,3"
                    },
                    {
                        name: "РБ",
                        proc: "97",
                        abs: "49,1"
                    },
                    {
                        name: "SBI",
                        proc: "-",
                        abs: "-"
                    },
                    {
                        name: "Цифровой бизнес",
                        proc: "-",
                        abs: "-"
                    },
                    {
                        name: "ДРПА",
                        proc: "-",
                        abs: "-"
                    },
                    {
                        name: "ЦУНДО",
                        proc: "-",
                        abs: "-"
                    },
                    {
                        name: "Недвижимость",
                        proc: "-",
                        abs: "-"
                    }
                ]
            },
            {
                parent: "Прочее",
                proc: "-",
                abs: "-",
                children: []
            }
        ];

        

        function collapseElements2(Arr) {

            var element = "",
                childrenFunc = "",
                notChild = "";

            function childs (childArr) {
                var child = "";
                for(var ic = 0; ic < childArr.length; ic++) {
                    child +=
                        '<div class="row">' +
                        '   <div class="col-8">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].name +'</span>' +
                        '   </div>' +
                        '   <div class="col-4">' +
                        '       <div class="row" style="text-align: right">' +
                        '       <div class="col-6">' +
                        '           <span class="collapse__table__title">'+ childArr[ic].proc +'</span>' +
                        '       </div>' +
                        '       <div class="col-6">' +
                        '           <span class="collapse__table__title">'+ childArr[ic].abs +'</span>' +
                        '       </div>' +
                        '       </div>' +
                        '   </div>' +
                        '</div>';
                }
                return child;
            }

            for(var inc = 0; inc < Arr.length; inc++) {
                if(Arr[inc].children === null) {
                    childrenFunc = "";
                    notChild = "hidden";
                }else {
                    childrenFunc = childs (Arr[inc].children);
                }
                element +=
                    '<div class="collapse_title">' +
                    '      <div class="row">' +
                    '           <div class="col-8">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].parent +'</span>' +
                    '           </div>' +
                    '           <div class="col-4">' +
                    '               <div class="row"  style="text-align: right">' +
                        '               <div class="col-6">' +
                        '                   <span class="collapse__table__title">'+ Arr[inc].proc +'</span>' +
                        '               </div>' +
                        '               <div class="col-6">' +
                        '                   <span class="collapse__table__title">'+ Arr[inc].abs +'</span>' +
                        '               </div>' +
                    '               </div>' +
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
            className : ["tiles__wrapper__item", "item_2"],
            html:
'                          <div class="tiles__wrapper__tile">' +
'                                    <div class="container">' +
'                                        <div class="row">' +
'                                            <div class="col-12">' +
'                                                <span class="tiles__wrapper__tile_title">Аллокация по центрам прибыли<span>млрд. руб</span></span>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                            <div class="tables__block tables__block_2 active">' +
'                                <div class="tiles__wrapper__tile">' +
'                                    <div class="collapse__table border_bt">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-8"></div>' +
'                                                <div class="col-4">' +
    '                                                <div class="row" style="text-align: right">' +
    '                                                   <div class="col-6">' +
    '                                                       <span class="collapse__table__title">%</span>' +
    '                                                   </div>' +
    '                                                   <div class="col-6">' +
    '                                                       <span class="collapse__table__title">млрд. р.</span>' +
    '                                                   </div>' +
'                                                   </div>' +
'                                             </div>' +
'                                        </div>' +
'                                    </div>' +
'                                    <div class="border_bt_table_1"></div>' +
'                                    <div class="collapse__table">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-4">' +
'                                                    <span class="collapse__table__title">Итого</span>' +
'                                                </div>' +
'                                                <div class="col-8">' +
'                                                   <div class="row" style="text-align: right">' +
'                                                   <div class="col-6">' +
'                                                   </div>' +
'                                                   <div class="col-6">' +
'                                                       <span class="collapse__table__title">50,5</span>' +
'                                                   </div>' +
'                                               </div>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                    <div class="collapse__table">' +
'                                        <div class="container">' +
'                                            <div class="collapse_wrap arr_collpse_2 scroller_al">' +
                                                    collapseElements2(globals.alloc2TableElms) +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                  </div>'
        });


        globals.Collapse(".arr_collpse_2 .collapse_title", {open: true});
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
