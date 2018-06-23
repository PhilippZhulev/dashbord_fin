function Krnp_tile () {
    this.reDraw = function() {
        try {
        this.refresh();
            var globalSettings=this.globalSettings;
        globals.settings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.krnpTableElms = [
            {
                parent: "Персонал",
                fact_curr: "84.7",
                fact_prev_abs: "+10%",
                fact_prev_proc: "+0.3%",
                children: null
            },
            {
                parent: "Расходы на персонал",
                fact_curr: "81.7",
                fact_prev_abs: "+8,7%",
                fact_prev_proc: "1.7%",
                children: [
                    {
                        name: "Статья 1",
                        fact_curr: "...",
                        fact_prev_abs: "...",
                        fact_prev_proc: "..."
                    },
                    {
                        name: "Статья 2",
                        fact_curr: "...",
                        fact_prev_abs: "...",
                        fact_prev_proc: "..."
                    }
                ]
            },
			{
                parent: "Зарплата и премия",
                fact_curr: "44.8",
                fact_prev_abs: "+2.7%",
                fact_prev_proc: "+0.5%",
                children: null
            },
			{
                parent: "Налоги на зарплату",
                fact_curr: "18.4",
                fact_prev_abs: "+7.3%",
                fact_prev_proc: "+22.1%",
                children: null
            },
			{
                parent: "Резервы на вознаграждения за год",
                fact_curr: "8.9",
                fact_prev_abs: "+23.9%",
                fact_prev_proc: "-30.5%",
                children: null
            },
			{
                parent: "Долгосрочные обязательства Risk-takers",
                fact_curr: "2.0",
                fact_prev_abs: "н/д",
                fact_prev_proc: "н/д",
                children: null
            },
			{
                parent: "Резервы на квартальное премирование",
                fact_curr: "7.7",
                fact_prev_abs: "+5.5%",
                fact_prev_proc: "-3.8%",
                children: null
            },
			{
                parent: "Расходы социального характера",
                fact_curr: "3.0",
                fact_prev_abs: "+81.1%",
                fact_prev_proc: "-26.8%",
                children: null
            },
            {
                parent: "Выплаты при увольнении сотрудников",
                fact_curr: "0.6",
                fact_prev_abs: "+3.8%",
                fact_prev_proc: "-38.1%",
                children: null
            },
            {
                parent: "ДМС",
                fact_curr: "0.7",
                fact_prev_abs: "+7.3%",
                fact_prev_proc: "-17.7%",
                children: null
            },
            {
                parent: "Единовременные премии",
                fact_curr: "0.4",
                fact_prev_abs: "+70.5%",
                fact_prev_proc: "-77.3%",
                children: null
            },
            {
                parent: "Материальная помощь",
                fact_curr: "0.5",
                fact_prev_abs: "+189.1%",
                fact_prev_proc: "+10.1%",
                children: null
            },
            {
                parent: "Соц. программа пенсионерам",
                fact_curr: "0.8",
                fact_prev_abs: "н/д",
                fact_prev_proc: "+294.9%",
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
