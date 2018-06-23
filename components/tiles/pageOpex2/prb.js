function Prb_tile () {
    this.reDraw = function() {
        try {
        this.refresh();

        var globalSettings = this.globalSettings;
            console.warn("222222222222222")

            //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.prbTableElms = [
            {
                parent: "Бизнес функция",
                fact: "74,5",
                plan: "3,8%",
                fact_proc: "5,0%",
                children: [
                    {
                        name: "CIB",
                        fact: "2,2",
                        plan: "0,1%",
                        fact_proc: "4,0%"
                    },
                    {
                        name: "КБ",
                        fact: "11,1",
                        plan: "1,1%",
                        fact_proc: "12,0%"
                    },
                    {
                        name: "РБ",
                        fact: "50,5",
                        plan: "2,1%",
                        fact_proc: "4,0%"
                    },
					{
                        name: "SBI",
                        fact: "0,2",
                        plan: "0,0%",
                        fact_proc: "18,0%"
                    }
					,
					{
                        name: "Цифровой бизнес",
                        fact: "0,1",
                        plan: "0,0%",
                        fact_proc: "29,0%"
                    },
					{
                        name: "ДРПА",
                        fact: "2,5",
                        plan: "-0,1%",
                        fact_proc: "-4,0%"
                    },
					{
                        name: "ЦУНДО",
                        fact: "12,9",
                        plan: "-0,3%",
                        fact_proc: "-2,0%"
                    },
					{
                        name: "Недвижимость",
                        fact: "15",
                        plan: "0,5%",
                        fact_proc: "4,0%"
                    },
					{
                        name: "УБ",
                        fact: "0,6",
                        plan: "0,0%",
                        fact_proc: "-4,0%"
                    }
                ]
            },
            {
                parent: "Обеспечивающая функция",
                fact: "32,3",
                plan: "1,4%",
                fact_proc: "5,0%",
                children: [
                    {
                        name: "Блок Т",
                        fact: "19,6",
                        plan: "0,7%",
                        fact_proc: "4,0%"
                    },
                    {
                        name: "Блок С",
                        fact: "7,7",
                        plan: "-20,0%",
                        fact_proc: "-2,0%"
                    },
                    {
                        name: "Блок Риски",
                        fact: "2,8%",
                        plan: "0,4%",
                        fact_proc: "17,0%"
                    },
					{
                        name: "Блок HR",
                        fact: "2,1",
                        plan: "0,5%",
                        fact_proc: "31,0%"
                    }
                ]
            },
			{
                parent: "Корпоративный центр",
                fact: "14,3",
                plan: "2,4%",
                fact_proc: "20,0%",
				children: null
			},
			{
                parent: "Дочернии компании",
                fact: "31,9",
                plan: "-10,0%",
                fact_proc: "0,0%",
				children: null
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
                    '       <span class="collapse__table__title">'+ childArr[ic].fact +'</span>' +
                    '   </div>' +
                    '   <div class="col-2">' +
                    '       <span class="collapse__table__title">'+ childArr[ic].plan +'</span>' +
                    '   </div>' +
                    '   <div class="col-2">' +
                    '       <span class="collapse__table__title">'+ childArr[ic].fact_proc +'</span>' +
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
                '               <span class="collapse__table__title">'+ Arr[inc].fact +'</span>' +
                '           </div>' +
                '           <div class="col-2">' +
                '               <span class="collapse__table__title">'+ Arr[inc].plan +'</span>' +
                '           </div>' +
                '           <div class="col-2">' +
                '               <span class="collapse__table__title">'+ Arr[inc].fact_proc +'</span>' +
                '           </div>' +
                '       </div>' +
                '</div>' +
                '<div class="collapse_container'+ notChild +'">' +
                    childrenFunc +
                '</div>';
            }
            return element;
        }


        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_1"],
            html:
'                                <div class="tiles__wrapper__tile">' +
'                                    <div class="container">' +
'                                        <div class="row">' +
'                                            <div class="col-12">' +
'                                                <span class="tiles__wrapper__tile_title">Прямые расходы блоков<span>млрд. руб</span></span>' +
'                                                <button type="button" class="btn btn-outline-info btn-abc btn-sm">ABC -> %</button>' +
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
'                                                    <span class="collapse__table__title">План \'18</span>' +
'                                                </div>' +
'                                                <div class="col-2">' +
'                                                    <span class="collapse__table__title">Факт \'17</span>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                    <div class="collapse__table">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-6">' +
'                                                    <span class="collapse__table__title">Итого</span>' +
'                                                </div>' +
'                                                <div class="col-2">' +
'                                                    <span class="collapse__table__title">153</span>' +
'                                                </div>' +
'                                                <div class="col-2">' +
'                                                    <span class="collapse__table__title">7,5</span>' +
'                                                </div>' +
'                                                <div class="col-2">' +
'                                                    <span class="collapse__table__title">5,0%</span>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                    <div class="collapse__table">' +
'                                        <div class="container">' +
'                                            <div class="collapse_wrap prb_collapse">' +
                                                collapseElements(globals.prbTableElms) +
'                                            </div>' +
'                                        </div>' +
'                                    </div>' +
'                                </div>'
        });

        globals.Collapse(".prb_collapse .collapse_title", {open: true});
    }
    catch(e){
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
