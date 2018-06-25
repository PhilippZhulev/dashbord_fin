function Prb_tile () {
    this.reDraw = function() {
        try {
        this.refresh();

        var globalSettings = this.globalSettings;
            console.warn("prb")

            //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.prbTableElms = [
            {
                parent: "Бизнес функция",
                fact: "74.5",
                plan: "-5.1%",
                fact_proc: "5.4%",
                children: [
                    {
                        name: "CIB",
                        fact: "2.2",
                        plan: "-10.7%",
                        fact_proc: "4.2%"
                    },
                    {
                        name: "КБ",
                        fact: "11.1",
                        plan: "-4.1%",
                        fact_proc: "11.5%"
                    },
                    {
                        name: "РБ",
                        fact: "50.5",
                        plan: "-4.4%",
                        fact_proc: "4.2%"
                    },
					{
                        name: "SBI",
                        fact: "0.2",
                        plan: "-38.8%",
                        fact_proc: "18.4%"
                    }
					,
					{
                        name: "Цифровой бизнес",
                        fact: "0.1",
                        plan: "-12.0%",
                        fact_proc: "28.6%"
                    },
					{
                        name: "ДРПА",
                        fact: "2.5",
                        plan: "-9.3%",
                        fact_proc: "-3.5%"
                    },
					{
                        name: "ЦУНДО",
                        fact: "12.9",
                        plan: "-2.2%",
                        fact_proc: "-2.2%"
                    },
					{
                        name: "Недвижимость",
                        fact: "15.0",
                        plan: "-2.0%",
                        fact_proc: "3.6%"
                    },
					{
                        name: "УБ",
                        fact: "0.6",
                        plan: "-4.3%",
                        fact_proc: "-3.8%"
                    },
                    {
                        name: "Внут. плата",
                        fact: "-20.7",
                        plan: "-0.3%",
                        fact_proc: "-1.9%"
                    }
                ]
            },
            {
                parent: "Обеспечивающая функция",
                fact: "32.3",
                plan: "-12.6%",
                fact_proc: "4.5%",
                children: [
                    {
                        name: "Блок Т",
                        fact: "19.6",
                        plan: "-10.2%",
                        fact_proc: "3.6%"
                    },
                    {
                        name: "Блок С",
                        fact: "7.7",
                        plan: "-16.8%",
                        fact_proc: "-2.5%"
                    },
                    {
                        name: "Блок Риски",
                        fact: "2.8",
                        plan: "0.6%",
                        fact_proc: "16.8%"
                    },
					{
                        name: "Блок HR",
                        fact: "2.1",
                        plan: "-28.6%",
                        fact_proc: "3.8%"
                    }
                ]
            },
			{
                parent: "Корпоративный центр",
                fact: "14.3",
                plan: "16.8%",
                fact_proc: "19.9%",
				children: null
			},
			{
                parent: "Дочернии компании",
                fact: "31.9",
                plan: "-13.0%",
                fact_proc: "-0.4%",
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
//'                                                <button type="button" class="btn btn-outline-info btn-abc btn-sm">ABC -> %</button>' +
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
'                                                    <span class="collapse__table__title">-6.9%</span>' +
'                                                </div>' +
'                                                <div class="col-2">' +
'                                                    <span class="collapse__table__title">5.2%</span>' +
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
