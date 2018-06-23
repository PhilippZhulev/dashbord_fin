function Prop_pkz_tile () {
    this.reDraw = function() {
        this.refresh();

        var globalSettings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

 
        globals.renderComponent (globalSettings,{
            tag : "div",
            className : ["tiles__wrapper__item", "item_1"],
            html:
'                                  <div class="tiles__wrapper__tile">' +
'                                        <div class="container">' +
'                                            <div class="row">' +
'                                                <div class="col-12">' +
'                                                    <span class="tiles__wrapper__tile_title">Показатели эфф-ти</span><div class="scroll_hint"></div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                       <div class="scroll_block" style="height: 600px;">'+
'                                       <div class="swiper-container it_w sw_prop_pkz" id="wrapper_3" style="height: 100%;">'+
'                                       <div class="swiper-wrapper swiper-slide" style="height: auto; overflow-y: auto;">' +
'                                       <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Показатели эффективности</span>' +
            '                                            <div class="chart_element__chart" style="height: 62px;    width: calc(100% + 33px);margin-left: -13px;" id="eff_chart"></div>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                       <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Рост ставки эксплуатации vs инфляция за 2018</span>' +
'                                                        <strong class="tiles__wrapper__tile_values v_green">1.87' +
'                                                            <br>' +
'                                                            <span>тыс.руб/м2</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                       <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Исполнение плана<br>выбытия</span>' +
'                                                        <strong class="tiles__wrapper__tile_values v_green">14%' +
'                                                        </strong>' +
'                                                        <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="efv" data-title="Исполнение плана выбытия, млрд. руб" data-scroll="true">' +
'                                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
'                                                                <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
'                                                            </svg>' +
'                                                        </button>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="focus_block">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Портфель<br>недвижимости</span>' +
'                                                        <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="pnb" data-title="Портфель недвижимости Банка">' +
'                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
'                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
'                                                        </svg>' +
'                                                    </button>' +
'                                                        <strong class="tiles__wrapper__tile_values v_green">6159' +
'                                                            <br>' +
'                                                            <span>тыс. м2</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Эффект от выбытия</span>' +
'                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="efv" data-title="Эффект от выбытия, млрд. руб" data-scroll="true">' +
'                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
'                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
'                                                        </svg>' +
'                                                    </button>' +
'                                                        <strong class="tiles__wrapper__tile_values v_green">0.2' +
'                                                            <br>' +
'                                                            <span>млрд. руб</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Ставка аренды</span>' +
'                                                        <strong class="tiles__wrapper__tile_values v_green">15.4' +
'                                                            <br>' +
'                                                            <span>тыс. руб./м2</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Ставка эксплуатации</span>' +
'                                                        <strong class="tiles__wrapper__tile_values v_red">1.9' +
'                                                            <br>' +
'                                                            <span>тыс. руб./м2</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Недвижимость в Москве</span>' +
/*'                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="avm" data-title="Аренда в Москве">' +
'                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
'                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
'                                                        </svg>' +
'                                                    </button>' +*/
'                                                        <strong class="tiles__wrapper__tile_values v_red" style="display: inline-block">+13' +
'                                                            <br>' +
'                                                            <span>тыс. м2</span>' +
'                                                        </strong>' +
'                                                        <strong class="tiles__wrapper__tile_values v_red" style="display: inline-block; font-size: 26px; font-weight: 300">+85' +
'                                                            <br>' +
'                                                            <span>млрд. руб</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                        <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Недвижимость в Регионах</span>' +
/*'                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="avm" data-title="Аренда в Москве">' +
'                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
'                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
'                                                        </svg>' +
'                                                    </button>' +*/
'                                                        <strong class="tiles__wrapper__tile_values v_red" style="display: inline-block">-348' +
'                                                            <br>' +
'                                                            <span>тыс. м2</span>' +
'                                                        </strong>' +
'                                                        <strong class="tiles__wrapper__tile_values v_red" style="display: inline-block; font-size: 26px; font-weight: 300">-288' +
'                                                            <br>' +
'                                                            <span>млрд. руб</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                       <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Средний тариф на пост охраны</span>' +
'                                                        <strong class="tiles__wrapper__tile_values v_green">111.8' +
'                                                            <br>' +
'                                                            <span>руб.час</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                       <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Средний тариф на пультовую охрану<br>ВСП</span>' +
'                                                        <strong class="tiles__wrapper__tile_values v_green">1.4' +
'                                                            <br>' +
'                                                            <span>тыс.руб/мес</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
'                                       <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Обеспеченность площадью в группе "Офисы"</span>' +
'                                                        <strong class="tiles__wrapper__tile_values v_green">18' +
'                                                            <br>' +
'                                                            <span>м2/раб.место</span>' +
'                                                        </strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        </div>' +
/*'                                        <div class="focus_block swiper-slide">' +
'                                            <div class="container">' +
'                                                <div class="row">' +
'                                                    <div class="col-12">' +
'                                                        <span class="tiles__wrapper__tile_title_small">Основные изменения по объектам</span>' +
'                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="oion" data-title="Основные изменения по объектам недвижимости (ТОП-5)">' +
'                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
'                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
'                                                        </svg>' +
'                                                    </button>' +
'                                                        <strong class="tiles__wrapper__tile_values v_red">-</strong>' +
'                                                    </div>' +
'                                                </div>' +
'                                            </div>' +
'                                        <div class="focus_block swiper-slide">' +
'                                                </div>' +*/
'                                        </div>' +
'                                        </div>' +
'                                        </div>' +
'                                        </div>' +
'                                    </div>'

        });
        var chart = AmCharts.makeChart( "eff_chart", {
            "type": "serial",
            "categoryField": "category",
            "rotate": true,
            "startDuration": 0,
            "colors": [
                           "#e65d5d",
                           "#61db96",
                           "#c6c6c6"
            ],
            "categoryAxis": {
            "gridPosition": "start",
            "axisThickness": 0,
            "gridThickness": 0,
            "labelsEnabled": false
            },
            "trendLines": [],
            "graphs": [
            {
            "balloonText": "[[title]]: [[value]]",
            "fillAlphas": 1,
            "fixedColumnWidth": 30,
            "id": "AmGraph-1",
            "lineColor": "#F5A623",
            "labelText": "[[value]]",
            "title": "Не выполнено",
            "type": "column",
            "valueField": "column-1"
            },
            {
            "balloonText": "[[title]]: [[value]]",
            "fillAlphas": 1,
            "fixedColumnWidth": 30,
            "id": "AmGraph-2",
            "labelText": "[[value]]",
            "title": "Выполнено",
            "type": "column",
            "valueField": "column-2"
            },
            {
            "balloonText": "[[title]]: [[value]]",
            "fillAlphas": 1,
            "fixedColumnWidth": 30,
            "id": "AmGraph-3",
            "labelText": "[[value]]",
            "title": "В работе",
            "type": "column",
            "valueField": "column-3"
            }
            ],
            "guides": [],
            "valueAxes": [
            {
            "id": "ValueAxis-1",
            "stackType": "100%",
            "axisThickness": 0,
            "gridAlpha":0,
            "gridThickness": 0,
            "labelsEnabled": false,
            "title": ""
            }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": [
            {
            "category": "",
            "column-1": "1",
            "column-2": "1",
            "column-3": "4"
            }
            ]
            }
        );
        new iScroll('wrapper_3',{
            snap: true,
            momentum: false,
            hScrollbar: false,
            vScrollbar: false
        });
    }
}
