function Header () {
    this.reDraw = function() {
        this.refresh();
        globals.obj = this;

        globals.settings = this.globalSettings;
        var globalSettings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.filterProp = {
            block : "Все",
            year : "2018",
            kv : "1-3 кв",
            fact : "Факт"
        };

        globals.filter = {
            block: [
                {text:"Все", key: "все"},
                {text:"КБ", key: "КБ"}
            ],
            year: [
                {text:"2018", key: "2018"},
                {text:"2017", key: "2017"}
            ],
            kv: [
                {text:"1 кв", key: "1"},
                {text:"1-2 кв", key: "2"},
                {text:"1-3 кв", key: "3"},
                {text:"1-4 кв", key: "4"}
            ],
            fact : [
                {text:"Факт", key: "Факт"},
                {text:"План", key: "План"},
                {text:"Прогноз", key: "Прогноз"}
            ]
        };

        document.addEventListener("dash.update", function(event) {
           // event.stopPropagation(); event.preventDefault();
            var back = document.querySelector(".back_btn"),
                home = document.querySelector(".home_btn");

                wrappers = document.querySelectorAll(".tiles__wrapper");

            if(globals.page !== ".p_main") {
                back.classList.add("active");
                home.classList.add("active");
            }
            else {
                back.classList.remove("active");
                home.classList.remove("active");
            }

            switch (globals.page) {
                case ".p_main" : globals.title = "Главный экран"; globals.title_group_bank = "Группа"; break;
                case ".p_chis" : globals.title = "Численность"; globals.title_group_bank = "Банк"; break;
                case ".p_opex_l2" : globals.title = "OPEX"; globals.title_group_bank = "Группа"; break;
                case ".p_opex" : globals.title = "Структура OPEX по функциям/блокам"; globals.title_group_bank = "Банк"; break;
                case ".p_staff" : globals.title = "Персонал"; globals.title_group_bank = "Банк"; break;
                case ".p_prop" : globals.title = "Недвижимость"; globals.title_group_bank = "Банк"; break;
                case ".p_allokaciya" : globals.title = "Аллокация"; globals.title_group_bank = "Группа"; break;
            }

            document.querySelector(".pages_title").innerHTML = globals.title;
            document.querySelector(".bank_group").innerHTML = globals.title_group_bank;

            globals.navigation({
                btn : ".home_btn",
                page : ".p_main",
                callback: function () {
                    globals.page = this.page;
                    globals.prevPage = [];
                }
            });

            globals.navigation({
                btn : ".back_btn",
                page : globals.prevPage[globals.prevPage.length - 1],
                callback: function () {
                    globals.prevPage = globals.prevPage.slice(0, -2);
                }
            });
            $(".custom_select__dropdown").removeClass("active");
        });


        //Функция формирования дропдаунов в селектах
        function generateDrops(prop) {
            var result;

            for(var i = 0; i < prop.elems.length; i++) {
                result += "<span data-item='"+ prop.elems[i].key +"'>" + prop.elems[i].text + "</span>"
            }

            return result.replace("undefined", "");
        }

        //
        function redrawFilters(prop, func) {
            return func.call(prop);
        }

        globals.renderComponent ({
            tag : "div",
            className : ["header"],
            html:
'            <div class="header_top_line">' +
'                  <div class="navigation_block">' +
'                    <div class="back_btn">'+
'                       <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">' +
'                           <path fill="#fff" d="M2.117 12l7.527 6.235-.644.765-9-7.521 9-7.479.645.764-7.529 6.236h21.884v1h-21.883z"/>' +
'                       </svg>' +
'                    </div>' +
'                    <div class="home_btn">'+
'                       <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd">' +
'                           <path fill="#fff" d="M22 11.414v12.586h-20v-12.586l-1.293 1.293-.707-.707 12-12 12 12-.707.707-1.293-1.293zm-6 11.586h5v-12.586l-9-9-9 9v12.586h5v-9h8v9zm-1-7.889h-6v7.778h6v-7.778z"/>' +
'                       </svg>' +
'                    </div>' +
'                  </div>'+
'                  <b class="pages_title">' +
                      globals.title +
'                  </b>' +
'            </div>'   +
'            <div class="container">' +
'                <div class="filters_block">' +
'                    <div class="filters_block__item">' +
'                        <span class="filters_block__title">Блок</span>' +
'                        <div class="filters_block__input">' +
'                            <div class="custom_select">' +
'                                <b data-target="block">'+ globals.filterProp.block +'</b>' +
'                                <div class="custom_select__dropdown" data-input="input_block">' +
                                    redrawFilters({
                                        elems: globals.filter.block
                                    }, function () {
                                        return generateDrops(this);
                                    }) +
'                                </div>' +
'                            </div>' +
'                        </div>' +
'                    </div>' +
'                    <div class="filters_block__item">' +
'                        <span class="filters_block__title">Период</span>' +
'                        <div class="filters_block__input">' +
'                            <div class="custom_select period">' +
'                                <b data-target="year">'+ globals.filterProp.year +'</b>' +
'                                <div class="custom_select__dropdown"  data-input="input_year">' +
                                    redrawFilters({
                                        elems: globals.filter.year
                                    }, function () {
                                        return generateDrops(this);
                                    }) +
'                                </div>' +
'                            </div>' +
'                            <div class="custom_select period">' +
'                                <b data-target="kv">'+ globals.filterProp.kv +'</b>' +
'                                <div class="custom_select__dropdown"  data-input="input_kv">' +
                                    redrawFilters({
                                        elems: globals.filter.kv
                                    }, function () {
                                        return generateDrops(this);
                                    }) +
'                                </div>' +
'                            </div>' +
'                            <div class="custom_select period">' +
'                                <b data-target="kv">'+ globals.filterProp.fact +'</b>' +
'                                <div class="custom_select__dropdown" data-input="input_fact">' +
                                    redrawFilters({
                                        elems: globals.filter.fact
                                    }, function () {
                                        return generateDrops(this);
                                    }) +
'                                </div>' +
'                            </div>' +
'                        </div>' +
'                        <span class="filters_block__title bank_group">'+globals.title_group_bank+'</span>' +
'                    </div>' +
'                </div>' +
'               <div style="display: none;" class="timer"></div> ' +
'               <input class="input_block" hidden type="text" value="все">' +
'               <input class="input_year"  hidden type="text" value="2018">' +
'               <input class="input_kv"    hidden type="text" value="1">' +
'               <input class="input_fact"  hidden type="text" value="Факт">' +
'            </div>'
        });

        function getInputParams(obj) {
            function getInputs(inputClass) {
                return document.querySelector(inputClass).value;
            }
            obj.Settings.filterStats = {
                block: getInputs(".input_block"),
                date: function() {
                    var y = getInputs(".input_year");
                    if(y === 2018) {
                        return 1 + y;
                    }else {
                        return getInputs(".input_kv") + y;
                    }
                }(),
                fact: getInputs(".input_fact"),
                page: globals.page
            }
        }
        getInputParams(globalSettings);

        var select = new globals.CustomSelect({
            class: ".custom_select",
            callback: function(el) {
                var target = el.getAttribute("data-target");
                switch (target) {
                    case "block" : globals.filterProp.block = el.textContent; break;
                    case "year": globals.filterProp.year = el.textContent; break;
                    case "kv": globals.filterProp.kv = el.textContent; break;
                    case "fact": globals.filterProp.fact = el.textContent; break;
                }

                getInputParams(globalSettings);
                globalSettings.that_c.firePropertiesChangedAndEvent(["SettingsTP"], "tech1");
                //console.log(globalSettings);
            }
        });

        // var i = 0;
        // function timer() {
        //     document.querySelector(".timer").innerHTML = i++;
        //     document.querySelector(".timer").style.width = (i++) + "px";
        //     document.querySelector(".timer").classList.add("active");
        // }
        // setInterval(timer, 1000);
    }
}
