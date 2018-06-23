function Ar_tile () {
    this.reDraw = function() {
        try {
        this.refresh();

        var globalSettings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.alloc1TableElms = [
            {
                parent: "Бизнес функция",
                fact_curr: "",
                fact_prev_abs: "",
                fact_prev_proc: "",
                plan_curr_abs: "",
                plan_curr_perc: "",
                children: [
                    {
                        name: "CIB",
                        fact_curr: "10,9",
                        fact_prev_abs: "+0,3",
                        fact_prev_proc: "+3%",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
                    {
                        name: "КБ",
                        fact_curr: "23,9",
                        fact_prev_abs: "+2,2",
                        fact_prev_proc: "+10%",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
                    {
                        name: "РБ",
                        fact_curr: "85,6",
                        fact_prev_abs: "+4,3",
                        fact_prev_proc: "+5%",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
					{
                        name: "SBI",
                        fact_curr: "20,2",
                        fact_prev_abs: "+0,8",
                        fact_prev_proc: "+4%",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
					{
                        name: "Цифровой бизнес",
                        fact_curr: "1,3",
                        fact_prev_abs: "+1,1",
                        fact_prev_proc: "420%",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
					{
                        name: "ДРПА",
                        fact_curr: "6,4",
                        fact_prev_abs: "-0,3",
                        fact_prev_proc: "-5%",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
					{
                        name: "ЦУНДО",
                        fact_curr: "4,4",
                        fact_prev_abs: "-1,5",
                        fact_prev_proc: "-12%",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
					{
                        name: "Недвижимость",
                        fact_curr: "-1,1",
                        fact_prev_abs: "+0,8",
                        fact_prev_proc: "-42%",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
					{
                        name: "УБ",
                        fact_curr: "X",
                        fact_prev_abs: "X",
                        fact_prev_proc: "X",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    }
                ]
            },
            {
                parent: "Обеспечивающая функция",
                fact_curr: "",
                fact_prev_abs: "",
                fact_prev_proc: "",
				plan_curr_abs: "",
				plan_curr_perc: "",
                children: [
                    {
                        name: "Блок Т",
                        fact_curr: "Х",
                        fact_prev_abs: "Х",
                        fact_prev_proc: "Х",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
                    {
                        name: "Блок С",
                        fact_curr: "Х",
                        fact_prev_abs: "Х",
                        fact_prev_proc: "Х",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
                    {
                        name: "Блок Риски",
                        fact_curr: "Х",
                        fact_prev_abs: "Х",
                        fact_prev_proc: "Х",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    },
					{
                        name: "Блок HR",
                        fact_curr: "Х",
                        fact_prev_abs: "Х",
                        fact_prev_proc: "Х",
						plan_curr_abs: "X",
						plan_curr_perc: "X"
                    }
                ]
            },
			{
                parent: "Корпоративный центр",
                fact_curr: "Х",
                fact_prev_abs: "Х",
                fact_prev_proc: "Х",
				plan_curr_abs: "X",
				plan_curr_perc: "X",
				children:  null
			},
			{
                parent: "Дочерние компании",
                fact_curr: "Х",
                fact_prev_abs: "Х",
                fact_prev_proc: "Х",
				plan_curr_abs: "X",
				plan_curr_perc: "X",
				children: null
			}
        ];
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

        //создать пункты
        function collapseElements(Arr) {

            var element = "",
                childrenFunc = "",
                notChild = "";

            function childs (childArr) {
                var child = "";
                for(var ic = 0; ic < childArr.length; ic++) {
                    child +=
                        '<div class="row">' +
                        '   <div class="col-5">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].name +'</span>' +
                        '   </div>' +
                        '   <div class="col-7">' +
                        '       <div class="row" style="text-align: right">' +
                            '       <div class="col-3">' +
                            '           <span class="collapse__table__title">'+ childArr[ic].fact_curr +'</span>' +
                            '       </div>' +
                            '       <div class="col-3">' +
                            '           <span class="collapse__table__title">'+ childArr[ic].fact_prev_abs +'</span>' +
                            '       </div>' +
                            '       <div class="col-2">' +
                            '           <span class="collapse__table__title">'+ childArr[ic].fact_prev_proc +'</span>' +
                            '       </div>' +
                            '       <div class="col-2">' +
                            '           <span class="collapse__table__title">'+ childArr[ic].plan_curr_abs +'</span>' +
                            '       </div>' +
                            '       <div class="col-2">' +
                            '           <span class="collapse__table__title">'+ childArr[ic].plan_curr_perc +'</span>' +
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
                    '           <div class="col-5">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].parent +'</span>' +
                    '           </div>' +
                    '           <div class="col-7">' +
                    '               <div class="row"  style="text-align: right">' +
                        '               <div class="col-3">' +
                        '                   <span class="collapse__table__title">'+ Arr[inc].fact_curr +'</span>' +
                        '               </div>' +
                        '               <div class="col-3">' +
                        '                   <span class="collapse__table__title">'+ Arr[inc].fact_prev_abs +'</span>' +
                        '               </div>' +
                        '               <div class="col-2">' +
                        '                   <span class="collapse__table__title">'+ Arr[inc].fact_prev_proc +'</span>' +
                        '               </div>' +
                        '               <div class="col-2">' +
                        '                   <span class="collapse__table__title">'+ Arr[inc].plan_curr_abs +'</span>' +
                        '               </div>' +
                        '               <div class="col-2">' +
                        '                   <span class="collapse__table__title">'+ Arr[inc].plan_curr_perc +'</span>' +
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
'                                                <span class="tiles__wrapper__tile_title">Аллоцированные расходы<span>млрд. руб</span></span><div class="scroll_hint" style="left:235px!important;"></div>' +
'                                                <button type="button" class="btn btn-outline-info btn-abc btn-sm btn_nbsb btn_ararar">На блок/ С блока</button>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                            <div class="tables__block tables__block_1 active">' +
'                                    <div class="collapse__table border_bt">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-5">' +
'                                                </div>' +
'                                                <div class="col-7">' +
'                                                   <div class="row" style="text-align: right">' +
        '                                                <div class="col-3">' +
        '                                                    <span class="collapse__table__title">Факт \'18</span>' +
        '                                                </div>' +
        '                                                <div class="col-3">' +
        '                                                    <span class="collapse__table__title">Факт \'17</span>' +
        '                                                </div>' +
        '                                                <div class="col-2">' +
        '                                                </div>' +
        '                                                <div class="col-2">' +
        '                                                    <span class="collapse__table__title">План \'18</span>' +
        '                                                </div>' +
        '                                                <div class="col-2">' +
        '                                                </div>' +
'                                                   </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                    <div class="border_bt_table_1"></div>' +
'                                    <div class="collapse__table">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-5">' +
'                                                    <span class="collapse__table__title">Итого</span>' +
'                                                </div>' +
'                                                <div class="col-7">' +
'                                                   <div class="row" style="text-align: right">' +
    '                                                   <div class="col-3">' +
    '                                                       <span class="collapse__table__title">153,0</span>' +
    '                                                   </div>' +
    '                                                   <div class="col-3">' +
    '                                                       <span class="collapse__table__title">+7,5</span>' +
    '                                                   </div>' +
    '                                                   <div class="col-2">' +
    '                                                       <span class="collapse__table__title">+5,0%</span>' +
    '                                                   </div>' +
    '                                                   <div class="col-2">' +
    '                                                       <span class="collapse__table__title">X</span>' +
    '                                                   </div>' +
    '                                                   <div class="col-2">' +
    '                                                       <span class="collapse__table__title">X</span>' +
    '                                                   </div>' +
'                                                   </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                    <div class="collapse__table">' +
'                                        <div class="container">' +
'                                            <div class="collapse_wrap arr_collpse_1 scroller_al">' +
                                                    collapseElements(globals.alloc1TableElms) +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                  </div>' +
'                            <div class="tables__block tables__block_2">' +
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

        globals.chartSlideController({
            btnClass : "btn_nbsb",
            blockClass : ".tables__block"
        });
        globals.Collapse(".arr_collpse_1 .collapse_title", {open: true});
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
