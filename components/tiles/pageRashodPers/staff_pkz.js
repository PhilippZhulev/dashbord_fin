function Staff_pkz_tile () {

       this.reDraw= function(a) {
           //console.warn("staff_pkz")
        try{
            this.refresh();
            var incoming_data_graph =window.data.lim_graph;
            var incoming_data =window.data.personal_pokaz// this.globalSettings[a[0]];
            //console.log("incoming_data: "+incoming_data);
            var globalSettings = this.globalSettings;

            var screen_data=[];
            var graph_data=[];

            for(var i=0;i<incoming_data.length;i++)
            {
                var obj={}
                obj.tile=incoming_data[i].tile;
                obj.category=incoming_data[i].category;
                obj.data1=incoming_data[i].data1;
                obj.data2=incoming_data[i].data2;
                obj.mera=incoming_data[i].mera;
                obj.color1=incoming_data[i].color1;
                obj.proc1=incoming_data[i].proc1;
                obj.text1=incoming_data[i].text1;
                obj.color2=incoming_data[i].color2;
                obj.proc2=incoming_data[i].proc2;
                obj.text2=incoming_data[i].text2;
                screen_data.push(obj)
            }
            for(var i=0;i<incoming_data_graph.length;i++)
            {
                var obj={}
                obj.tile=incoming_data_graph[i].tile;
                obj.category=incoming_data_graph[i].category;
                obj.data1=incoming_data_graph[i].data1;
                obj.data2=incoming_data_graph[i].data2;
                obj.mera=incoming_data_graph[i].mera;
                obj.color1=incoming_data_graph[i].color1;
                obj.proc1=incoming_data_graph[i].proc1;
                obj.text1=incoming_data_graph[i].text1;
                obj.color2=incoming_data_graph[i].color2;
                obj.proc2=incoming_data_graph[i].proc2;
                obj.text2=incoming_data_graph[i].text2;
                graph_data.push(obj)
            }
            //собираем табличку из источника
            var table_body ="";
            for(var i=0;i<incoming_data.length;i++)
            {
                if (i == 0){
                    table_body+=
                        '                                        <div class="focus_block swiper-slide">' +
                        '                                            <div class="container">' +
                        '                                                <div class="row">' +
                        '                                                    <div class="col-12">' +
                        '                                                        <span class="tiles__wrapper__tile_title_small true_lh">'+incoming_data[i].category+'</span>' +
                        '                                                        <strong class="tiles__wrapper__tile_values v_'+incoming_data[i].color1+'">'+incoming_data[i].data1+
                        '                                                        <div class="chart_element__chart" style="height: 62px; width: calc(100% + 33px);margin-left: -13px;" id="slot_chart"></div>' +
                        '                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="ol" data-title="Отклонение от лимита РОТ">' +
                        '                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
                        '                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
                        '                                                        </svg>' +
                        '                                                    </button>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                         </div>'
                }
                if (i == 1){
                    table_body+=
                        '                                        <div class="focus_block swiper-slide">' +
                        '                                            <div class="container">' +
                        '                                                <div class="row">' +
                        '                                                    <div class="col-12">' +
                        '                                                        <span class="tiles__wrapper__tile_title_small true_lh">'+incoming_data[i].category+'</span>' +
                        '                                                        <strong class="tiles__wrapper__tile_values v_'+incoming_data[i].color1+'">'+incoming_data[i].data1+
                        '                                                    <button type="button" class="btn btn-outline-info btn-open-modal btn-sm cir" data-target="smds" data-title="Среднемесячный нормативный доход сотрудника, тыс. руб">' +
                        '                                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">' +
                        '                                                            <path  d="M24 3.875l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm0 16.125v2h-24v-20h2v18h22z"/>' +
                        '                                                        </svg>' +
                        '                                                    </button>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                         </div>'
                }
                if (i > 1) {
                    table_body +=
                        '                                        <div class="focus_block swiper-slide">' +
                        '                                            <div class="container">' +
                        '                                                <div class="row">' +
                        '                                                    <div class="col-12">' +
                        '                                                        <span class="tiles__wrapper__tile_title_small true_lh">' + incoming_data[i].category + '</span>' +
                        '                                                        <strong class="tiles__wrapper__tile_values v_'+ incoming_data[i].color1 +'">' + incoming_data[i].data1 +
                        '                                                            <br>' +
                        '                                                            <span>' + incoming_data[i].mera + '</span>' +
                        '                                                        </strong>' +
                        '                                                    </div>' +
                        '                                                </div>' +
                        '                                            </div>' +
                        '                                         </div>'
                }//console.log(table_body);
            }
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
            '                                       <div class="swiper-wrapper" style="height: auto; padding-bottom: 10px;">' + table_body +
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
            "valueField": "data1"
            },
            {
            "balloonText": "[[title]]: [[value]]",
            "fillAlphas": 1,
            "fixedColumnWidth": 30,
            "id": "AmGraph-2",
            "labelText": "[[value]]",
            "title": "Выполнено",
            "type": "column",
            "valueField": "data2"
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
            "dataProvider":graph_data
            //     [
            // {
            // "category": "",
            // "column-1": "2",
            // "column-2": "16"
            // }
            // ]
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
