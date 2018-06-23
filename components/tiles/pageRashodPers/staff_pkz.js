function Staff_pkz_tile () {
    this.reDraw = function() {
        try {
        this.refresh();
            var globalSettings=this.globalSettings;
        globals.settings = this.globalSettings;
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
            '                                       <div class="swiper-container2 it_w1 sw_staff_pkz" id="wrapper_2" style="height: 100%;  overflow-y: auto;">'+
            '                                       <div class="swiper-wrapper" style="height: auto; padding-bottom: 10px;">' +
            '                                        <div class="focus_block swiper-slide">' +
            '                                            <div class="container">' +
            '                                                <div class="row">' +
            '                                                    <div class="col-12">' +
            '                                                        <span class="tiles__wrapper__tile_title_small">Соблюдение<br>лимита на оплату<br>труда по Блокам</span>' +
            '                                                        <div class="chart_element__chart" style="height: 62px; width: calc(100% + 33px);margin-left: -13px;" id="slot_chart"></div>' +
            '                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="ol" data-title="Отклонение от лимита РОТ">' +
            '                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
            '                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
            '                                                        </svg>' +
            '                                                    </button>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="focus_block swiper-slide">' +
            '                                            <div class="container">' +
            '                                                <div class="row">' +
            '                                                    <div class="col-12">' +
            '                                                        <span class="tiles__wrapper__tile_title_small">Среднемес. норм. доход<br>на 1 сотрудника</span>' +
            '                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="smds" data-title="Среднемесячный нормативный доход сотрудника, тыс. руб">' +
            '                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
            '                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
            '                                                        </svg>' +
            '                                                    </button>' +
            '                                                        <strong class="tiles__wrapper__tile_values v_green">76.2' +
            '                                                            <br>' +
            '                                                            <span>тыс. руб</span>' +
            '                                                        </strong>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="focus_block swiper-slide">' +
            '                                            <div class="container">' +
            '                                                <div class="row">' +
            '                                                    <div class="col-12">' +
            '                                                        <span class="tiles__wrapper__tile_title_small">Средний разряд<br>Москва</span>' +
            '                                                        <strong class="tiles__wrapper__tile_values v_red">9.1</strong>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="focus_block swiper-slide">' +
            '                                            <div class="container">' +
            '                                                <div class="row">' +
            '                                                    <div class="col-12">' +
            '                                                        <span class="tiles__wrapper__tile_title_small">Средний разряд<br>Регионы</span>' +
            '                                                        <strong class="tiles__wrapper__tile_values v_red">6.4</strong>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        <div class="focus_block swiper-slide">' +
            '                                            <div class="container">' +
            '                                                <div class="row">' +
            '                                                    <div class="col-12">' +
            '                                                        <span class="tiles__wrapper__tile_title_small">Фактическая численность</span>' +
            '                                                        <strong class="tiles__wrapper__tile_values v_red">243' +
            '                                                            <br>' +
            '                                                            <span>тыс. чел.</span>' +
            '                                                        </strong>' +
            '                                                    </div>' +
            '                                                </div>' +
            '                                            </div>' +
            '                                        </div>' +
            '                                        </div>' +
            '                                        </div>' +
            '                                        </div>' +
            '                                    </div>'

        });

        new iScroll('wrapper_2',{
            snap: true,
            momentum: false,
            hScrollbar: false,
            vScrollbar: false
        });

        var chart = AmCharts.makeChart( "slot_chart", {
            "type": "serial",
            "categoryField": "category",
            "rotate": true,
            "startDuration": 0,
            "colors": [
                           "#e65d5d",
                           "#61db96"
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
            "column-1": "2",
            "column-2": "16"
            }
            ]
            }
        );






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
