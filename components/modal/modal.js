function Modal () {

	this.readData=function(){
		var counter=0;
		var that=this;
        var arr ="cir_modal_map$$_$$cir_modal";

		if(!this.globalSettings.Settings.break)
		{
		that.callZTLFunction("getCache",
											function(data)
											{
											var a=arr.split('$$_$$');
											var d= data.split('$$_$$');
											that.globalSettings.Settings.break=true;
											for(var i=0;i<d.length;i++)
											{
												that.globalSettings[a[i]]=JSON.parse(d[i]);
											}
											that.reDraw(a);
										},arr
									);
		}else{
			this.globalSettings.Settings.break=undefined;
		}
	}

    this.reDraw = function(a) {
        this.refresh();
        var globalSettings = this.globalSettings;

/*Собираем данные для модалки карты */
        var incoming_data = this.globalSettings[a[0]];
        var map_images=[];
// get min and max values
        var minBulletSize = 10;
        var maxBulletSize = 30;
        var min = Infinity;
        var max = -Infinity;
        for ( var j = 0; j < incoming_data.length; j++ ) {
            var value = incoming_data[j].fact;
            if ( value < min ) {
                min = value;
            }
            if ( value > max ) {
                max = value;
            }
        }
// it's better to use circle square to show difference between values, not a radius
        var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
        var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

        for(var i=0;i<incoming_data.length;i++)
        {
           console.warn("modal_map")
                var value = incoming_data[i].fact;
                // calculate size of a bubble
                var square = ( value - min ) / ( max - min ) * ( maxSquare - minSquare ) + minSquare;
                if ( square < minSquare ) {
                    square = minSquare;
                }
                var size = Math.sqrt( square / ( Math.PI * 2 ) );

            var obj={} 
            obj.width=size;
            obj.height=size;
            obj.color="rgba(140, 255, 190, 0.5)";
            obj.type="circle";
            obj.label=incoming_data[i].fact;
            obj.labelPosition="middle";
            obj.labelRollOverColor="#000000";
            obj.labelFontSize=13;
            obj.name=incoming_data[i].title;
            obj.value=incoming_data[i].fact;
            obj.title=incoming_data[i].text;
            obj.latitude=incoming_data[i].lat;
            obj.longitude=incoming_data[i].long;
            map_images.push(obj)
            
            
        }
 
/*Собираем данные для модалки CIR */
        var incoming_data = this.globalSettings[a[1]];
        var cir_modal=[];

        for(var i=0;i<incoming_data.length;i++)
        {
            var obj={} 
            obj.column1=incoming_data[i].plan;
            obj.line2=incoming_data[i].fact;
            obj.category=incoming_data[i].category;
            cir_modal.push(obj)
        }



        /*Таблица отклонение от лимита*/
        globals.olTableElms = [
            {
                parent: "CIB",
                proc: "-6.7%",
                abs: "-0.15",
                children: []
            },
            {
                parent: "КБ",
                proc: "-2.1%",
                abs: "-0.14",
                children: []
            },
            {
                parent: "РБ",
                proc: "-0.2%",
                abs: "-0.03",
                children: []
            },
            {
                parent: "SBI",
                proc: "-30,1%",
                abs: "-0.04",
                children: []
            },
            {
                parent: "УБ",
                proc: "-11.1%",
                abs: "-0.10",
                children: []
            },
            {
                parent: "Блок С",
                proc: "-0.2%",
                abs: "-0.02",
                children: []
            },
            {
                parent: "Блок Т",
                proc: "+2.9%",
                abs: "+0.34",
                children: []
            },
            {
                parent: "ДРПА",
                proc: "-7.0%",
                abs: "-0.14",
                children: []
            },
            {
                parent: "ДРЦБ",
                proc: "+18.5%",
                abs: "+0.02",
                children: []
            },
            {
                parent: "Риски",
                proc: "-6.9%",
                abs: "-0.11",
                children: []
            },
            {
                parent: "HR",
                proc: "-3.6%",
                abs: "-0.04",
                children: []
            },
            {
                parent: "ДМиК",
                proc: "-16.5%",
                abs: "-0.04",
                children: []
            },
            {
                parent: "GR",
                proc: "-5.7%",
                abs: "-0.07",
                children: []
            },
            {
                parent: "УВКРиА",
                proc: "-1.3%",
                abs: "-0.01",
                children: []
            },
            {
                parent: "Финансы",
                proc: "-0.5%",
                abs: "-0.01",
                children: []
            },
            {
                parent: "Блок СР",
                proc: "-16.0%",
                abs: "-0.03",
                children: []
            },
            {
                parent: "Вне блоков",
                proc: "-2.3%",
                abs: "-0.01",
                children: []
            },
            {
                parent: "Тер. развитие",
                proc: "-8.1%",
                abs: "-0.01",
                children: []
            },
            {
                parent: "ИТОГО ПАО+ДО",
                proc: "-0.5%",
                abs: "-0.30",
                children: []
            }
        ];

        //создать пункты
        function collapseElements_ol(Arr) {

            var element = "";

            function childs (childArr) {
                var child = "";
                for(var ic = 0; ic < childArr.length; ic++) {
                    child +=
                        '<div class="row">' +
                        '   <div class="col-6">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].name +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].proc +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].abs +'</span>' +
                        '   </div>' +
                        '</div>';
                }
                return child;
            }

            for(var inc = 0; inc < Arr.length; inc++) {
                element +=
                    '<div class="collapse_title">' +
                    '      <div class="row">' +
                    '           <div class="col-6">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].parent +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].proc +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].abs +'</span>' +
                    '           </div>' +
                    '       </div>' +
                    '</div>' +
                    '<div class="collapse_container">' +
                    childs (Arr[inc].children) +
                    '</div>';
            }
            return element;
        }
        /*Конец Таблица отклонение от лимита*/

        /*Таблица эффект от выбытия*/
        globals.efvTableElms = [
            {
                parent: "Итого",
                fact_now: "216",
                plan_now: "781",
                vib_plan: "14%",
                prib_now: "0.2",
                ubit_now: "-0.3",
                children: []
            },
            {
                parent: "ЦА",
                fact_now: "14.2",
                plan_now: "0",
                vib_plan: "0%",
                prib_now: "0",
                ubit_now: "0",
                children: []
            },
            {
                parent: "ВВБ",
                fact_now: "57.7",
                plan_now: "106.4",
                vib_plan: "54%",
                prib_now: "0.03",
                ubit_now: "-0.0004",
                children: []
            },
            {
                parent: "СЗБ",
                fact_now: "25.6",
                plan_now: "74.3",
                vib_plan: "34%",
                prib_now: "0.1",
                ubit_now: "0",
                children: []
            },
            {
                parent: "МБ",
                fact_now: "-34.4",
                plan_now: "55.7",
                vib_plan: "-62%",
                prib_now: "0",
                ubit_now: "0.02",
                children: []
            },
            {
                parent: "УБ",
                fact_now: "19.9",
                plan_now: "48.6",
                vib_plan: "41%",
                prib_now: "0.001",
                ubit_now: "-0.005",
                children: []
            },
            {
                parent: "ЮЗБ",
                fact_now: "22.1",
                plan_now: "105.5",
                vib_plan: "21%",
                prib_now: "0.007",
                ubit_now: "0",
                children: []
            },
            {
                parent: "ЗСБ",
                fact_now: "-5",
                plan_now: "28",
                vib_plan: "-18%",
                prib_now: "0.0008",
                ubit_now: "-0.05",
                children: []
            },
            {
                parent: "СРБ",
                fact_now: "31.2",
                plan_now: "68.3",
                vib_plan: "46%",
                prib_now: "0.01",
                ubit_now: "-0.006",
                children: []
            },
            {
                parent: "ЦЧБ",
                fact_now: "15.2",
                plan_now: "92.2",
                vib_plan: "16%",
                prib_now: "0.007",
                ubit_now: "-0.1",
                children: []
            },
            {
                parent: "ББ",
                fact_now: "20.2",
                plan_now: "32.3",
                vib_plan: "63%",
                prib_now: "0.01",
                ubit_now: "-0.01",
                children: []
            },
            {
                parent: "ПБ",
                fact_now: "21.7",
                plan_now: "58",
                vib_plan: "37%",
                prib_now: "0.03",
                ubit_now: "-0.09",
                children: []
            },
            {
                parent: "ДВБ",
                fact_now: "2.5",
                plan_now: "14.8",
                vib_plan: "17%",
                prib_now: "0.0003",
                ubit_now: "-0.0004",
                children: []
            },
            {
                parent: "СиБ",
                fact_now: "25.1",
                plan_now: "96.9",
                vib_plan: "26%",
                prib_now: "0.01",
                ubit_now: "-0.03",
                children: []
            }

        ];
        function collapseElements_efv(Arr) {

            var element = "";

            function childs (childArr) {
                var child = "";
                for(var ic = 0; ic < childArr.length; ic++) {
                    child +=
                        '<div class="row">' +
                        '   <div class="col-6">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].name +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].proc +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].abs +'</span>' +
                        '   </div>' +
                        '</div>';
                }
                return child;
            }

            for(var inc = 0; inc < Arr.length; inc++) {
                element +=
                    '<div class="collapse_title">' +
                    '      <div class="row">' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].parent +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].fact_now +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].plan_now +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].vib_plan +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].prib_now +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].ubit_now +'</span>' +
                    '           </div>' +
                    '       </div>' +
                    '</div>' +
                    '<div class="collapse_container">' +
                    childs (Arr[inc].children) +
                    '</div>';
            }
            return element;
        }
        /*Конец Таблица эффект от выбытия*/      

        /*Таблица Портфель недвижимости банка*/
        globals.pnbTableElms = [
            {
                parent: "Собственность",
                plosh:"4289",
                proc: "-1.9%",
                abs: "-84",
                children: [
                    {
                    name: "Отделения",
                    plosh:"1899",
                    proc: "-0.3%",
                    abs: "-6"
                    },{
                    name: "Офисы",
                    plosh:"1436",
                    proc: "-0.3%",
                    abs: "-5"
                    },{
                    name: "Тех. площади",
                    plosh:"954",
                    proc: "-7.1%",
                    abs: "-73"
                    }
                ]
            },
            {
                parent: "Аренда",
                plosh:"1276",
                proc: "-0.9%",
                abs: "-11",
                children: [
                    {
                    name: "Отделения",
                    plosh:"542",
                    proc: "-0.4%",
                    abs: "-2"
                    },{
                    name: "Офисы",
                    plosh:"430",
                    proc: "-0.7%",
                    abs: "-3"
                    },{
                    name: "Тех. площади",
                    plosh:"304",
                    proc: "-1.9%",
                    abs: "-6"
                    }
                ]
            },
            {
                parent: "Сдача в аренду",
                plosh:"465",
                proc: "-4.5%",
                abs: "-22",
                children: []
            },
            {
                parent: "Залоговое имущество",
                plosh:"129",
                proc: "15.2%",
                abs: "17",
                children: []
            }
        ];

        //создать пункты
        function collapseElements_pnb(Arr) {

            var element = "";

            function childs (childArr) {
                var child = "";
                for(var ic = 0; ic < childArr.length; ic++) {
                    child +=
                        '<div class="row">' +
                        '   <div class="col-6">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].name +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].plosh +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].abs +'</span>' +
                        '   </div>' +
                        '   <div class="col-2">' +
                        '       <span class="collapse__table__title">'+ childArr[ic].proc +'</span>' +
                        '   </div>' +
                        '</div>';
                }
                return child;
            }

            for(var inc = 0; inc < Arr.length; inc++) {
                element +=
                    '<div class="collapse_title">' +
                    '      <div class="row">' +
                    '           <div class="col-6">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].parent +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].plosh +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].abs +'</span>' +
                    '           </div>' +
                    '           <div class="col-2">' +
                    '               <span class="collapse__table__title">'+ Arr[inc].proc +'</span>' +
                    '           </div>' +
                    '       </div>' +
                    '</div>' +
                    '<div class="collapse_container">' +
                    childs (Arr[inc].children) +
                    '</div>';
            }
            return element;
        }
        /*Конец Таблица порфель недвижимости банка*/    
        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["modal_window", "mdw_1"],
            html:
            '<div class="modal_inner">'+
                '<div class="modal_header">'+
                    '<span class="modal_title"></span>' +
                    '<span class="scroll_ico"></span>' +
                    '<span class="modal_close"></span>' +
                '</div>'+
                '<div class="modal_body">'+

                    '<div class="modal_block" id="cir">' +
                    // '   <div class="legend-block">' +
                    // '       <span class="legend_item"><i style="background: #6ec7f7"></i><span>План</span></span>' +
                    // '       <span class="legend_item"><i style="background: #61db96"></i><span>Факт</span></span>' +
                    // '   </div>' +
                    '   <div class="char-block" id="cir_char"></div>' +
                    '</div>'+

                    '<div class="modal_block" id="kro">' +
//                    '<div class="info_ico"><div>' +

                    '   <div class="legend-block">' +
                    '       <span class="legend_item"><div class="info_ico" >&nbsp;</div></span>' +
                    '       <span class="legend_item"><i style="background: #6ec7f7"></i><span>Прочее</span></span>' +
                    '       <span class="legend_item"><i style="background: #8064a2"></i><span>Бизнес-расходы</span></span>' +
                    '       <span class="legend_item"><i style="background: #B0DE09"></i><span>Недвижимость</span></span>' +
                    '       <span class="legend_item"><i style="background: #FCD202"></i><span>ИТ</span></span>' +
                    '       <span class="legend_item"><i style="background: #2aced0"></i><span>Персонал</span></span>' +
                    '   </div>' +
                    '   <div class="char-block" id="kro_char" style="width:85%;"></div>' +
                    '</div>'+

                    '<div class="modal_block" id="sr">'+
                    '   <div class="legend-block">' +
                    '       <span class="legend_item"><i style="background: #61db96"></i><span>Москва</span></span>' +
                    '       <span class="legend_item"><i style="background: #6ec7f7"></i><span>Регионы</span></span>' +
                    '   </div>' +
                    '   <div class="char-block" id="sr_char"></div>' +
                    '</div>'+
                    '<div class="modal_block" id="kv">' +
                    '   <div id="kv_iiner" style="height: 800px"></div>' +
                    '</div>'+
                    '<div class="modal_block" id="focus_fact0"></div>'+
                    '<div class="modal_block" id="focus_fact1"></div>'+
                    '<div class="modal_block" id="focus_fact2"></div>'+
                    '<div class="modal_block" id="focus_fact3"></div>'+
                    '<div class="modal_block" id="focus_fact4"></div>'+
                    '<div class="modal_block" id="focus_prognoz0"></div>'+
                    '<div class="modal_block" id="focus_prognoz1"></div>'+
                    '<div class="modal_block" id="focus_prognoz2"></div>'+
                    '<div class="modal_block" id="focus_prognoz3"></div>'+
                    '<div class="modal_block" id="focus_prognoz4"></div>'+
                    '<div class="modal_block" id="focus_prognoz5"></div>'+
                    '<div class="modal_block_big" id="cir_map_big"></div>'+
                    '<div class="modal_block" id="pnb">'+
//                    '                                    <div class="container">' +
//                    '                                        <div class="row">' +
//                    '                                            <div class="col-12">' +
//                    '                                                <span class="tiles__wrapper__tile_title">Эффект от выбытия,</br>млрд. руб</span><div class="scroll_hint"></div>' +
//                    '                                            </div>' +
//                    '                                        </div>' +
//                    '                                    </div>' +
//                     '                                   <div class="collapse__table border_bt">' +
//                     '                                        <div class="container">' +
//                     '                                            <div class="row" style="margin-bottom: 10px">' +
//                     '                                                <div class="col-6">' +
//                     '                                                    <span class="collapse__table__title"></span>' +
//                     '                                                </div>' +
//                     '                                                <div class="col-2">' +
//                     '                                                    <span class="collapse__table__title">тыс. м2</span>' +
//                     '                                                </div>' +
//                     '                                                <div class="col-2">' +
//                     '                                                    <span class="collapse__table__title"></span>' +
//                     '                                                </div>' +
//                     '                                                <div class="col-2">' +
//                     '                                                    <span class="collapse__table__title">Факт 3М18<br>vs факт ЗМ17</span>' +
//                     '                                                </div>' +
//                     '                                            </div>' +
//                     '                                        </div>' +
//                     '                                    </div>' +
//                     '                                    <div class="collapse__table">' +
//                     '                                        <div class="container">' +
//                     '                                            <div class="row">' +
//                     '                                                <div class="col-6">' +
//                     '                                                    <span class="collapse__table__title">Итого</span>' +
//                     '                                                </div>' +
//                     '                                                <div class="col-2">' +
//                     '                                                    <span class="collapse__table__title">6159</span>' +
//                     '                                                </div>' +
//                     '                                                <div class="col-2">' +
//                     '                                                    <span class="collapse__table__title">-101</span>' +
//                     '                                                </div>' +
//                     '                                                <div class="col-2">' +
//                     '                                                    <span class="collapse__table__title">-1.6%</span>' +
//                     '                                                </div>' +
//                     '                                            </div>' +
//                     '                                        </div>' +
//                     '                                    </div>' +
//                     '                                    <div class="collapse__table">' +
//                     '                                        <div class="container">' +
//                     '                                            <div class="collapse_wrap kro_collpse">' +
//                                                                     collapseElements_pnb(globals.pnbTableElms) +
//                     '                                            </div>' +
//                     '                                        </div>' +
//                     '                                    </div>'+
                    '</div>'+
                    '<div class="modal_block" id="smds">Тут график среднемесячного дохода сотрудника</div>'+
                    '<div class="modal_block" id="ol">'+
                    '                                   <div class="collapse__table border_bt">' +
                    '                                        <div class="container">' +
                    '                                            <div class="row">' +
                    '                                                <div class="col-6">' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">%</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">млрд. руб</span>' +
                    '                                                </div>' +
                    '                                                 <div class="table_border"></div>' +
                    '                                            </div>' +
                    '                                        </div>' +
                    '                                    </div>' +
                    '                                    <div class="collapse__table" id="wrapper_6">' +
                    '                                        <div class="container" style="padding-bottom: 10px">' +
                    '                                            <div class="collapse_wrap kro_collpse">' +
                                                                    collapseElements_ol(globals.olTableElms) +
                    '                                            </div>' +
                    '                                        </div>' +
                    '                                    </div>'+
                    '                               </div>'+
                    '                               <div class="modal_block" id="efv">'+
                    '                                        <div class="row">' +
                    '                                            <div class="col-12">' +
                    '                                                <span class="tiles__wrapper__tile_title"></span>' +
                    '                                            </div>' +
                    '                                        </div>' +
                    '                                   <div class="collapse__table border_bt">' +
                    '                                        <div class="container">' +
                    '                                            <div class="row"  style="margin-bottom: 15px;">' +
                    '                                                <div class="col-2">' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">Факт\'18</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">План\'18</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">Вып.плана</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">Прибыль\'18</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">Убыток\'18</span>' +
                    '                                                </div>' +
                    '                                                 <div class="table_border"></div>' +
                    '                                            </div>' +
                    '                                            <div class="row">' +
                    '                                                <div class="col-2">' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">Млрд.руб.</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">Тыс.м2</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">%</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">Млрд.руб.</span>' +
                    '                                                </div>' +
                    '                                                <div class="col-2">' +
                    '                                                    <span class="collapse__table__title">Млрд.руб.</span>' +
                    '                                                </div>' +
                    '                                            </div>'+
                    '                                        </div>' +
                    '                                    </div>' +
                    '                                    <div class="collapse__table" id="wrapper_1_vap">' +
                    '                                        <div class="container" style="padding-bottom: 10px">' +
                    '                                            <div class="collapse_wrap kro_collpse">' +
                                                                    collapseElements_efv(globals.efvTableElms) +
                    '                                            </div>' +
                    '                                        </div>' +
                    '                                    </div>'+
                    '</div>'+
                    '<div class="modal_block" id="avm">'+
                    '    <div class="tiles__wrapper__tile">' +
                    '       <div class="container">' +
                    '          <div class="row">' +
                    '              <div class="col-12">' +
                    '                   <span class="tiles__wrapper__tile_title">Аренда в Москве</span>' +
                    '              </div>' +
                    '          </div>' +
                    '      </div>' +
                    '      <div">Площадь, тыс. м2</div>'+
//                    '      <div class="chart_element__container">' +
                    '          <div class="char-block" id="avm_char_1"></div>' +
//                    '      </div>'+
                    '      <div>Расходы, млрд. руб</div>'+
//                    '      <div class="chart_element__container">' +
                    '          <div class="char-block" id="avm_char_2"></div>' +
//                    '      </div>'+
                    '</div>'+
//                    '<div class="modal_block" id="efv">Тут табличка эффект от выбытия</div>'+
                    '<div class="modal_block" id="oion">Тут табличка Основные изменения по объектам недвижимости (ТОП-5)</div>'+
                    '<div class="modal_block" id="opex_m"></div>'+
                '</div>'+
        '</div>'
    });

var chart = AmCharts.makeChart( "avm_char_1", {
                "type": "serial",
                "categoryField": "name",
                "autoMarginOffset": 8,
                "autoMargins": false,
                "marginBottom": 150,
                "marginLeft": 5,
                "marginRight": 0,
                "minMarginTop": -4,
                "theme": "default",
                "categoryAxis": {
                    "gridPosition": "start",
                    "axisAlpha": 0,
                    "axisThickness": 0,
                    "color": "#FFFFFF",
                    "fontSize": 0,
                    "gridColor": "#FFFFFF",
                    "gridThickness": 0,
                    "titleColor": "#FFFFFF"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bulletBorderColor": "#FFFFFF",
                        "bulletColor": "#FFFFFF",
                        "bulletSize": 12,
                        "color": "#FFFFFF",
                        "cursorBulletAlpha": 0,
                        "fillAlphas": 1,
                        "fillColors": "#288AE3",
                        "fixedColumnWidth": 40,
                        "id": "AmGraph-1",
                        "labelText": "[[moscow]]",
                        "lineColor": "#FFFFFF",
                        "lineThickness": 0,
                        "maxBulletSize": 47,
                        "negativeFillColors": "#EE5454",
                        "tabIndex": 0,
                        "title": "graph 1",
                        "type": "column",
                        "valueField": "moscow"
                    },
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "color": "#FFFFFF",
                        "fillAlphas": 1,
                        "fillColors": "#288AE3",
                        "fixedColumnWidth": 40,
                        "id": "AmGraph-2",
                        "labelText": "[[regions]]",
                        "lineThickness": 0,
                        "negativeFillColors": "#EE5454",
                        "title": "graph 2",
                        "type": "column",
                        "valueField": "regions"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "zeroGridAlpha": 1,
                        "autoGridCount": false,
                        "axisThickness": 0,
                        "fontSize": 0,
                        "gridAlpha": 0,
                        "gridColor": "#FFFFFF",
                        "gridCount": 1,
                        "gridThickness": 0,
                        "offset": -2,
                        "titleColor": "#FFFFFF"
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": [
                    {
                        "name": "Расходы",
                        "moscow": "2.9",
                        "regions": "-6.1"
                    }
                ]
});

var chart = AmCharts.makeChart( "avm_char_2", {
                "type": "serial",
                "categoryField": "category",
                "autoMarginOffset": 8,
                "autoMargins": false,
                "marginBottom": 150,
                "marginLeft": 5,
                "marginRight": 0,
                "minMarginTop": -4,
                "theme": "default",
                "categoryAxis": {
                    "gridPosition": "start",
                    "axisAlpha": 0,
                    "axisThickness": 0,
                    "color": "#FFFFFF",
                    "fontSize": 0,
                    "gridColor": "#FFFFFF",
                    "gridThickness": 0,
                    "titleColor": "#FFFFFF"
                },
                "trendLines": [],
                "graphs": [
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "bulletBorderColor": "#FFFFFF",
                        "bulletColor": "#FFFFFF",
                        "bulletSize": 12,
                        "color": "#FFFFFF",
                        "cursorBulletAlpha": 0,
                        "fillAlphas": 1,
                        "fillColors": "#288AE3",
                        "fixedColumnWidth": 40,
                        "id": "AmGraph-1",
                        "labelText": "[[column-1]]",
                        "lineColor": "#FFFFFF",
                        "lineThickness": 0,
                        "maxBulletSize": 47,
                        "negativeFillColors": "#EE5454",
                        "tabIndex": 0,
                        "title": "graph 1",
                        "type": "column",
                        "valueField": "column-1"
                    },
                    {
                        "balloonText": "[[title]] of [[category]]:[[value]]",
                        "color": "#FFFFFF",
                        "fillAlphas": 1,
                        "fillColors": "#288AE3",
                        "fixedColumnWidth": 40,
                        "id": "AmGraph-2",
                        "labelText": "[[column-2]]",
                        "lineThickness": 0,
                        "negativeFillColors": "#EE5454",
                        "title": "graph 2",
                        "type": "column",
                        "valueField": "column-2"
                    }
                ],
                "guides": [],
                "valueAxes": [
                    {
                        "id": "ValueAxis-1",
                        "zeroGridAlpha": 1,
                        "autoGridCount": false,
                        "axisThickness": 0,
                        "fontSize": 0,
                        "gridAlpha": 0,
                        "gridColor": "#FFFFFF",
                        "gridCount": 1,
                        "gridThickness": 0,
                        "offset": -2,
                        "titleColor": "#FFFFFF"
                    }
                ],
                "allLabels": [],
                "balloon": {},
                "titles": [],
                "dataProvider": [
                    {
                        "name": "Площадь",
                        "moscow": "2.9",
                        "regions": "-6.1"
                    }
                ]
});


        globals.Collapse(".kro_collpse .collapse_title");


        new globals.ModalWindow ({
            btns: ".btn-open-modal", 
            modal: "modal_window"
        });

        this.fireEvent("tech1");

        /*Модалка CIR  на главном экране*/
        var chart = AmCharts.makeChart( "cir_char", {
                        "type": "serial",
                        "fontFamily": "'Open Sans', sans-serif",
                        "categoryField": "category",
                        "colors": [
                            "#61DB96",
                            "#6EC7F7",
                            "#B0DE09",
                            "#0D8ECF",
                            "#2A0CD0",
                            "#CD0D74",
                            "#CC0000",
                            "#00CC00",
                            "#0000CC",
                            "#DDDDDD",
                            "#999999",
                            "#333333",
                            "#990000"
                        ],
                        "startDuration": 0,
                        "categoryAxis": {
                            "gridPosition": "start",
                            "autoGridCount": false,
                            "fontSize": 13,
                            "axisColor": "#a0aab7",
                            "color": "#A0AAB7",
                            "axisThickness": 1,
                            "gridThickness": 0
                        },
                        "trendLines": [],
                        "graphs": [
                            {
                            "labelOffset": 7,
                            "balloonText": "[[category]]:[[value]]",
                            "columnWidth": 0,
                            "fillAlphas": 1,
                            "fixedColumnWidth": 30,
                            "fontSize": 13,
                            "id": "AmGraph-1",
                            "labelPosition": "bottom",
                            "labelText": "[[value]]",
                            "title": "graph 1",
                            "type": "column",
                            "valueField": "column1"
                            },
                            {
                            "balloonText": "[[category]]:[[value]]",
                            "bullet": "round",
                            "id": "AmGraph-2",
                            "fontSize": 13,
                            "labelOffset": 5,
                            "labelText": "[[value]]",
                            "color": "#A0AAB7",
                            "lineThickness": 2,
                            "title": "graph 2",
                            "valueField": "line2"
                            }
                        ],
                        "guides": [],
                        "valueAxes": [{
                           "id": "ValueAxis-1",
                           "axisThickness": 0,
                           "gridThickness": 0,
                           "labelsEnabled": false,
                           "tickLength": 0,
                           "title": ""
                                       }
                        ],
                        "allLabels": [],
                        "balloon": {},
                        "titles": [],
                        "dataProvider": cir_modal
        });
        /*Конец CIR  на главном экране*/
        /*Модалка категории расходов OPEX на втором экране*/
        var chart = AmCharts.makeChart( "kro_char", {
    "type": "serial",
    "fontFamily": "'Open Sans', sans-serif",
	"categoryField": "category",
	"colors": [
		"#2aced0",
		"#FCD202",
		"#B0DE09",
		"#8064a2",
		"#6ec7f7",
		"#CD0D74",
		"#CC0000",
		"#00CC00",
		"#0000CC",
		"#DDDDDD",
		"#999999",
		"#333333",
		"#990000"
	],
	"color": "#A0AAB7",
	"categoryAxis": {
		"gridPosition": "start",
		"axisColor": "#a0aab7",
		"color": "#A0AAB7",
		"fontSize": 13,
		"gridAlpha": 0,
		"gridThickness": 0.1
	},
	"trendLines": [],
	"graphs": [
		{
			"balloonText": " [[category]]:[[value]]%",
			"bullet": "round",
			"bulletSize": 4,
			"fillAlphas": 0.2,
			"fixedColumnWidth": 30,
			"id": "AmGraph-1",
			"labelText": "[[value]]%",
			"title": "graph 1",
			"valueField": "column-1"
		},
		{
			"balloonText": " [[category]]:[[value]]%",
			"bullet": "round",
			"bulletSize": 4,
			"fillAlphas": 0.2,
			"fixedColumnWidth": 30,
			"id": "AmGraph-2",
			"labelText": "[[value]]%",
			"title": "graph 2",
			"valueField": "column-2"
		},
		{
			"balloonText": " [[category]]:[[value]]%",
			"bullet": "round",
			"bulletSize": 4,
			"fillAlphas": 0.2,
			"fixedColumnWidth": 30,
			"id": "AmGraph-3",
			"labelText": "[[value]]%",
			"title": "graph 3",
			"valueField": "column-3"
		},
		{
			"balloonText": " [[category]]:[[value]]%",
			"bullet": "round",
			"bulletSize": 4,
			"fillAlphas": 0.2,
			"fixedColumnWidth": 30,
			"id": "AmGraph-4",
			"labelText": "[[value]]%",
			"title": "graph 4",
			"valueField": "column-4"
		},
		{
			"balloonText": " [[category]]:[[value]]%",
			"bullet": "round",
			"bulletSize": 4,
			"fillAlphas": 0.2,
			"fixedColumnWidth": 30,
			"id": "AmGraph-5",
            "labelText": "[[value]]%",
            "labelPosition": "bottom",
			"title": "graph 5",
			"valueField": "column-5"
		}
	],
	"guides": [],
	"valueAxes": [
		{
            "id": "ValueAxis-1",
            "maximum": 100,
            "minimum": 0,
            "strictMinMax": true,
			"precision": 0,
            "radarCategoriesEnabled": false,
            //"reversed": true,
			"stackType": "100%",
			"totalText": "",
			"unit": "%",
			"axisAlpha": 0,
			"axisColor": "#E5E5E5",
			"axisThickness": 0,
			"gridAlpha": 0,
			"gridColor": "#E5E5E5",
			"gridThickness": 0,
			"labelOffset": 0,
			"showFirstLabel": false,
			"tickLength": 0,
			"title": "",
			"titleColor": "#E5E5E5"
		}
	],
	"allLabels": [],
	"balloon": {},
	"titles": [],
	"dataProvider": [
		{
			"category": "2016",
			"column-1": "58",
			"column-2": "6",
			"column-3": "12",
			"column-4": "7",
			"column-5": "17"
		},
		{
			"category": "2017",
			"column-1": "59",
			"column-2": "6",
			"column-3": "10",
			"column-4": "7",
			"column-5": "18"
		},
		{
			"category": "2018",
			"column-1": "58",
			"column-2": "9",
			"column-3": "9",
			"column-4": "6",
			"column-5": "18"
		},
		{
			"category": "2019",
			"column-1": "56",
			"column-2": "9",
			"column-3": "9",
			"column-4": "6",
			"column-5": "20"
		},
		{
			"category": "2020",
			"column-1": "54",
			"column-2": "9",
			"column-3": "9",
			"column-4": "6",
			"column-5": "22"
		},
		{
			"category": "Факт 2018",
			"column-1": "70",
			"column-2": "9",
			"column-3": "9",
			"column-4": "4",
			"column-5": "8"
		}
	]
});
        /*Конец модалки категории расходов OPEX*/

      /*Модалка Динамика среднего грейда*/
      var chart = AmCharts.makeChart( "sr_char", {
        "type": "serial",
        "fontFamily": "'Open Sans', sans-serif",
        "categoryField": "category",
        "colors": [
            "#6EC7F7",
            "#61DB96",
            "#B0DE09",
            "#0D8ECF",
            "#2A0CD0",
            "#CD0D74",
            "#CC0000",
            "#00CC00",
            "#0000CC",
            "#DDDDDD",
            "#999999",
            "#333333",
            "#990000"
        ],
        "color": "#A0AAB7",
        "categoryAxis": {
            "gridPosition": "start",
            "autoGridCount": false,
            "axisColor": "#A0AAB7",
		    "fontSize": 13,
            "axisThickness": 1,
            "gridThickness": 0
        },
        "trendLines": [],
        "graphs": [
            {
                "balloonText": "[[category]]:[[value]]",
                "bullet": "round",
                "id": "AmGraph-2",
                "fontSize": 13,
                "labelOffset": 5,
                "labelText": "[[value]]",
                "lineThickness": 2,
                "title": "graph 2",
                "valueField": "line-2"
            },
            {
                "balloonText": "[[category]]:[[value]]",
                "bullet": "round",
                "id": "AmGraph-1",
                "fontSize": 13,
                "labelOffset": 5,
                "labelText": "[[value]]",
                "lineThickness": 2,
                "title": "graph 1",
                "valueField": "line-1"
            }
        ],
        "guides": [],
        "valueAxes": [
            {
                "id": "ValueAxis-1",
                "maximum": 15,
                "minimum": 5,
                "axisThickness": 0,
                "axisColor": "#A0AAB7",
                "gridThickness": 0,
                "labelsEnabled": false,
                "tickLength": 0,
                "title": ""
            }
        ],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": [
            {
                "category": "1кв. 2017",
                "line-1": "8.8",
                "line-2": "6.7"
            },
            {
                "category": "2кв. 2017",
                "line-1": "9.1",
                "line-2": "6.7"
            },
            {
                "category": "3кв. 2017",
                "line-1": "9.0",
                "line-2": "6.7"
            },
            {
                "category": "4кв. 2017",
                "line-1": "9.1",
                "line-2": "6.7"
            },
            {
                "category": "1кв. 2018",
                "line-1": "9.1",
                "line-2": "6.7"
            }
        ]
    });
            /*Конец Динамика среднего грейда*/
		
       /*Модалка Лимит РОТ*/
       var chart = AmCharts.makeChart("kv_iiner", {
        "type": "serial",
        "marginRight": 20,
        "fontFamily": "'Open Sans', sans-serif",
        "categoryField": "category",
        "columnSpacing": 2,
        "rotate": true,
        "marginTop": 0,
        "theme": "black",
        "categoryAxis": {
            "gridPosition": "start",
            "autoGridCount": false,
            "axisAlpha": 0,
            "axisThickness": 2,
            "color": "#A0AAB7",
            "fontSize": 13,
            "gridAlpha": 0,
            "gridCount": 12,
            "gridThickness": 0
        },
        "trendLines": [],
        "graphs": [
            {
                "balloonText": "Факт:[[value]]",
                "color": "#BEBEBE",
                "fillAlphas": 1,
                "fillColors": "#6EC7F7",
                "fixedColumnWidth": 10,
                "fontSize": 13,
                "id": "AmGraph-1",
                "labelOffset": 10,
                "labelPosition": "right",
                "labelText": "[[value]]",
                "lineAlpha": 0,
                "showAllValueLabels": true,
                "showBulletsAt": "open",
                "title": "graph 1",
                "type": "column",
                "valueAxis": "ValueAxis-1",
                "valueField": "fact"
            },
            {
                "balloonText": "План:[[value]]",
                "color": "#BEBEBE",
                "fillAlphas": 1,
                "fillColors": "#A0AAB7",
                "fixedColumnWidth": 10,
                "fontSize": 13,
                "id": "AmGraph-2",
                "labelOffset": 10,
                "labelPosition": "right",
                "labelText": "[[value]]",
                "lineAlpha": 0,
                "showAllValueLabels": true,
                "showBulletsAt": "open",
                "title": "graph 2",
                "type": "column",
                "valueField": "plan"
            }
        ],
        "guides": [],
        "valueAxes": [
            {
                "id": "ValueAxis-1",
                //"logarithmic": true,
                "position": "right",
                "axisAlpha": 0,
                "axisThickness": 0,
                "gridAlpha": 0,
                "labelsEnabled": false,
                "tickLength": 0
            }
        ],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": [
            {"category":"РБ","fact":"21.2","plan":"21.2","fact_prev":"99.1"},
            {"category":"Блок Т","fact":"12.1","plan":"11.7","fact_prev":"86.6"},
            {"category":"Блок С","fact":"8.6","plan":"8.6","fact_prev":"94.8"},
            {"category":"CIB","fact":"2.1","plan":"2.3","fact_prev":"80.3"},
            {"category":"ДРПА","fact":"1.8","plan":"1.9","fact_prev":"91.6"},
            {"category":"Риски","fact":"1.4","plan":"1.6","fact_prev":"92.3"},
            {"category":"Финансы","fact":"1.4","plan":"1.4","fact_prev":"91.6"},
            {"category":"Рук-во (ЦА и ТБ)","fact":"1.4","plan":"1.1","fact_prev":"91.6"},
            {"category":"Блок GR","fact":"1.2","plan":"1.3","fact_prev":"94.8"},
            {"category":"HR","fact":"0.9","plan":"1.0","fact_prev":"94.8"},
            {"category":"УБ","fact":"0.8","plan":"0.9","fact_prev":"94.8"},
            {"category":"УВКРиА","fact":"0.6","plan":"0.6","fact_prev":"94.8"},
            {"category":"Вне блоков","fact":"0.4","plan":"0.4","fact_prev":"94.8"},
            {"category":"Маркетинг","fact":"0.2","plan":"0.3","fact_prev":"94.8"},
            {"category":"Блок CP","fact":"0.2","plan":"0.2","fact_prev":"94.8"},
            {"category":"Тер. развитие","fact":"0.1","plan":"0.1","fact_prev":"94.8"},
            {"category":"ДРЦБ","fact":"0.1","plan":"0.1","fact_prev":"94.8"},
            {"category":"SBI","fact":"0.1","plan":"0.1","fact_prev":"94.8"}
            ]
    });
        /*Конец лимит РОТ*/	
		
       /*Модалка CIR карты*/
         		 window.AmCharts.maps.russiaTB=
        {
        	"svg" : {
        		"defs" : {
        			"amcharts:ammap" : {
        				"projection":"mercator",
        				"leftLongitude":"17.784141",
        				"topLatitude":"79.857875",
        				"rightLongitude":"192.348146",
        				"bottomLatitude":"39.202033"

        			}
        		},
        		"g" : {
        			"path" : [
        				{
        					"id" : "13",
        					"title" : "Центрально-Черноземный банк",
        					"d" : "m 134.07,679.47 1.54,-0.95 0.83,0.25 0.43,-0.95 0.99,0.01 1.69,1.46 0.63,-1.25 2.05,0.09 0.66,0.33 0.17,1.1 1.42,0.53 1.54,-0.56 4.3,0.21 2.81,0.8 0.54,2.02 1.82,-0.18 0.61,-0.72 3.57,0.74 2.07,1.16 0.22,-0.79 0.69,0.05 0.56,1.13 1.26,-0.02 2.22,1.47 0.45,2.2 -3.99,1.42 -2.99,-0.28 -1.14,2 -1.68,0.65 -0.65,1.24 -1.31,0.3 2.28,2.69 -0.64,0.33 0.16,2.16 -0.87,1.54 -0.28,1.35 -1.96,1.81 -1.06,2.46 -2.81,1.1 -2.2,-0.48 -0.54,0.68 -0.54,-0.63 -2.42,0.55 -1.04,-0.7 -0.27,-1.2 -1.75,0.02 -1,-0.91 1.05,-1.9 -0.91,-1.36 -0.79,-3.48 0.53,-0.69 -0.29,-0.69 0.79,-0.33 -2.08,-1.08 -1.22,-1.68 0.2,-0.94 0.98,-0.06 -0.36,-1.37 -0.66,-0.59 -0.94,0.82 -1.58,-0.53 0.59,-1.74 -1.47,-0.78 -0.02,-2.27 -1.11,-2.02 1.83,-0.46 0.57,0.39 0.71,-0.69 -0.97,-0.51 -0.15,-1.57 z m 13.31,-16 2.3,-0.89 -0.24,-0.8 0.48,-0.32 0.56,0.7 0.7,-1.38 3.45,1.74 0.21,-0.87 1.05,-0.62 0.35,-2.62 0.99,-0.03 0.24,-0.63 0.15,0.44 3.51,-0.31 0.06,3.31 1.34,0.85 -0.16,1.15 1.11,0.33 1.13,1.56 -0.06,0.83 4.92,5.18 -1.16,3.27 -0.73,0.57 -2,5.88 -1.22,1.83 0.11,1.29 -1.26,0.02 -0.56,-1.13 -0.69,-0.05 -0.22,0.79 -2.07,-1.16 -3.57,-0.74 -0.61,0.72 -1.82,0.18 -0.54,-2.02 -2.81,-0.8 1.42,-3.3 -2.8,-1.64 -0.1,-0.99 -2.03,-1.1 -0.78,-2.08 1.25,-1.02 -0.49,-1.06 0.71,-0.89 -0.62,-2.7 z m -30.11,-3.87 0.31,0.79 1.76,0.49 1.54,1.7 1.33,-0.23 0.46,1.25 3.22,0.8 0.71,-0.79 2.02,0.32 0.01,1.62 0.59,0.42 0.4,-0.41 0.99,1.48 0.21,2.93 -1.32,1.94 1.48,0.71 -0.3,0.54 0.84,0.26 -0.19,0.75 0.96,1.07 -2.3,1.77 0.01,1.39 -0.86,0.83 -1.12,-0.67 -0.67,0.96 -1.51,-1.6 -5.09,-1.82 -1.42,-1.75 -4.67,1.31 -1.24,-2.27 -0.15,0.6 -0.67,-0.36 -0.07,0.63 -1.07,-0.37 -1.66,0.72 -0.86,-0.39 0.03,-0.68 1.34,-1.08 -0.52,-1.44 0.69,-0.2 -0.1,-1.05 -0.99,-0.46 -0.31,0.36 -0.6,-1.1 1.47,-1.31 0.36,0.59 1.58,-0.92 0.12,-0.81 -1.24,-0.67 0.26,-1.6 1.89,-0.92 0.52,-1.37 0.48,-0.16 v 0.84 l 0.5,-1.24 1.5,-0.02 z m 20.91,0.93 1.2,0.25 0.88,1.9 2.55,-0.38 0.2,-1.11 1.84,-0.67 0.84,0.5 -0.29,0.94 1.98,1.51 -0.5,1.49 0.62,2.7 -0.71,0.89 0.49,1.06 -1.25,1.02 0.78,2.08 2.03,1.1 0.1,0.99 2.8,1.64 -1.42,3.3 -4.3,-0.21 -1.54,0.56 -1.42,-0.53 -0.17,-1.1 -0.66,-0.33 -2.05,-0.09 -0.63,1.25 -1.69,-1.46 -0.99,-0.01 -0.43,0.95 -0.83,-0.25 -1.54,0.95 -2.41,0.54 -1.15,-0.5 -0.51,-1.11 -0.01,-1.39 2.3,-1.77 -0.96,-1.07 0.19,-0.75 -0.84,-0.26 0.3,-0.54 -1.48,-0.71 1.32,-1.94 -0.21,-2.93 0.37,-0.59 2.65,0.15 0.34,1.21 1.31,-1.38 0.89,0.58 0.57,-1.08 -0.88,-0.84 0.53,-0.15 -0.91,-1.51 2.05,-0.6 -0.68,-1.47 z m -28.38,14.08 1.66,-0.72 1.07,0.37 0.07,-0.63 0.67,0.36 0.15,-0.6 1.24,2.27 4.67,-1.31 1.42,1.75 5.09,1.82 1.51,1.6 0.67,-0.96 1.12,0.67 0.86,-0.83 0.51,1.11 1.15,0.5 2.41,-0.54 1.07,0.7 0.15,1.57 0.97,0.51 -0.71,0.69 -0.57,-0.39 -1.83,0.46 1.11,2.02 0.02,2.27 -2.4,-1.68 -1.73,0.72 -2.59,-0.17 -5.89,3.34 -2.55,-0.88 -0.95,0.35 -0.6,-0.66 -0.63,0.71 0.27,0.76 -1.03,0.96 -2.22,0.34 -1.03,-0.83 0.23,-0.39 -0.64,-0.36 -1,0.31 -0.6,-1.88 -2.16,0.53 -0.88,-0.13 -0.23,-0.68 -2.76,-0.14 0.52,-1.19 -0.86,-0.48 0.68,-1.41 -1.62,-1.55 2.37,-0.73 -0.03,-1.23 -0.65,-0.45 0.62,-0.76 -0.83,-0.28 0.18,-0.97 0.89,-0.68 1.44,0.05 -0.03,-1.44 1.2,-0.08 z m 3.13,15.65 1.03,0.83 2.22,-0.34 1.03,-0.96 -0.27,-0.76 0.63,-0.71 0.6,0.66 0.95,-0.35 2.55,0.88 5.89,-3.34 2.59,0.17 1.73,-0.72 2.4,1.68 1.47,0.78 -0.59,1.74 1.58,0.53 0.94,-0.82 0.66,0.59 0.36,1.37 -0.98,0.06 -0.2,0.94 1.22,1.68 2.08,1.08 -0.79,0.33 0.29,0.69 -0.53,0.69 0.79,3.48 0.91,1.36 -1.05,1.9 -0.4,-0.64 -1.5,0.85 -1.97,-2.16 -0.17,0.44 -1.86,-0.32 -0.47,-1.1 -1,0.11 0.19,1.13 -1.38,0.58 -0.84,-1.53 -1.9,-1.3 -0.04,-1.44 -1.18,-0.54 0.02,-0.93 -4.49,1.14 -1.42,1.19 -1.45,-1.19 -1.03,0.46 -1.73,-1.91 -1.72,0.16 -0.68,1.01 -0.77,-0.01 -1.57,-2.57 0.04,-0.76 0.61,-0.22 -1.14,-3.08 z"
        				},
        				{
        					"id" : "16",
        					"title" : "Уральский банк",
        					"d" : "m 285.55,547.43 0.41,-0.41 3.07,1.35 0.85,2.61 2.55,-0.54 5.4,0.97 11.05,7.22 1.27,1.92 -0.44,2.76 0.76,2.64 2.51,4.5 -0.22,2.26 3.19,1.32 0.49,0.92 1.09,8.34 1.69,1.25 6.76,0.94 0.31,1.27 0.95,0.23 1.87,5.96 1.36,1.53 1.5,0.54 0.27,1.25 0.44,4.04 1.19,2.82 -4.76,3.65 -0.92,-0.66 -3.73,2.08 0.86,1.02 -0.97,1.65 1.55,6.82 1.33,0.51 -0.5,1.47 -1.72,0.3 -0.87,-0.87 -1.88,-0.03 -1.78,1.21 0.06,1.16 -1.06,0.93 0.17,1.15 -0.77,0.27 -2.34,-0.28 -2.09,-1.62 -1.15,0.94 -2.79,-0.91 -2.13,1.69 -0.99,-1.1 -3.36,3.89 -0.08,1.58 -2.31,-2.14 -3.62,-0.82 -0.96,0.76 0.5,1.23 -2.6,0.27 -2.63,-0.8 -4.94,0.56 -0.68,-1.1 -2.56,-0.64 -0.8,0.42 0.16,1.24 -0.93,0.29 -0.15,1.04 -0.76,0.95 -2.6,-1.34 -1.76,0.98 -1.31,-0.49 -1.31,0.47 -1.72,-0.81 -1.08,0.48 -1.03,-2.65 0.18,-4.34 -1.31,-2.12 0.19,-1.12 0.55,-0.46 1.66,0.67 2.58,-2.48 1,0.34 -0.68,-1.79 0.33,-1.28 -1.05,-1.31 1.22,-4.05 0.64,-0.69 2.26,0.31 0.48,1.54 2.41,-2.25 0.07,-1.28 -1.42,-0.74 -0.64,-2.11 1.53,-2.31 1.34,-1.11 1.38,-0.1 2.05,-2.65 -0.15,-2.6 -1.26,-0.06 -1.23,-1.34 0.77,-2.35 -0.58,-1.01 0.16,-1.28 -1.21,-1.57 -1.78,-0.57 -1.8,-2.37 1.01,-3.46 3.15,-3.54 3.1,-11.31 0.01,-2.32 -0.91,-1.78 -0.48,-3.32 1.35,-4.63 -0.73,-1.82 -0.19,-2.39 z m 18.4,80.54 0.08,-1.58 3.36,-3.89 0.99,1.1 2.13,-1.69 2.79,0.91 1.15,-0.94 2.09,1.62 2.34,0.28 0.77,-0.27 -0.17,-1.15 1.06,-0.93 -0.06,-1.16 1.78,-1.21 1.88,0.03 0.87,0.87 0.2,2.91 1.06,2.9 3.51,0.43 2.63,3.45 1.84,-0.83 1.59,1.68 1.43,-1.18 0.56,0.96 1.48,-0.41 0.43,0.72 1.65,0.03 1.01,2.74 1.5,0.36 1.2,-0.4 0.75,0.85 2.03,-0.51 0.37,1.45 3.16,3.1 0.05,1.44 -0.28,0.89 -3.16,0.02 0.79,1.48 -0.62,1.38 -2.39,-0.23 -1.65,1.54 -2.32,-0.17 -1.91,1.15 -7.37,1.93 -0.53,-1.17 -1.37,1.35 -1.89,-0.58 -0.07,0.96 -2.01,0.59 0.15,2.25 -0.79,0.03 -0.96,-0.98 -1.6,0.75 -0.09,-0.57 -0.72,0.09 -1.49,0.84 -3.14,0.22 -4.43,1.39 -0.1,-0.8 -1.83,-1.3 0.07,-1.24 1.21,-0.77 -0.6,-2.3 -3.51,0.61 -1.31,-0.16 0.26,-0.52 -0.61,-0.38 -2.14,0.88 -1.01,-1.02 0.28,-0.65 -0.87,-2.86 1.64,0.33 0.45,-1.18 -1.41,-2.45 1.1,-0.45 -0.35,-1.34 2.11,-0.09 0.87,-1.22 -0.69,-0.19 0.56,-0.67 -0.12,-1.88 -1.58,-1.53 0.32,-0.62 -0.9,-0.05 z m -21.52,0.31 0.15,-1.04 0.93,-0.29 -0.16,-1.24 0.8,-0.42 2.56,0.64 0.68,1.1 4.94,-0.56 2.63,0.8 2.6,-0.27 -0.5,-1.23 0.96,-0.76 3.62,0.82 2.31,2.14 1.5,2.99 0.9,0.05 -0.32,0.62 1.58,1.53 0.12,1.88 -0.56,0.67 0.69,0.19 -0.87,1.22 -2.11,0.09 0.35,1.34 -1.1,0.45 1.41,2.45 -0.45,1.18 -1.64,-0.33 0.87,2.86 -0.28,0.65 1.01,1.02 2.14,-0.88 0.61,0.38 -0.26,0.52 1.31,0.16 3.51,-0.61 0.6,2.3 -1.21,0.77 -0.07,1.24 1.83,1.3 0.1,0.8 -1.51,0.06 -0.34,1.04 -2.18,-0.1 -1.91,2.63 -0.78,-0.45 -0.2,-0.72 0.54,-0.37 -0.49,-0.36 h -2.49 l -0.65,1.34 -0.77,-0.25 -0.15,-0.81 -0.45,0.59 -0.39,-0.55 -0.89,0.92 -1.57,-1.65 -0.99,0.67 v 1.42 l -1.64,-0.42 -0.27,0.67 1.05,0.2 0.59,1.02 -1.27,1.88 -0.88,-0.31 -0.02,0.6 3.15,0.7 1.06,-0.39 0.61,0.8 -1.03,0.8 -1.34,-0.54 -0.71,1.4 0.17,1.08 2.41,0.99 1.07,-0.46 0.94,1.09 2.24,0.53 0.19,1.32 -0.93,0.64 -0.94,-0.71 -1.69,0.58 -1.3,-0.86 -0.63,0.57 -0.97,-0.53 -1.52,0.61 0.35,0.81 -2.47,1.9 -0.1,1.15 0.91,0.42 0.05,1.19 0.9,0.16 0.7,1.95 -2.51,1.97 -1.37,0.04 -1.86,1.79 -1.11,0.17 -0.95,-0.66 1.79,-2.6 -0.37,-1.77 -1.52,0.17 -3.5,-1 -1.4,0.59 0.02,1.72 -1.4,-0.83 -0.58,-1.13 -1.03,0.02 -0.69,-2.39 0.47,-3.57 0.95,-1.13 -1.1,-2.56 0.45,-2.07 -0.46,-1.82 0.95,-4.23 1.76,-0.86 0.8,-1.98 3.01,0.2 0.36,-1.94 -0.9,-0.7 0.6,-0.87 -0.36,-0.78 1.74,-2.96 -0.08,-1.62 -1.1,0.18 -0.44,-0.75 -3.22,3.76 -1.12,-0.22 -2.16,0.8 -0.56,1.08 -2.17,-0.79 -3.11,1.71 -1.83,-2.36 -3.92,-3.1 0.71,-1.49 -1.07,-1.26 1,-2.04 2.03,-1.16 3.6,0.78 -0.33,4.1 1.86,-3.19 2.47,2.94 1.69,-1.2 -0.42,-1.02 -1.08,-0.46 0.7,-1.24 0.76,-0.57 1.53,0.38 0.9,-0.87 0.09,-1.09 2.21,-0.32 1.09,-1.59 -2.37,-0.4 0.01,-1.65 -1.35,-0.86 0.74,-1.54 -0.19,-1.2 1.12,-1.18 -0.34,-0.5 z m -33.18,-2.8 1.56,-2.41 2.45,1.99 1.61,-0.53 1.23,0.75 3.12,-1.55 2.24,2.83 2.82,-1.23 2.65,3.47 2.42,-0.95 1.51,-1.98 1.03,2.65 1.08,-0.48 1.72,0.81 1.31,-0.47 1.31,0.49 1.76,-0.98 2.6,1.34 0.76,-0.95 2.08,-0.34 0.34,0.5 -1.12,1.18 0.19,1.2 -0.74,1.54 1.35,0.86 -0.01,1.65 2.37,0.4 -1.09,1.59 -2.21,0.32 -0.09,1.09 -0.9,0.87 -1.53,-0.38 -0.76,0.57 -0.7,1.24 1.08,0.46 0.42,1.02 -1.69,1.2 -2.47,-2.94 -1.86,3.19 0.33,-4.1 -3.6,-0.78 -2.03,1.16 -1,2.04 1.07,1.26 -0.71,1.49 3.92,3.1 1.83,2.36 3.11,-1.71 2.17,0.79 0.56,-1.08 2.16,-0.8 1.12,0.22 3.22,-3.76 0.44,0.75 1.1,-0.18 0.08,1.62 -1.74,2.96 0.36,0.78 -0.6,0.87 0.9,0.7 -0.36,1.94 -3.01,-0.2 -0.8,1.98 -1.76,0.86 -0.95,4.23 0.46,1.82 -0.45,2.07 1.1,2.56 -0.95,1.13 -0.47,3.57 0.69,2.39 0.42,1.62 -1.48,0.76 -0.27,1.51 0.63,0.67 -1.38,3.55 -2.11,0.76 -1.12,-0.99 -2.51,-0.7 -1.29,1.9 -1.17,-0.33 -0.1,0.99 -1.22,0.79 -2.11,-2.09 -0.39,0.24 0.36,1.18 -1.04,0.41 0.28,-1.08 -1.26,-2.03 0.66,-0.99 -0.79,-1.69 -1.33,-1.35 -0.85,0.91 -0.7,-0.73 1.46,-1.97 -0.73,-1.96 0.41,-0.79 -0.73,0.16 -1.67,-1.15 -1.93,3.47 -2.01,-0.6 -0.51,-2.12 -1.61,-0.84 1.2,-0.81 -0.46,-1.44 h -1.78 l -1.35,-4.49 -1.97,0.07 -0.83,-1.42 -2.11,-0.51 -1.17,-0.99 -4.72,-6.95 0.25,-4.84 1.47,-3.11 -0.24,-1.24 0.61,-1.11 -3.86,-2.66 0.29,-0.65 2.5,-0.67 2.65,-2.24 0.76,-2.5 1.37,-1.25 -0.04,-1.02 -2.85,-2.7 2.18,-1.97 0.71,-1.51 1.34,-0.71 z" ,
        				},
        				{
        					"id" : "52",
        					"title" : "Юго-Западный банк",
        					"d" : "m 158.33,744.39 3.03,0.77 0.73,-2.09 0.72,0.21 -0.14,1.5 1.69,-0.22 1.78,-1.01 0.95,-1.38 3.94,2.54 3.97,1.05 2.75,3.87 3.16,0.87 4.21,2.3 1.79,2 -0.85,1.07 0.06,1.84 -2.08,1.76 -0.08,0.94 1.25,0.28 0.08,1 -2.04,1.35 2.63,0.36 0.03,1.56 -0.88,1.63 -1.05,-0.03 -0.28,-0.82 -0.85,0.21 -0.16,1.89 -1.15,0.4 -0.8,-0.99 -3.04,0.13 0.69,-2.17 -0.9,1.13 -2.31,-0.88 -1.35,1.83 -1.52,-0.44 -1.41,0.42 -0.73,-1.37 -3.55,1.29 -1.05,-2.18 -0.52,-0.13 -0.27,0.73 -1.19,-0.69 0.29,-1.05 2.38,-1.3 -0.75,-1.16 -1.13,1.13 -0.79,-0.82 -2.33,-0.45 -0.73,-1.2 -1.15,0.24 -2.58,-2.38 1.7,-1.43 -0.07,-1 -1.4,-0.76 -0.87,-2.11 -2.46,-0.3 -0.28,-1.86 -1.39,-1.5 0.23,-1.27 1.87,0.12 1.05,-0.92 -0.72,-2.25 1.57,0.33 0.47,-0.67 z m -2.02,-44.74 1.85,1.78 -0.21,1 1.75,0.39 2.07,1.82 -0.85,3.71 0.1,2.65 2,-0.01 0.39,1.36 1.69,0.36 1,1.6 -1.02,2.9 -4.15,1.83 0.42,1.46 -0.79,0.37 0.36,0.79 -0.45,1.38 3.23,0.48 1.89,1.46 2,4.03 1.6,-0.49 -0.08,0.88 0.66,0.48 2.99,-0.72 1.26,1.99 0.64,-1.14 1.24,-0.5 0.25,-1.08 1.2,1.01 -0.64,5.76 -1.25,0.72 -1.9,2.59 0.83,0.3 0.06,2.36 -0.77,0.4 -0.54,-1.17 -1.01,2.47 -1.58,0.03 -3.12,-2.5 -1.93,0.53 -4.47,-2.39 1,2.23 -1.91,0.49 0.09,0.95 -0.73,0.54 -1.31,-0.22 0.16,1.86 -1.83,-0.08 -0.47,0.68 -1.57,-0.33 -1.47,-1.83 -0.2,-1.34 -1.34,0.51 -0.75,-0.57 H 148 l -0.84,-2.33 -1.5,-0.67 0.49,-1.73 -0.71,-0.54 -3.9,-0.76 -1.39,0.79 -0.8,1.35 -1.5,-0.12 -0.5,0.59 0.64,-2.15 -1.63,-0.39 3.19,-1.77 1.35,0.23 -0.36,-2.54 -2.06,-0.08 -0.02,0.73 -2.79,0.89 -0.43,-0.35 0.39,-0.96 1.6,-0.2 -0.03,-0.45 -3.84,1.33 0.67,-0.82 -0.79,-0.63 0.56,-0.73 -0.06,-1.6 0.56,-0.82 2.82,-0.78 0.83,-2.04 6.33,0.54 0.61,-1.79 -0.36,-0.47 0.65,-0.1 0.93,-2.2 -0.23,-0.69 -0.98,-0.07 0.69,-0.51 -0.69,-2.16 -1.38,-0.58 1,-2.45 1.39,0.53 0.76,-0.9 -1.92,-0.05 -1.15,-1.74 1.9,-0.17 0.63,-1.22 1.26,-0.75 0.06,-3.51 0.54,-0.68 2.2,0.48 2.81,-1.1 1.06,-2.46 1.96,-1.81 z m 21.39,67.73 3.04,-0.13 0.8,0.99 -0.23,1.06 -0.71,-0.38 -0.27,0.97 -1.39,-0.5 0.33,3.39 0.77,0.03 1.28,1.32 0.37,1.55 -0.93,0.94 -0.98,-0.66 -0.27,1.06 -2.54,0.34 -2.69,1.5 -1.55,-0.67 0.43,-1.19 -2.68,-1.42 1.71,-0.35 1.99,-3.26 1.29,1.06 0.5,-1.8 2.31,-0.07 0.19,-2.23 -0.84,-0.79 z m -4.97,-38.21 0.16,-2.26 2.18,-1.3 -0.01,-0.84 0.73,-0.36 1.75,0.51 0.8,-0.93 0.24,-0.51 -1.42,-0.72 0.72,-1.48 1.33,0.37 0.05,1.36 1.05,-0.48 0.92,0.36 0.37,-1.14 2.6,0.38 1.79,1.43 1.33,-0.03 -0.1,1.74 4.52,4.51 1.98,-2.18 1.11,0.33 -2.01,1.92 2.37,4.38 2.86,2.78 -0.28,0.9 -1.62,1.18 -0.07,1.11 -1.4,0.09 -1.34,1.28 1.83,0.65 0.66,1.74 2,-0.44 0.23,0.42 -2.65,4.95 4.87,-0.19 -0.52,0.93 0.67,0.6 -0.58,3.42 -0.97,-1.13 0.38,1.31 -0.81,1.46 -0.42,-0.15 -1.03,1.69 -0.49,-0.59 -0.53,0.58 -0.55,-0.46 -1.06,0.43 -2.61,-1.6 -4.85,-0.39 -1.79,-2 -4.21,-2.3 -3.16,-0.87 -2.75,-3.87 -3.97,-1.05 -3.94,-2.54 -0.95,1.38 -1.78,1.01 -1.69,0.22 0.14,-1.5 -0.72,-0.21 -0.73,2.09 -3.03,-0.77 -0.17,-1.86 1.31,0.22 0.73,-0.54 -0.09,-0.95 1.91,-0.49 -1,-2.23 4.47,2.4 1.92,-0.53 3.12,2.5 1.58,-0.03 1.01,-2.47 0.55,1.17 0.76,-0.4 -0.06,-2.37 -0.83,-0.3 1.9,-2.59 1.25,-0.72 0.64,-5.76 -1.2,-1 -0.25,1.08 -1.24,0.49 -0.65,1.14 z m -15.93,28.76 1.7,-1.44 -0.08,-1 -1.4,-0.75 -0.87,-2.12 -2.46,-0.3 -0.28,-1.86 -1.39,-1.5 0.22,-1.27 1.88,0.12 1.04,-0.93 -0.72,-2.24 -1.47,-1.83 -0.2,-1.34 -1.34,0.51 -0.75,-0.57 h -2.7 l -0.84,-2.33 -1.5,-0.67 0.49,-1.73 -0.71,-0.54 -3.9,-0.76 -1.39,0.79 -0.8,1.35 -1.5,-0.12 -0.5,0.59 0.64,-2.15 -1.63,-0.39 -1.15,-0.08 -0.56,0.57 -0.12,0.76 1.25,0.3 0.11,0.6 -0.64,0.25 -1.3,-0.25 -0.24,-0.78 -2.09,1.11 -1.96,-0.54 1.35,2.91 1.62,0.33 3.06,2.71 0.09,0.78 -2.42,-1.23 -0.94,2.11 0.04,-1.08 -1,0.21 -1.01,2.87 -1.57,0.94 -0.49,2.8 -2.29,0.58 -3.16,-1.12 0.51,0.64 -0.66,0.03 0.24,0.74 1.42,-0.24 -0.03,0.39 -2.83,0.94 0.99,0.87 3.6,1.2 1.76,2.98 1.83,0.45 0.46,-0.85 2.87,3.18 4.23,1.36 8.32,8.74 0.43,0.13 0.68,-1.81 4.37,0.37 0.05,-1.97 0.68,-1.79 0.82,-0.32 0.06,-1.5 3.13,0.47 1.27,1 1.81,-2.39 -0.78,-1.62 1.22,-0.91 z m -5.2,2.3 -0.72,-0.39 -0.62,-2.15 -1.19,-0.4 -0.53,1.54 1.03,2.29 -0.6,1.71 0.47,1.84 -0.38,1.26 -1,0.86 -2.53,-1.55 -1.48,0.1 -0.6,-0.52 1.05,-1.09 -0.58,-1.01 0.67,-0.3 1.01,1.4 1.07,-0.59 -0.04,-1.25 -1.65,-0.98 -0.14,-2.12 1.49,-1.9 -0.67,-0.47 0.37,-0.39 -0.78,-0.77 0.22,-0.57 -1.86,-0.65 -0.64,1.99 -1.16,0.37 -3,-0.27 -3.09,-1.84 0.44,-0.57 2.31,0.93 1.66,-0.1 3.1,-1.77 2.95,1.21 1.95,-0.33 1.44,1.2 z m 7.78,0.08 1.15,-0.24 0.73,1.2 2.33,0.45 0.79,0.82 1.13,-1.13 0.75,1.16 -2.38,1.3 -0.29,1.05 1.19,0.69 0.27,-0.73 0.52,0.13 1.05,2.18 -0.39,1.06 -1.71,1.02 -0.26,3.48 -0.82,-0.68 -2.71,0.59 -1.33,-0.52 -1.73,0.24 -1.6,-1.36 -2.49,-0.21 -2.47,-1.46 0.05,-1.97 0.69,-1.79 0.82,-0.32 0.06,-1.5 3.13,0.47 1.27,1 1.81,-2.39 -0.78,-1.62 z m 7.24,6.88 3.55,-1.29 0.73,1.37 1.41,-0.42 1.52,0.44 1.35,-1.83 2.31,0.88 0.9,-1.13 -0.69,2.17 -0.07,0.76 0.84,0.79 -0.19,2.23 -2.31,0.07 -0.5,1.8 -1.29,-1.06 -1.99,3.26 -1.71,0.35 -1.62,-0.38 -2.14,-2.3 -1.51,0.32 -0.95,-0.47 0.26,-3.48 1.71,-1.02 z m 12.89,9.83 0.27,-1.06 0.98,0.66 0.93,-0.94 -0.37,-1.55 -1.28,-1.32 -0.77,-0.03 -0.33,-3.39 1.39,0.5 0.27,-0.97 0.71,0.38 2.08,0.97 -0.14,0.89 0.8,0.38 -1.59,5.99 -1.51,-0.5 -0.79,1.18 z m 7.4,-22.22 4.85,0.39 2.61,1.6 1.06,-0.43 -0.74,1.43 0.44,1.38 -0.73,0.34 1.89,1 0.58,1.92 0.93,0.17 2.13,3.74 -0.98,2.66 0.49,0.68 1.23,-3.89 h 0.93 l -2.03,4.97 0.92,0.74 -1.09,2.67 1.7,1.36 0.31,2.39 2.45,3.06 2.14,4.13 0.96,0.45 -0.65,2.27 -2.65,1.32 -1.19,2.56 -2.46,0.12 -1.91,-1.06 -1.1,-2.52 -0.76,0.25 -1.83,-2.9 -1.39,0.5 -1.28,-1.46 -3.17,-0.64 -2.35,-1.78 0.2,-0.76 0.75,-0.15 0.2,-1.52 1.76,-1.12 0.22,-0.94 1.32,-0.37 -0.63,-0.87 0.74,-0.61 0.91,-0.3 0.52,0.51 0.76,-0.77 -1.34,-4.85 1.8,-3.68 -1.39,-2.03 -1.09,0.91 0.1,0.59 -1.45,0.65 0.03,-1.21 -2.17,-0.01 -1.55,-0.73 -0.03,-1.56 -2.63,-0.36 2.04,-1.35 -0.08,-1 -1.25,-0.28 0.08,-0.94 2.08,-1.76 -0.06,-1.84 z m -1,10.16 1.55,0.73 2.17,0.01 -0.03,1.21 1.45,-0.65 -0.1,-0.59 1.09,-0.91 1.39,2.03 -1.8,3.68 1.34,4.85 -0.76,0.77 -0.52,-0.51 -0.91,0.3 -0.74,0.61 0.63,0.87 -1.32,0.37 -0.22,0.94 -1.76,1.12 -1.46,-0.83 -1.71,0.15 -1.18,-1.6 -0.56,0.02 1.59,-5.99 -0.8,-0.38 0.14,-0.89 -2.08,-0.97 0.23,-1.06 1.15,-0.4 0.16,-1.89 0.85,-0.21 0.28,0.82 1.05,0.03 z m -34.37,-5.92 0.28,0.94 -0.65,0.25 -0.92,-2.54 -1.19,-0.39 -0.53,1.54 1.03,2.29 -0.6,1.71 0.47,1.84 -1.38,2.11 -2.52,-1.55 -1.48,0.1 -0.6,-0.52 1.04,-1.09 -0.58,-1.01 0.42,-0.28 1.26,1.38 1.07,-0.59 -0.04,-1.25 -1.65,-0.98 -0.14,-2.12 1.49,-1.9 -0.67,-0.48 0.37,-0.39 -0.78,-0.77 0.23,-0.57 -1.86,-0.65 -0.64,1.99 -1.16,0.37 -3,-0.27 -3.09,-1.85 0.44,-0.57 2.32,0.93 1.65,-0.1 3.1,-1.77 2.95,1.21 1.95,-0.33 1.44,1.2 z"
        				},
        				{
        					"id" : "40",
        					"title" : "Среднерусский банк",
        					"d" : "m 120.68,596.87 0.58,0.09 1.23,-2.61 1.36,-0.33 -0.52,-0.94 1.79,-0.62 3.84,4.85 0.12,1.23 -1.08,0.23 -0.47,0.68 0.46,0.51 -0.94,0.94 1.72,0.85 0.92,1.4 -2.47,1.51 -0.07,0.49 1.39,0.3 -1.02,0.01 0.44,0.46 -0.56,0.76 1.95,1.13 1.35,1.83 0.17,1.91 1.28,1.44 1.88,-0.46 0.29,1.08 -1.07,0.65 -0.02,0.76 0.65,0.62 0.1,1.43 -1.26,0.71 0.61,0.31 -0.36,0.95 0.98,1.41 -1.65,0.2 -0.51,-1.35 -2,-1.2 -1.17,0.61 -0.48,1.68 -2.1,-0.13 -0.89,0.52 0.25,2.7 -2.18,-0.62 -2.04,1.59 -2.76,0.78 -0.39,1 -2.33,-0.64 -0.7,-1.25 -1.24,0.79 -0.53,-0.35 -0.09,0.97 0.72,-0.05 -0.09,1.66 -1.36,0.41 0.19,1.73 -1.35,1.67 -2.43,-0.19 -0.55,0.78 -2.2,-1.3 -0.48,0.73 -0.6,-1.31 -2.52,-0.04 -0.49,0.66 0.55,0.4 -0.31,0.98 -1.04,-0.81 0.03,1.16 -1.03,0.67 0.06,0.69 -2.32,0.77 -0.48,1 -1.17,-0.53 -0.4,0.69 -1.81,-0.52 -1.11,0.43 0.41,-0.78 -0.52,-0.25 -0.27,0.85 -0.78,-0.64 -1.78,0.61 -0.45,-0.33 0.65,-0.34 -0.72,-0.04 -0.19,-0.71 -1.28,0.23 -0.07,0.77 -3.23,-1.36 -0.44,-2.91 1.03,-1.03 -0.47,-1.29 0.53,-0.51 -0.5,-0.44 0.59,-0.73 -1.62,-0.35 -0.67,-0.48 0.07,-1.06 -1.5,-0.36 0.21,-1.95 -1.72,-1.28 1.3,-2.98 1.68,0.77 0.45,-0.49 2.48,0.4 1.14,-2.23 1.16,-0.33 0.59,0.59 0.14,-0.97 1.68,-0.46 0.09,-1.06 2.8,-0.85 1.01,-1.69 1.16,-0.25 0.54,0.5 0.9,-0.62 0.75,0.9 -0.33,-1.58 0.79,-0.69 -0.23,-1.53 2.02,-0.54 -0.33,-0.69 1.19,-2.47 -1.13,-0.94 1.18,-1.59 1.32,0.21 1.16,-1.27 4.53,2.03 0.78,-2.34 1.75,0.76 1.03,-0.49 0.98,-1.22 -0.03,-0.98 1.73,-0.87 2.64,0.49 0.18,-0.87 0.64,0.26 z m 5.49,48.17 1.73,0.22 0.65,1.35 1.06,0.1 0.57,-1.47 1.2,-0.24 0.7,1.61 1.45,1.05 1.6,-0.15 -0.06,1.24 -0.66,0.13 0.99,2.11 -0.21,0.85 0.72,0.27 0.49,0.28 0.14,0.05 0.93,1.03 -0.85,1.25 1,1.45 0.69,-0.13 -0.86,1.35 0.61,0.07 -0.05,0.82 0.84,-0.03 -0.67,2.28 -1.33,0.83 0.68,1.47 -2.05,0.6 0.91,1.51 -0.53,0.15 0.88,0.84 -0.57,1.08 -0.89,-0.58 -1.31,1.38 -0.34,-1.21 -2.65,-0.15 -0.37,0.59 -0.99,-1.48 -0.4,0.41 -0.59,-0.42 -0.01,-1.62 -2.02,-0.32 -0.71,0.79 -3.22,-0.8 -0.46,-1.25 -1.33,0.23 -1.54,-1.7 -1.76,-0.49 -0.31,-0.79 0.54,-0.6 -1.04,-0.86 -0.01,-0.93 0.99,-1.27 0.59,0.13 -0.01,-1.07 0.71,-0.75 -1.4,-0.17 0.77,-0.37 -0.81,-0.46 1.18,0.18 0.72,-0.97 0.8,0.19 1.65,-1.04 2.37,0.18 -0.05,-1.72 -0.72,-0.11 -0.21,-0.72 0.63,-0.43 -0.25,-0.58 0.81,-0.21 0.73,0.66 z m -41.45,-11.6 3.23,1.36 0.07,-0.77 1.28,-0.23 0.19,0.71 0.72,0.04 -0.65,0.34 0.45,0.33 1.78,-0.61 0.78,0.64 0.27,-0.85 0.52,0.25 -0.41,0.78 1.11,-0.43 1.81,0.52 0.4,-0.69 1.17,0.53 0.48,-1 2.32,-0.77 -0.06,-0.69 1.03,-0.67 -0.03,-1.16 1.04,0.81 0.31,-0.98 -0.55,-0.4 0.49,-0.66 2.52,0.04 0.6,1.31 0.48,-0.73 2.2,1.3 0.55,-0.78 2.43,0.19 1.36,2.19 0.42,2.14 -0.63,0.64 -0.23,3.16 0.66,0.74 -1.36,3.34 -0.48,-0.45 -1.66,1.7 0.45,1.38 -1.99,1.13 -1.54,-0.4 0.71,0.97 -0.48,1.44 -1.63,0.14 -1.77,-0.91 -2.27,0.72 -0.31,1.85 0.65,0.48 -1.18,2.9 -0.72,0.11 0.43,0.69 -0.77,0.97 -0.56,-0.5 -0.54,1.19 0.53,0.67 -0.74,0.11 -0.15,1.11 -2.05,1.72 -0.23,1.8 -1.11,0.12 0.03,-0.65 -1.05,-0.02 -1.21,-1.42 0.11,-1.83 -2.45,-0.87 -2.56,0.15 0.85,-3.07 -3.97,-2.58 -0.64,-2.49 -1.12,-0.58 0.89,-1.79 -1.52,-0.25 0.05,-0.49 -1.75,-1.08 0.56,-1.82 0.76,-0.13 -0.1,-0.86 0.68,-0.26 -0.29,-1.72 -1.11,-1.44 0.78,-1.3 -0.16,-2.79 1.1,-1.34 z m 51.19,18.67 0.49,0.28 z m 11.83,-13.13 0.92,-0.16 -0.13,0.86 1.48,-0.53 0.3,1.52 1.95,-0.12 0.18,-0.76 0.68,0.08 0.61,1.49 0.89,-1.11 1.77,1.27 1.22,-0.44 0.4,0.52 0.89,-0.16 0.47,1.13 1.09,-0.64 -0.16,1.29 1.62,0.39 1.64,-0.71 0.46,0.37 -0.41,1.72 -0.8,0.63 0.4,0.76 1.75,0.72 0.62,1.36 -1.31,1.71 0.79,0.78 -0.98,0.18 -1.62,1.55 -0.71,-0.29 0.71,1.09 1.32,-1.02 0.39,0.59 1.13,-0.07 0.29,0.68 -1.42,0.24 0.13,0.7 -0.66,-0.45 -0.55,0.4 -0.39,-0.72 -0.36,0.58 1.73,1.6 -1.23,1.58 -1.71,0.27 -3.52,0.32 -0.15,-0.44 -0.25,0.62 -0.99,0.03 -0.35,2.63 -1.05,0.61 -0.21,0.88 -3.45,-1.74 -0.71,1.38 -0.56,-0.71 -0.48,0.32 0.24,0.8 -2.3,0.89 -1.98,-1.51 0.28,-0.94 -0.83,-0.5 -1.84,0.67 -0.2,1.11 -2.55,0.39 -0.88,-1.9 -1.19,-0.25 0.67,-2.28 -0.84,0.03 0.05,-0.82 -0.6,-0.07 0.86,-1.35 -0.69,0.13 -1,-1.45 0.84,-1.25 -0.93,-1.03 0.41,-1.19 0.73,-0.41 0.6,0.43 0.51,-0.6 -1.3,-0.97 0.23,-1.67 2.88,-0.4 1.59,-3.62 1.18,-1.23 1.35,0.23 0.39,-1.31 -0.96,-0.08 0.49,-0.89 1.41,-0.18 z m -36.49,-7.81 1.36,-1.66 -0.19,-1.73 1.36,-0.41 0.09,-1.66 -0.72,0.05 0.09,-0.97 0.53,0.35 1.23,-0.79 0.71,1.25 2.33,0.64 0.39,-1 2.76,-0.78 2.04,-1.59 2.18,0.62 -0.26,-2.7 0.89,-0.52 2.09,0.13 0.49,-1.68 1.17,-0.61 2,1.2 0.51,1.35 1.64,-0.2 0.79,0.92 -0.59,0.14 0.41,1.53 -0.63,0.59 1.2,1.78 -0.34,1.62 0.89,0.7 0.47,2.91 1.68,0.74 1.54,-0.25 0.47,1.22 1.58,-0.15 -0.03,1.15 1.12,0.36 1.82,-1.21 1.09,0.12 0.16,1.23 1.2,0.99 -0.25,1.7 1.02,0.36 -0.38,0.98 0.56,1.11 -1.68,1.56 -1.41,0.18 -0.49,0.89 0.96,0.08 -0.39,1.31 -1.35,-0.23 -1.18,1.23 -1.59,3.62 -2.88,0.4 -0.23,1.67 1.3,0.97 -0.51,0.6 -0.6,-0.43 -0.73,0.41 -0.41,1.19 -0.14,-0.05 -0.49,-0.28 -0.72,-0.27 0.21,-0.85 -1,-2.11 0.66,-0.13 0.06,-1.24 -1.6,0.15 -1.46,-1.06 -0.7,-1.61 -1.2,0.24 -0.57,1.47 -1.06,-0.11 -0.64,-1.34 -1.74,-0.22 -1.08,-3.29 0.32,-0.48 0.11,-0.01 0.73,-1.33 1.36,0.01 0.46,-1.75 -0.54,-0.99 1.02,0.4 0.44,-1.73 0.97,-0.21 0.95,-1.41 0.75,0.35 -0.9,-0.97 -0.04,-1.01 -2,-1.05 0.12,-0.58 -1.06,1.01 -0.05,-0.94 -0.6,-0.04 0.53,1.06 -0.57,0.33 0.26,0.72 -0.42,-0.09 0.6,1.27 -0.44,0.21 0.61,0.21 -2.3,0.81 0.39,2.05 -1.26,-0.2 -0.28,-0.75 -0.86,0.12 0.3,1.62 1.22,1.17 -0.55,0.65 -0.01,0.01 -1.19,0.46 -0.18,-0.6 -1.1,-0.04 -0.23,-1.04 -1.31,0.46 -0.91,1.65 -3.06,-0.76 -0.7,-0.75 -1.76,0.88 -1.1,-0.46 -0.65,-0.73 0.23,-3.17 0.63,-0.64 -0.43,-2.14 z m 14.9,-0.06 -0.52,-0.87 0.98,0.43 z m 1.54,-0.57 0.23,0.13 -0.4,-0.01 z m -3.13,3.12 1.01,0.36 -1.7,-0.12 0.71,-0.3 z m 6.21,-0.86 0.38,-0.05 -0.31,0.13 z m -6.35,7.64 z m 0.04,0.09 0.01,-0.02 z m 0.73,0.77 -0.14,0.05 z m -12.36,-1.26 1.1,0.45 1.76,-0.88 0.7,0.76 3.06,0.76 0.9,-1.66 1.31,-0.45 0.23,1.04 1.1,0.04 0.18,0.6 1.18,-0.46 -0.01,0.02 0.07,0.18 h 0.01 l 0.02,0.02 0.03,0.05 -0.01,0.02 -0.01,0.01 0.6,0.81 0.14,-0.05 0.22,-0.02 -0.32,0.47 1.08,3.29 -0.91,3.64 -0.73,-0.66 -0.81,0.21 0.25,0.58 -0.63,0.43 0.21,0.72 0.72,0.11 0.05,1.72 -2.37,-0.18 -1.65,1.04 -0.8,-0.19 -0.72,0.97 -1.18,-0.18 0.81,0.46 -0.77,0.37 1.4,0.17 -0.71,0.75 0.01,1.07 -0.59,-0.13 -0.99,1.27 0.01,0.93 1.04,0.86 -0.54,0.6 -1.35,1.38 -1.5,0.02 -0.5,1.24 v -0.84 l -0.48,0.16 -0.52,1.37 -1.89,0.92 -0.78,-0.94 -3.49,-0.95 -0.16,-2.9 -2,-2.26 -1.99,0.22 -0.83,-1.46 -2.1,-0.43 -0.43,-0.69 0.72,-0.11 1.18,-2.9 -0.65,-0.48 0.31,-1.85 2.27,-0.72 1.77,0.91 1.63,-0.14 0.48,-1.44 -0.71,-0.97 1.54,0.4 1.99,-1.13 -0.45,-1.38 1.66,-1.7 0.48,0.45 z m -13.15,15.09 2.1,0.43 0.83,1.46 1.99,-0.22 2,2.26 0.16,2.9 3.49,0.95 0.78,0.94 -0.26,1.6 1.24,0.67 -0.12,0.81 -1.58,0.92 -0.36,-0.59 -1.47,1.31 0.6,1.1 0.31,-0.36 0.99,0.46 0.1,1.05 -0.69,0.2 0.52,1.44 -1.34,1.08 -0.03,0.68 0.86,0.39 -1.03,1.71 -1.2,0.08 0.03,1.44 -1.44,-0.05 -0.89,0.68 -0.18,0.97 0.83,0.28 -0.62,0.76 -0.53,0.15 0.08,-0.57 -1.33,-1.03 0.25,-1.59 -2.03,-2.61 -2.3,0.75 0.14,-0.66 -2.4,-0.3 -2.05,1.54 -3.75,-1.2 -0.18,2.35 -2.07,1.42 -1,-0.08 0.12,-0.63 -1.02,-0.14 -0.19,-0.99 -0.72,-0.12 -0.76,-3.6 0.65,-0.64 -1.08,-1.6 0.63,-1.02 -2.53,-3.08 1.08,-0.68 0.2,-1.23 1.46,-0.44 2.15,1.74 2.12,-0.12 1.58,-1.17 0.44,-1.2 1.67,-0.45 0.13,-0.96 1.11,-0.12 0.23,-1.8 2.05,-1.72 0.15,-1.11 0.74,-0.11 -0.53,-0.67 0.54,-1.19 0.56,0.5 z"
        				},
        				{
        					"id" : "44",
        					"title" : "Сибирский банк",
        					"d" : "m 552.24,659.18 0.1,-0.89 1.02,-0.08 1.68,1.72 h 1.15 l 2.18,2.75 2.94,0.27 0.51,1.49 1.42,0.23 0.11,1.32 4.71,-0.52 0.62,0.45 -0.53,0.63 2.38,1.44 -0.09,0.7 -1.36,-0.77 -0.8,0.52 0.27,2.53 -2.04,2.94 v 1.84 l 1.22,-0.17 -0.13,0.76 1.23,0.14 0.13,1.08 -0.78,-0.19 -1.32,3.71 -2.74,1.18 -0.58,2.95 -1.33,0.28 -0.74,1.31 -0.84,3.64 1.37,1.55 -0.46,0.97 0.67,1.46 1.97,1.18 -0.49,3.28 -2.73,3.38 -0.57,-0.4 -1.51,0.44 0.14,0.74 -2.06,1.38 -0.97,-0.24 -1.28,-1.5 -1.43,-0.35 -0.88,0.46 -0.33,-0.86 -1.49,0.93 -0.96,-1.04 -1.57,-0.31 -0.72,0.44 -1,-0.68 -0.69,0.85 -1.72,0.49 -2.89,-0.4 -0.93,-1.17 -2.48,0.31 -1.52,-2.01 -0.94,-4.05 -8.4,0.09 -0.87,-0.71 0.19,-1.74 -1.37,-0.06 -0.51,0.91 -0.94,0.05 -1.75,-2.15 -0.69,2.02 -0.95,0.4 -2.77,-0.45 -0.8,1.63 -1.47,0.33 -0.08,1 -4.96,-0.34 -0.5,1.7 0.68,1 -0.72,0.94 -2.11,0.21 -0.68,1.41 -1.34,-0.22 -3.45,1.01 -0.16,-1.65 -1.84,-1.58 1.44,-1.36 -0.3,-1.14 1.61,1.23 1.12,-1.23 -5.95,-6.76 -0.72,-2.61 0.41,-1.21 -1.47,-1.71 2.95,-1.01 -0.21,1.03 0.45,0.19 1.5,-0.6 1.29,0.64 1.86,-2.02 1.29,-0.56 -0.74,-1.72 0.82,-1.51 -0.17,-1.2 2.89,-0.45 1.42,1.21 1.03,2.1 1.35,-0.58 0.99,0.72 4.51,0.11 1.44,1.13 6.28,-1.07 3.58,-3.4 1.94,-0.71 1.08,-3.3 1.1,-1.07 1.69,-3.6 2.38,-0.63 1.3,-3.77 -0.59,-0.98 0.72,-0.63 2.23,-0.03 1.08,-0.87 1.36,0.76 2.44,-1.34 2.42,0.47 1.28,-1.41 1.3,0.62 1.94,-0.7 z m -154.28,-64.05 3.84,-4.1 -0.45,-3.29 1.52,-1.38 0.8,-1.79 0.8,-0.15 0.88,-1.43 3.57,-0.62 0.68,-5.82 -0.32,-1.46 1.05,-2.11 -0.06,-3.32 1.54,-1.27 -0.51,-1.39 0.64,-2.81 6.71,1.15 0.61,-0.61 3.01,0.31 1.06,-0.83 1.4,1.22 1.61,-0.96 1.06,0.25 0.4,1.94 1.06,0.25 5.09,-0.42 4.72,-1.7 1.63,0.77 0.25,1.6 5.61,-0.02 2.07,1.72 1.79,-1.28 0.11,-1.47 0.81,-0.86 4.77,-3.64 2.31,-0.17 3.07,2.63 2.2,-0.14 4.11,7.43 -1.23,1.92 -0.56,3.16 0.49,1.54 12.07,-1.03 4.56,0.88 1.15,1.01 0.14,2.03 2.43,0.08 2.74,5.94 5.09,-0.29 0.12,1.17 1.5,2.32 -2,1.05 -4.32,5.59 0.25,3.58 0.87,2.19 3.99,0.85 2.28,1.66 2.15,-0.07 0.96,1.85 -0.15,2.42 -2.25,0.72 0.3,1.1 -1.51,0.73 -1.34,3.06 -1.14,1.1 -0.14,0.54 1.2,-0.14 0.33,0.73 -0.82,1.93 -0.5,1.15 -0.96,-0.3 -5.63,3.61 -0.34,-1.49 -1.59,0.92 0.07,-0.88 -1.36,0.01 -0.23,0.99 -2.38,0.44 0.01,-1.07 -1.47,-0.02 -1.29,0.83 -1.4,-1.08 -0.54,1.62 -2.53,1.48 -0.36,0.97 -1.52,0.49 0.62,0.83 -5.91,1.07 -2.48,1.46 -1.32,0.7 -0.94,-0.73 -1.25,0.41 -2.62,4.06 -2.33,-0.03 -0.51,-0.68 1.04,-1.45 -0.59,-3.01 -1.39,-2.09 1.1,-2.02 -0.87,-1.65 -1.95,0.52 -0.41,1.2 -8.34,1.84 -3.38,-3.56 -6.32,1.35 -3.81,-5.41 -3.16,-1.92 -5.77,-1.27 -0.9,-0.99 -10.54,-0.03 -5.65,-0.98 -1.06,-2.09 -0.79,0.23 -1.32,-3.5 -0.83,-0.06 -0.2,-4.09 -3.05,-1.96 1.01,-1.62 -1.42,-1.36 2.18,-1.8 -1.29,-1.82 z m 6.9,19.14 5.65,0.98 10.54,0.03 0.9,0.99 5.77,1.27 3.16,1.92 3.81,5.41 6.32,-1.35 3.38,3.56 8.34,-1.84 0.41,-1.2 1.95,-0.52 0.87,1.65 -1.1,2.02 1.39,2.09 0.59,3.01 -1.04,1.45 0.51,0.68 2.33,0.03 2.62,-4.06 1.25,-0.41 0.94,0.73 1.32,-0.7 0.65,0.19 0.13,3.44 1.77,2.12 -0.2,1.57 -1.06,0.82 1.74,0.06 -0.03,4.87 1.44,2.31 -1.03,1.34 0.83,0.78 -0.55,0.77 0.8,1.97 -3.37,1.54 -1.41,1.78 -1.29,-0.64 -2.05,1.06 -3.36,0.16 0.1,1.04 -0.66,0.73 -0.85,-1.11 -1.56,0.23 -2.64,2.59 -0.36,2.02 -1.43,1.45 -2.12,-1.18 -0.16,-0.81 -2.51,-0.54 -0.49,-1.27 0.81,-1.12 -1.88,-0.05 -0.03,-1.13 -0.83,-0.84 -2.41,-0.35 -1.82,-3.05 -0.54,0.58 0.27,0.83 -1.73,0.52 -0.35,1.04 -2.04,1.05 -1.04,-0.27 -2,2.55 -1.58,0.5 -0.99,1.2 -5.52,0.63 -0.73,1.54 -2.15,0.54 -0.81,-0.64 -0.04,-0.89 -1.55,0.63 0.02,0.86 0.74,0.44 -0.73,0.19 -0.64,1.53 -9.78,-8.82 -0.58,-1.6 1.64,0.51 0.67,-0.42 0.88,-1.82 -0.64,-0.84 1.05,-0.98 -1.98,1.37 -3,-0.12 -0.05,1 -3.79,1.75 -0.21,-4.02 0.12,-0.89 0.94,-0.65 -0.17,-1.02 -1.52,-2.1 -0.18,0.67 -0.46,-1.36 -1.36,-0.01 0.61,-1.68 -1.07,-0.94 0.31,-1.14 -1.3,-1.88 1.75,-1.73 -1.34,-0.74 -0.52,-2.04 1.71,-0.36 -0.24,-1.53 1.35,-1.54 -0.1,-0.74 3.88,-1.59 1.27,0.31 0.83,-0.47 -1.39,-1.78 0.16,-1.69 -0.64,-0.52 -1.22,0.82 -0.38,-0.71 3.06,-2.91 v -2.93 z m 24.41,-269.76 -2.43,-3.95 0.97,-0.27 -0.75,-0.11 -4.16,5.91 0.04,1.27 1.72,1.56 3.55,0.95 1.2,-0.34 -0.23,-1.96 z m 245.66,-87.02 -0.46,0.75 -0.88,0.02 0.34,1.71 -0.6,-1.52 -0.55,-7.42 -1.15,-1.51 -0.07,-1.22 -2.34,0.61 0.39,1.22 1.09,0.26 1.31,1.87 -0.77,-0.82 -1.39,0.19 -0.36,0.76 0.48,1.13 -1.1,0.47 0.17,1.01 -1.17,-0.88 -0.03,0.54 -1.17,-0.33 1.62,-0.77 0.15,-1.59 -0.35,-1.83 -1.3,0.52 0.25,-0.36 -0.74,-0.19 -0.55,-1.22 1.9,0.85 0.55,-3.55 -3.22,-3.96 -0.41,0.52 -0.49,-0.42 -2.15,-4.06 -1.39,-1.06 -0.97,0.04 0.62,-0.5 -0.85,0.03 0.42,-1.98 1.25,1.03 -0.1,-0.59 -1.27,-0.74 -2.77,0.39 -0.29,-1.07 0.68,-1.04 -0.78,-0.47 -1.81,1.19 -1.44,-0.34 0.06,-0.69 -2.32,0.36 -2.07,1.3 -0.21,1.1 -0.21,-1.21 -0.99,0.62 -1.75,-1.74 -1.65,-0.15 0.34,-0.36 -0.42,-0.19 -1.41,0.99 -1.12,-0.13 -2.99,1.36 -2.87,-1.38 -0.33,0.66 -1.91,0.3 0.26,4.58 -2.14,2.42 -2.49,-0.84 -3.28,0.79 -0.16,1.34 -0.66,-1.4 -1.36,0.7 -0.92,-1.23 0.43,-0.58 -0.66,-1.06 0.85,-0.32 0.73,1.42 1.41,-4 -0.5,-1.68 0.93,0.23 0.95,-0.9 0.04,-1.53 1.43,-0.42 0.56,-0.93 -0.68,-0.23 1.15,-0.88 -1.1,-0.55 2.09,-0.98 -1.43,-1.02 0.1,-0.7 -0.79,-0.76 0.69,-0.52 -2.21,0.58 0.35,-0.8 -0.97,0.08 -0.61,-1.2 -0.8,-0.01 0.24,0.69 -0.76,0.53 0.69,0.29 -0.64,0.27 -0.44,-1.08 -0.87,0.81 -0.46,-1.28 -1.66,-0.43 -2.03,2.14 -2.08,0.63 -1.08,-1.18 2.37,-0.43 -0.4,-0.55 0.94,-0.79 0.35,-2.13 -1.01,1.2 -1.14,-0.22 -1.77,0.98 -1.19,-0.59 -0.99,1.01 -1.51,-0.5 -0.68,-1.04 -0.42,0.74 -1.87,0.29 -1.52,-0.46 3.45,-2.38 1.63,0.22 3.77,-2.02 0.83,-2.06 -2.32,0.5 1.88,-1.18 0.5,0.26 1.65,-2.26 -1.71,0.06 -0.47,0.67 -0.05,-0.68 2.37,-0.76 2.08,0.97 1.13,-0.9 -0.81,-0.06 -1.23,-1.43 -0.7,-4.66 -2.98,0.63 -3.12,-1.73 -0.56,0.56 -1.19,-1.64 -0.09,-1.9 -1.16,-0.3 -1.68,1.13 -0.91,-0.95 0.3,-1.08 -1.6,-0.26 -3.21,3.51 -1.63,0.28 -0.14,-0.98 -1.09,0.31 -1.56,2.83 -2.45,1.51 -1.62,3.21 0.38,0.76 -1.51,0.3 0.66,1.4 -1.87,-0.87 -5.24,8.25 -0.95,1.96 0.96,0.26 -0.56,0.69 0.06,1.56 -0.73,0.75 -1.17,-0.49 -0.95,3.66 0.72,2.57 1.71,0.86 0.22,0.98 -0.89,0.99 -0.52,3.85 -2.08,1.72 -3.66,1.41 -1.86,-0.49 -4.14,0.54 -3.29,-1.63 -0.91,0.5 1.45,4.37 1.51,0.21 3.23,5.3 -1.01,2.08 -1.24,-0.31 0.99,-0.58 0.18,-1.13 -1.05,0.78 -1.78,-0.31 0.91,-1.91 -2.6,-0.53 -0.15,0.63 -1.01,-0.1 0.28,-1.72 -3.04,2.68 -1.67,0.26 -0.55,0.9 -1.07,0.3 0.55,0.7 1.42,0.18 -0.18,0.6 -2.02,0.77 -0.83,-1.33 -1.81,1.34 1.56,0.55 0.51,1.5 -2.68,-0.56 -0.97,0.62 -0.31,1.31 -0.93,0.01 0.65,-0.82 -0.51,-1.08 1.4,-0.96 -0.7,-0.06 -2.22,1.8 -1.33,2.3 -0.71,-0.45 -1.64,1.18 1.74,-3.31 -1.39,-0.05 0.36,-0.93 -0.93,0.02 -1.08,0.76 0.45,1.09 -1.17,0.29 -0.54,-0.74 -2.82,3.76 -0.71,-1.29 3.76,-4.88 -0.95,-0.48 1.83,-0.88 -0.95,-0.66 -4.95,-1.65 -1.12,1.74 -0.65,-0.5 -0.87,0.73 -1.5,-1.73 -1.87,-0.04 -0.36,0.64 1.75,-0.02 -0.01,0.81 h -1.37 l 0.41,0.83 -1.32,0.27 -0.47,-1.75 -1.6,0.88 -0.7,-0.83 -1.15,0.54 -1.57,-0.29 0.03,0.77 1,0.13 1.19,1.23 -1.72,-0.09 -0.23,-0.49 -1.08,0.75 -0.3,-0.49 v 0.82 l -0.96,0.62 0.24,-0.86 -0.72,-0.86 0.97,-0.9 -0.56,-0.47 -0.77,0.76 -0.44,-0.75 -0.62,0.6 1.14,0.55 -0.6,1.39 -1,0.62 -0.18,-1.77 -1.06,0.53 0.4,1.7 -1.17,0.87 0.84,1.25 -0.48,0.94 2.14,-0.26 -1.4,-0.85 2.25,-1.75 0.56,0.06 -0.68,1.33 1.59,1.92 0.5,-2.09 0.76,1.7 3.15,-1.33 0.3,-0.84 0.14,0.92 -5.54,3.02 -5.53,1.56 -0.95,-0.2 -0.47,1.23 -2.15,0.06 -0.38,1 -0.4,-0.69 -1.69,0.49 0.27,-0.54 -0.82,-0.15 -0.47,1.25 0.37,1.81 -1.4,-1.02 -1.77,0.97 0.04,-1.31 -1.89,1.94 -0.39,-1.73 -1.74,0.96 -0.11,0.77 -1.55,0.64 -1.23,-0.44 -2.32,1.4 0.87,1.38 -2.65,0.44 0.27,1.49 -1.21,-0.36 -1.17,0.44 0.34,-0.61 -1.12,-0.26 0.11,-1.06 1.42,0.3 -1.59,-0.66 -1.23,2.11 -2.8,1.17 2.38,-0.46 0.45,1.49 0.64,0.22 -1.02,0.1 -0.01,-1.35 -1.52,0.32 -0.79,0.87 0.99,-0.18 0.4,0.78 -1.35,-0.22 -1.12,0.63 0.68,2.33 -1.29,-1.29 -1.69,2.59 0.67,0.52 -0.99,0.93 -2.15,0.77 -5.28,-1.13 -1.78,0.46 -0.71,0.84 0.48,1.26 0.02,-0.73 1.08,0.08 2.2,1.49 2.44,-0.13 0.13,0.94 -1.33,1.71 -1.04,-0.55 0.47,-0.58 -0.44,-0.71 -1.62,0.49 0.75,1.14 0.66,-0.1 -1.85,2.08 0.25,0.41 -0.67,0.01 -0.03,3.67 -1.49,-0.97 -0.8,1.45 0.3,0.67 1.16,0.1 -0.59,0.97 0.67,1.1 -1.25,-0.78 -0.72,0.44 0.37,-1.22 -1.27,-0.14 0.56,-1.6 -0.84,0.52 0.19,-0.64 -0.88,-0.18 -0.49,0.87 -0.83,-1.47 1.11,-0.09 -0.03,-0.59 -1.09,-1.15 -0.55,0.68 -0.34,-1.06 -0.77,0.09 1.05,1.56 -0.55,0.15 -0.28,1.32 -0.63,-0.51 -0.87,0.51 0.35,1.04 -0.96,0.79 0.86,0.57 -0.66,0.76 1.59,-0.84 2.89,0.55 -0.27,0.77 1.26,0.89 1.64,-0.1 -1.41,1.42 1.1,0.44 -0.2,0.92 1.03,0.85 1.37,-0.34 0.69,-1.43 0.35,0.74 -1,1.36 1.56,1.39 0.41,-2.17 0.38,2.12 -1.11,0.13 -1.33,-0.86 0.36,1.69 -0.48,1.36 -0.13,-2.13 -0.88,0.49 -0.16,0.9 -0.81,-0.4 1.59,-1.43 0.18,-0.9 h -1.16 l -0.18,0.54 -0.46,-0.87 -0.55,0.31 0.33,-0.7 -1.09,-1.25 -1.38,0.3 -0.4,0.88 -1.69,0.14 1.52,0.75 0.15,2.12 -0.96,-1.91 -1.47,0.01 -0.45,0.83 0.45,1.76 5.13,1.7 0.76,1.52 -0.57,1.33 1.08,0.57 -0.29,0.54 0.54,0.65 4.04,-0.59 -0.96,0.81 -2.85,0.55 2.09,3.91 -0.8,0.65 -2.35,-1.08 -4.78,0.89 -1.28,1.02 -1.76,0.08 -1.18,1.06 -0.08,1.46 -1.32,0.41 -4.02,-1.35 -9.21,2.96 -7.67,-0.17 0.19,1.18 -0.57,-1.16 -3.17,0.33 -3.6,0.85 -0.64,0.72 -1.65,-0.17 -1.23,0.44 0.01,0.51 -1.14,-0.63 -1.65,0.42 0.32,2.19 0.79,-0.8 -0.26,1.39 0.6,0.07 -1.37,1.37 0.17,0.53 -0.87,0.02 -0.7,1.59 1.21,0.28 2.08,2.11 -1.57,-0.2 0.04,0.54 -1.4,-0.15 -0.63,0.53 0.54,-0.28 0.17,0.71 1.47,0.47 0.11,0.94 -0.81,0.34 2.14,1.41 0.5,2.45 -0.43,2.51 0.49,0.57 -1.43,1.61 -0.08,1.14 0.15,1.41 1.24,-0.25 0.42,0.5 -1.18,2.44 0.63,1.61 3.15,2.26 4.17,0.73 0.59,-0.61 -0.37,0.85 2.57,1.33 1.45,2.61 -0.87,1.05 -0.67,-0.09 1.81,1.51 1.31,3.83 0.44,-0.73 3.92,1.34 0.94,1.29 -0.28,1.18 1.83,2.32 -0.22,2.18 -1.34,1.35 -0.78,3.96 -1.22,1.35 0.81,2.34 -0.18,0.73 -0.59,-0.31 1.87,2.58 2.61,11.73 -1.77,2.39 0.08,0.7 -0.41,-0.6 -2.06,0.76 -1.16,-0.7 -0.41,0.97 1.4,3.12 -0.25,1.38 2.08,0.62 1.9,3.8 1.87,1.34 0.76,1.8 2.06,0.57 0.34,1.55 0.8,-0.41 0.25,0.4 -1,0.95 -1.69,-0.16 -1.54,-3.2 -0.7,-0.02 -0.12,0.59 -2.37,-0.42 -2.65,-4.49 -3.15,-1.31 1.78,0.39 0.28,-0.93 -2.39,-2.55 -1.48,-0.54 -0.3,0.62 -0.9,-0.13 -0.61,2.02 -0.05,-1.36 1.17,-1.05 -0.94,-2.26 -1.52,-0.21 1.82,-0.35 -0.84,-3.33 -1.4,1.5 -0.08,1.84 -1.01,1.83 0.88,-1.83 -0.11,-0.94 -0.45,0.14 0.42,-1.02 1.74,-1.82 -0.49,-2 2.36,-3.86 -1.39,-4.49 0.4,-0.67 -0.59,-0.52 0.93,-1.42 -0.59,-4.14 5.43,-3.39 -0.17,-2.83 1.38,-0.86 0.9,-2.6 -3.23,-1.89 -4.33,1.52 -4.14,0.27 -2.4,-1.43 -0.6,-2.1 -2.83,-3.73 -0.94,-0.15 -0.81,-2.17 -3.67,-1.77 -0.58,0.47 0.2,-0.6 -4.09,-3.87 -6.74,-0.64 1.36,2.52 -0.12,1.33 2.16,2.24 2.09,1.57 3.78,-0.12 4.39,2.99 0.25,1.71 -1.56,0.52 -0.59,3.01 -0.96,1.44 -1.36,0.66 -2.86,0.08 0.14,2.2 -0.99,1.86 0.51,2.33 1.48,0.64 2.47,3.4 4.94,1.96 1.53,5.49 -0.62,2.19 1.25,1.4 -1.19,3.29 1.09,1.25 -0.21,0.98 -2,-1 -1.56,-0.03 -4.46,4.68 -1.08,2.11 -0.69,-0.81 -0.82,0.37 -0.07,1.44 -2.94,3.81 1.09,2.78 -0.25,1.75 2.84,0.62 1.35,4.51 2.19,1.95 2.2,-0.19 2.81,0.67 3.22,1.88 1.69,-1.04 1.69,0.08 0.61,-0.64 0.59,-3.06 2.04,1.5 -0.94,3.35 3.77,1 0.5,0.96 -0.79,0.99 1.49,4.58 2.06,2.74 0.12,1.1 -1.6,1.08 0.43,2.61 -0.15,3.04 -1.19,0.85 -0.23,1.64 -1.01,1.23 -0.1,2.73 -1.2,0.4 -0.98,-0.44 -2.3,0.83 1.21,2.54 1.01,0.75 0.3,1.92 1.99,2.03 -0.37,3.94 -1.35,1.61 7.64,7.63 0.81,2.4 -1.75,2.73 0.07,0.81 3.49,5.57 -1.67,2.27 1.21,2.09 0.24,1.9 1.31,0.86 1.46,-0.35 2.52,1.74 0.34,0.81 -1.28,0.76 2.65,1.41 0.76,3.72 -2.26,2.8 0.79,1.88 -0.48,1.04 2.38,0.65 2.59,-0.49 -0.42,1.25 1.7,1.16 0.7,0.12 1.5,-1.08 0.91,0.38 1.19,0.97 0.47,3.09 -0.74,1.33 1.05,3.75 -0.03,3.52 -4.34,3.48 -0.3,2.76 -1.38,1.43 0.21,0.75 1.4,0.79 0.79,1.82 1.12,0.14 -0.55,3.03 0.59,1.5 -0.77,2.41 -3.34,3.98 -0.9,3.45 -2.89,4.14 -0.01,2.9 1.23,2.52 5.14,2.05 1.81,1.66 1.87,0.43 0.35,1.2 -2.23,1.12 0.06,2 -10.1,6.14 4.11,7.42 -1.23,1.93 -0.56,3.15 0.48,1.55 12.08,-1.04 4.56,0.88 1.15,1.01 0.14,2.03 2.42,0.08 2.75,5.94 5.09,-0.29 0.12,1.17 1.5,2.32 -2,1.05 -4.32,5.59 0.25,3.58 0.87,2.2 3.99,0.84 2.28,1.66 2.16,-0.07 0.96,1.85 -0.16,2.42 -2.25,0.72 0.3,1.1 -1.51,0.73 -1.34,3.07 -1.14,1.1 -0.14,0.54 1.2,-0.13 0.33,0.72 -0.82,1.93 0.42,2.99 -1.24,1.15 1.57,2.55 1.12,-0.02 0.4,0.85 1,0.07 1.91,5.23 0.73,0.34 -0.12,0.93 -3.31,1.61 -2.33,2.89 2.25,1.71 0.63,2.57 0.79,0.1 0.38,1.07 1.37,0.21 1.26,-1.05 0.65,0.69 3.86,-1.85 0.24,1.06 1.48,0.62 0.16,1.81 1.62,-0.42 0.22,0.91 1.44,0.5 -0.43,2.04 2.18,1.71 2.19,5.28 -0.94,3.63 0.98,2.94 1.97,0.81 0.7,1.9 -1.3,1.55 -2.21,0.97 0.32,2.49 -4.99,4.83 -1.78,3.45 1.42,1.21 1.03,2.09 1.35,-0.58 0.98,0.72 4.51,0.11 1.45,1.13 6.28,-1.07 3.57,-3.41 1.94,-0.71 1.08,-3.3 1.1,-1.07 1.69,-3.6 2.38,-0.63 1.3,-3.77 -0.58,-0.98 0.72,-0.63 2.23,-0.03 1.08,-0.87 1.36,0.76 2.44,-1.35 2.42,0.48 1.28,-1.42 1.3,0.63 1.93,-0.7 0.23,-0.94 -1.65,-0.39 -3.23,-4.57 -2.83,-2.01 0.12,-1.29 0.68,-0.9 1.39,-0.25 0.87,-1.59 3.16,0.37 1.19,-3.95 -0.6,-1.47 0.62,-2.48 -0.37,-1.13 1.81,-0.82 -0.67,-1.2 0.14,-2.28 -0.69,-0.59 0.19,-1.67 1.31,-1.21 0.28,-1.76 0.92,-0.11 0.28,-0.99 1.29,0.61 0.82,-0.83 0.1,-1.23 0.76,0.06 -0.12,-2.19 2.53,-0.33 0.12,-1.85 -1.1,-0.43 0.31,-2.76 -2.08,-0.13 -0.19,-1.04 1.03,-1.12 -1.99,-1.07 4.15,-10.01 6.09,0.23 0.44,0.76 1.66,-0.08 0.51,-0.62 2.14,-0.21 1.44,-3.67 2.65,-0.22 0.81,0.81 -0.55,1.1 0.26,1.14 1.81,0.65 0.47,1.01 0.15,2.54 2.28,1.66 0.53,-0.85 0.98,-0.16 -1.12,-2.4 0.41,-1.36 -0.43,-1.39 1.86,0.1 1.25,-2.26 -0.51,-0.95 2.82,-1.78 1.66,-2.94 2.71,-0.69 2.99,-3.28 -1.26,-4.05 0.57,-1.71 1.53,-0.75 0.99,0.2 0.99,-1.39 2.93,0.34 0.03,0.44 -0.9,0.01 -0.03,0.85 2.11,3.29 2.94,0.83 0.18,2.08 2.08,-0.39 0.72,0.8 -0.08,1.2 1.09,0.22 2.89,-1.75 -0.93,-1.29 0.18,-0.61 4.07,-3.15 -0.17,-1.81 -1.19,-1.25 0.24,-1.75 -1.02,0.02 -1.91,-3.24 2.3,-2.63 3.12,0.12 -0.62,-1.16 0.2,-4.8 -2.47,-0.29 -2.01,-1.16 -2.38,-3.45 0.68,-1.59 -0.88,-1.38 0.83,-0.42 0.24,-3.01 2.98,-2.22 -0.68,-2.3 2.36,-1.07 2.66,-2.96 1.36,-0.02 1.01,-0.77 -0.44,-1.94 3.38,-3.25 0.56,-2.58 -0.5,-0.9 2.72,-3.61 0.44,-1.71 -2.33,-1.23 0.33,-0.83 -2.33,-2.99 -0.21,-1.93 1.59,-0.48 -0.01,-3.49 0.59,-0.3 0.77,0.56 1.13,-1.06 -1.56,-2.57 0.9,-1.24 0.78,-3.74 -0.48,-2.22 0.3,-0.3 2.72,1.47 0.79,-0.97 1.06,1.09 1.12,0.19 0.81,-1.47 1.26,-0.36 2.83,-0.13 0.57,0.64 0.93,-1.97 -1.4,-2.61 -1.11,-0.51 -0.09,0.61 h -0.89 l -2.24,-1.51 -2.26,0.33 -0.23,-1.49 -1.89,-0.17 -0.41,-0.89 -1.27,0.1 -0.68,-1.95 -0.82,1.36 -2.92,0.7 -0.25,-1.89 -0.96,-0.27 -0.92,0.95 -0.99,-1.51 v -1.74 l 1.27,-0.37 0.47,-3.65 0.82,0.61 0.78,-0.27 -1.27,-1.8 0.22,-1.35 0.87,-0.08 1.79,-2.25 h 0.79 l -0.58,-1 0.61,-1.4 0.77,-0.56 1.42,0.14 0.25,-1.53 1.23,-0.91 -1.37,-0.36 -1.14,-1.72 -1.42,-0.82 0.05,-6.4 -0.38,-1.04 -1.89,-1.2 0.1,-4.37 0.92,-1.68 -0.12,-3.61 -0.73,-1.63 -1.04,-0.13 0.58,-1.88 -1.4,0.25 -0.15,-0.92 -0.81,-0.17 -0.77,0.42 -1.33,-1.32 0.17,-0.58 2.72,0.02 0.61,-0.37 0.49,-2.41 1.52,-0.22 1.29,-1.28 1.3,0.45 0.7,-0.72 1.3,-16.79 -0.21,-13.66 -5.36,-10.35 0.26,-1.35 2.28,-2.41 1.26,0.8 2.57,-0.25 2.53,-1.53 2.77,-1.44 1.31,0.12 2.65,-3.24 3.69,-0.24 0.59,0.15 0.29,1.56 2.73,-0.22 1.64,-5.34 -0.97,-0.52 -0.19,-3.49 1.37,-0.55 0.42,-2.74 4.83,-0.78 -1.64,-1.92 0.67,-3.24 7.63,-4.44 1.47,-0.18 0.71,-1.32 3.01,-0.87 1.25,-1.76 1.43,0.75 0.37,-1.08 1.04,-0.12 0.29,-2.86 1.03,-0.24 0.01,-1.1 -1.76,-0.6 -3,-3.2 -0.56,-15.81 -2.63,-1.65 0.3,-2.31 -0.78,-1 -1.08,0.04 -0.58,-0.85 -1.45,0.07 -0.6,-1.03 1.08,-1.72 0.02,-1.41 -0.74,-0.89 -1.42,-0.34 0.18,-1.21 -1.14,-0.25 -0.44,-3.79 1.16,-4.33 -1.21,-0.24 0.52,-0.98 0.94,-0.2 -0.54,-2.1 0.46,-0.9 -1.6,-0.98 -1.54,0.6 -0.75,-1.19 1.48,-1.6 -0.15,-1.38 -2.97,-1.49 0.44,-0.78 3.49,-0.05 1.54,-4.51 1.92,0.17 -0.66,-1.86 -1.25,-0.28 0.26,-2.22 2.45,-2.27 -0.55,-2.46 2.69,-1.02 -0.53,-1.12 -2.64,0.85 -0.56,1.24 0.27,1.13 -0.62,0.68 -4.85,-3.08 -2.62,0.47 -0.89,3.09 -2.21,1.57 0.97,3.71 0.58,0.55 0.19,-1.02 2.32,-0.29 1.26,0.51 2.76,-2.8 1.65,0.76 -0.04,2.33 -3.12,0.86 -0.49,1.3 -2.04,0.68 0.02,1.66 -1.97,1.41 -2.47,-0.21 0.19,0.8 -0.64,0.56 -1.33,-1.75 0.18,1.94 -7.44,2.63 -0.24,0.95 0.16,-0.41 2.61,0.09 -1.18,0.77 -0.09,2.65 0.73,0.71 -1.89,-0.81 -0.9,-2.61 -2.44,1.98 -4.5,-0.17 -2.5,0.74 -3.16,-1.26 -1.07,2.03 0.14,3.12 -1.63,1.3 -0.48,1.26 0.41,0.69 -0.8,-0.52 -2.18,2.56 -1.8,0.08 -0.44,-0.9 3.34,-2.41 1.33,-2.84 0.05,-2.43 0.98,-0.96 -0.41,-0.48 0.98,-2.59 1.23,-1.27 3.29,0.15 0.72,-1.12 0.13,-2.17 1.25,-1.24 v -1.83 l -2.76,-1.57 -2.85,0.26 -0.98,-1.05 0.74,-0.4 0.52,0.81 2.61,-0.26 3.54,0.95 0.79,-0.55 4.01,0.26 1.47,-1.12 1.2,-0.1 1.48,-2.29 -0.13,-1.55 -0.69,-0.2 h 0.77 l 0.86,0.96 3.94,-6.71 3.17,-0.9 2.5,-3 0.33,-3.29 -1.23,0.77 -1.6,-0.48 -1.09,0.71 2.16,-1.34 0.74,0.81 2.28,-2.28 0.56,0.39 -0.91,0.7 0.63,-0.09 2.08,-2.57 -0.15,-1.14 -1.45,-0.25 1.15,-0.23 1.36,0.6 2.55,-1.62 0.61,0.15 3.09,-3.91 1.04,-0.2 1.66,1.04 1.16,-2.31 -0.53,-0.87 0.73,0.2 1.05,-3.34 3.09,-1.03 -0.28,0.85 2.62,-2.6 5.34,-8.28 0.38,-2.88 -1.19,-0.04 0.77,-0.83 0.66,0.14 0.08,-1.7 -0.23,-1.03 -2.34,-0.44 -0.76,-1.66 0.48,-0.66 -0.5,-1.78 -2.08,1.55 0.16,1.48 -0.72,0.53 -0.82,-0.24 0.6,-2.48 -0.49,-1.36 -1.4,-0.5 0.24,-0.59 1.52,0.74 -0.07,-1.36 -1.34,-1.07 -1.17,-0.04 -0.46,-1.7 -1.27,-0.6 2.54,0.64 3.32,2.97 0.49,1.06 -1.1,0.78 2.36,-0.44 2.03,0.89 -1.52,2.97 1.19,0.44 2.32,-6.56 0.02,-4.83 z m -5.29,46.3 -7.26,-0.95 0.17,4.77 -1.05,0.83 -1.18,-0.78 -0.97,0.15 -0.73,1.86 1.04,1.19 2.22,0.71 1.84,2.27 4.47,1.38 1.15,-2.68 1.36,-0.26 1.88,-3.69 -0.04,-2.63 -0.63,-1.1 z m -196.31,0.84 1.02,-2.52 1.25,-0.56 1.99,1.81 -0.86,1.23 -0.23,-0.87 -0.93,-0.48 -0.33,0.31 0.89,0.77 -1.66,0.99 -0.68,0.14 0.15,-0.77 z m 21.39,332.94 2.25,1.71 0.63,2.57 0.79,0.1 0.38,1.07 1.37,0.21 1.26,-1.05 0.65,0.69 3.86,-1.85 0.24,1.06 1.48,0.62 0.16,1.81 1.62,-0.42 0.22,0.91 1.44,0.5 -0.43,2.04 2.18,1.71 2.19,5.28 -0.94,3.63 0.98,2.94 1.97,0.81 0.7,1.9 -1.3,1.55 -2.21,0.97 0.32,2.49 -4.99,4.83 -1.78,3.45 -2.89,0.44 0.17,1.2 -0.82,1.51 0.74,1.73 -1.29,0.55 -1.85,2.02 -1.3,-0.63 -1.5,0.6 -0.45,-0.19 0.21,-1.03 -2.95,1.01 -0.7,0.38 -0.68,1.97 -1.36,0.51 -3.61,-2.79 1.51,-2.14 -1.41,-1.01 0.99,-2.63 1.58,-0.4 1.06,-1.33 1.99,-1.07 -0.11,-1.06 3.18,-2.59 -0.67,-1.31 1.34,-1.09 -2.19,-2.37 0.17,-0.84 0.84,-0.44 -0.75,-1.06 0.56,-0.27 -0.21,-0.51 -0.9,-1.36 -0.75,0.28 0.29,-2.46 1.56,-2.38 1.39,-0.34 -0.47,-2.07 -0.91,-0.11 0.24,-1.56 0.99,-1.15 -0.28,-1.78 -1.4,0.32 -0.83,-1.29 -1.86,1.39 -1.53,-1.16 1.2,-0.62 0.34,-2.99 1.23,-1.97 -1.54,-2.16 -0.55,-3.19 z m -10.9,34.44 1.29,0.11 0.17,0.94 2.26,0.92 2.03,-1.37 1.78,1.59 1.67,-0.07 0.17,2.73 -1.06,1.33 -1.59,0.39 -0.98,2.63 1.41,1.01 -1.51,2.14 3.61,2.79 1.36,-0.5 0.68,-1.97 0.7,-0.38 1.47,1.71 -0.41,1.21 0.72,2.61 5.95,6.76 -1.12,1.23 -1.61,-1.23 0.3,1.14 -1.44,1.36 1.84,1.58 0.16,1.65 0.25,1.42 0.7,0.27 -0.4,0.94 -2.19,1.27 -0.98,-0.65 -0.14,1.18 -1.64,0.76 -0.72,-0.86 -0.2,1.16 -1.66,-0.85 -0.58,0.5 -2.35,-0.09 -0.91,1.27 0.72,0.82 -0.34,0.5 -0.68,-0.13 -0.5,0.95 -4.47,1.02 -0.67,-1.43 -2.34,-0.95 -1,-2.64 -1.21,-0.42 1.22,-2.45 h -1.36 l -1.34,1.82 -1.35,0.62 -0.5,1.34 -0.46,-0.61 -1.22,0.21 -0.11,-0.63 -4.6,-0.39 -1.24,-3.15 -0.89,-0.51 0.24,-1.37 -3.85,-2.3 -1.1,0.28 -0.64,-0.87 -0.01,-2.39 -1.31,-1.49 2.77,-0.65 1.2,-1.48 -0.94,-0.56 0.19,-0.92 -3.64,-0.98 -0.12,-0.7 1.18,0.02 0.39,-1.78 1.81,-0.25 2.08,-1.61 5.36,-1.64 -0.16,-0.71 2.79,-2.91 -0.33,-1.86 3.93,0.19 0.58,-1.1 2.05,-0.04 -0.54,-4.5 1.9,-1.44 z m -14.56,-21.76 0.75,0.12 1.43,2.45 0.91,-0.17 1.76,0.97 1.09,1.41 1.4,0.67 2.9,5.58 2.8,0.35 -0.41,1.89 -1.57,1.05 2.72,2.6 -0.45,2.64 0.32,1.09 0.9,0.28 0.01,0.83 -1.48,-0.46 -1.9,1.44 0.54,4.5 -2.05,0.04 -0.58,1.1 -3.93,-0.19 0.33,1.86 -2.79,2.91 0.16,0.71 -5.36,1.64 -2.08,1.61 -1.81,0.25 -0.39,1.78 -1.18,-0.02 0.12,0.7 3.64,0.98 -0.19,0.92 0.94,0.56 -1.2,1.48 -2.77,0.65 -1.85,-2.77 -5.02,-1.64 -0.95,1.36 -1.73,-0.3 -0.19,1.2 -1.17,0.82 -2.78,0.19 -2,-0.82 -2.95,0.68 -0.43,-2.66 -2.36,0.42 0.45,-2.98 -0.53,0.35 -2.64,-1.35 -0.43,1.16 -1.3,0.01 0.2,2.64 -1.93,0.77 -0.87,1.69 -6.58,-13.66 -9.25,-15.99 0.64,-1.53 0.73,-0.19 -0.74,-0.44 -0.02,-0.86 1.55,-0.63 0.04,0.89 0.81,0.64 2.15,-0.54 0.73,-1.54 5.52,-0.63 0.99,-1.2 1.58,-0.5 2,-2.55 1.04,0.27 2.04,-1.05 0.35,-1.04 1.73,-0.52 -0.27,-0.83 0.54,-0.58 1.82,3.05 2.41,0.35 0.83,0.84 0.03,1.13 1.88,0.05 -0.81,1.12 0.49,1.27 2.51,0.54 0.16,0.81 2.12,1.18 1.43,-1.45 0.36,-2.02 2.64,-2.59 1.56,-0.23 0.85,1.11 0.66,-0.73 -0.1,-1.04 3.36,-0.16 2.05,-1.06 1.29,0.64 1.41,-1.78 z m 25.3,-31.27 0.42,2.99 -1.24,1.15 1.57,2.55 1.12,-0.02 0.4,0.85 1.01,0.07 1.91,5.23 0.73,0.34 -0.12,0.93 -3.31,1.61 -2.33,2.89 -1.17,2.09 0.55,3.19 1.54,2.16 -1.23,1.97 -0.33,2.98 -1.2,0.63 1.53,1.15 1.86,-1.39 0.83,1.29 1.4,-0.32 0.28,1.78 -0.99,1.15 -0.24,1.56 0.91,0.1 0.47,2.07 -1.39,0.34 -1.56,2.38 -0.29,2.46 0.75,-0.27 0.9,1.35 0.21,0.52 -0.56,0.27 0.74,1.06 -0.84,0.44 -0.17,0.84 2.2,2.37 -1.35,1.08 0.67,1.32 -3.18,2.59 0.12,1.06 -1.99,1.07 -0.17,-2.73 -1.67,0.07 -1.78,-1.59 -2.03,1.37 -2.26,-0.92 -0.17,-0.94 -1.29,-0.11 -0.01,-0.83 -0.9,-0.28 -0.32,-1.09 0.45,-2.64 -2.72,-2.6 1.57,-1.05 0.41,-1.89 -2.8,-0.35 -2.9,-5.58 -1.4,-0.67 -1.09,-1.41 -1.76,-0.97 -0.91,0.17 -1.43,-2.45 -0.75,-0.12 -0.8,-1.97 0.55,-0.77 -0.83,-0.78 1.03,-1.34 -1.44,-2.31 0.03,-4.87 -1.74,-0.06 1.06,-0.82 0.2,-1.57 -1.77,-2.12 -0.13,-3.44 -0.65,-0.19 2.48,-1.46 5.91,-1.07 -0.62,-0.83 1.52,-0.49 0.36,-0.97 2.53,-1.48 0.54,-1.62 1.4,1.08 1.29,-0.83 1.47,0.02 -0.01,1.07 2.38,-0.44 0.23,-0.99 1.36,-0.01 -0.07,0.88 1.59,-0.92 0.34,1.49 5.63,-3.61 0.96,0.3 z"
        				},
        				{
        					"id" : "55",
        					"title" : "Северо-Западный банк",
        					"d" : "m 75.49,577.77 0.3,-1.28 -1.73,-0.47 -0.3,-1.92 -2.25,-0.78 -1.48,0.51 1.64,-1.49 5.35,1.99 -0.23,1.11 1.24,0.93 -0.05,1.93 1.82,1.53 -1.46,0.7 -0.39,0.88 -1.97,0.26 -2.77,-3.04 -1.25,-0.51 0.14,-0.99 2.39,1 z m -17.44,12.6 -0.16,0.34 0.37,0.55 1,-0.99 1.06,0.15 1.89,2.07 4.96,0.81 1.86,1.84 0.16,1.2 1.91,0.6 1.04,1.39 1.61,-0.34 v 2.1 l -1.85,1.36 0.18,1.6 1.27,0.39 1.08,1.64 3.95,0.67 -0.47,3.23 1.48,0.59 -1.48,1.67 -0.2,1.51 2.62,1.81 -1.03,2.61 0.29,0.73 0.72,0.48 1.22,-0.31 -1.3,2.98 1.72,1.28 -0.21,1.95 1.5,0.36 -0.07,1.06 0.67,0.48 1.62,0.35 -0.59,0.73 0.5,0.44 -0.53,0.51 0.47,1.29 -1.03,1.03 0.44,2.91 -2.78,0.25 -1.1,1.34 -1.12,0.23 -1.95,-2.54 -1.58,-0.79 -1.06,0.49 -1.08,-0.75 -0.8,0.3 -0.44,1.18 -1.13,-0.07 -1.14,0.95 -0.78,-0.77 0.22,-1.76 0.56,-0.25 -0.39,-0.62 -2.58,-0.82 -2.41,0.88 -0.37,-1.59 -2.62,0.35 -1.06,-1.11 0.54,-1.8 -1.03,-3.12 0.3,-0.55 -0.73,-0.26 -0.95,-2 0.53,-0.94 -0.92,-0.76 -1.3,0.5 1.36,-6.09 -2.49,-1.91 0.26,-1.23 -1.16,0.09 -0.49,-0.65 0.63,-0.44 0.04,-1.17 0.83,-0.12 0.17,-1.67 1.98,-0.34 -0.92,-0.97 -0.14,-2 -1.42,-2.46 0.56,-1.68 -0.74,-5.59 z m 15.7,7.62 0.77,0.29 0.87,-0.61 0.03,-3.65 1.61,0.71 1.21,-0.73 1.26,0.13 0.3,-1.45 1.32,-1.1 0.67,-1.84 1.62,0.62 0.94,-0.37 1.41,-2.53 -0.39,-1.94 2.07,1.01 1.09,-1.66 2.37,1.66 0.32,1.58 2.18,1.31 1.11,-1.06 -0.09,-1.75 1.84,-2.01 1.97,1.77 0.73,-0.89 1.79,-0.04 1.44,2.56 1.32,0.68 2.04,-0.63 3.14,0.96 1.46,0.72 -0.11,0.6 1.79,0.54 -0.27,1.97 0.65,-0.4 0.14,1.03 0.95,-1.36 2.28,0.54 2.68,1.52 1.1,2.24 1.32,0.46 -2.71,1.09 -0.64,-0.26 -0.18,0.87 -2.64,-0.49 -1.73,0.87 0.03,0.98 -0.98,1.22 -1.03,0.49 -1.75,-0.76 -0.78,2.34 -4.53,-2.03 -1.16,1.27 -1.32,-0.21 -1.18,1.59 1.13,0.94 -1.19,2.47 0.33,0.69 -2.02,0.54 0.23,1.53 -0.79,0.69 0.33,1.58 -0.75,-0.9 -0.9,0.62 -0.54,-0.5 -1.16,0.25 -1.01,1.69 -2.8,0.85 -0.09,1.06 -1.68,0.46 -0.14,0.97 -0.59,-0.59 -1.16,0.33 -1.14,2.23 -2.48,-0.4 -0.45,0.49 -1.68,-0.77 -1.22,0.31 -0.72,-0.48 -0.29,-0.73 1.03,-2.61 -2.62,-1.81 0.2,-1.51 1.48,-1.67 -1.48,-0.59 0.47,-3.23 -3.95,-0.67 -1.08,-1.64 -1.27,-0.39 -0.18,-1.6 1.85,-1.36 z m 14.66,-192.03 1.57,0.14 2.39,2 -0.09,0.7 2.98,0.38 1.35,1.02 -0.18,1.66 -1.71,1.68 -2.94,-1.33 -1.77,-0.03 -0.42,-2.37 -0.22,1.88 -1.03,0.47 0.69,0.65 -0.32,1.05 0.88,-0.94 1.99,0.7 -0.08,0.87 0.8,0.21 -1.79,1.97 2,-1.55 0.47,1.17 0.47,-0.83 0.98,0.01 0.56,0.26 -0.58,1.66 0.73,-1.37 1.16,-0.17 -1.75,3.25 0.53,-0.06 0.53,-1.39 2.35,-1.25 1.42,0.64 -0.76,0.84 0.62,0.16 -0.62,1.26 -1.02,-0.03 -0.21,0.64 2.15,0.11 -1.74,0.56 1.49,0.32 -0.01,1.04 -3.17,2 3.01,-0.59 1.13,-3.62 -0.47,0.19 0.12,-0.87 2.71,-0.32 3.18,0.34 0.73,0.86 4.72,1.44 0.87,-0.32 -0.85,-0.96 h 0.97 l 7.11,2.91 0.47,1.23 1.61,0.51 7.92,6.53 6.09,7.3 0.82,-1.15 0.99,1.32 0.81,0.05 1.29,2.36 0.64,-0.26 3.52,3.43 -0.01,-0.83 1.37,0.39 -0.66,-2.44 1.66,3.35 2.91,2 -0.05,0.96 -0.75,-0.13 0.96,1.51 0.74,0.53 0.31,-1.2 0.68,-0.1 0.9,1.44 1.34,0.35 0.55,1.48 -0.48,3.02 0.99,1.1 -0.27,2.76 1.23,1.07 0.46,-0.37 -0.13,1.41 0.63,0.54 -1.29,5.4 -5.25,7.36 -3.4,2.84 -6.36,2.8 -1.52,-0.08 -1.58,0.77 -5.44,-0.4 -7.46,-3.53 -2.75,-0.13 -6.98,-1.78 -4.95,-3.87 -2.48,1.09 -0.63,-1.99 -3.11,-0.61 -2.41,-2.95 -0.09,2.01 -0.69,0.37 -2.34,-1.94 -2.86,-3.57 -0.01,-0.72 1.24,-0.59 -1.44,0.23 -2.88,-1.46 -1.48,0.29 -0.3,0.63 -1.3,-0.6 1.35,1.01 0.56,-0.26 -0.23,-0.48 0.72,0.29 0.45,1.13 1.32,0.4 0.26,1.95 -1.02,0.69 h 0.93 l 1.19,1.15 0.63,0.96 -0.53,0.41 4.28,1.81 -0.1,0.46 -1.28,-0.6 -0.39,1.07 -1.67,-0.49 0.04,0.47 -2.2,-0.05 -0.29,1.78 -1.56,0.17 1.19,1.04 -1.1,-0.39 -0.02,1.26 -3.13,-0.11 -0.8,-2.07 -1.02,-0.45 -0.13,-1.88 -1.57,-0.46 -11.24,0.54 -2.69,0.63 -2.35,-4.31 -0.34,-2.49 6.6,-10.31 0.55,-2.95 -2.45,-2.26 -2.5,-5.32 -4.92,-2.35 -1.5,-6.85 1.95,-3.73 0.58,-2.73 -2.64,-0.67 3.53,-2.98 0.78,0.81 0.73,-0.63 1.24,-2.68 0.04,-2.44 1.72,-0.22 1.97,-2.14 1.12,0.11 0.89,-1.01 0.61,-1.93 -0.57,-2.22 1.79,0.98 1.15,1.53 2.1,0.02 0.9,-0.91 -0.74,-4.12 4.19,1.69 -1.23,2.7 1.61,-2.27 2.32,0.72 -0.82,-1.25 0.33,-2.14 0.89,-0.06 1.28,1.4 0.39,-0.37 -1.4,-2.99 0.13,-0.8 z m -24.07,160.48 -1.5,0.19 -0.07,0.87 -1.1,0.41 -0.02,0.89 -3.2,-0.34 5.33,-6.21 0.86,0.11 1.23,-2.59 3.53,-3.12 2.28,2.2 h 1.18 l 21.37,7.98 1.25,-1.68 1.23,-0.23 2.23,-3.46 2.49,0.67 0.81,-2.01 -0.93,-0.42 -0.85,0.49 -1.31,-1.45 2.17,-1.19 3.12,0.05 1.89,1.74 0.24,-1.36 2.13,-1.46 2.53,1.29 1.38,-0.84 -0.02,1.59 0.74,0.52 1.08,-0.95 0.52,0.55 -0.11,2.08 -0.98,0.82 0.58,0.92 -0.31,0.8 -0.45,0.53 -1.26,-0.25 -0.82,1.06 1,3.34 -1.42,5.99 0.65,0.53 -0.44,0.97 2.43,0.91 -0.56,3.12 1.56,0.75 0.13,1.24 -0.84,-0.61 0.04,1.37 -1.01,1.24 0.59,0.68 -0.85,1.91 -2.47,1.11 -0.59,-0.67 -1.07,1.36 -0.03,1.16 -3.14,-0.96 -2.04,0.63 -1.32,-0.68 -1.45,-2.56 -1.79,0.04 -0.73,0.88 -1.97,-1.77 -1.84,2.01 0.09,1.75 -1.11,1.06 -2.18,-1.31 -0.32,-1.58 -2.37,-1.66 -1.09,1.66 -2.07,-1.01 0.39,1.94 -1.41,2.53 -0.94,0.37 -1.62,-0.62 -0.67,1.84 -1.32,1.1 -0.31,1.45 -1.25,-0.15 -1.22,0.73 -1.61,-0.72 -0.02,3.65 -0.87,0.61 -0.77,-0.29 -1.61,0.34 -1.05,-1.4 -1.9,-0.6 -0.16,-1.2 -1.86,-1.84 -4.96,-0.81 -1.89,-2.08 -1.06,-0.14 -1,0.98 -0.37,-0.55 0.15,-0.59 1.22,-3.3 2.17,-1.7 -1.18,-1.44 0.36,-1.58 -0.67,-1.55 0.7,-1.34 0.63,0.17 0.26,1.3 1.03,0.39 0.76,-2.4 0.61,-0.32 1.23,1.09 1.68,-0.5 0.73,-0.9 -0.55,-0.59 0.96,-1.06 4.1,0.77 -0.14,0.99 1.25,0.51 2.77,3.04 1.97,-0.26 0.39,-0.88 1.46,-0.7 -1.82,-1.53 0.05,-1.93 -1.24,-0.93 0.23,-1.11 -5.35,-1.99 -1.64,1.49 -2.75,-0.27 -1.53,-2.48 -0.28,0.51 -1.09,-0.51 -1.24,-2.81 1.91,1.61 -0.21,-1.75 -0.93,-0.65 0.17,-0.61 0.92,0.74 -0.42,-0.9 0.76,-0.14 -0.3,-1.59 z m -6.3,23.66 v 0.01 z m -45.52,49.16 0.81,1.24 3.85,1.34 0.23,0.73 3.64,-0.6 0.58,1.26 1.41,0.9 0.22,1.41 -1.06,0.8 -0.37,1.64 0.72,2.8 -9.44,0.52 -12.04,-1.42 1.41,-1.73 0.72,0.27 2.16,-1.38 -1.36,-0.35 -0.83,0.54 -0.75,-0.94 -0.12,1.07 -0.67,-0.1 0.77,-3.89 3.73,-0.08 3.25,-3.87 -0.64,1.58 -2.33,2.47 3.98,0.75 1.12,-0.73 -0.49,-3.17 0.55,0.13 z m 96.69,-136.96 -0.98,0.47 1.66,2.3 -1.36,1.48 1.24,0.39 0.16,1.21 1.08,0.04 0.11,1.08 1.46,0.19 -0.11,0.69 0.57,0.21 1.34,-0.46 0.01,-1.11 0.98,0.47 1.7,2.84 0.59,-0.52 1.35,1.34 -0.37,0.97 0.58,0.25 0.13,1.26 2.33,0.6 0.37,2.64 -1.83,2.62 -3.16,-0.18 2.9,4.96 -0.48,1.29 1.12,-0.17 -0.99,1.76 0.2,1.79 2.21,3.17 3.19,1.95 2.74,-0.09 0.82,1.29 0.1,2.65 -0.99,2.42 0.64,0.79 1.28,0.16 0.74,2.78 0.73,0.58 -0.66,2.86 0.53,0.91 -0.96,1.13 -0.07,2.11 -2.83,0.4 -2.3,-1.6 -1.36,1.24 -1.41,-0.54 -1.6,2.54 -5.68,3.19 -0.52,-0.55 -1.08,0.95 -0.74,-0.52 0.02,-1.59 -1.38,0.84 -2.53,-1.29 -2.13,1.46 -0.24,1.36 -1.89,-1.74 -3.12,-0.05 -2.17,1.19 1.31,1.45 0.85,-0.49 0.93,0.42 -0.81,2.01 -2.49,-0.67 -2.23,3.46 -1.23,0.23 -1.25,1.68 -21.37,-7.98 h -1.18 l -2.28,-2.2 1.3,-2.28 0.96,-0.19 4.89,-6.6 2.44,-4.1 3.62,-3.81 3.01,-7.19 -2.18,-3.14 -0.34,-1.79 -3.2,-2.91 -2,-0.85 -3.76,-4.71 1.94,-1.13 2.18,-4.7 -0.51,-2.35 -3.1,-2.47 -0.31,-2.58 0.96,-1.56 -0.71,-1.26 0.33,-0.82 -2.43,-0.22 -0.85,-1.69 -0.05,-2.87 1.9,-0.76 -0.45,-0.57 0.36,-1.28 -1.92,-0.65 1.14,-1.42 -0.19,-2.27 0.97,-1.71 -1.03,-1.09 1.95,-1.08 0.85,0.42 0.02,-1.21 -1.57,-7.1 -1.72,-2.72 -1.83,-5.28 2.69,-0.63 11.24,-0.51 1.57,0.45 0.13,1.88 1.02,0.45 0.8,2.07 3.13,0.11 0.02,-1.26 1.1,0.39 -1.19,-1.04 1.56,-0.17 0.29,-1.78 2.2,0.05 2.42,0.92 -2.18,0.25 2.54,-0.04 1.04,1.2 1.02,0.29 0.6,-0.57 -0.31,0.63 1.11,0.52 -1.59,0.39 1.32,0.98 -4.75,1.41 4.15,-0.94 -0.14,0.6 1.5,0.14 0.87,0.66 -0.14,0.56 1.61,-0.49 0.3,1.1 0.68,-0.23 3.29,3.41 -0.08,2 1,-0.25 -0.05,1.03 -0.54,0.15 0.72,0.29 -1.44,0.3 0.15,1.57 0.71,0.08 -0.71,0.47 0.94,1.28 -1.16,1.72 0.28,0.86 -1.37,0.05 0.32,0.61 -1.22,-0.12 0.58,0.7 -1.15,-0.08 1.54,0.73 -0.15,1.47 1.23,0.82 0.26,2.01 0.76,0.12 0.18,1.26 -0.95,0.63 0.66,0.13 1.32,1.98 z"
        				},
        				{
        					"id" : "77",
        					"title" : "Северный банк",
        					"d" : "m 142.87,506.19 0.9,-0.1 0.82,-1.98 1.95,1 0.5,0.97 2.8,0.41 -0.87,-2.3 0.37,-1.67 -0.53,-2.57 -4.87,-7.2 -0.07,-2.26 1.22,-2.86 4.25,-2.96 1.88,-3.12 3.51,-1.03 1.94,-1.23 3.24,-3.93 1.09,-2.71 1.13,-0.56 2.64,2.01 4.62,-0.05 0.6,1.44 1.65,0.54 0.67,1.01 -2.63,2.58 0.24,0.94 0.85,-1.65 1.77,-1.09 0.97,0.15 1.65,2.15 -0.41,1.02 0.8,2.11 -0.33,-1.76 0.57,-1.71 -0.74,-2.6 1.11,-3.05 1.72,0.44 1.3,1.82 3.98,1.13 2.96,2.15 1.79,-0.47 2.09,1.53 1.89,-0.8 5.21,4.21 4.39,-0.06 0.37,-0.34 -0.88,-1.48 3.08,-3.39 5.9,0.46 0.5,1.49 0.38,13.04 4.03,-0.79 2.67,6.15 0.84,1.05 2.33,0.72 -1.19,5.53 -5.05,-1.43 -1.15,2.24 -3.48,-0.35 -0.7,2.17 -2.76,0.09 -0.25,1.93 -2.09,-0.5 -0.11,-1.69 -2.06,-0.36 -9.02,0.52 -1.32,1.21 -3.07,-0.56 -3.66,1.64 1.93,3.34 4.91,1.53 4.26,3.81 0.25,2.27 -1.09,1.46 1.18,2.73 3.77,2.7 -0.77,1.44 -2.92,2.32 1.22,3.56 -0.25,4.85 1.31,-0.01 0.19,1.98 1.58,0.04 0.36,-1.81 4.52,0.07 -0.59,-2.36 1.01,-3.8 2.01,-0.08 0.79,-1.65 6.16,1.04 -3.86,16.82 3.34,0.98 -1.91,6.45 -1.33,-0.25 -2.1,0.67 -1.81,1.29 -0.99,1.06 -0.32,1.99 -2.67,-0.47 -0.47,-1.94 -2.96,-0.81 -2.12,0.22 -0.83,2.93 -1.85,-0.07 -0.52,-0.46 0.39,-0.9 -1.33,-0.13 -1.09,-1.03 -1.03,0.94 -2.2,0.15 -1.94,-1.1 0.49,-1.94 -3.74,-0.51 -0.57,4.34 -6.97,-0.71 -0.6,-1.31 -0.99,-0.05 -1.91,0.78 -1.94,2.87 -0.97,0.26 -1.46,-0.63 -0.92,1.32 -2.09,-2.14 -2.29,1.66 -2.13,-1.79 -0.53,0.6 -1.43,-1.14 -0.42,1.2 -1.2,-1.15 -1.52,1.08 0.33,1 -1.77,1.55 -1.4,-0.09 -1.88,-1.5 -0.83,0.4 -1.25,-0.59 -0.89,1.13 -2.33,0.46 -2.63,-1.25 -0.85,0.95 -2.02,-0.3 -0.39,0.64 -3.51,-0.82 -0.75,-1.37 -1.29,-0.43 -0.1,-1.94 -0.63,0.87 -1.05,-0.57 0.4,-1.68 -0.38,-0.93 -1.26,-0.66 0.16,-0.63 -1.63,-2.89 0.15,-1.76 0.07,-2.11 0.96,-1.13 -0.53,-0.91 0.66,-2.86 -0.73,-0.58 -0.74,-2.78 -1.28,-0.16 -0.64,-0.79 0.99,-2.42 -0.1,-2.65 -0.82,-1.29 -2.74,0.09 -3.19,-1.95 -2.21,-3.17 -0.2,-1.79 0.99,-1.76 -1.12,0.17 0.48,-1.29 -2.9,-4.96 3.16,0.18 1.83,-2.62 -0.37,-2.64 0.6,0.61 3.64,0.45 0.51,1.16 1.23,0.33 1.17,-0.46 0.65,-1.43 1.39,0.08 1.32,-1.69 -1.32,-3.32 1.12,-1.43 -0.96,-0.52 0.9,-0.1 -1.82,-0.73 0.4,-1.27 -1.26,0.26 -0.38,1.23 -0.97,-0.43 -1.07,0.68 -1.62,-1.14 -2.85,-4.83 -1.23,-0.22 -0.25,-1.73 0.41,0.08 -0.91,-1.74 1.31,0.34 1.4,-1.09 0.16,-3.2 1.26,-0.31 2.71,1.15 2.17,1.16 0.55,1.59 2.13,1.49 2.13,0.04 -0.23,0.82 -2.22,0.66 0.75,1.41 -0.75,1.53 0.31,-0.9 0.69,-0.16 0.11,-1.09 2.35,-0.42 -0.43,-1.23 6.24,2.76 z m -13.91,91.12 0.56,-0.02 0.29,-2.07 1.46,0.83 0.05,-0.79 0.58,-0.16 -0.49,-1 3.56,0.2 1.44,-0.8 1.81,0.52 0.71,-3.19 3.66,1.22 0.95,-0.24 0.48,1.03 0.81,-0.2 2.13,2.3 -0.13,1.01 1.46,0.85 1,0.09 0.41,-0.53 3.27,0.45 0.8,0.39 0.93,2.06 -2.42,2.31 0.3,0.74 -1.16,0.84 0.08,1.46 -1.07,0.81 0.55,1.36 -0.63,1.25 0.6,1.09 -1.22,0.23 -0.78,1.62 0.61,2.59 -2.33,0.17 0.73,0.44 -0.49,0.74 -1.17,-0.3 -2.85,1.96 -0.78,0.84 0.5,0.79 -1.4,1.23 0.18,1 -0.65,2.83 -0.51,0.18 -0.98,-0.73 -1.4,0.48 -1.17,-0.75 -1.62,0.62 -0.88,-1.69 -0.79,-0.92 -0.98,-1.41 0.36,-0.95 -0.61,-0.31 1.26,-0.71 -0.1,-1.43 -0.65,-0.62 0.02,-0.76 1.07,-0.65 -0.29,-1.08 -1.88,0.46 -1.28,-1.44 -0.17,-1.91 -1.35,-1.83 -1.95,-1.13 0.56,-0.76 -0.44,-0.46 1.02,-0.01 -1.39,-0.3 0.07,-0.49 2.47,-1.51 -0.92,-1.4 -1.72,-0.85 0.94,-0.94 -0.46,-0.51 0.47,-0.68 1.08,-0.23 z m -14.02,-38.64 5.68,-3.19 1.6,-2.54 1.41,0.53 1.36,-1.24 2.3,1.6 2.83,-0.39 -0.15,1.76 1.63,2.89 -0.16,0.64 1.26,0.66 0.39,0.93 -0.4,1.68 1.05,0.57 0.62,-0.88 0.1,1.94 1.29,0.43 0.75,1.37 3.51,0.82 0.39,-0.64 2.02,0.3 0.85,-0.95 2.63,1.25 2.33,-0.45 0.89,-1.14 1.25,0.59 0.83,-0.4 1.88,1.5 1.39,0.09 1.78,-1.55 -0.33,-1.01 1.51,-1.08 1.21,1.15 0.41,-1.21 1.43,1.14 0.53,-0.6 2.13,1.79 2.29,-1.66 2.1,2.14 0.92,-1.32 1.45,0.63 0.97,-0.27 1.95,-2.87 1.91,-0.78 0.99,0.05 0.6,1.32 6.97,0.71 0.57,-4.34 3.74,0.51 -0.49,1.94 1.94,1.1 2.2,-0.15 1.03,-0.94 1.09,1.03 1.33,0.13 -0.39,0.9 0.52,0.46 1.85,0.07 -0.5,1.48 0.48,2.44 -1.29,1.36 -0.63,3.25 -3.38,0.53 0.63,1.73 2.23,1.11 2.25,-1.63 -1.12,5.14 1.59,0.65 0.11,2 -4.98,0.23 -0.26,3.13 -2.4,0.57 -0.87,2.02 -4.37,-0.52 -0.33,0.51 -1.54,-0.04 -0.49,0.96 -3.51,-0.55 -1.38,0.33 -1.04,-1.22 -2.64,0.02 -0.02,-0.81 -1.78,1.35 -0.26,-1.69 -1.14,0.48 0.04,0.73 -1.43,-0.7 -0.59,0.79 -1.33,0.04 -0.41,0.86 -1.57,-2.51 -2.13,0.86 -0.76,-1.98 -1.01,-0.27 -0.73,1.99 0.99,0.67 -0.12,1.75 -3.12,0.67 -2,1.68 -0.29,-0.8 -0.35,0.21 -0.56,0.93 0.5,1.1 -0.74,0.7 0.77,0.91 -2.23,2.66 -3.27,-0.45 -0.41,0.53 -1,-0.09 -1.46,-0.85 0.13,-1.01 -2.13,-2.3 -0.81,0.2 -0.48,-1.03 -0.95,0.24 -3.66,-1.22 -0.71,3.19 -1.81,-0.52 -1.44,0.8 -3.56,-0.2 0.49,1 -0.58,0.16 -0.05,0.79 -1.46,-0.83 -0.29,2.07 -0.56,0.02 -3.84,-4.85 -1.79,0.62 0.52,0.94 -1.36,0.33 -1.23,2.61 -0.58,-0.09 -1.32,-0.46 -1.1,-2.24 -2.68,-1.52 -2.28,-0.54 -0.95,1.36 -0.14,-1.03 -0.65,0.4 0.27,-1.97 -1.79,-0.54 0.11,-0.6 -1.46,-0.72 0.03,-1.15 1.08,-1.36 0.59,0.67 2.47,-1.12 0.85,-1.9 -0.59,-0.68 1.01,-1.24 -0.04,-1.36 0.83,0.61 -0.13,-1.25 -1.56,-0.75 0.56,-3.11 -2.42,-0.91 0.43,-0.98 -0.65,-0.53 1.43,-5.99 -1,-3.34 0.82,-1.05 1.26,0.25 0.45,-0.54 0.31,-0.79 -0.57,-0.93 0.98,-0.81 z m 113.32,-123.16 -3.62,0.59 -1.17,0.99 2.21,-2.04 3.05,0.16 z m 52.53,-17.38 3.1,1.71 0.69,2.91 -0.56,-0.26 -0.54,-2.29 -3.19,-2.07 -0.06,-1.02 z m -65.07,-0.78 3.03,2.37 0.83,1.51 0.18,1.81 -1.13,2.21 0.67,-4.44 -1.1,2.55 -1.53,0.92 0.26,0.76 -1.7,2.74 -5.09,2.43 -1.56,0.32 -0.26,-0.61 -0.17,0.83 -1.17,-0.57 0.5,0.16 -2.23,-2.86 -0.1,1.44 1.11,1.41 -0.47,-0.28 -0.87,-1.66 -0.03,-5.25 1.42,-5.22 3.05,-2.81 2.64,-0.46 z m -22.73,48.95 2.33,-0.3 0.28,0.46 0.19,-0.58 3.18,-1.3 1.52,0.67 -0.17,-0.59 1.18,-1.7 0.09,-2.39 -0.58,-0.98 0.79,-0.88 -0.1,-1.78 1.11,-1.92 -0.64,-2.42 1.17,-1.25 0.77,0.49 -0.15,0.53 1.15,-1.26 1.59,0.25 1.5,-1.09 -0.01,0.4 1.34,-0.15 1.1,0.68 -0.26,0.6 0.56,-0.11 -1.5,-1.83 -0.82,0.3 0.23,-2.53 -1.23,-1.55 1.72,1.41 2.33,-0.21 6.34,-4.72 -1.66,1.73 0.37,0.35 0.9,-0.57 0.56,-1.66 5.16,-5 0.8,0.5 2.75,-0.76 1.06,-0.91 0.96,0.12 0.3,-0.41 -0.66,-0.1 0.48,-0.73 4.53,-1.68 -0.42,1.16 -0.77,0.06 0.07,0.74 0.65,-0.72 0.58,1.02 0.69,-0.17 -1.11,2.01 1.06,1.01 0.79,-0.41 2.02,-1.73 0.42,-1.11 -1.98,-1.97 0.27,-0.91 -0.9,0.98 -0.81,-0.39 7.7,-5.75 3.69,-1.53 5.06,-0.33 -6.93,1.55 -0.24,0.63 1.01,0.75 -0.37,-0.72 2.44,0.78 -0.9,0.78 -0.21,1.99 -1.04,1.81 1.48,1.61 0.26,2.23 -0.92,0.68 0.08,0.67 -1.77,-1.21 0.5,1.42 -1.25,-0.99 -1.16,0.62 -1.45,3.93 0.83,-0.4 0.31,-1.34 1.14,-0.35 2.68,0.03 0.46,1.01 0.92,-0.66 -0.42,0.76 1.13,-0.96 0.13,2.37 -0.97,2.33 1.4,-1.99 0.43,-2.5 1.78,-1.42 1.28,2.41 1.29,0.39 -0.23,0.79 1.02,-2.6 -0.7,-1.4 1.07,-2.14 2.53,-2.29 2.06,-0.02 2.91,-1.94 1.47,1.09 2.51,-0.58 3.08,1.97 1.91,-0.23 2.43,-4.01 -3.24,0.47 5.11,-1.77 0.1,1.44 0.68,-0.95 -0.28,-0.7 6.59,-3.37 2.89,0.2 -2.29,1.16 3.01,2.03 0.79,1.61 -0.57,1.26 -1.9,0.1 -0.71,1.72 0.58,1.29 -0.3,1.94 2.96,1.41 1.77,-0.52 1.25,-1.61 -1.09,-3.56 0.98,-1.58 0.84,0.74 2.72,-0.34 3.22,-3.94 2.51,1.89 -0.27,-1.23 -1.81,-1.29 0.18,-2.98 -0.69,-1.46 -0.74,-0.21 0.09,1.12 -0.85,-0.57 -0.15,-2.66 -3.24,-6.1 0.24,-1.44 0.92,-0.83 2.19,0.14 -0.09,0.75 1.09,-0.01 -0.77,-1.6 0.05,-0.54 0.63,0.17 -0.41,-1.91 0.96,-1.09 1.46,0.64 0.39,-0.74 0.54,0.99 2.12,0.87 9.69,1.27 1.05,0.34 0.01,0.67 0.11,-0.7 4.04,1.56 5.89,2.98 0.69,1.26 2.69,1.88 0.62,1.32 -1.25,1.96 -0.08,2.27 -1.13,0.79 0.33,2.11 0.89,0.74 0.26,-0.72 0.55,0.27 1.68,1.61 1.37,-0.17 0.97,0.61 -0.01,0.89 1.25,0.7 -0.33,1.06 1,2.35 -1.61,2.37 -1.2,0.72 -1.84,-0.76 -2.12,0.36 -1.31,1.12 0.19,2.68 -4.85,3.26 0.4,2.12 -1.79,2.15 0.08,0.98 -1.51,-0.72 -1.15,0.34 -1.79,1.82 -1.18,2.57 -0.17,2.53 -8.03,5.62 -0.86,1.53 -1.12,-0.18 -1.19,0.72 -38.8,0.17 -27.29,-1.8 -3.75,3.03 -0.8,0.08 0.16,2.32 -18.81,12.03 -5.9,-0.46 -3.08,3.39 0.88,1.48 -0.37,0.34 -4.39,0.06 -5.21,-4.21 -1.89,0.8 -2.09,-1.53 -1.79,0.47 -2.96,-2.15 -3.98,-1.13 -1.3,-1.82 -1.72,-0.44 1.12,-1.63 0.52,-2.59 1.05,-0.31 -0.74,-0.22 -0.93,-2.08 0.91,-0.78 0.29,-1.45 -1.65,-2.42 0.6,-0.96 -0.74,0.38 -0.74,-1.35 -2.29,-0.28 -0.59,-1.9 1.28,-5.22 0.95,-2.22 0.24,0.49 0.59,-0.69 -0.68,-0.32 0.51,-1.58 -0.48,-1.36 0.96,-0.74 -0.33,-0.44 0.78,-0.24 -0.97,0.01 0.04,-1.12 1.34,-1.16 -1.06,0.23 -0.15,-5.43 -5.73,-5.45 -0.98,-1.76 1.35,-0.01 4.22,2.64 8.5,0.27 5.72,2.12 -1.05,-0.02 1.09,2.11 3.66,3.63 -0.45,0.53 0.43,-0.12 1.11,3.73 -0.06,1.72 -2.9,-0.33 -7.06,2.5 0.12,2.34 -1.02,0.14 -1.15,1.33 -0.64,2.98 -0.56,0.4 0.84,-0.05 4.65,2.99 -0.1,1.71 1.59,3.14 1.46,0.79 -0.32,0.67 3.81,-1.03 z m 89.76,-71.74 -0.03,0.78 2.11,1.77 3.15,4.75 1.75,0.65 0.44,1.17 2.42,2.24 0.76,2.67 -0.42,1.86 -0.85,-0.52 0.28,0.67 -1.68,0.29 0.19,0.43 -1.41,-1 -0.13,1.27 -0.63,-0.73 -2.31,-0.37 0.03,-1.66 0.92,0.22 -1.12,-1.61 -4.13,-1.81 1.39,1.88 -0.82,-0.02 -3.31,-4.45 0.32,-0.79 -0.71,-0.27 0.77,-0.24 -0.27,-0.9 -0.36,0.33 -0.64,-0.55 0.66,-0.45 -1.08,-1.1 2.91,1.04 -2.18,-2.76 0.97,0.43 1.04,-2.32 z m -85.7,187.19 -0.38,3.51 1.5,0.25 -0.11,1.67 0.46,0.96 0.7,0.33 0.24,-0.51 1.15,3.62 -2.1,-0.21 0.25,1.69 -2.41,1.28 0.19,1.01 -2.65,0.33 -0.66,1.42 0.21,1.02 -1.33,0.62 0.55,0.33 -0.52,0.66 0.34,1.05 -1.12,1.43 0.44,0.69 -3.77,0.48 -1.19,1.67 -1.67,-1.53 -4.15,-0.44 -0.07,2.69 -0.87,2.33 -1.04,-0.12 -1.59,2.48 -2.23,1.01 -2.51,-0.1 -0.58,-1.03 -1.27,-0.27 -1.68,1.5 -0.2,-2.61 -0.45,2.78 -1.89,0.39 -0.78,-0.79 0.62,-0.6 -0.13,-2.27 -0.84,-0.29 -0.29,0.7 -1.5,-0.1 -0.84,0.77 -1.6,0.2 -1.29,-1.17 -2.41,-0.73 -0.07,3.25 -3.24,0.59 -0.87,1.55 -0.83,-0.49 -3.01,0.81 -0.61,-2.59 0.78,-1.62 1.22,-0.23 -0.6,-1.09 0.63,-1.25 -0.55,-1.36 1.07,-0.81 -0.08,-1.46 1.16,-0.84 -0.3,-0.74 2.42,-2.31 -0.93,-2.06 -0.8,-0.39 2.23,-2.66 -0.77,-0.91 0.74,-0.7 -0.5,-1.1 0.56,-0.93 0.35,-0.21 0.29,0.8 2,-1.68 3.12,-0.67 0.12,-1.75 -0.99,-0.67 0.73,-1.99 1.01,0.27 0.76,1.98 2.13,-0.86 1.57,2.51 0.41,-0.86 1.33,-0.04 0.59,-0.79 1.43,0.7 -0.04,-0.73 1.14,-0.48 0.26,1.69 1.78,-1.35 0.02,0.81 2.64,-0.02 1.04,1.22 1.38,-0.33 3.51,0.55 0.49,-0.96 1.54,0.04 0.33,-0.51 4.37,0.52 0.87,-2.02 2.4,-0.57 0.26,-3.13 z m -47.49,31.81 3.01,-0.81 0.83,0.49 0.87,-1.55 3.24,-0.59 0.07,-3.25 2.41,0.73 1.29,1.17 1.6,-0.2 0.84,-0.77 1.5,0.1 0.29,-0.7 0.84,0.29 0.13,2.27 -0.62,0.6 0.78,0.79 1.89,-0.39 0.45,-2.78 0.2,2.61 1.68,-1.5 1.27,0.27 0.58,1.03 -0.11,0.47 1.14,0.68 -1.59,0.68 0.19,0.44 -1.21,0.94 -0.07,1.22 1.35,0.7 -1.23,2.34 -4.69,0.91 -0.43,1.97 0.75,-0.02 0.05,2.48 -1.68,0.07 -0.42,0.81 -1.22,0.08 -1.21,-0.75 -1.59,1.51 -0.9,-0.38 -0.24,-1.66 -2.64,1.06 -2.19,-1.07 -0.92,0.71 -1.78,-0.78 -0.25,-0.98 -0.66,-0.21 -2.93,1.11 -0.65,1.31 -1.56,-0.72 -0.68,-1.85 -0.64,-0.06 0.45,-2 -1.79,-0.56 -1.41,0.61 -0.18,-1 1.4,-1.23 -0.5,-0.79 0.78,-0.84 2.85,-1.96 1.17,0.3 0.49,-0.74 -0.73,-0.44 z"
        				},
        				{
        					"id" : "18",
        					"title" : "Байкальский банк",
        					"d" : "m 717.01,617.55 -0.25,-1.83 0.44,-0.57 -1.95,-3.38 0.39,-2.14 -1.44,-0.29 -0.44,1.17 -0.51,-2.46 -0.75,-0.4 0.9,-4.32 -0.32,-2.39 -3.24,0.64 -3.22,-2.75 -2.88,-0.61 -2.32,1.28 -0.25,0.57 0.74,0.55 0.31,1.41 -0.98,-0.4 -0.38,0.59 -0.08,3.13 -2.16,1.02 0.69,1.17 -0.39,0.76 1.23,0.69 -0.59,1.29 0.85,1.02 v 1.42 l 0.58,-0.05 -0.27,1.09 0.45,0.39 1.4,-1.21 1.22,0.63 -1.55,1.55 0.62,1.13 -0.91,3.02 -0.96,-0.06 -1.01,-1.45 -1.19,1.77 -0.97,-0.05 0.12,0.52 -1.52,0.45 -2.15,-0.43 -1.14,-1.01 -1.21,0.48 -2.72,-1.54 -1.16,1.07 0.21,1.86 -1.17,1.19 1.63,0.88 0.69,1.4 -0.52,1.41 1.03,2.43 -0.42,1.94 0.61,1.34 0.55,6.76 3.24,0.44 1.49,2.21 1.47,1.02 0.9,2.56 -0.99,3.23 -0.72,0.94 -8.21,1.81 -0.78,1.48 -4.32,3.28 -1.71,0.65 -0.87,1.62 -3.68,1.22 -0.99,1.19 0.01,2.46 0.7,1.62 1.67,0.82 -0.33,1.2 1.39,0.48 -0.23,1.5 -1.63,3.1 -2.09,0.6 -1.49,1.78 -3.17,0.34 -1.42,1.2 -2.32,-0.13 -1.4,1.45 -2.51,-0.56 -3.12,3.95 -4.16,1.63 -2.76,3.48 -1.75,-0.2 -0.43,-0.82 -2.78,-0.09 -2.39,1.92 -2.76,0.88 -1.37,-1.09 -2.46,0.14 -0.84,-0.58 -1.6,3.46 1.27,1 -1.83,0.97 -0.34,2.94 -1.12,1.02 3.02,2.14 1.03,0.11 -0.35,0.82 -1.06,-0.28 -3.41,1.62 -0.56,1.34 -1.33,0.88 0.16,0.94 1.67,0.69 -0.21,2.7 4.29,3.75 4.84,-0.27 2.3,1.48 4.89,0.67 1.27,-1.03 1.42,1.06 1.36,0.16 4.25,-2.48 3.98,-0.24 4.15,-1.66 1.73,0.6 2.48,-1.35 0.7,-2.19 2.12,-1.8 6.13,-3.44 4.42,1 3.12,3.24 2.58,0.17 3.4,-1.61 2.67,1.02 2.35,2.39 6.6,2.42 5.08,-4.65 4.47,-0.92 0.97,-1.07 0.22,-2.63 -1.69,-0.5 0.89,-0.74 0.24,-1.72 1.48,-1.53 0.24,-1.89 1.66,-2.09 0.1,-1.46 1.21,-1.56 1.18,-3.71 4.41,-3.71 0.35,-2.87 -1.05,-1.21 0.79,-2.29 -1.92,-1.16 -2.81,0.68 -0.24,-2.22 1.82,-1.12 4.23,-5 2.49,0.06 4.6,-1.7 1.38,0.03 -0.72,-1.59 -0.05,-3.22 -1.06,-1.87 -0.5,0.23 -0.73,-1.09 0.76,-1.89 -0.22,-2.69 0.65,-0.42 0.74,0.65 1.42,-1.11 -1.17,-1.07 -0.47,-2.66 -1.31,0.66 -0.07,-0.56 0.28,-1.12 1.74,-1.85 v -1.54 l 0.64,-0.62 -0.92,-0.22 0.37,-3.22 -1.54,-1.82 -1.43,1.61 -1.29,-0.29 -1.2,-6.5 -2.67,-0.08 -2.79,1.64 -2.65,-0.17 -0.11,-3.15 3.1,-1.54 -1.68,-1.47 0.18,-0.87 -2.41,-0.5 -1.24,-1.43 0.35,-1.2 -1.42,-1.14 1.14,-1.57 z m 305.39,-205.44 0.03,0.76 -1.17,0.72 -0.14,0.85 -1.55,0.45 -1.61,2.22 -1.69,0.51 -0.22,-1.13 0.26,0.56 2.01,-1.61 -0.04,-2.22 -1.28,0.25 -2.73,2.54 0.62,2.97 -0.52,1.46 -0.55,-0.3 -0.39,-7.85 -5.85,-1.85 0.3,0.55 -2.36,-1.82 -1.26,-2.04 1.46,-2.3 1.58,-5.82 -1.64,-6.08 -2.19,-3.39 -6.28,-4.87 -9.8,-3.22 -9.28,-0.28 -6.58,1.13 -5.54,1.72 -3.79,2.1 -1.17,0.26 -0.49,-0.55 -2.21,0.87 -5.18,0.26 -6.04,-3.35 2.79,-0.07 0.2,-0.44 -4.05,-7.13 -3.34,-1.73 -2.37,0.81 -0.6,-0.91 0.06,-2.13 -0.99,-0.23 0.51,-0.35 -2.87,-0.12 -0.39,-1.92 -1.8,-1.4 -2.44,0.65 -0.91,-0.11 -0.97,-1.08 -0.65,0.43 -0.77,-0.55 -0.34,0.6 -0.3,-1.37 2.57,-3.03 -0.46,-0.35 1.15,0.05 -0.03,1.82 0.51,-0.76 0.45,2.04 3.44,-2.66 -1.11,-3.63 -4.3,-4.28 -6.35,-2.79 -6.07,-0.3 -4.35,0.79 -1.42,-1.73 -8.63,-4.13 -14.76,-3.51 -11.35,-0.76 -2.37,-1.01 -2.35,-2.2 -3.07,-0.63 -1.06,0.07 0.3,1.82 2.79,3.7 0.05,1.08 1.01,0.59 -2.08,0.49 -0.27,1.26 -0.93,-0.31 -4.8,1.75 -2.19,-1.17 -1.9,0.2 -2.44,3.1 -0.73,1.87 0.24,2.4 1.54,0.72 2.14,-1.93 3.76,0.35 0.34,0.91 -1.12,0.86 -1.21,-0.46 -1.93,4.87 -2.28,-0.09 2.37,0.76 0.91,1.44 -0.5,0.53 0.03,3.3 1.28,3.35 1.04,0.69 -0.74,0.72 -0.36,-0.56 -0.56,1.41 -2.7,-1.06 -0.61,1.96 -1.17,0.04 -0.62,-1.08 -0.12,-2.94 -2.02,-1.19 -1.6,0.54 0.46,1.17 -1.26,0.66 -0.48,-1.26 -2.09,0.12 -1.13,3.86 -1.13,0.72 1.4,0.52 0.02,1.44 0.97,0.26 0.07,0.83 -1.25,0.57 -1.91,-0.98 0.16,-0.44 -1.12,0.57 -0.69,-1.12 0.49,-1.29 -0.54,0.45 0.19,-0.64 -0.7,0.43 0.28,-0.55 -1.07,-0.74 -1.53,-0.31 -1.89,-2.49 -1.33,0.19 -0.98,-1.07 -4.44,-1.48 -2.91,0.55 -3.28,2.05 -2.41,2.83 -3.16,0.62 -3.68,-1.28 -3.29,-2.74 -2.43,-4.38 -1.21,-0.56 -0.25,-0.86 0.19,-2.69 0.71,0.35 0.8,-1.18 1.9,1.14 0.56,1.24 -0.05,-0.87 -1.35,-1.86 -2.65,0.37 -1.47,1.58 -2.29,5.35 -1.73,8.1 -1.72,3.48 -0.6,4.57 -2.12,3.12 -2.38,1.62 -0.85,-1.25 -0.59,-4.38 -0.51,2.38 -0.92,0.32 -0.7,-1.48 -1.41,0.16 -1.39,-3.75 -2.36,-0.59 -0.63,-2.63 -1.99,-1.79 -0.75,-3.75 -0.6,0.24 0.34,-1.59 -0.72,-1.68 -2.31,0.41 -0.41,-1.46 0.53,-0.88 2.96,-1.04 1.9,0.61 -1.76,-2.26 -0.28,-1.9 -1.51,-3 1.17,4.77 -2.11,2.17 -1.67,-1.21 -0.42,-2.28 -1.33,-2.23 0.56,-1.05 0.62,1.72 1.37,0.12 -1.65,-1.74 0.43,-1.34 1.47,0.03 0.08,-0.51 0.64,0.88 1.72,-0.37 1.17,-0.67 -0.63,-0.66 0.86,0.65 1.05,-1.24 -0.24,-0.42 -1.04,0.47 -0.1,-0.52 1.51,-1.27 -1.1,-0.41 0.18,-0.99 -0.61,0.19 0.52,-0.47 -0.35,-0.36 1.05,-0.15 -0.1,-1.15 -0.6,-0.18 0.39,-0.38 -0.91,-0.34 0.49,-1 -2.14,-0.84 -1.46,0.43 0.21,-0.52 -1.14,-1.14 0.42,-0.05 -0.04,-1.4 2.23,0.04 -0.33,-1.07 2.15,0.58 0.5,-0.68 -0.4,-1.51 -1.04,-0.05 -0.32,-0.33 0.5,-0.22 -1.21,-0.46 2.4,-1.14 h -0.91 l -0.33,-0.81 0.92,-0.83 -2.19,-2.07 -0.16,-0.85 1.65,0.92 1.67,-0.08 -0.43,-0.17 0.46,-0.43 -0.81,-1.32 -0.46,0.39 -0.35,-0.74 -0.32,0.26 -0.01,-1.38 -1.05,-0.9 -0.66,-0.17 -0.88,0.96 -0.45,-1.41 -1,0.44 1.07,-1.46 -0.9,0.17 0.8,-1.2 -0.84,-0.68 -3.2,-0.1 1.28,-1.11 -0.42,-0.78 0.4,-0.27 -0.83,-0.69 -2.37,0.82 -0.33,-0.3 1.11,-1.45 -1.04,1.13 0.74,-1.39 -2.18,0.23 0.72,-1.54 -2.63,0.22 -0.47,-0.49 -0.27,1.03 -0.61,-2.01 -2.23,-0.32 -0.3,2.76 -0.7,-0.09 0.35,1.13 -0.83,-0.76 -0.02,-1.18 -0.64,1.92 -2.19,0.65 -0.43,-1.3 0.49,-2.79 -0.53,0.26 -0.37,-1.23 -1.31,1.51 -0.03,-0.56 -0.3,1.03 -0.03,-0.77 -0.99,0.25 0.36,-0.32 -0.46,-0.55 -0.29,1.1 0.58,0.26 -1.15,0.07 -0.06,0.5 0.76,-0.05 -0.72,0.97 -0.27,-1.31 -0.35,0.96 -0.39,-1.1 0.03,-1.48 -0.25,0.47 -0.11,-0.67 -0.35,0.48 -0.7,-0.34 -0.12,-1.34 -0.07,1.42 -0.5,-1.52 -0.1,1.52 -0.62,0.05 -0.13,-0.63 -0.52,1.01 0.5,-2.63 -0.81,1.67 0.57,-2.21 -0.67,0.15 0.09,-1.29 -0.85,2.12 0.04,-2.61 -0.56,1.34 -0.12,-1.22 -0.58,0.4 0.15,-1.2 -0.85,0.83 -0.13,1.22 0.05,-2.43 -0.65,0.65 -0.19,-0.75 -0.84,0.3 -0.08,-0.63 -0.22,0.58 -0.67,-1.59 -0.45,1.6 -1.03,-0.6 0.61,1.17 -0.37,0.51 0.18,-0.71 -0.4,0.16 -0.16,0.99 -0.75,0.31 -0.34,1.66 -0.46,-0.65 -0.35,0.82 -0.37,-0.79 -0.62,1.48 -0.36,-1.56 -0.69,0.34 0.34,-1.13 -0.4,0.67 -0.28,-0.61 -0.19,1.25 -0.08,-1.19 -0.57,-0.01 -0.08,1.3 0.65,1 -0.3,0.29 -0.71,-0.84 0.6,0.95 -0.9,-0.03 0.01,1.79 0.77,0.62 0.24,-0.34 0.29,1.77 -1.08,-1.53 0.06,1.44 -0.75,-0.04 1.86,0.42 -1.12,0.83 0.92,1.21 -0.63,0.42 0.74,0.58 0.37,-0.41 -0.52,0.92 0.6,1.02 0.25,-0.57 0.91,0.43 -0.26,0.64 -0.51,-0.39 -1.24,1 1.92,1.28 -0.62,0.36 -0.66,-0.56 -0.48,0.96 0.1,-1.06 -0.74,1.71 0.28,1.86 -0.9,1.3 -1.09,0.42 -0.22,-0.79 -2.13,-0.76 -1.35,-1.6 -0.56,0.4 1.71,1.54 -1.08,-0.32 0.27,1.11 -2.02,-0.94 -0.34,0.36 -0.61,-0.97 -1.83,1.04 -2.6,-0.83 -4.15,1.05 -3.08,-1.24 -4.96,-0.91 -1.92,0.4 -1.61,-1.37 -6.76,-3.01 -1.1,-2.83 0.77,-1.37 -0.49,-1.59 1.1,-1.48 0.8,0.04 0.69,1.01 1.41,-0.71 -1.79,-2.48 -5.04,-0.69 -4.63,0.19 -5.3,-2.23 -2.53,0.2 -5.14,-1.42 -0.9,0.09 0.08,0.6 -1.46,-0.2 -1.17,0.77 0.46,0.42 -1.85,1.09 -2.63,0.48 -1.97,-0.47 -5.36,2.32 0.59,1.93 1.93,2.12 1.74,-0.2 -1.13,1.06 -1.18,-0.25 -1.03,2 -0.92,0.17 0.26,-2.55 -1.48,-0.89 -0.93,-1.75 0.74,-2.5 1.08,-1.21 -0.31,-2.18 -1.74,-4.73 -2.41,-3.36 1.16,5.05 -1.42,2.08 -3.3,0.39 -3.3,-0.68 -2.46,-1.41 -1.82,-2.32 -2.45,2.27 -0.26,2.22 1.25,0.28 0.66,1.86 -1.92,-0.17 -1.54,4.51 -3.49,0.05 -0.44,0.78 2.97,1.49 0.15,1.38 -1.48,1.6 0.75,1.19 1.54,-0.6 1.6,0.98 -0.46,0.9 0.54,2.1 -0.94,0.2 -0.52,0.98 1.21,0.24 -1.16,4.33 0.44,3.79 1.14,0.25 -0.18,1.21 1.42,0.34 0.74,0.89 -0.02,1.41 -1.08,1.72 0.6,1.03 1.45,-0.07 0.58,0.85 1.08,-0.04 0.78,1 -0.3,2.31 2.63,1.65 0.56,15.81 3,3.2 1.76,0.6 -0.01,1.1 -1.03,0.24 -0.29,2.86 -1.04,0.12 -0.37,1.08 -1.43,-0.75 -1.25,1.76 -3.01,0.87 -0.71,1.32 -1.47,0.18 -7.63,4.44 -0.67,3.24 1.64,1.92 -4.83,0.78 -0.42,2.74 -1.37,0.55 0.19,3.49 0.97,0.52 -1.64,5.34 -2.73,0.22 -0.29,-1.56 -0.59,-0.15 -3.69,0.24 -2.65,3.24 -3.31,0.57 -3.29,2.28 -2.57,0.25 -1.26,-0.8 -2.28,2.41 -0.26,1.35 5.36,10.35 0.21,13.66 -0.97,15.22 -1.03,2.29 -1.3,-0.45 -1.29,1.28 -1.52,0.22 -0.49,2.41 -3.33,0.35 -0.17,0.58 1.33,1.32 0.77,-0.42 0.81,0.17 0.15,0.92 1.4,-0.25 -0.58,1.88 1.04,0.13 0.73,1.63 0.12,3.61 -0.92,1.68 -0.1,4.37 1.89,1.2 0.38,1.04 -0.05,6.4 1.42,0.82 1.14,1.72 1.37,0.36 -1.23,0.91 -0.25,1.53 -1.42,-0.14 -0.77,0.56 -0.61,1.4 0.58,1 h -0.79 l -1.79,2.25 -0.87,0.08 -0.22,1.35 1.27,1.8 -0.78,0.27 -0.92,-0.61 -0.47,3.65 -1.27,0.37 v 1.74 l 0.99,1.51 0.92,-0.95 0.96,0.27 0.25,1.89 2.92,-0.7 0.82,-1.36 0.68,1.95 1.27,-0.1 0.41,0.89 1.89,0.17 0.23,1.49 2.26,-0.33 2.24,1.51 h 0.89 l 0.09,-0.61 0.79,-0.45 1.01,0.43 1.22,-0.74 0.53,3.95 1.97,1.53 -0.33,1.45 0.43,0.86 -0.63,0.63 -2.9,0.2 -1.17,3.19 0.29,0.69 2.85,-0.62 1.86,0.94 1.47,-0.21 1.47,2.94 0.91,-0.28 0.51,6.37 1.36,1.99 -2.66,4.29 v 1.3 l 1.08,1.57 0.84,-0.57 2.13,-0.04 0.71,1.89 -0.41,3.85 -1.39,0.7 -1.17,2.41 2.01,4.24 -0.3,3.32 0.33,0.67 1.59,0.23 1.32,1.78 1.22,-0.18 0.79,0.58 -0.31,2.16 -1.68,2.33 0.37,0.69 -0.43,1.01 -1.34,0.23 0.43,1.27 -1.54,1.59 0.1,1.04 -1.52,2.36 -0.44,1.89 0.52,1.1 -2.25,4.38 0.05,1.83 -1.43,2.18 0.42,0.32 -0.61,1.24 1.37,0.65 1.08,1.92 -0.09,1.06 1.1,-0.04 0.32,1.28 3.6,-0.2 2.18,-1.24 0.97,-2.28 2.78,0.04 1.02,0.63 1.7,-0.94 1.09,0.78 0.71,-0.75 2.01,-0.5 1.92,-2.68 0.6,1 -0.32,1.89 2.42,-0.44 -0.01,1.19 -1.63,1.23 -0.12,2.56 0.27,1.42 0.51,0.02 0.49,-0.34 v -2.62 l 0.5,-0.39 0.79,1.32 0.94,-1.55 2.87,-0.69 1.44,-1.32 -0.23,-2.17 1.01,-0.79 0.28,-1.13 1.59,-0.88 1.36,-2.06 1.02,0.05 0.59,-1.68 2.21,-1.33 -0.19,-1.51 1.26,-1.8 1.97,-0.27 1.83,-3.98 1.29,0.43 2.5,-1.15 0.83,1.19 1.2,0.01 1.9,1.41 1.41,-0.13 1.6,1.15 0.09,0.76 1.61,0.97 0.75,2.05 1.55,-0.37 -0.56,1.62 -1.13,0.89 0.65,0.62 -0.13,3.4 1.14,1.35 2.1,0.13 1.05,-0.83 0.75,1.68 0.77,-0.37 1.06,-2.57 0.15,0.49 1.01,-0.26 0.96,1.8 2.67,0.93 0.63,1.66 -0.98,1.36 0.86,2.99 -0.45,0.96 0.5,1.55 -0.37,2.86 2.23,1.47 0.1,3.59 0.32,2.38 -0.9,4.32 0.76,0.4 0.5,2.46 0.44,-1.17 1.44,0.29 -0.39,2.15 1.94,3.37 -0.43,0.57 0.25,1.84 1.04,0.98 2.26,-0.2 2.06,-1.39 2.08,-0.38 5.83,0.81 1.13,2.92 3.82,0.1 3.58,3.36 1.24,-0.31 0.41,-0.98 2.75,2.13 4.13,0.23 4.02,4.59 0.85,1.86 1.3,-0.07 1.88,1 2.91,-0.37 1.54,1.4 1.17,-0.34 1.55,0.52 0.63,1.66 0.63,0.16 2.17,0.17 1.35,-0.92 1.66,0.72 1.34,-1.17 1.82,0.05 0.63,1.28 1.3,-0.3 1.21,-1.23 0.69,0.72 2.71,-0.34 2.12,1.66 3.23,0.74 1.12,-1.01 -0.77,-1.25 3.07,-1.04 2.96,-0.06 0.95,0.71 5.12,-0.81 1.88,0.92 -0.67,-2.81 1.9,-4.26 0.18,-2.26 1.16,-1.09 1.05,0.55 0.57,-0.89 0.68,0.97 0.58,-0.16 -0.19,-2.92 1.13,-1.24 -4.65,-6.05 0.75,-1.05 1.85,0.6 1.69,-3.85 2.18,-1.96 -2.23,-2.36 0.37,-0.67 -1.68,-1.13 0.18,-0.84 -0.7,-0.17 -0.16,-1.15 1.33,-0.32 2.29,2 1.04,-0.06 -0.45,-1.86 0.89,-0.96 -0.46,-3.33 1.81,0.23 0.93,-1.79 -0.38,-0.97 0.74,-2.39 1.61,-0.33 0.32,-0.77 -0.68,-0.7 0.44,-1.15 1.16,-0.12 0.88,-1.35 6.21,-0.68 3.15,1.37 2.04,-0.66 0.88,1.05 2.19,0.51 3.6,-5.46 1.8,-0.05 1.53,1.21 4.99,1.33 4.83,-3.31 0.16,-1.39 1.17,-1.18 3.1,-0.38 0.14,1.46 0.82,-0.03 0.57,-0.69 -0.73,-1.8 0.75,-1.17 -0.73,-2.94 1.35,-3.75 -0.45,-1.09 1.41,-3.35 -2.19,-2.59 1.05,-2.4 -0.26,-0.74 2.6,-1.66 0.42,-2.18 0.36,0.55 1.85,-0.38 0.82,-1.79 0.93,0.31 2.34,-1 1.65,-2.09 1.23,-3.64 -0.36,-1.14 2.01,-0.25 0.78,-1.3 -0.43,-0.65 0.69,-4.5 2.1,-0.55 0.71,-1.35 2.35,0.71 -0.04,1.01 1.49,-0.26 3,5.08 0.87,0.23 0.52,1.04 2.15,-0.95 0.45,1.88 1.11,0.78 1.68,-1.15 1.79,0.52 0.26,0.75 0.63,-0.22 0.82,-3.02 0.92,-0.39 0.67,1.66 1.52,-0.38 0.92,2.69 0.58,-1.17 1.51,-0.39 -0.52,2.36 0.91,1.05 3.46,-1.82 0.53,-2.21 0.86,-0.86 -0.09,-0.93 2.71,-1.91 0.69,-3.19 -0.44,-0.73 2.13,-1.13 -0.51,-0.62 0.46,-1.66 -0.7,-1.05 0.62,-0.97 -0.13,-1.92 -1.4,-1.13 0.48,-1.29 -0.65,-0.89 3.17,-8.21 -0.13,-2.63 3.47,-1.45 1.99,-4.07 1.2,0.58 2.2,-0.34 3.2,1.9 0.21,-0.99 0.74,0.21 1.26,-0.82 0.43,0.44 -0.5,1.39 1.21,0.95 -0.26,0.59 1.25,0.22 0.71,-0.24 0.21,-1.83 1.65,-2.55 -1.54,-1.97 -0.26,-1.32 2.29,-2.09 2.02,1.89 0.82,-0.57 0.84,0.72 0.32,-0.76 2.78,1.25 -0.16,-0.73 0.83,0.37 2.84,-2.58 1.01,0.16 -0.01,0.65 1.15,0.64 -0.76,1.23 0.18,1.53 1.37,1.77 1.04,-0.14 1.09,0.68 0.78,0.03 0.32,-2.93 1.56,0.38 3,-0.93 0.79,1.03 1.32,-1.93 2.26,-0.74 1.36,0.6 -0.42,1.04 0.49,0.29 1.76,-0.44 0.33,-0.81 -0.59,-1.69 0.97,-0.18 2.45,-2.95 -1.24,-1.06 -0.93,-3.71 0.92,-0.51 0.67,-3.18 1.98,-1.03 1.78,0.17 0.45,-1.11 h 0.83 l 0.74,-1.66 -0.82,-0.74 0.2,-0.95 1.09,-1.36 -0.26,-3.72 1.61,-0.92 2.25,-0.1 0.24,1.45 0.92,-0.04 1.3,-1.97 0.07,-1.3 -1.13,-1.63 1.25,-0.79 0.03,-0.83 1.76,-0.5 1.2,0.57 0.32,0.92 2.26,-1.36 0.44,0.85 3.14,0.23 1.23,-0.8 1.32,1.97 2.39,0.29 1.89,-2.64 0.56,1.55 1.8,1.17 -0.48,1.23 1.33,1.06 2.19,0.12 0.34,-1.42 1.69,-1.91 3.02,-0.93 0.99,0.26 0.51,0.96 1.45,-0.01 0.42,-0.47 -1.13,-2.21 0.84,-1.66 -0.86,-1.94 0.85,-0.6 1.93,-4.88 1.09,-0.62 -1.29,-2.08 0.06,-2.82 -3.43,-1.3 -1.38,-1.87 -1.33,-0.42 -0.01,-2.67 -0.99,-3.24 0.37,-2.55 2.06,-0.12 1.38,-1.11 -1.37,-1.83 1.07,-1.39 0.63,-2.5 1.31,-0.96 2.65,0.16 2.78,-2.4 0.61,0.69 1.13,-0.27 1.11,0.51 0.48,-1.16 1.29,-0.78 5.34,0.55 4.82,-2.91 7.12,2.61 0.58,-0.98 0.28,-4.27 0.88,-0.54 0.25,-1.76 -0.81,-0.63 -0.09,-1.12 1.59,-1.82 -0.73,-1.57 -1.66,-1.29 0.48,-2.99 1.44,-0.33 -2.17,-3.31 -0.09,-1.54 -0.92,-0.46 0.27,-1.03 -0.75,-1.11 0.71,-0.35 0.44,-2.37 z m -176.42,-31.58 1.05,1.48 0.75,-0.29 1.17,-2.54 -0.71,-1.06 -3.93,-0.24 -1.61,0.81 0.35,0.53 -0.78,-0.99 -0.53,0.14 -0.16,0.74 1.23,1.05 0.94,0.37 0.41,-0.78 0.65,0.63 z m -210.8,131.27 1.4,2.6 -0.93,1.98 -0.57,-0.64 -2.83,0.14 -1.26,0.35 -0.81,1.47 -1.12,-0.19 -1.06,-1.09 -0.79,0.97 -2.71,-1.47 -0.31,0.3 0.48,2.22 -0.77,3.74 -0.91,1.24 1.57,2.57 -1.14,1.06 -0.76,-0.57 -0.6,0.31 0.01,3.49 -1.59,0.48 0.21,1.93 2.32,2.99 -0.32,0.83 2.33,1.22 -0.44,1.71 -2.72,3.61 0.49,0.9 -0.55,2.59 -3.39,3.24 0.44,1.95 -1.01,0.77 -1.35,0.02 -2.66,2.95 -2.36,1.07 0.68,2.3 -2.98,2.22 -0.24,3.01 -0.83,0.43 0.88,1.37 -0.68,1.59 2.39,3.45 2.01,1.17 2.47,0.29 -0.2,4.8 0.63,1.16 -3.13,-0.12 -2.3,2.63 1.91,3.24 1.02,-0.02 -0.25,1.75 1.2,1.25 0.16,1.81 -4.06,3.16 -0.18,0.6 0.93,1.29 -2.9,1.75 -1.09,-0.21 0.08,-1.21 -0.72,-0.79 -2.08,0.38 -0.17,-2.08 -2.94,-0.83 -2.12,-3.29 0.03,-0.85 0.89,-0.01 -0.03,-0.44 -2.92,-0.34 -1,1.4 -0.98,-0.2 -1.53,0.75 -0.57,1.71 1.25,4.06 -2.99,3.28 -2.71,0.69 -1.66,2.94 -2.81,1.78 0.51,0.94 -1.25,2.26 -1.86,-0.1 0.43,1.39 -0.41,1.36 1.11,2.41 -0.97,0.16 -0.53,0.85 -2.29,-1.66 -0.15,-2.55 -0.47,-1.01 -1.81,-0.64 -0.26,-1.15 0.55,-1.1 -0.82,-0.81 -2.64,0.22 -1.44,3.67 -2.14,0.21 -0.51,0.62 -1.66,0.09 -0.44,-0.77 -6.09,-0.23 -4.15,10.01 1.99,1.07 -1.03,1.11 0.19,1.05 2.09,0.13 -0.32,2.76 1.11,0.43 -0.13,1.85 -2.53,0.33 0.12,2.19 -0.76,-0.06 -0.09,1.23 -0.82,0.83 -1.3,-0.61 -0.27,0.99 -0.93,0.11 -0.28,1.76 -1.31,1.21 -0.19,1.67 0.68,0.59 -0.13,2.28 0.67,1.2 -1.81,0.82 0.37,1.13 -0.63,2.49 0.61,1.47 -1.19,3.95 -3.16,-0.37 -0.88,1.59 -1.38,0.24 -0.68,0.9 -0.13,1.29 2.83,2.01 3.23,4.57 1.66,0.39 0.1,-0.89 1.02,-0.08 1.68,1.72 h 1.15 l 2.18,2.75 2.94,0.27 0.51,1.49 1.42,0.23 0.11,1.32 4.71,-0.52 0.62,0.45 -0.53,0.63 2.38,1.44 1.14,-2.23 1.77,-0.25 1.73,-1.09 0.06,-1.21 1.71,0.17 1.19,-1.04 1.28,4.17 6.71,5.04 2.25,3.11 2.3,1.61 0.79,-0.48 3.13,0.55 0.17,1.2 1.88,2.18 1.99,0.93 0.84,4.17 0.63,0.6 h 2.37 l 1.04,0.77 v 2.92 l 2.84,-1.58 2.47,-0.29 1.03,-2.98 4.81,-2.68 8.16,-9.53 7.53,-4.49 3.87,-3.82 2.93,-8.8 0.71,-6.36 -0.52,0.02 1.06,-1.71 0.44,-6.9 -0.71,-0.85 0.17,-3.59 1.56,-4.19 1.99,-0.08 0.38,-0.6 -1.78,-0.72 -0.94,-2.52 -1.97,-1.53 1.08,-1.7 -0.11,-1.22 5.67,-2.07 1.45,0.3 1.26,-1.09 0.93,-2.43 2.72,0.53 1.36,1.12 1.21,-0.39 2.82,0.7 2.98,-4.02 1.9,2.6 2.03,-0.22 0.93,0.91 1.53,0.27 1.23,-1.38 0.6,0.06 0.08,1.83 1.35,1.33 2.59,0.9 2.34,-0.45 2.56,1.69 1.67,-1.97 2.14,0.33 2.62,-0.88 1.82,-3.53 0.01,-1.38 3.95,-0.07 1.31,-1.39 2.11,-0.12 0.99,1.22 -3.47,2.56 2.72,1.54 1.21,-0.48 1.14,1.01 2.15,0.43 1.52,-0.45 -0.12,-0.52 0.97,0.05 1.19,-1.77 1.01,1.45 0.96,0.06 0.91,-3.02 -0.62,-1.13 1.55,-1.55 -1.22,-0.63 -1.4,1.21 -0.45,-0.39 0.27,-1.09 -0.58,0.05 v -1.42 l -0.85,-1.02 0.59,-1.29 -1.23,-0.69 0.39,-0.76 -0.69,-1.17 2.16,-1.02 0.08,-3.13 0.38,-0.59 0.98,0.4 -0.31,-1.41 -0.74,-0.55 0.25,-0.57 2.32,-1.28 2.88,0.61 3.22,2.75 3.24,-0.64 -0.09,-3.59 -2.23,-1.47 0.37,-2.86 -0.5,-1.55 0.45,-0.96 -0.86,-2.99 0.98,-1.36 -0.63,-1.66 -2.67,-0.93 -0.96,-1.8 -1.02,0.26 -0.14,-0.49 -1.06,2.57 -0.77,0.37 -0.76,-1.68 -1.05,0.83 -2.1,-0.13 -1.14,-1.35 0.13,-3.4 -0.65,-0.62 1.13,-0.89 0.57,-1.62 -1.55,0.38 -0.75,-2.05 -1.61,-0.97 -0.09,-0.76 -1.59,-1.15 -1.41,0.14 -1.9,-1.42 h -1.2 l -0.83,-1.19 -2.5,1.15 -1.28,-0.43 -1.83,3.98 -1.97,0.27 -1.26,1.8 0.2,1.5 -2.22,1.33 -0.58,1.68 -1.03,-0.06 -1.36,2.07 -1.59,0.88 -0.28,1.12 -1.02,0.79 0.24,2.16 -1.44,1.32 -2.87,0.69 -0.95,1.55 -0.78,-1.32 -0.51,0.4 v 2.61 l -0.49,0.35 -0.51,-0.02 -0.27,-1.42 0.12,-2.56 1.63,-1.24 0.02,-1.19 -2.42,0.44 0.31,-1.89 -0.6,-1 -1.92,2.68 -2.01,0.51 -0.71,0.75 -1.09,-0.78 -1.7,0.94 -1.03,-0.63 -2.78,-0.03 -0.96,2.28 -2.19,1.24 -3.59,0.2 -0.33,-1.28 -1.1,0.04 0.09,-1.06 -1.08,-1.92 -1.36,-0.65 0.61,-1.24 -0.42,-0.32 1.43,-2.18 -0.05,-1.83 2.26,-4.38 -0.52,-1.1 0.43,-1.89 1.53,-2.37 -0.1,-1.04 1.53,-1.59 -0.43,-1.27 1.34,-0.23 0.43,-1.02 -0.36,-0.69 1.67,-2.33 0.31,-2.16 -0.79,-0.57 -1.22,0.18 -1.33,-1.78 -1.59,-0.23 -0.34,-0.67 0.3,-3.32 -2.01,-4.24 1.17,-2.41 1.39,-0.71 0.41,-3.85 -0.71,-1.89 -2.12,0.04 -0.84,0.57 -1.08,-1.57 v -1.3 l 2.66,-4.3 -1.36,-1.99 -0.51,-6.37 -0.91,0.28 -1.47,-2.94 -1.47,0.21 -1.87,-0.94 -2.84,0.62 -0.29,-0.7 1.16,-3.19 2.91,-0.2 0.62,-0.63 -0.42,-0.86 0.32,-1.45 -1.96,-1.52 -0.53,-3.95 -1.22,0.73 -1.01,-0.42 -0.79,0.44 z m -64.65,156.19 1.14,-2.23 1.77,-0.25 1.73,-1.09 0.06,-1.21 1.71,0.17 1.19,-1.04 1.28,4.17 6.71,5.04 2.25,3.11 2.3,1.61 0.79,-0.48 3.13,0.55 0.17,1.2 1.88,2.18 1.99,0.93 0.84,4.17 0.63,0.6 h 2.37 l 1.04,0.77 v 2.92 l 2.84,-1.58 2.47,-0.29 1.03,-2.98 4.81,-2.68 8.16,-9.53 7.53,-4.49 3.87,-3.82 2.93,-8.8 0.71,-6.36 -0.52,0.02 1.06,-1.71 0.44,-6.9 -0.71,-0.85 0.17,-3.59 1.56,-4.19 1.99,-0.08 0.38,-0.6 -1.78,-0.72 -0.94,-2.52 -1.97,-1.53 1.08,-1.7 -0.11,-1.22 5.67,-2.07 1.45,0.3 1.26,-1.09 0.93,-2.43 2.72,0.53 1.36,1.12 1.21,-0.39 2.82,0.7 2.98,-4.02 1.9,2.6 2.03,-0.22 0.93,0.91 1.53,0.27 1.23,-1.38 0.6,0.06 0.08,1.83 1.35,1.33 2.59,0.9 2.34,-0.45 2.56,1.69 1.67,-1.97 2.14,0.33 2.62,-0.88 1.82,-3.53 0.01,-1.38 3.95,-0.07 1.31,-1.39 2.11,-0.12 0.99,1.22 -3.47,2.56 -1.16,1.07 0.21,1.86 -1.17,1.19 1.63,0.88 0.69,1.4 -0.52,1.41 1.03,2.43 -0.42,1.94 0.61,1.34 0.55,6.76 3.24,0.44 1.49,2.21 1.47,1.02 0.9,2.56 -0.99,3.23 -0.72,0.94 -8.21,1.81 -0.78,1.48 -4.32,3.28 -1.71,0.65 -0.87,1.62 -3.68,1.22 -0.99,1.19 0.01,2.46 0.7,1.62 1.67,0.82 -0.33,1.2 1.39,0.48 -0.23,1.5 -1.63,3.1 -2.09,0.6 -1.49,1.78 -3.17,0.34 -1.42,1.2 -2.32,-0.13 -1.4,1.45 -2.51,-0.56 -3.12,3.95 -4.16,1.63 -2.76,3.48 -1.75,-0.2 -0.43,-0.82 -2.78,-0.09 -2.39,1.92 -2.76,0.88 -1.37,-1.09 -2.46,0.14 -0.84,-0.58 -1.6,3.46 1.27,1 -1.83,0.97 -0.34,2.94 -1.12,1.02 3.02,2.14 1.03,0.11 -0.35,0.82 -1.06,-0.28 -3.41,1.62 -0.56,1.34 -1.33,0.88 0.16,0.94 -4.27,-0.41 -1.29,-2.26 -1.5,-1.11 -1.36,-0.29 -2.07,0.58 -1.66,-1.3 -4.73,-0.76 -1.93,0.97 -5.12,0.98 -2.47,1.69 -1.84,-0.61 -0.96,0.78 -2.51,-0.7 -0.67,-1.18 -2.23,-0.08 -4.4,-3.21 0.4,-1.57 -0.95,-1.15 0.3,-1.41 -0.83,-3.4 0.44,-0.67 -0.93,-0.81 -3.62,-1.23 -1.44,0.48 -0.98,-1.01 -5.2,-2.35 -3.74,-0.04 -1.91,-1.71 -2.91,-0.7 -2.38,-1.88 -0.13,-1.08 -1.23,-0.14 0.13,-0.76 -1.22,0.17 v -1.84 l 2.04,-2.94 -0.27,-2.53 0.8,-0.52 1.36,0.77 z"
        				},
        				{
        					"id" : "54",
        					"title" : "Поволжский банк",
        					"d" : "m 167.14,687.6 3.98,2.69 3.9,-1.89 0.21,1.1 1.82,-1.17 1.6,-0.14 0.63,0.66 1.8,-0.46 1.53,0.73 1.8,2.6 -0.17,1.66 -0.78,0.68 0.47,1.47 3.32,-0.25 -0.27,-1.69 1.25,-0.44 1.78,1.29 0.2,1.58 1.33,-0.64 1,0.31 1.29,-1.72 1.32,0.58 1.59,2.03 1.01,-0.24 0.52,1.05 1.01,-0.09 -0.95,0.96 -0.29,1.25 0.56,1.05 -0.52,1.08 -2.68,1.87 -0.79,5.59 1.94,1.84 -0.58,1.48 -1.39,0.99 -1.23,3.07 -1.62,-1.61 -2.26,-0.54 -3.43,3.08 -2.31,0.24 0.89,1.02 -1.46,-0.27 -1.17,1.87 2.21,1.86 -2.6,-0.38 -0.37,1.14 -0.92,-0.36 -1.05,0.48 -0.05,-1.36 -1.33,-0.37 -0.72,1.48 1.42,0.72 -0.24,0.51 -0.8,0.93 -1.75,-0.51 -0.73,0.36 0.01,0.84 -2.18,1.3 -0.16,2.26 -2.99,0.72 -0.66,-0.48 0.09,-0.88 -1.6,0.48 -2,-4.03 -1.89,-1.46 -3.23,-0.48 0.46,-1.38 -0.36,-0.79 0.79,-0.38 -0.42,-1.45 4.15,-1.84 1.02,-2.89 -1,-1.6 -1.69,-0.37 -0.39,-1.36 -2,0.01 -0.09,-2.65 0.85,-3.71 -2.07,-1.82 -1.76,-0.39 0.22,-1 -1.85,-1.77 0.87,-1.54 -0.16,-2.16 0.64,-0.33 -2.28,-2.69 1.31,-0.3 0.65,-1.24 1.68,-0.65 1.14,-2 2.99,0.28 z m 31.03,-41.26 0.83,0.97 0.05,1.46 0.29,-0.6 1.15,0.28 -0.16,-0.73 1.4,-1.85 0.97,1.65 0.24,-1.24 0.73,0.12 0.47,-0.76 1.21,0.23 0.01,0.74 1.64,0.94 1.47,-0.01 0.88,-0.31 1.15,-1.7 0.95,-0.06 -0.89,-0.43 1.9,-0.93 1.15,0.98 1.06,2.82 3.58,0.77 1.33,3.46 -0.65,2.19 -1.76,1.48 0.61,0.75 -0.33,0.36 -1.21,-0.49 -1.53,0.86 -1.06,-0.75 -1.9,0.03 0.36,0.55 -1.4,-0.17 -1.32,1.81 -2.37,-0.88 -0.38,0.42 1.18,0.81 -2.07,0.16 0.31,2.3 -1.34,-0.46 -1,0.47 -0.48,1.01 1.32,1.44 0.06,2.51 0.86,-0.04 1.84,1.45 -1.22,1.59 -2.15,0.1 -1.02,1.05 -0.68,-0.53 -0.52,2.05 -1.28,-0.59 -1.22,0.83 -1.68,-0.56 -0.81,0.33 -0.42,-0.79 -1.57,0.05 1.31,-2.02 -0.51,-1.31 0.04,-5.3 -1.41,-1.42 -1.66,-0.12 0.05,-1.54 -2.43,-3.94 -0.82,-0.55 -1.41,0.21 1.14,-1.94 4.91,-2.23 0.02,-0.98 -0.93,-0.27 0.58,-0.91 -1.09,0.05 0.58,-0.61 -0.86,-0.45 0.71,-0.59 -0.53,-1.73 2.81,1.62 0.86,-0.87 1.26,0.44 z m 7.93,23.2 -0.41,2.05 1.02,-0.79 0.68,0.17 2.85,2.42 2.41,-0.21 1.74,1.7 0.5,-0.64 0.53,1.65 3.83,1.6 0.61,1.18 2.52,0.5 1.49,2.2 -0.19,0.56 -0.73,-0.05 0.14,2 -0.64,0.07 0.37,-0.66 -0.67,-0.15 -0.78,0.47 -0.02,1.45 -1.16,0.48 0.12,1.06 -3.1,1.22 -1.42,1.36 -2.27,-0.17 -0.69,1.5 0.62,1.58 -2.28,0.85 -1.92,2.07 -1.91,-0.54 0.66,0.85 0.75,5.18 0.88,0.97 -1.02,1.07 -2.23,1.33 -1.39,-0.67 -0.96,-2.49 -2.01,-2.68 -1.9,-1.47 -0.84,0.74 -1.01,0.09 -0.52,-1.05 -1.01,0.24 -1.59,-2.03 -1.32,-0.58 -1.29,1.72 -1,-0.31 -1.33,0.64 -0.2,-1.58 -1.78,-1.29 -1.25,0.44 0.27,1.69 -3.32,0.25 -0.47,-1.47 0.78,-0.68 0.17,-1.66 -1.8,-2.6 -1.53,-0.73 -1.8,0.46 -0.63,-0.66 -1.6,0.14 -1.82,1.17 -0.21,-1.1 -3.9,1.89 -3.98,-2.69 -0.45,-2.2 -2.22,-1.47 -0.11,-1.29 1.22,-1.83 2,-5.88 0.73,-0.57 1.21,-0.65 1.32,1.14 2.49,-1.05 3.53,1.77 2.31,-2.54 1.87,0.54 1.33,1.5 0.96,-1.02 2.31,0.11 1.06,-1.23 2.44,1.33 -0.13,-1.39 2.19,-1.07 0.63,-0.94 1.81,-0.44 1.11,1.06 1.57,-0.05 0.42,0.79 0.81,-0.33 1.68,0.56 1.22,-0.83 1.28,0.59 0.52,-2.05 0.68,0.53 1.02,-1.05 z m 12.15,-20.86 1.67,1.27 0.91,-0.38 0.73,1.56 1.58,-1.44 1.39,1.26 0.36,-2.31 1.16,-1.6 0.93,0.39 0.68,-0.59 -0.12,1.11 1.12,-0.84 0.47,0.77 2.6,1.2 0.83,1.96 1.7,-1.36 h 1.45 l 0.32,0.81 -1.13,0.66 -0.56,1.83 0.88,2.09 -2.49,6.05 0.46,1.09 1,0.33 -1.04,0.44 -0.39,3.84 -2.6,2.04 -0.4,2.17 -1.01,0.33 -0.45,1.31 0.64,1.13 -1.32,1.52 0.13,2.74 -3.88,3.31 -1.49,-2.2 -2.52,-0.5 -0.61,-1.18 -3.83,-1.6 -0.53,-1.65 -0.5,0.64 -1.74,-1.7 -2.41,0.21 -2.85,-2.42 -0.68,-0.17 -1.02,0.79 0.41,-2.05 1.22,-1.59 -1.84,-1.45 -0.86,0.04 -0.06,-2.51 -1.32,-1.44 0.48,-1.01 1,-0.47 1.34,0.46 -0.31,-2.3 2.07,-0.16 -1.18,-0.81 0.38,-0.42 2.37,0.88 1.32,-1.81 1.4,0.17 -0.36,-0.55 1.9,-0.03 1.06,0.75 1.53,-0.86 1.21,0.49 0.33,-0.36 -0.61,-0.75 1.76,-1.48 0.65,-2.19 z m -55.4,8.92 1.21,1.1 0.34,-1.33 0.4,0.76 0.99,-0.59 3.21,-0.02 -0.15,-1.51 0.56,-0.92 1.41,0.64 0.86,-0.43 2.7,1.4 0.76,1.84 3.4,0.31 0.4,0.48 1.31,-0.65 -0.95,-1.86 1.75,-1.04 2.68,-0.1 0.53,1.02 3.19,-0.59 0.46,-0.62 1.41,-0.21 0.82,0.55 2.43,3.94 -0.05,1.54 1.66,0.12 1.41,1.42 -0.04,5.3 0.51,1.31 -1.31,2.02 -1.11,-1.06 -1.81,0.44 -0.63,0.94 -2.19,1.07 0.13,1.39 -2.44,-1.33 -1.06,1.23 -2.31,-0.11 -0.96,1.02 -1.33,-1.5 -1.87,-0.54 -2.31,2.54 -3.53,-1.77 -2.49,1.05 -1.32,-1.14 -1.21,0.65 1.16,-3.27 -4.92,-5.18 0.06,-0.83 -1.13,-1.56 -1.11,-0.33 0.16,-1.15 -1.34,-0.85 -0.06,-3.31 z m 73.18,-7.11 3.13,1.17 0.66,-0.54 0.37,0.95 -1.3,0.85 0.76,0.44 -0.12,0.83 1.37,-0.62 1.1,0.94 4.72,6.95 1.17,0.99 2.11,0.51 0.83,1.42 1.97,-0.07 1.35,4.49 h 1.78 l 0.46,1.44 -1.2,0.81 1.61,0.84 0.51,2.12 2.01,0.6 1.93,-3.47 1.67,1.15 0.73,-0.16 -0.41,0.79 0.73,1.96 -1.46,1.97 0.7,0.73 0.85,-0.91 1.33,1.35 0.79,1.69 -0.66,0.99 1.26,2.03 -0.28,1.08 1.04,-0.41 -0.36,-1.18 0.39,-0.24 2.11,2.09 1.22,-0.79 0.1,-0.99 1.17,0.33 1.29,-1.9 2.51,0.7 1.12,0.99 2.11,-0.76 1.38,-3.55 -0.63,-0.67 0.27,-1.51 1.48,-0.76 -0.42,-1.62 1.03,-0.02 0.58,1.13 1.4,0.83 -0.02,-1.72 1.4,-0.59 3.5,1 1.52,-0.17 0.37,1.77 -1.79,2.6 0.95,0.66 -0.46,0.51 0.35,0.82 0.59,0.2 -0.02,-0.44 2.43,1.21 -0.92,1.16 0.6,0.61 3.19,0.4 0.59,1.67 2.5,0.75 0.95,-0.32 1.38,1.87 -0.64,0.21 -1.14,5.14 -4.3,1.5 -2.52,-0.1 -1.15,-0.26 -0.96,-1.71 -0.81,-0.24 -1.7,3.18 -2.16,0.78 -0.38,-1.63 -4.08,-0.44 -0.93,-1.54 -1.29,0.09 -0.24,-2.66 -1.39,-0.2 -0.57,-0.93 -0.8,1.05 -0.66,-0.66 -0.63,0.49 -1.77,-0.53 -0.16,2.26 -1.18,-0.05 -0.41,0.65 -1.15,-0.58 -1.19,-1.89 -1.15,0.5 -2.11,-0.31 0.02,1.22 -1.68,-1.33 -0.17,1.28 -0.88,0.76 -1.16,-0.27 -0.4,1.95 -3.16,2.17 -1.49,-1.16 -0.93,0.13 -1.85,-1.63 -0.33,-1.45 -1.24,1.06 -1.23,-0.63 -0.37,0.94 0.51,2.06 -0.85,1 H 250 l -0.61,-1.05 0.65,-2.43 -1.55,-0.42 -1.89,-3.16 -2.55,-0.73 -0.31,-1.85 -1.83,-1.44 -5.94,0.57 -1.6,-3.47 -1.58,1.26 -1.79,-0.31 -0.73,1.07 0.28,0.78 -0.9,0.56 -0.74,-1 -0.99,0.9 -0.82,-0.08 -0.52,-0.76 0.85,-0.17 -0.01,-0.95 -3.36,-0.31 -0.38,-0.77 0.19,-0.56 3.88,-3.31 -0.13,-2.74 1.32,-1.52 -0.64,-1.13 0.45,-1.31 1.01,-0.33 0.4,-2.17 2.6,-2.04 0.39,-3.84 1.04,-0.44 -1,-0.33 -0.46,-1.09 2.49,-6.05 -0.88,-2.09 0.56,-1.83 z m -42.85,66.42 -0.66,1.87 3.16,1.17 1.25,1.41 -0.07,1.05 0.8,0.28 -1.37,0.84 1.13,2.55 1.45,0.9 0.22,-1.48 2.01,0.75 2.61,-0.19 2.36,3.49 1.63,0.2 0.9,3.45 1.95,3.35 -1.47,0.86 -1.57,-0.94 -0.73,1.22 5.38,3.75 -1.54,3.13 -1.2,0.24 0.16,1.21 -1.42,-2.29 0.98,2.98 -1.72,-1.45 0.19,0.82 -0.82,0.14 0.09,0.72 -0.74,-0.26 -1.09,1.88 -1.26,-0.52 -1.53,0.97 -1.14,-1.57 -0.63,0.19 -0.21,0.6 0.86,1.01 -0.68,-0.2 0.43,1.11 -0.46,0.08 -0.67,-0.6 0.52,-0.93 -4.87,0.19 2.65,-4.95 -0.23,-0.42 -2,0.44 -0.66,-1.74 -1.83,-0.65 1.34,-1.28 1.4,-0.09 0.07,-1.11 1.62,-1.18 0.28,-0.9 -2.86,-2.78 -2.37,-4.38 2.01,-1.92 -1.11,-0.33 -1.98,2.18 -4.52,-4.51 0.1,-1.74 -1.33,0.03 -1.79,-1.43 -2.21,-1.86 1.17,-1.87 1.46,0.27 -0.89,-1.02 2.31,-0.24 3.43,-3.08 2.26,0.54 1.62,1.61 z"
        				},
        				{
        					"id" : "49",
        					"title" : "Западно-Уральский банк",
        					"d" : "m 227.91,628.39 0.52,-0.73 -0.72,-0.54 0.7,-0.82 -2.46,-2.61 0.04,-1.47 0.25,-0.69 1.22,0.05 1.2,-2.5 -3,-5.67 0.74,-1.79 2.84,-0.52 1.84,-2.54 0.58,-4.56 -2.01,-2.38 0.91,-2.35 2.18,-1.72 5.32,0.96 0.51,-1.4 1.44,-0.53 0.84,1.63 3.9,-0.9 0.81,2.1 -0.51,1.18 2.16,3.53 0.53,2.15 -0.93,3.11 1.56,1.86 -0.79,1.48 0.96,0.28 0.02,2.26 0.92,0.92 -1.66,1.13 -0.99,2.12 -1.44,0.18 -0.12,0.76 0.69,1.98 0.12,-0.75 1.13,-0.18 -0.18,0.75 1.81,1.67 0.41,1.64 -0.11,0.85 -1.34,0.71 -0.71,1.51 -2.18,1.97 -2.96,1.34 -0.9,-0.82 2.17,-2.65 0.05,-1.42 -1.64,-0.62 -0.12,2.15 -2.11,-1.33 0.26,-4.26 -1.05,0.8 -0.27,1.44 -2.23,1.35 2.19,1.52 -0.18,0.51 -1.05,-0.16 0.48,1.23 -0.52,0.42 -0.55,-0.82 -0.99,0.64 -0.85,-1.02 -0.94,0.48 -0.18,2.23 -1.68,-0.91 -3.25,0.35 -0.6,-0.85 1.81,-1.97 z m 55.39,-76.14 -0.56,1.1 -1.6,0.56 -11.62,-0.24 -0.86,0.49 -2.63,-0.87 -1.14,1.65 -0.92,-0.14 -1.15,3.14 -2.79,-0.69 -0.96,2.27 -3.26,-0.23 -0.65,1.78 -0.79,-0.14 -0.91,2.13 -7.95,-1.23 -0.38,1.87 -3.48,-0.59 0.66,-2.27 -4.05,-0.55 -0.65,1.79 -2.2,-0.17 -0.9,1.8 -3.15,-0.6 -1,4.22 2.75,1.04 -0.13,0.73 1.5,0.52 0.21,1.67 -0.62,1.06 1.27,0.72 6.33,1.04 0.71,-1.25 1.49,2.34 -0.69,5.11 -0.9,0.13 -0.25,2.01 -1.34,2.76 1.28,2.85 3.14,0.85 -0.59,1.26 0.32,2.03 0.77,1.01 -1.23,1.19 0.37,2.91 0.81,2.1 -0.51,1.18 2.16,3.53 0.53,2.15 -0.93,3.11 1.56,1.86 -0.79,1.48 0.96,0.28 0.02,2.26 0.92,0.92 -1.66,1.13 -0.99,2.12 -1.44,0.18 -0.12,0.76 0.69,1.98 0.12,-0.75 1.13,-0.18 -0.18,0.75 1.81,1.67 0.41,1.64 1.56,-2.41 2.45,1.99 1.61,-0.53 1.23,0.75 3.12,-1.55 2.24,2.83 2.82,-1.23 2.65,3.47 2.42,-0.95 1.51,-1.98 0.18,-4.34 -1.31,-2.12 0.19,-1.12 0.55,-0.46 1.66,0.67 2.58,-2.48 1,0.34 -0.68,-1.79 0.33,-1.28 -1.05,-1.31 1.22,-4.05 0.64,-0.69 2.26,0.31 0.48,1.54 2.41,-2.25 0.07,-1.28 -1.42,-0.74 -0.64,-2.11 1.53,-2.31 1.34,-1.11 1.38,-0.1 2.05,-2.65 -0.15,-2.6 -1.26,-0.06 -1.23,-1.34 0.77,-2.35 -0.58,-1.01 0.16,-1.28 -1.21,-1.57 -1.78,-0.57 -1.8,-2.37 1.01,-3.46 3.15,-3.54 3.1,-11.31 0.01,-2.32 -0.91,-1.78 -0.48,-3.32 1.35,-4.63 -0.73,-1.82 z m -73.29,-73.01 18.81,-12.02 -0.15,-2.32 0.79,-0.08 3.75,-3.03 27.29,1.81 38.8,-0.17 1.19,-0.73 1.12,0.18 0.86,-1.53 8.03,-5.62 0.17,-2.52 1.18,-2.58 1.79,-1.81 1.14,-0.34 1.51,0.72 -0.08,-0.98 1.78,-2.15 -0.39,-2.12 4.85,-3.25 -0.19,-2.68 1.3,-1.12 2.12,-0.36 1.84,0.77 1.2,-0.73 -1.09,2.42 0.34,5.96 1.39,1.3 3.55,-0.78 0.42,0.95 -0.74,1.71 1.28,1.12 0.45,1.47 -0.45,0.46 -1.59,-0.41 -1.13,1.37 1.71,0.64 0.53,2.03 -2.77,1.68 -4.99,5.42 0.46,3.08 -1.69,1.45 -2.02,0.57 -0.27,1.13 -1.99,1.55 -1.88,-0.01 -1.54,1.92 -2.98,1.46 -1.1,2.36 0.6,1.68 -0.72,-0.34 -1.14,1.11 -1.65,2.89 0.44,1.01 -0.86,1.91 -5.12,2.69 -3.13,2.57 -1.98,3.33 0.17,2.17 -1.8,1.55 -0.31,1.13 -2.08,1.21 -0.17,0.98 -1.2,0.74 -0.97,-2.09 -1.94,-0.76 -1.11,1 0.02,1.38 -2.87,2.2 -0.06,1.13 0.82,0.93 -1.79,2.89 1.01,1.09 0.3,4.82 1.16,0.04 0.41,1.16 -3.02,4.33 -0.05,3.96 -1.42,6.11 0.34,1.64 -0.61,0.94 1.8,2.79 -0.02,1.3 -0.81,0.93 0.57,2.67 1.31,1.56 0.03,1.85 -1.07,0.62 -0.28,1.57 0.13,3.31 -0.69,1.39 0.19,2.39 -1.75,1.04 -0.56,1.1 -1.6,0.56 -11.62,-0.24 -0.86,0.49 -2.63,-0.87 -1.14,1.65 -0.92,-0.14 -1.15,3.14 -2.79,-0.69 -0.96,2.27 -3.26,-0.23 -0.65,1.78 -0.79,-0.14 -0.91,2.13 -7.95,-1.23 -0.38,1.87 -3.48,-0.59 0.66,-2.27 -4.05,-0.55 -0.65,1.79 -2.2,-0.17 -0.9,1.8 -3.15,-0.6 -1,4.22 2.75,1.04 -0.13,0.73 1.5,0.52 0.21,1.67 -0.62,1.06 -1.48,-1.1 -0.89,0.25 -3.13,5.39 -0.63,0.04 -0.89,-1.79 -1.54,-0.25 -1.78,2.75 -6.14,1.51 0.33,1.25 -1.52,0.45 -0.15,5.77 -1.54,0.4 -0.6,-0.35 0.34,-2.14 -1.65,-0.22 -0.12,-0.82 -1.32,-0.51 -0.8,0.31 0.2,-2.46 -4.09,-0.69 -0.3,-6.43 2.01,-2.42 -1.42,-1.75 0.08,-1.96 -1.32,-3.82 0.32,-1.99 0.99,-1.06 1.81,-1.3 2.1,-0.67 1.33,0.26 1.92,-6.45 -3.34,-0.98 3.86,-16.82 -6.16,-1.04 -0.8,1.65 -2.01,0.08 -1.01,3.8 0.59,2.36 -4.52,-0.07 -0.36,1.81 -1.58,-0.04 -0.19,-1.98 -1.31,0.01 0.25,-4.85 -1.22,-3.56 2.92,-2.32 0.76,-1.44 -3.77,-2.7 -1.18,-2.73 1.09,-1.46 -0.25,-2.27 -4.26,-3.8 -4.9,-1.53 -1.93,-3.34 3.66,-1.64 3.07,0.56 1.32,-1.2 9.02,-0.53 2.06,0.36 0.11,1.7 2.09,0.5 0.25,-1.93 2.76,-0.09 0.69,-2.18 3.48,0.35 1.15,-2.23 5.05,1.42 1.19,-5.53 -2.33,-0.71 -0.85,-1.05 -2.67,-6.15 -4.03,0.79 -0.38,-13.04 z"
        				},
        				{
        					"id" : "67",
        					"title" : "Западно-Сибирский банк",
        					"d" : "m 341.72,428.62 0.75,1.2 -1.82,-0.93 z m 79.8,-77.03 -0.53,1.31 -0.54,-0.76 z m -0.62,-1.99 -3.27,2.56 -0.6,1.58 -6.13,0.38 -0.67,-0.54 0.63,-1.57 1.87,-1.51 0.99,-2.43 1.96,-1.87 3.95,1.04 z m -78.6,40.65 -0.75,-3.4 -0.92,-0.15 -3.18,1.74 0.2,-1.31 -0.61,-1.1 1.88,-3.13 -0.23,-0.67 0.84,-0.57 -1.62,-1.01 1.37,-3.48 7.13,-5.45 3.07,-4.89 1.88,-8.39 0.61,-0.39 -0.45,-0.4 0.63,-4.02 0.45,-0.14 -0.04,-3.44 0.81,-4.51 0.6,-0.01 -0.52,-0.61 1.62,-2.54 1.27,-4.22 2.94,-0.13 0.11,0.69 -1.68,0.63 0.47,0.9 1.96,-0.67 4.56,-0.23 1.72,0.54 5.81,-0.49 3.04,1.48 -0.44,0.67 0.81,0.28 -0.19,-0.81 0.5,-0.04 5.39,3.1 -1.08,-0.01 0.81,1.53 -0.8,0.89 0.69,2.34 -1.26,0.04 1.29,0.21 0.32,5.16 -1.81,4.84 -0.47,3.71 -1.11,0.82 -0.1,3.55 -0.89,1.06 -0.32,1.74 -1.71,1.05 -0.68,1.3 1.49,4.34 1.35,1.76 2.83,1.9 -0.25,2.75 1.73,3.01 -0.9,6.15 0.39,4.05 -0.88,0.34 -1.57,2.66 1.14,2.15 -0.64,3.17 1.39,4.03 -1.17,3.49 1.27,3.42 -0.5,1.08 -0.82,-0.4 0.95,2.98 -0.94,1.61 -0.17,2.27 1.18,4.37 5.9,5.84 0.93,2.34 -0.19,1.04 -0.02,-1.3 -0.6,0.17 -0.46,1.87 -2.38,2.98 -0.37,2.58 1.24,3.37 -0.16,1.33 -0.78,0.71 0.33,1.77 -1.82,0.38 0.08,1.02 -2.05,0.93 -0.29,1.51 -0.99,0.9 -0.16,2.67 -1.35,-0.17 -0.49,0.56 0.59,2.88 -0.91,-0.38 -1.29,0.71 0.87,0.35 0.12,0.99 -1.74,1.62 0.09,1.19 -0.74,-0.22 -0.28,0.53 0.11,-1.11 -0.85,-0.16 -0.38,0.62 -0.94,-1.18 -0.52,0.52 1.06,0.8 -1.99,0.5 -1,1.11 -1.37,-0.16 -0.59,0.85 -2.02,0.72 -1.4,-0.58 -1.41,0.47 -1.21,-2.21 -0.34,0.86 -1.49,0.05 -4.08,-1.94 -0.81,0.83 -1.24,-0.6 -0.44,0.56 2.31,0.27 -1.19,1.56 1.77,0.29 -0.33,2.5 0.51,0.75 1.73,1.55 2.74,0.65 0.88,1.14 3.17,1.22 7.38,-0.28 4.26,2.05 1.71,-0.51 1.28,-1.73 -0.78,-2.42 0.57,-0.03 -0.57,-0.2 1.26,-1.73 3.07,-0.87 0.84,-1.51 3.32,-1.82 0.94,-1.91 1.69,-1.09 0.68,-3.66 -0.24,-1.89 1.57,-2.91 4.12,-4.2 0.5,-6.84 -1.08,-3.54 -2.4,-3.06 1.07,-2.46 0.17,-4.26 1.97,-1.69 4.1,-1.86 2.21,-0.32 3.21,-1.61 2.81,-0.28 1.15,2.33 -0.19,2.63 2.73,2.65 0.35,1.28 0.75,-0.33 1.19,1.58 -0.76,0.35 0.31,1.86 -0.93,1.65 1.38,0.99 -0.92,2.56 0.02,3.17 0.61,1.11 -0.54,1.42 -0.74,-0.18 -0.36,0.63 4.57,3.94 -0.56,4.68 0.81,-2.06 1.41,1.41 -0.4,-2.1 0.89,-0.72 1.66,-0.86 0.85,0.71 1.22,-0.54 5.09,5.05 1.21,0.02 -0.04,0.66 2.33,1.89 2.13,0.41 -0.94,-0.66 1.04,0.05 -0.4,-0.32 -2.45,-0.12 -1.5,-1.22 -0.02,-0.72 -1.21,-0.07 -1.05,-1.5 -1.33,-0.62 -1.11,-2 0.23,-1.09 3.39,1.85 0.84,1.75 0.98,0.29 0.13,1.39 v -1.56 l -0.98,-0.29 -1.52,-2.5 -2.58,-1.76 0.21,-0.47 -0.96,-0.03 -1.01,0.91 -0.73,-0.41 1,-0.12 -0.21,-0.86 -0.82,0.28 -0.37,-0.61 -0.19,0.91 -0.42,-0.5 -1.69,0.41 -0.74,-0.81 -1.02,0.24 0.83,-0.66 -1.09,-0.29 -0.33,-0.85 -0.86,0.94 -1.34,-0.76 -0.07,-2.09 0.99,-1.12 -0.71,-0.96 -0.06,-2.79 1.71,-2.09 1.97,-0.02 1.14,-0.73 -2.1,-3.79 0.54,-0.72 -1.18,-0.8 -0.12,-3.6 -1.04,-3.74 -4.74,-2.29 -1.96,-2.49 -1.62,-0.07 -3.45,-2.21 -3.55,-0.03 -1.98,1.84 -0.21,0.97 -2.66,0.37 -2.06,-1.02 -1.82,0.18 -1.83,1.19 -0.85,-0.37 -0.72,-2.1 0.95,-4.47 -2.18,-4.29 -0.45,-2.68 1.52,-3.79 0.3,-2.37 -0.75,-0.96 3.66,-6.26 0.77,-4.14 -2.91,-5.52 0.15,-2.08 -1.35,-1.77 -1.07,-3.65 -1.98,-2.87 -2.33,-1.81 3.62,-5.42 0.25,-3.57 7.17,-4.43 3.34,-4.28 0.51,-6.24 -0.71,-4.8 -1.43,-3.78 1.57,-1.79 3.36,3.01 -0.41,0.75 -0.57,-0.38 -0.2,0.83 2.48,4.07 -0.73,-0.08 -0.41,1.01 1.47,5.3 -1.52,2.42 -0.68,5.15 -0.66,0.12 v -0.49 l -0.25,0.65 -0.22,3.45 1.73,2.98 -0.38,1.47 0.63,1.29 -0.76,2.02 -0.59,-0.24 -0.73,0.66 0.56,1.81 4.39,3.04 10.92,1.12 2.57,0.8 1.03,3.38 3.39,1.39 0.29,-2.31 -1.53,-2.29 0.41,-3.01 -1.87,-0.5 -0.62,0.7 0.22,-2.28 -0.56,-0.14 0.07,0.59 -1.31,0.43 v 0.78 l -1.28,-1.04 -0.43,0.12 0.47,0.33 -1.18,-0.42 -1.27,-1.13 -0.38,-1.3 -3.25,-1.13 -2.59,-2.28 -0.18,-2.18 -1.62,-4.79 -0.61,-0.26 3.44,-3.34 2.96,-0.77 5.14,5.52 1.63,0.11 2.01,-1.14 0.96,-1.91 -0.18,-1.29 -1.79,-2.4 -1.66,0.12 -1.52,0.99 -0.82,-0.23 0.72,-2.66 -0.41,-0.69 1.66,0.5 1.33,-2.74 1.49,-1.14 1.43,0.17 2.2,1.96 0.06,-0.69 -1.27,-0.95 0.84,-0.95 1.36,2.52 -0.12,1.33 2.16,2.24 2.09,1.57 3.78,-0.12 4.39,2.99 0.25,1.71 -1.56,0.52 -0.59,3.01 -0.96,1.44 -1.36,0.66 -2.86,0.08 0.14,2.2 -0.99,1.86 0.51,2.33 1.48,0.64 2.47,3.4 4.94,1.96 1.53,5.49 -0.62,2.19 1.25,1.4 -1.19,3.29 1.09,1.25 -0.21,0.98 -2,-1 -1.56,-0.03 -4.46,4.68 -1.08,2.11 -0.69,-0.81 -0.82,0.37 -0.07,1.44 -2.94,3.81 1.09,2.78 -0.25,1.75 2.84,0.62 1.35,4.51 2.19,1.95 2.2,-0.19 2.81,0.67 3.22,1.88 1.69,-1.04 1.69,0.08 0.61,-0.64 0.59,-3.06 2.04,1.5 -0.94,3.35 3.77,1 0.5,0.96 -0.79,0.99 1.49,4.58 2.06,2.74 0.12,1.1 -1.6,1.08 0.43,2.61 -0.15,3.04 -1.19,0.85 -0.23,1.64 -1.01,1.23 -0.1,2.73 -1.2,0.4 -0.98,-0.44 -2.3,0.83 1.21,2.54 1.01,0.75 0.3,1.92 1.99,2.03 -0.37,3.94 -1.35,1.61 7.64,7.63 0.81,2.4 -1.75,2.73 0.07,0.81 3.49,5.57 -1.67,2.27 1.21,2.09 0.24,1.9 1.31,0.86 1.46,-0.35 2.52,1.74 0.34,0.81 -1.28,0.76 2.65,1.41 0.76,3.72 -2.26,2.8 0.79,1.88 -0.48,1.04 2.38,0.65 2.59,-0.49 -0.42,1.25 1.7,1.16 0.7,0.12 1.5,-1.08 0.91,0.38 1.19,0.97 0.47,3.09 -0.74,1.33 1.05,3.75 -0.03,3.52 -4.34,3.48 -0.3,2.76 -1.38,1.43 0.21,0.75 1.4,0.79 0.79,1.82 1.12,0.14 -0.55,3.03 0.59,1.5 -0.77,2.41 -3.34,3.98 -0.9,3.45 -2.89,4.14 -4.23,-5.23 -0.87,-0.36 -1.29,0.98 -0.1,-0.82 -1.1,1.13 -1.65,-0.49 -0.87,-0.68 -0.19,-1.13 -2,-0.63 -0.04,-1.73 -2.81,0.08 -1.95,-1.1 -1.03,0.67 -0.38,1.31 -1.25,-0.24 -1,-1.5 -0.74,0.31 -1.19,-0.77 -0.09,-1.29 -2.76,-3.46 -2.16,0.84 -0.33,1.52 -0.75,0.09 -1.95,2.16 -1.91,0.49 -0.89,3.51 -4.84,0.22 -2.6,-0.53 -5.38,1.36 -4.73,-3.22 -1.69,-1.81 -0.79,-1.96 -2.17,-1.1 -2.9,1.06 -0.68,-0.93 -3.17,-1.45 -9.09,1.4 -2.58,-2.3 -4.6,-0.01 -2.26,-2.35 -0.45,-1.36 -1.17,-0.1 -1.73,2.02 -3.79,-0.08 -0.94,0.83 -2.94,0.74 -0.87,-5.94 -1.42,-1.93 -3.04,-0.09 -2.04,-5.06 1.16,-1.36 -0.09,-0.92 -3.33,-3.09 -3.29,0.51 -0.34,-0.95 -2.6,0.11 -0.91,-1.01 -1.58,-0.19 -1.21,0.39 0.68,1.39 -0.71,2.45 -3.12,-1.69 -5.06,4.01 -0.5,-0.93 -3.27,0.46 -0.38,-1.19 -2.51,-1.21 -0.28,-0.88 0.84,-2.6 -0.95,-1.56 -3.03,0.95 -1.6,-1.28 -4.45,0.53 -7.67,2.34 -2.78,-0.02 -3,1.67 -1.26,-1.11 -0.53,-2 -2.63,-1.2 -1.3,0.67 -2.11,-1.39 -0.22,-0.86 1.59,-1.11 0.65,-1.63 -0.95,-2.25 0.95,-6.54 -2.99,-1.92 -1.12,-3.47 -1.71,-1.71 5.11,-2.69 0.87,-1.91 -0.44,-1.01 1.65,-2.89 1.14,-1.11 0.72,0.34 -0.6,-1.68 1.1,-2.36 2.98,-1.46 1.54,-1.92 1.88,0.01 1.99,-1.55 0.28,-1.13 2.01,-0.57 1.69,-1.44 -0.46,-3.09 4.99,-5.41 2.77,-1.68 -0.52,-2.03 -1.72,-0.64 1.13,-1.36 1.59,0.41 0.45,-0.46 -0.45,-1.47 -1.28,-1.12 0.74,-1.71 -0.42,-0.95 -3.55,0.78 -1.39,-1.3 -0.34,-5.97 1.1,-2.41 1.61,-2.37 -1,-2.35 0.33,-1.06 -1.25,-0.7 0.01,-0.89 -0.97,-0.61 -1.37,0.17 -1.68,-1.61 -0.55,-0.27 -0.26,0.72 -0.89,-0.74 -0.33,-2.11 1.13,-0.79 0.08,-2.27 1.25,-1.96 1.36,0.15 2.46,1.93 5.2,1.62 2.61,3.29 -2.84,-3.09 -2.25,-0.24 -2.05,-1.12 1.71,1.68 3.53,1.19 0.63,1.17 5.59,2.27 -0.7,0.5 0.13,0.79 5.34,5.31 -0.77,-0.16 0.54,1.2 0.68,-0.38 2.41,1.68 0.34,0.93 -0.7,0.67 0.1,1.21 0.8,0.53 -0.34,0.98 1.84,-2.15 0.68,-0.08 -0.51,-0.32 0.59,-0.7 -0.13,-1.08 3.81,-8.82 -0.13,-0.98 -1,-0.43 0.71,-1.04 -2.25,0.63 -2.22,-1.73 -3.02,-6.93 0.68,-0.82 0.26,-2.97 -0.83,0.07 0.19,0.68 -0.61,0.25 -3.29,-2.9 -0.95,0.21 -2.48,-1.87 -0.47,0.4 0.33,0.77 -0.89,0.45 0.46,-0.84 -0.64,0.78 0.78,2.08 -0.38,0.18 -0.72,-1.34 -0.03,-5.64 0.92,-3.72 0.55,0.23 -0.46,1.03 1.06,0.39 1.27,-0.43 1.02,-1.25 -1.31,-3.95 -0.89,-0.01 0.7,-3.4 0.98,-1.6 -1.1,-1.75 z m 52.33,-55.94 1.52,1.33 -1.37,-0.72 -0.67,3.33 0.48,1.5 -0.53,0.66 -3.76,-3.51 0.77,-2.24 0.87,-0.75 z m -24.22,-5.06 0.9,-1.08 1.54,4.33 -2.01,0.05 -1.98,1.44 -1.35,-0.23 -3.4,2.42 -1.74,-0.1 -0.72,-1.41 -0.5,0.67 0.69,1.12 -1.22,-0.12 0.46,-9.54 2.93,-1.73 3.61,-0.68 2.64,1.64 0.79,2.24 z m -38.17,267.01 0.46,-0.44 1.91,0.36 3.74,-1.18 -0.05,-3.12 1.51,-1.25 0.96,0.82 3.36,-1.82 0.95,-1.53 4.71,-1.27 1.35,-4.17 1.87,0.01 3.8,-3.1 -1.13,-1.87 2.24,-0.89 1,0.47 0.04,0.97 3.13,-1.12 3.22,1.83 2.14,-0.58 0.68,0.76 1.5,-0.71 4.91,4.37 1.47,0.18 2.57,3.12 0.13,1.47 1.41,1.33 1.25,-0.74 0.96,0.3 -0.45,1.39 1.43,1.33 -0.96,1.11 0.94,0.44 1.76,0.51 2.45,-0.78 0.89,0.8 1,-0.26 1.3,1.4 6.31,0.09 0.96,0.64 0.13,1.07 -1.54,1.45 -0.22,0.98 -1.29,0.42 -4.19,3.39 -7.19,-0.28 -1.34,1.4 0.27,0.32 -1.24,0.65 -4.69,-0.43 -1.25,-1.27 -4.98,0.83 -0.45,-2.57 0.36,-2.08 -2.99,-2.12 -2.33,6.52 -0.35,3.31 1.66,3.74 -2.22,2.3 1.71,1.85 0.93,-0.05 0.52,-1.6 1.34,0.08 0.7,2 2.87,3.2 0.52,1.89 -0.41,1.2 -1.35,0.97 -2.19,-0.46 0.49,1.9 -2.26,1.34 1.4,1.58 -1.64,0.87 0.95,1.92 -0.54,2.02 -2.17,0.83 2.15,0.44 -1.85,1 0.41,1.59 0.94,0.5 -0.45,1.12 -1.07,0.29 -0.55,1 0.27,1.21 -2.66,1.77 -3.46,-2.62 -3.37,0.1 -1.78,-1.22 -0.21,0.93 0.61,0.81 -1.72,-0.82 -0.78,1.25 -0.05,-1.44 -3.16,-3.1 -0.37,-1.45 -2.03,0.51 -0.75,-0.85 -1.2,0.4 -1.5,-0.36 -1.01,-2.74 -1.65,-0.03 -0.43,-0.72 -1.48,0.41 -0.56,-0.96 -1.43,1.18 -1.59,-1.68 -1.84,0.83 -2.63,-3.45 -3.51,-0.43 -1.06,-2.9 -0.2,-2.91 1.72,-0.3 0.5,-1.47 -1.33,-0.51 -1.55,-6.82 0.97,-1.65 -0.86,-1.02 3.73,-2.08 0.92,0.66 4.76,-3.65 -1.19,-2.82 z m 65.85,-0.06 1.29,1.82 -2.18,1.8 1.42,1.36 -1.01,1.62 3.05,1.96 0.2,4.09 0.83,0.06 1.32,3.5 0.79,-0.23 1.06,2.09 0.98,4.18 v 2.93 l -3.06,2.91 0.38,0.71 1.22,-0.82 0.64,0.52 -0.16,1.69 1.39,1.78 -0.83,0.47 -1.27,-0.31 -3.88,1.59 0.1,0.74 -1.35,1.54 0.24,1.53 -1.71,0.36 0.52,2.04 1.34,0.74 -1.75,1.73 1.3,1.88 -0.31,1.14 1.07,0.94 -0.61,1.68 1.36,0.01 0.46,1.36 0.18,-0.67 1.52,2.1 0.17,1.02 -0.94,0.65 -0.12,0.89 0.21,4.02 -2.16,0.6 0.54,1.25 -3.11,2.29 -1.63,-0.36 -1.22,1.86 -1.22,-0.21 -0.48,2.69 -0.88,-0.33 -0.28,-1.27 -1.28,0.45 0.08,-0.83 -1.23,-0.28 -0.5,0.75 -1.14,-0.46 -1.62,2.16 -0.35,-1.04 -1.1,-0.5 0.09,-1.3 0.5,-0.09 0.98,-2.35 1.62,0.24 0.42,-2.33 -0.84,-0.25 -0.87,0.84 0.11,0.68 -0.84,-0.49 -0.86,0.45 -1.58,-0.52 -0.63,-1.25 -2.73,-0.43 -0.58,1.06 h 1.04 l 0.41,1.18 -1.21,-0.48 -0.52,0.97 -0.74,-0.53 -0.11,-1.65 0.93,-0.62 -1.32,-0.61 -0.32,-1.6 -0.9,-0.54 -0.72,0.09 0.96,2.74 -1.06,-1.1 -1.84,-0.31 -0.15,1.34 -0.65,0.44 -2.16,-0.99 -1.38,0.84 -1.05,-2.76 1.35,0.21 -0.03,-3.23 0.73,-0.88 -1.74,-1.45 -0.31,-3.72 -1.4,-2.82 -2.14,0.28 -0.27,-1.21 0.55,-1 1.07,-0.29 0.45,-1.12 -0.94,-0.5 -0.41,-1.59 1.85,-1 -2.15,-0.44 2.17,-0.83 0.54,-2.02 -0.95,-1.92 1.64,-0.87 -1.4,-1.58 2.26,-1.34 -0.49,-1.9 2.19,0.46 1.35,-0.97 0.41,-1.2 -0.52,-1.89 -2.87,-3.2 -0.7,-2 -1.34,-0.08 -0.52,1.6 -0.93,0.05 -1.71,-1.85 2.22,-2.3 -1.66,-3.74 0.35,-3.31 2.33,-6.52 2.99,2.12 -0.36,2.08 0.45,2.57 4.98,-0.83 1.25,1.27 4.69,0.43 1.24,-0.65 -0.27,-0.32 1.34,-1.4 7.19,0.28 4.19,-3.39 1.29,-0.42 0.22,-0.98 z m -93.92,-109.82 1.71,1.71 1.13,3.48 2.99,1.91 -0.95,6.54 0.94,2.25 -0.64,1.63 -1.6,1.11 0.22,0.87 2.11,1.39 1.3,-0.67 2.63,1.2 0.53,2 1.26,1.11 3,-1.67 2.77,0.02 7.67,-2.35 4.45,-0.53 1.6,1.28 3.03,-0.95 0.95,1.56 -0.84,2.6 0.28,0.88 2.5,1.21 0.38,1.18 3.28,-0.46 0.5,0.93 5.06,-4.01 3.11,1.69 0.72,-2.45 -0.69,-1.39 1.21,-0.38 1.58,0.18 0.91,1.02 2.6,-0.11 0.34,0.95 3.29,-0.5 3.33,3.09 0.09,0.92 -1.16,1.37 2.04,5.06 3.04,0.09 1.41,1.92 0.88,5.95 2.94,-0.74 0.94,-0.83 3.79,0.07 1.73,-2.02 1.16,0.1 0.46,1.35 2.26,2.35 4.59,0.01 2.58,2.31 9.09,-1.4 3.17,1.44 0.68,0.94 2.91,-1.06 2.16,1.09 0.79,1.96 1.69,1.81 4.74,3.22 5.38,-1.36 2.6,0.53 4.85,-0.22 0.89,-3.52 1.91,-0.48 1.95,-2.16 0.74,-0.1 0.34,-1.52 2.15,-0.83 2.77,3.46 0.08,1.29 1.19,0.77 0.74,-0.31 0.99,1.5 1.25,0.24 0.38,-1.32 1.04,-0.66 1.95,1.1 2.8,-0.08 0.05,1.73 1.99,0.63 0.19,1.14 0.87,0.67 1.65,0.49 1.1,-1.13 0.11,0.82 1.29,-0.98 0.87,0.36 4.24,5.24 -0.01,2.89 1.23,2.52 5.14,2.06 1.81,1.66 1.87,0.43 0.35,1.2 -2.23,1.12 0.06,2 -10.1,6.14 -2.2,0.14 -3.07,-2.63 -2.31,0.17 -4.77,3.64 -0.81,0.86 -0.11,1.47 -1.79,1.28 -2.07,-1.72 -5.61,0.02 -0.25,-1.6 -1.63,-0.77 -4.72,1.7 -5.09,0.42 -1.06,-0.25 -0.4,-1.94 -1.06,-0.25 -1.61,0.96 -1.4,-1.22 -1.06,0.83 -3.01,-0.31 -0.61,0.61 -6.71,-1.15 -0.64,2.81 0.51,1.39 -1.54,1.27 0.06,3.32 -1.05,2.11 0.32,1.46 -0.68,5.82 -3.57,0.62 -0.88,1.43 -0.8,0.15 -0.8,1.79 -1.52,1.38 0.45,3.29 -3.84,4.1 -0.96,-0.64 -6.31,-0.09 -1.3,-1.4 -1,0.26 -0.89,-0.8 -2.45,0.78 -1.76,-0.51 -0.94,-0.44 0.96,-1.11 -1.43,-1.33 0.45,-1.39 -0.96,-0.3 -1.25,0.74 -1.41,-1.33 -0.13,-1.47 -2.57,-3.12 -1.47,-0.18 -4.91,-4.37 -1.5,0.71 -0.68,-0.76 -2.14,0.58 -3.22,-1.83 -3.13,1.12 -0.04,-0.97 -1,-0.47 -2.24,0.89 1.13,1.87 -3.8,3.1 -1.87,-0.01 -1.35,4.17 -4.71,1.27 -0.95,1.53 -3.36,1.82 -0.96,-0.82 -1.51,1.25 0.05,3.12 -3.74,1.18 -1.91,-0.36 -0.46,0.44 -0.27,-1.25 -1.5,-0.54 -1.36,-1.53 -1.87,-5.96 -0.95,-0.23 -0.31,-1.27 -6.76,-0.94 -1.69,-1.25 -1.09,-8.34 -0.49,-0.92 -3.19,-1.32 0.22,-2.26 -2.51,-4.5 -0.76,-2.64 0.44,-2.76 -1.27,-1.92 -11.05,-7.22 -5.4,-0.97 -2.55,0.54 -0.85,-2.61 -3.07,-1.35 -0.41,0.41 -0.13,-3.31 0.28,-1.57 1.07,-0.62 -0.03,-1.85 -1.31,-1.56 -0.57,-2.67 0.81,-0.93 0.02,-1.3 -1.8,-2.79 0.61,-0.94 -0.34,-1.64 1.42,-6.11 0.05,-3.96 3.02,-4.33 -0.41,-1.16 -1.16,-0.04 -0.3,-4.82 -1.01,-1.09 1.79,-2.89 -0.82,-0.93 0.06,-1.13 2.87,-2.2 -0.02,-1.38 1.11,-1 1.94,0.76 0.97,2.09 1.2,-0.74 0.17,-0.98 2.08,-1.21 0.31,-1.13 1.8,-1.55 -0.17,-2.17 1.98,-3.33 z"
        				},
        				{
        					"id" : "38",
        					"title" : "Московский банк",
        					"d" : "m124.57 633.65-0.01 0.01l1.01 0.36-1.7-0.12 0.71-0.3zm6.28-0.9 0.3 0.01l-0.31 0.13zm-6.49 7.47 0.55-0.65-1.22-1.17-0.3-1.62 0.86-0.12 0.28 0.75 1.26 0.2-0.39-2.05 2.3-0.81-0.61-0.21 0.44-0.21-0.6-1.27 0.42 0.09-0.26-0.72 0.57-0.33-0.53-1.06 0.6 0.04 0.05 0.94 1.06-1.01-0.12 0.58 2 1.05 0.04 1.01 0.9 0.97-0.75-0.35-0.95 1.41-0.97 0.21-0.44 1.73-1.02-0.4 0.54 0.99-0.46 1.75-1.36-0.01-0.73 1.33l-0.33 0.04-0.14 0.05-0.6-0.81 0.01-0.01 0.01-0.02-0.03-0.05-0.02-0.02h-0.01l-0.08-0.18zm3.44-9.57 0.12 0.02l-0.4-0.01zm-2.05 0.25 0.3-0.73 0.56 0.5-0.46 0.44z"
        				},
        				{
        					"id" : "42",
        					"title" : "Волго-Вятский банк",
        					"d" : "m 141.95,620.43 1.41,-0.61 1.79,0.56 -0.45,2 0.64,0.06 0.68,1.85 1.56,0.72 0.65,-1.31 2.93,-1.11 0.66,0.21 0.25,0.98 1.78,0.78 0.92,-0.71 2.19,1.07 2.64,-1.06 0.24,1.66 0.9,0.38 1.59,-1.51 1.21,0.75 1.22,-0.08 0.89,2.08 1.36,0.55 -0.05,0.53 -1.5,0.94 -0.19,1.4 -1.57,0.86 -0.34,1.49 -2.41,2.34 0.34,2.52 -1.12,0.94 -0.31,1.67 -0.95,1.07 -0.89,0.16 -0.4,-0.52 -1.23,0.44 -1.76,-1.27 -0.9,1.11 -0.61,-1.49 -0.68,-0.08 -0.17,0.76 -1.96,0.11 -0.3,-1.52 -1.47,0.53 0.13,-0.86 -0.93,0.16 -0.56,-1.11 0.38,-0.99 -1.02,-0.35 0.26,-1.7 -1.21,-0.99 -0.16,-1.23 -1.09,-0.11 -1.81,1.21 -1.12,-0.36 0.02,-1.15 -1.58,0.15 -0.48,-1.22 -1.54,0.24 -1.67,-0.73 -0.48,-2.91 -0.89,-0.7 0.34,-1.63 -1.2,-1.78 0.63,-0.58 -0.41,-1.53 0.59,-0.14 0.88,1.69 1.62,-0.62 1.17,0.75 1.4,-0.48 0.98,0.73 0.51,-0.18 z m 76.25,1.2 1.61,0.15 0.59,-0.62 1.98,3.99 1.18,0.35 -0.2,-0.85 0.52,-0.28 0.45,0.49 -0.02,1.99 0.77,1.15 2.09,1 0.74,-0.61 1.89,-0.24 -1.81,1.97 0.6,0.85 3.25,-0.35 1.68,0.91 0.18,-2.23 0.94,-0.48 0.85,1.02 0.99,-0.64 0.55,0.82 0.52,-0.42 -0.48,-1.23 1.05,0.16 0.18,-0.51 -2.19,-1.52 2.23,-1.35 0.27,-1.44 1.05,-0.8 -0.26,4.26 2.11,1.33 0.12,-2.15 1.64,0.62 -0.05,1.42 -2.17,2.65 0.9,0.82 2.96,-1.34 2.85,2.7 0.04,1.02 -1.37,1.25 -0.76,2.5 -2.65,2.24 -2.5,0.67 -0.29,0.65 3.86,2.66 -0.61,1.11 0.24,1.24 -1.47,3.11 -0.25,4.84 -1.1,-0.94 -1.37,0.62 0.12,-0.83 -0.76,-0.44 1.3,-0.85 -0.37,-0.95 -0.66,0.54 -3.13,-1.17 -0.32,-0.81 h -1.45 l -1.7,1.36 -0.83,-1.96 -2.6,-1.2 -0.47,-0.77 -1.12,0.84 0.12,-1.11 -0.68,0.59 -0.93,-0.39 -1.16,1.6 -0.36,2.31 -1.39,-1.26 -1.58,1.44 -0.73,-1.56 -0.91,0.38 -1.67,-1.27 -3.58,-0.77 -1.06,-2.82 -1.15,-0.98 -1.9,0.93 0.89,0.43 -0.95,0.06 -1.15,1.7 -0.88,0.31 -1.47,0.01 -1.64,-0.94 -0.01,-0.74 -1.21,-0.23 -0.47,0.76 -0.73,-0.12 -0.24,1.24 -0.97,-1.65 -1.4,1.85 0.16,0.73 -1.15,-0.28 -0.29,0.6 -0.05,-1.46 -0.83,-0.97 1.25,-0.52 -0.53,-0.81 0.39,-0.83 2.14,0.91 -0.12,-0.7 1,0.05 -0.36,-1.29 2.25,-0.39 -1.35,-0.55 1.09,-1.23 -0.78,-1.99 -0.55,-0.18 0.06,0.72 -0.95,0.59 -0.34,-1.19 3.19,-3.24 -0.83,-1.08 2.75,-1.52 -0.03,-0.73 -0.12,-0.82 1.52,-1.17 0.43,-1.37 0.89,0.27 1.86,-1.91 0.08,-0.4 -1.11,-0.02 0.35,-1.48 1.02,-0.63 1.83,0.43 0.48,-0.98 0.82,0.11 0.41,-0.91 1.05,-0.39 0.58,0.34 -0.04,0.98 0.89,-0.61 0.44,0.46 1.38,-1.52 z m -26.4,-18.73 0.11,0.7 4.88,-0.09 4.96,1.21 -1.27,1.45 -0.93,3.93 -1.58,-0.57 -1.62,1.05 -1.75,-0.01 -0.53,1.13 0.94,2.76 -0.69,0.58 0.13,2.79 -0.4,-0.5 -0.94,0.81 -1.5,-0.49 -0.67,0.85 -2.15,0.46 -0.56,0.75 0.12,2.29 -1.04,-0.06 -0.67,0.77 -0.1,1.71 0.92,-0.19 1.26,0.83 -0.64,1.75 1.63,1.2 0.38,1.98 -0.24,2.61 -1.01,2.2 2.99,2.04 0.19,0.76 -2.62,3.04 0.41,1.6 -2.4,0.94 -0.39,-0.42 0.46,-1.89 -0.71,-0.18 -1.33,1.01 -0.49,1 0.29,1.38 -1.33,0.47 -0.49,1.48 -0.47,-0.61 -0.44,0.54 0.19,1.19 -0.64,0.78 1.09,1.1 -0.23,0.43 -2.11,-0.43 -1.59,0.57 0.45,-0.91 -0.5,-0.31 -0.58,0.53 -2.09,-0.93 -0.97,-1.75 -1.11,-0.06 0.04,-0.64 -2.51,-0.53 0.05,-1.2 -2.14,-0.07 -1.17,0.98 -0.31,1.11 -0.68,-0.46 -1.39,0.64 -0.64,-0.72 -0.99,0.55 -1.07,-0.85 0.41,-1.72 -0.46,-0.37 -1.64,0.72 -1.62,-0.39 0.16,-1.28 -1.09,0.64 -0.46,-1.13 0.95,-1.07 0.31,-1.67 1.12,-0.94 -0.34,-2.52 2.41,-2.34 0.34,-1.49 1.57,-0.86 0.19,-1.4 1.5,-0.94 0.05,-0.53 -1.36,-0.55 -0.89,-2.08 0.42,-0.81 1.68,-0.07 -0.05,-2.48 -0.75,0.02 0.43,-1.97 4.69,-0.91 1.23,-2.34 -1.35,-0.7 0.07,-1.22 1.21,-0.94 -0.19,-0.44 1.59,-0.68 -1.14,-0.68 0.11,-0.47 2.51,0.1 2.23,-1.01 1.59,-2.48 1.04,0.12 0.87,-2.33 0.07,-2.69 4.15,0.44 1.67,1.53 1.19,-1.67 z m -28.19,42.08 1.07,0.85 0.99,-0.55 0.64,0.72 1.39,-0.64 0.68,0.46 0.31,-1.11 1.17,-0.98 2.14,0.07 -0.05,1.2 2.51,0.53 -0.04,0.64 1.11,0.06 0.97,1.75 2.09,0.93 0.58,-0.53 0.5,0.31 -0.45,0.91 1.59,-0.57 2.11,0.43 0.23,-0.43 -1.09,-1.1 0.64,-0.78 -0.19,-1.19 0.44,-0.54 0.47,0.61 0.49,-1.48 1.33,-0.47 -0.29,-1.38 0.49,-1 1.33,-1.01 0.71,0.18 -0.46,1.89 0.39,0.42 2.4,-0.94 0.45,0.8 0.53,-1.17 0.39,0.18 -0.2,1.35 1.01,0.86 0.45,1.57 0.53,1.73 -0.71,0.59 0.86,0.45 -0.58,0.61 1.09,-0.05 -0.58,0.91 0.93,0.27 -0.02,0.98 -4.91,2.23 -1.14,1.94 -0.46,0.62 -3.19,0.59 -0.53,-1.02 -2.68,0.1 -1.75,1.04 0.95,1.86 -1.31,0.65 -0.4,-0.48 -3.4,-0.31 -0.76,-1.84 -2.7,-1.4 -0.86,0.43 -1.41,-0.64 -0.56,0.92 0.15,1.51 -3.21,0.02 -0.99,0.59 -0.4,-0.76 -0.34,1.33 -1.21,-1.1 1.23,-1.58 -1.73,-1.6 0.36,-0.58 0.39,0.72 0.55,-0.4 0.65,0.44 -0.13,-0.7 1.42,-0.24 -0.29,-0.68 -1.13,0.07 -0.4,-0.6 -1.32,1.02 -0.71,-1.09 0.72,0.28 1.62,-1.55 0.98,-0.17 -0.79,-0.78 1.31,-1.71 -0.62,-1.37 -1.75,-0.71 -0.4,-0.76 z m 30.84,-27.15 2.6,0.3 0.24,1.14 2.53,-0.22 1.8,-2.8 0.85,0.8 1.34,-0.09 0.74,-0.25 0.82,-1.69 1.16,0.56 0.75,-0.84 0.88,0.37 0.93,-0.44 0.46,0.32 -0.27,0.72 0.79,0.31 1.01,-1.52 -0.19,-1.38 1.11,-0.32 -0.14,1.98 0.61,1.67 0.7,0.31 1.83,-0.82 1.01,0.56 -0.09,1.94 2.46,0.63 -0.18,2.56 1.01,1.11 -1.38,1.52 -0.44,-0.46 -0.89,0.61 0.04,-0.98 -0.58,-0.34 -1.05,0.39 -0.41,0.91 -0.82,-0.11 -0.48,0.98 -1.83,-0.43 -1.02,0.63 -0.35,1.48 1.11,0.02 -0.08,0.4 -1.86,1.91 -0.89,-0.27 -0.43,1.37 -1.52,1.17 0.12,0.82 -2.89,-1.54 -0.85,-2.21 -2.97,-0.83 -1.04,-1.99 -1.2,0.12 -3.33,2.64 -1.36,-0.36 -2.72,1.8 -0.38,-1.98 -1.63,-1.2 0.64,-1.75 -1.26,-0.83 -0.92,0.19 0.1,-1.71 0.67,-0.77 1.04,0.06 -0.12,-2.29 0.56,-0.75 2.15,-0.46 0.67,-0.85 1.5,0.49 0.94,-0.81 z m 2.23,-54.14 0.83,-2.93 2.12,-0.22 2.95,0.8 0.47,1.95 2.67,0.47 1.32,3.82 -0.08,1.96 1.42,1.75 -2.01,2.42 0.3,6.43 4.09,0.69 -0.2,2.46 0.8,-0.31 1.32,0.51 0.12,0.82 1.65,0.22 -0.34,2.14 0.6,0.35 1.54,-0.4 0.15,-5.77 1.52,-0.45 -0.33,-1.25 6.14,-1.51 1.78,-2.75 1.54,0.25 0.89,1.79 0.63,-0.04 3.13,-5.39 0.89,-0.25 1.48,1.1 1.27,0.72 6.33,1.04 0.71,-1.25 1.21,1.76 0.39,1.43 -0.8,4.26 -0.9,0.13 -0.25,2.01 -1.34,2.76 1.28,2.85 3.14,0.85 -0.59,1.26 0.32,2.03 0.77,1.01 -1.23,1.19 0.37,2.91 -3.9,0.9 -0.84,-1.63 -1.44,0.53 -0.51,1.4 -5.32,-0.96 -2.18,1.72 -0.91,2.35 2.01,2.38 -0.58,4.56 -1.84,2.54 -2.84,0.52 -0.74,1.79 3,5.67 -1.2,2.5 -1.22,-0.05 -0.25,0.69 -0.04,1.47 2.46,2.61 -0.7,0.82 0.72,0.54 -0.52,0.73 -0.74,0.61 -2.09,-1 -0.77,-1.15 0.02,-1.99 -0.45,-0.49 -0.52,0.28 0.2,0.85 -1.18,-0.35 -1.98,-3.99 -0.59,0.62 -1.61,-0.15 0.18,-2.56 -2.46,-0.63 0.09,-1.94 -1.01,-0.56 -1.83,0.82 -0.7,-0.31 -0.61,-1.67 0.14,-1.98 -1.11,0.32 0.19,1.38 -1.01,1.52 -0.79,-0.31 0.27,-0.72 -0.46,-0.32 -0.93,0.44 -0.88,-0.37 -0.75,0.84 -1.16,-0.56 -0.82,1.69 -0.74,0.25 -1.34,0.09 -0.85,-0.8 -1.8,2.8 -2.53,0.22 -0.24,-1.14 -2.6,-0.3 -0.13,-2.79 0.69,-0.58 -0.94,-2.76 0.53,-1.13 1.75,0.01 1.62,-1.05 1.58,0.57 0.93,-3.93 1.27,-1.45 -4.96,-1.21 -4.88,0.09 -0.11,-0.7 -0.44,-0.69 1.12,-1.43 -0.34,-1.05 0.52,-0.66 -0.55,-0.33 1.33,-0.62 -0.21,-1.02 0.66,-1.42 2.65,-0.33 -0.19,-1.01 2.41,-1.28 -0.25,-1.69 2.1,0.21 -1.15,-3.62 -0.24,0.51 -0.7,-0.33 -0.46,-0.96 0.11,-1.67 -1.5,-0.25 0.38,-3.51 -0.11,-2 -1.59,-0.65 1.12,-5.14 -2.25,1.63 -2.23,-1.11 -0.63,-1.73 3.38,-0.53 0.63,-3.25 1.29,-1.36 -0.48,-2.44 z m -6.59,66.3 2.72,-1.8 1.36,0.36 3.33,-2.64 1.2,-0.12 1.04,1.99 2.97,0.83 0.85,2.21 2.89,1.54 0.03,0.73 -2.75,1.52 0.83,1.08 -3.19,3.24 0.34,1.19 0.95,-0.59 -0.06,-0.72 0.55,0.18 0.78,1.99 -1.09,1.23 1.35,0.55 -2.25,0.39 0.36,1.29 -1,-0.05 0.12,0.7 -2.14,-0.91 -0.39,0.83 0.53,0.81 -1.25,0.52 -0.8,0.68 -1.26,-0.44 -0.86,0.87 -2.81,-1.62 -0.45,-1.57 -1.01,-0.86 0.2,-1.35 -0.39,-0.18 -0.53,1.17 -0.45,-0.8 -0.41,-1.6 2.62,-3.04 -0.19,-0.76 -2.99,-2.04 1.01,-2.2 z"
        				},
        				{
        					"id" : "70",
        					"title" : "Дальневосточный банк",
        					"d" : "m 801.27,709.97 0.67,0.3 1.95,-1.28 1.57,0.52 0.49,-1.8 0.78,-0.33 1.64,0.83 0.64,1.47 1.95,-0.47 0.34,0.89 2.56,0.6 0.68,3.08 1.17,1.24 5.46,1.57 1.56,-1.07 1.29,1.51 2.37,0.12 -0.24,1.3 -0.71,0.46 -1.73,-0.52 -1.61,1.13 -1.74,0.44 -1.29,1.57 -2.65,1.2 -2.44,-0.33 -2.54,1.91 -0.98,-0.21 -0.77,2.46 -1.75,-0.38 -2.52,0.92 -1.93,-0.45 -0.75,0.5 -1.06,-0.87 -2.98,0.6 -2.71,-4.44 1.25,-2.13 -0.5,-2.08 -0.98,0.08 -0.68,-1.38 1.09,-2.56 -0.78,-0.13 1.58,-1.26 1.23,-0.18 1.35,-2.62 z m 106,49.58 1.22,1 1.65,-0.33 -0.58,0.98 -2.71,0.89 -2.39,3.3 -1.37,0.65 -0.22,1.38 -0.9,0.08 -0.21,-1.2 2.42,-2.09 z m 18.78,-10.5 0.75,0.45 -0.36,1.76 -1.6,0.04 -2.2,1.15 -2.94,2.62 -1.81,-0.33 -0.4,1.44 -2.79,2.85 -0.89,0.07 -0.88,1.32 -0.7,-0.14 0.59,-1.86 0.34,0.54 0.11,-0.87 0.63,0.23 0.65,-0.62 -0.57,-1.24 0.9,0.18 1.95,-1.86 -0.01,-1.3 1.08,0.4 0.56,-1.17 0.98,-0.32 0.22,-2.08 1.09,1.74 1.26,-0.07 1.65,-0.96 1.4,-1.83 z m 12.62,-6.77 -6.32,6.07 -1.94,0.48 1.92,-2.75 0.89,-0.14 1.71,-2.23 1.12,-0.28 0.25,-0.87 z m 12.04,-9.92 0.42,0.37 -0.96,1.42 -2.83,2.31 -0.3,-0.8 1.09,-0.04 z m 1.59,-2.23 0.63,0.27 -0.17,0.56 h -0.61 z m 5.36,-7.92 0.57,0.93 -0.81,-0.38 z m 7.08,-8.43 0.1,0.71 -1.42,1.3 0.73,-1.84 z m 2.11,-2.89 0.8,0.85 -0.65,0.16 z m 2.63,-5.12 0.52,0.29 -0.76,1.59 0.23,1.54 -1.25,0.65 -0.42,-1.05 z m 8.55,-12.67 0.85,0.3 0.1,2.65 -0.96,0.51 -1.06,2.41 -2.71,1.2 -0.85,1.56 -0.29,-0.61 -0.89,0.04 -0.1,-2.74 0.96,0.13 0.45,-0.76 1.72,-0.3 1.52,-3.13 z m 3.2,-1.07 0.21,1.12 -0.72,1.45 -0.98,0.03 -0.68,-0.57 0.12,-0.95 z m -98.79,-42 2,3.79 -0.68,2.96 2.29,6.85 0.75,4.59 -0.01,3.98 -1.49,6.29 -0.03,1.35 1.45,2.11 -0.75,2.74 0.99,0.05 0.11,-1.49 0.83,3.34 -0.73,-0.12 1.08,1.36 1.7,9.66 3.43,9.71 0.31,2.87 0.77,2.21 2.18,1.99 0.41,2.35 -0.55,0.03 -0.76,-2.67 -3.07,-3.62 -4.6,-1.33 -0.66,-0.72 -1.21,0.28 0.43,0.69 1.02,0.03 -1.89,0.73 -1.48,1.53 0.09,2.28 -2.8,7.65 -0.49,4.16 1.14,3.11 2.43,2.72 v 1.84 l 0.96,2.09 -0.61,0.66 0.69,1.08 1.33,0.29 -0.04,-0.76 -1.32,-0.66 1.67,0.26 0.52,-0.44 1.09,4.83 -1.45,3.63 -0.8,-5.06 -1.15,-1.01 -2.63,0.02 -0.63,-1.56 -1.95,1.59 -2.42,7.34 -1.18,-1.57 -0.73,-5.76 1.8,-5.3 -0.69,-2.01 -0.03,-3.4 1.74,-3.87 -0.43,-3.65 -2.13,-4.79 0.95,-1.19 0.37,-2.95 0.39,0.12 0.64,-10.08 -0.15,-3.54 -0.78,-2.09 0.3,-3.04 1.22,-3.33 -1.24,-4.04 -1.11,-1.83 -0.28,0.28 -1.55,-1.62 0.76,0.36 0.35,-0.82 -1.44,-1.18 0.49,-3.18 -0.47,-1.91 1.43,-2.73 0.65,-5.6 -1.11,-4.17 3.5,-1.94 -0.08,1.85 1.43,0.06 1.07,-1.72 0.59,0.17 -0.78,-1.1 -0.35,0.65 -0.26,-1.38 1.16,-0.34 0.25,0.9 0.83,-1.12 -0.61,-1.59 -0.82,1.79 0.76,-3.05 -3.13,-4.4 1.94,0.04 z m -62.31,87.59 3.23,-0.72 0.02,-2.96 0.98,0.46 0.6,-1.79 2.14,-0.06 0.73,-0.84 1.89,0.52 0.72,1.32 -0.41,1.2 1.53,-0.61 1.2,0.31 -0.21,0.47 1.58,1.17 0.94,-0.8 1.68,1.08 1.91,-0.32 2.81,-2.16 -0.39,-0.85 0.77,-2.14 2.67,1.01 2.04,-1.64 1.53,-0.12 0.06,-0.7 1.15,-0.64 -0.09,-1.09 -0.62,-0.23 0.51,-0.75 -4.45,-1.14 1.15,-1.25 -1.34,-0.79 -0.55,-1.15 1.03,-1.02 h 2.09 l 1.35,-1.07 1.51,-0.26 0.88,-1.38 1.12,0.34 0.77,2.38 1.11,0.14 -0.91,1.57 1.46,1.77 -0.12,0.73 -1.61,1.02 0.42,0.95 -0.56,1.33 2.43,0.07 1.02,0.72 -0.11,1.09 -0.94,0.28 -2.03,2.55 -1.64,3.73 -0.03,1.58 -1.17,0.92 -0.56,2.21 -2.98,4.4 -2.33,1.99 -1.6,2.45 -2.43,1.8 -2.51,4.31 -0.67,-0.29 -0.38,0.52 -1.1,2.53 -1.94,0.84 -1.66,2.36 -0.11,1.39 -1.29,0.85 0.05,0.71 0.48,-0.17 -0.65,1.29 -1.13,0.78 0.09,-0.53 -0.65,0.27 -0.42,2.04 -6.85,4.25 -1.88,2.01 -0.41,-0.4 -1.07,0.99 -0.49,-0.67 -4.36,1.98 -0.29,-0.43 0.65,-0.26 -0.66,-0.93 -0.71,0.09 -0.37,0.94 -0.51,-1.71 -1.48,0.7 -0.93,-0.95 -0.88,0.9 -0.24,-2.23 0.76,-1.19 -0.6,-0.34 0.2,-0.81 -2.91,2.41 -0.04,-1.37 1.07,-1.1 -1.79,0.22 -0.24,-0.68 -2.03,4.06 -0.97,0.06 0.11,0.68 0.59,-0.05 -1.51,1.03 -0.29,2.11 -0.79,-1.15 -1.32,0.78 -0.83,-0.4 0.2,-0.65 -1.33,0.43 1.45,1.2 -1.29,2.4 -0.81,-2.43 0.44,-0.85 -1.56,-0.97 1.06,-0.86 3.33,-0.45 -0.05,-0.59 0.69,0.02 1.45,-4.75 -0.89,-1.55 0.78,-5.18 -1.37,-6.12 -1.06,-1.64 2.8,-1.29 1.05,0.14 1.4,-1.48 -0.06,-1.04 0.7,0.05 0.83,-1.26 1.2,1.02 0.9,2.82 -0.52,2.18 3.22,1.86 2.09,-5.04 0.87,0.36 1.17,-1.08 -0.36,-1.11 0.51,-2.33 1.16,-0.29 1.14,-1.65 0.03,-2.09 1.35,-0.88 0.49,-1.21 -0.34,-0.88 1.59,-1.23 -0.3,-0.78 0.53,-0.54 -0.66,-0.81 z m 176.09,-262.09 0.96,0.08 0.26,0.83 1.61,1.03 1.96,0.11 -1.9,3.75 -0.07,4.2 1.16,1.32 7.18,3.02 0.67,2.05 2.97,3.52 4.78,0.87 2.72,1.37 1.59,3.27 1.44,1.01 3.39,0.58 1.5,1.57 3.18,-0.13 0.05,2.13 1.28,1.33 0.66,2.04 -1.86,1.36 0.27,0.93 -0.58,0.49 -2.45,0.83 0.75,4.21 -1.3,2.22 1.95,2.38 0.07,1.25 -1.21,1.73 -1.11,0.38 0.56,3.09 -1.54,1.38 -1.33,-0.08 -0.98,2.75 0.07,0.9 2.68,1.85 -0.54,0.78 1.68,0.74 -1.05,1.51 0.85,1.7 -0.34,2.74 -3.82,1.79 -0.16,0.61 2.15,0.86 0.36,1.06 -1.9,1.45 1.37,2.33 -0.21,0.96 -1.65,1.72 -0.73,1.78 -0.72,0.04 0.09,0.72 -0.62,0.11 -0.35,-0.81 0.14,1.39 -0.58,-0.53 -0.29,1.09 -1.64,0.67 0.22,0.99 -0.67,-0.17 -0.65,0.68 0.38,0.47 -3.77,3.33 -0.94,2.65 -0.71,-0.72 -0.36,0.72 -0.7,-0.35 -0.58,0.67 -0.32,-0.78 -0.97,2.03 -0.92,0.54 -0.04,-1.22 0.74,-0.89 -0.54,-1.56 0.52,-0.11 0.16,-1.05 0.77,-0.01 0.36,-1.94 -1.68,-0.1 -2.21,1.39 0.1,0.43 -0.8,-0.18 1.5,-2.68 -0.58,-2.1 -1.01,0.22 0.46,-0.8 1.16,0.07 -0.71,-0.37 0.5,-0.96 h 0.7 l 0.23,-0.96 -0.47,-0.16 1.69,-1.47 0.39,-1.8 -0.42,-0.36 1.05,-1.12 -0.66,-2.64 -2.03,1.47 -1.05,2.01 -1.39,-0.2 -0.87,1.03 -0.41,-0.71 0.43,-1.97 -1.12,0.75 -0.55,-0.59 0.16,-0.97 -2.54,-0.56 -0.87,0.34 -0.38,1.27 -1.99,-0.22 -0.57,0.67 -1.63,-0.5 -1.58,1.41 -1.55,-0.81 -2.38,-0.11 -1.03,1.66 -2.14,0.46 -1.05,1.71 -1.62,0.29 -0.2,4.74 -1.12,0.09 -4.02,3.65 -0.18,3.38 -0.66,-0.23 -2.74,3.13 -0.77,-0.1 -3.64,3.22 -1.78,2.92 -1.17,0.41 0.53,2.61 -1.91,0.16 0.03,1.92 1.04,2.26 -1.03,-1.2 -1.12,2.07 0.4,0.81 1.26,0.31 0.65,-1.37 0.21,1.71 0.74,-0.01 -0.8,-1.92 0.99,0.54 0.71,-0.4 1.01,1.09 1.3,-0.46 1.71,2.1 -0.2,2.42 -2.51,-0.32 -0.19,0.97 -1.94,-1.24 -1.46,0.1 0.17,1.4 -2.24,0.85 -1.45,-1.69 -1.1,-0.21 0.65,-0.94 -0.98,0.85 -1.92,-0.91 -0.17,1.47 -0.59,0.23 0.59,0.02 -0.08,0.62 -2.31,0.3 -0.79,2.23 h -1.3 l -2.26,-1.6 -1.7,0.48 -0.75,1.4 -5.19,0.69 -1.74,-3.73 0.83,0.27 1.75,-1.11 4.43,0.29 1.73,-1.16 -1.33,-1.07 -0.92,0.58 -0.8,-0.61 -1.16,0.1 0.25,-0.78 -0.67,-1.26 -1.93,-2.26 -0.72,0.65 -2.8,-0.1 0.17,1.57 -1.29,0.31 -0.08,-0.79 -1.79,0.05 1.95,-1.1 -1.4,0.29 -1.88,-1.61 -4.87,-1.42 -2.35,0.68 -1.85,1.31 1.28,2.17 -0.91,-0.35 -1.21,0.48 -0.39,-1.38 -1.13,1.26 0.13,1.4 1.79,-0.2 -0.41,1.99 -0.63,-0.65 -0.53,0.61 -0.42,-0.43 -2.09,0.19 -0.12,-1.72 -0.81,-0.42 -2.97,0.32 -0.81,0.41 0.63,0.72 -0.36,0.58 -1.17,-0.63 -0.65,1 -1.77,-1.39 -0.94,0.23 -1.45,-0.72 1.67,-0.65 0.59,-3.23 -0.34,-3.17 -0.84,-0.34 -0.05,-0.89 -1.78,0.81 -0.81,-1.35 0.19,-1.5 -1.44,-0.32 -0.73,-1.55 -0.85,-0.26 -2.98,0.88 -2.27,-2.46 0.53,-0.26 -0.68,-1.04 0.91,-0.79 v -0.88 l 1.58,-0.78 1.52,-1.79 1.93,1.05 1.12,-0.66 -0.35,-2.79 1.47,-0.59 0.75,-2.28 -0.45,-4.5 -0.79,-0.99 0.14,-1.77 -3.19,-4.96 -2.97,-1.5 -0.42,-0.95 -0.28,1.2 -1.15,1.06 -0.58,-0.01 0.26,-0.78 -0.76,-0.34 -0.91,0.71 -1.84,-1.66 -1.78,0.21 -0.09,-0.93 2.71,-1.91 0.69,-3.19 -0.44,-0.73 2.13,-1.13 -0.51,-0.62 0.46,-1.66 -0.7,-1.05 0.62,-0.97 -0.13,-1.92 -1.4,-1.13 0.48,-1.29 -0.65,-0.89 3.17,-8.21 -0.13,-2.63 3.47,-1.45 1.99,-4.07 1.2,0.58 2.2,-0.34 3.2,1.9 0.21,-0.99 0.74,0.21 1.26,-0.82 0.43,0.44 -0.5,1.39 1.21,0.95 -0.26,0.59 1.25,0.22 0.71,-0.24 0.21,-1.83 1.65,-2.55 -1.54,-1.97 -0.26,-1.32 2.29,-2.09 2.02,1.89 0.82,-0.57 0.84,0.72 0.32,-0.76 2.78,1.25 -0.16,-0.73 0.83,0.37 2.84,-2.58 1.01,0.16 -0.01,0.65 1.15,0.64 -0.76,1.23 0.18,1.53 1.37,1.77 1.04,-0.14 1.09,0.68 0.78,0.03 0.32,-2.93 1.56,0.38 3,-0.93 0.79,1.03 1.32,-1.93 2.26,-0.74 1.36,0.6 -0.42,1.04 0.49,0.29 1.76,-0.44 0.33,-0.81 -0.59,-1.69 0.97,-0.18 2.45,-2.95 -1.24,-1.06 -0.93,-3.71 0.92,-0.51 0.67,-3.18 1.98,-1.03 1.78,0.17 0.45,-1.11 h 0.83 l 0.74,-1.66 -0.82,-0.74 0.2,-0.95 1.09,-1.36 -0.26,-3.72 1.61,-0.92 2.25,-0.1 0.24,1.45 0.92,-0.04 1.3,-1.97 0.07,-1.3 -1.13,-1.63 1.25,-0.79 0.03,-0.83 1.76,-0.5 1.2,0.57 0.32,0.92 2.26,-1.36 0.44,0.85 3.14,0.23 1.23,-0.8 1.32,1.97 2.39,0.29 1.89,-2.64 0.56,1.55 1.8,1.17 -0.48,1.23 1.33,1.06 2.19,0.12 0.34,-1.42 1.69,-1.91 3.02,-0.93 0.99,0.26 0.51,0.96 1.45,-0.01 0.42,-0.47 -1.13,-2.21 z m 44.18,114.12 -0.79,2.5 -3.26,0.76 -4.17,3.25 -0.71,1.71 -0.54,-1.43 1.28,-0.57 2.39,-5.93 2.7,-1.21 2.07,-1.75 z m -10.7,-83.52 1.28,1.33 0.66,2.04 -1.86,1.36 0.27,0.93 -0.58,0.49 -2.45,0.83 0.75,4.21 -1.3,2.22 1.95,2.38 0.07,1.25 -1.21,1.73 -1.11,0.38 0.56,3.09 -1.54,1.38 -1.33,-0.08 -0.98,2.75 0.07,0.9 2.68,1.85 -0.54,0.78 1.68,0.74 -1.05,1.51 0.85,1.7 -0.34,2.74 -3.82,1.79 -0.16,0.61 2.15,0.86 0.36,1.06 -1.9,1.45 1.37,2.33 -0.21,0.96 2.36,1.19 -1.01,-1.08 1.5,-0.74 0.72,1.01 -0.63,0.64 1.33,1.33 0.54,-1.53 0.81,0.16 -0.02,-0.56 0.81,-0.31 0.03,-0.68 -2.57,-1.5 1.55,-3.84 -0.59,-0.23 -0.3,-2.26 2.22,-1.72 -1.15,-1.32 -0.65,0.14 0.87,-0.54 0.35,-1.24 3.51,-1.19 0.97,0.38 0.88,-1.1 2.87,-0.62 1.22,0.23 1.17,1.91 3.29,0.96 -1.03,0.72 0.27,0.51 -4.28,-0.49 -0.62,1.29 -2.03,1.32 -0.77,9.01 -1.34,0.53 -0.87,2.73 0.17,0.76 1.1,-0.31 0.75,1.36 -0.59,1.69 -1.97,1.38 -1.25,1.94 1.99,1.27 -0.53,0.98 0.59,0.28 -1.07,-0.5 -2.18,1.68 0.02,-0.65 -1.04,-0.09 -0.45,0.79 -1.58,-0.06 -1.43,2.22 -1.35,-0.03 -4.05,2.67 -0.23,3.07 -3.06,2.4 -4.44,5.98 -2.76,0.9 -0.56,2.22 -3.96,3.73 -1.05,2.14 0.02,1.66 -1.36,1.83 -3.27,4.09 -5.42,4.86 -2.31,1.22 -2.31,-0.5 -1.71,3.06 -1.89,0.23 -1.23,-1.13 -1.11,0.79 -0.54,0.99 1.33,1.64 0.18,2.74 -1.81,4.3 -1.31,-0.39 -0.55,1.89 -2.81,2.6 0.76,-0.95 -0.48,0.27 -0.91,1.63 -2.45,9.27 -0.7,9.22 4.24,29.09 2.23,7.88 0.66,10.35 1.2,1.01 0.31,1.35 -0.71,2.35 5.61,-5.43 0.89,-1.77 2.47,-1.45 2.62,-3.85 0.86,-3.09 1.17,-0.92 -0.53,-0.45 0.55,-0.85 -1.16,0.11 0.92,-1.46 -0.97,-1.4 1.15,0.28 0.37,-0.79 -0.87,-0.93 1.18,-0.83 -0.09,-0.88 -1.42,0.3 -0.11,-1.48 1.38,-0.39 0.66,1.96 2.8,-2.68 5.15,-1.98 -0.5,0.85 2.09,1.27 -0.14,-1.95 -0.49,0.61 -0.32,-0.55 0.51,-0.85 -1.44,-2.2 0.41,-0.34 0.91,0.53 -0.76,-2.12 0.04,-2.21 1.93,-4.51 5,-4.05 2.2,-0.48 1.14,1.37 2.93,-0.25 3.17,-3.09 0.12,-1.25 -2.67,-4.54 -0.22,-4.26 2.33,-6.7 3.77,-2.27 -1.34,-1.76 2.11,-1.17 1.44,0.84 0.45,-1.3 0.71,-0.09 0.01,0.98 -2.38,1.44 -0.78,1.51 1.29,2.05 1.5,0.76 1.12,-1.65 1.31,-0.65 -0.8,-3.26 -0.11,-3.93 -2.24,0.64 -1.04,-1.11 0.55,-3.46 -0.41,-4.3 2.15,-1.58 1.62,-3.23 -0.77,-1.24 -1.18,-0.03 -2.51,-1.75 -1.01,0.31 -0.19,2.37 -1.31,1.19 0.62,-1.53 -2.14,-0.9 -1.05,-3.37 0.93,-3.51 2.38,-4.64 4.25,-3.75 -0.97,-2.3 0.9,-0.36 1.56,0.96 -1.25,-2.37 1.84,-0.46 v -1.61 l -1.03,-1.86 1.62,-1.23 -0.25,-1.84 1.01,-2 1.34,0.39 0.77,-1.64 1.63,-0.62 1.37,0.57 -1.23,1.25 1.07,0.57 -0.57,-0.85 1.5,-1.12 -0.12,-1.14 0.9,-0.5 1.91,1.55 0.99,3.12 1.79,-1.18 0.92,-1.81 -0.6,-0.6 0.2,-0.69 -0.96,0.3 -0.08,-0.56 1.36,0.17 7.46,-5.52 0.72,0.12 0.1,0.71 -0.96,0.67 0.42,2.5 -0.74,0.97 -0.82,4.42 1.5,0.05 3.16,-4.21 0.62,-1.73 1.79,-1.28 -0.16,-1.27 1.14,0.9 3.99,-1.85 0.13,-0.88 0.61,0.38 3.62,-1.41 7.52,1.25 2.29,1.7 1.65,4.71 2.52,1.96 0.78,-0.53 0.65,-3.99 1.22,-0.79 -0.24,-1.57 5.29,-3 v -0.72 l 1.67,-0.74 0.65,-1.73 1.44,0.17 0.59,-1 0.46,0.75 1.13,-1.68 -1.4,-1.94 1.87,1.15 1.4,-0.6 -0.12,-0.4 -0.46,0.38 0.02,-0.91 -0.68,0.12 0.95,-0.43 -0.71,-1.13 2.13,0.61 1.3,-1.49 -1.22,-0.77 1.68,0.88 0.6,-0.35 -1.46,-2.13 1.01,-0.59 1.18,1.19 0.6,-0.11 1.48,-2.2 0.92,-0.04 0.51,-2.91 0.81,0.04 1.22,1.36 1.81,-1.86 -0.39,-0.81 2.84,-0.09 -1.47,-3.88 -1.34,-0.14 -0.15,-1.85 -0.75,-0.44 1.2,-1.4 -0.36,-1.17 -2.65,-1.47 -4.25,1.44 -2.23,1.48 -2.17,-1.25 -2.56,0.69 -1.21,-1.01 -1.86,1.63 -3.22,1.14 -0.1,-0.79 -0.77,0.56 -0.14,-1.12 -2.82,2.3 -3.42,-1.23 -0.95,0.83 -0.43,-0.37 -0.67,-2.82 -0.73,-0.76 -0.08,-1.98 -2.04,-0.63 -0.85,-1.49 -3.36,-2.48 -2.38,-0.25 -2.35,-1.82 0.08,-0.7 2.72,-1.99 -0.01,-1.12 0.9,-1.29 4.19,-2.95 0.41,-1.08 -0.81,-3.08 -1.03,-0.63 0.07,-0.94 -2.42,-0.53 -1.03,-1.23 -0.55,-2.82 -1.41,-0.32 -0.73,-2.03 -1.76,0.06 -1.82,0.94 -0.66,-0.22 -0.13,-0.84 -1.49,0.14 -0.1,-1.61 -1.88,-1.4 -1.1,-1.99 -2.39,1.72 -2.07,0.22 -1.18,-1.33 -2.09,-0.58 -1.53,1.24 -0.51,-0.31 0.27,-0.98 -0.85,-2.08 -2.64,-0.15 -1.24,-1.51 -1.15,0.39 0.02,2.01 -0.58,0.44 -1.2,-2 -0.86,-0.01 -2.85,-2.1 -2.82,0.62 -1.88,-1 -1.56,2.14 -1.13,0.13 0.55,1.8 z m 21.86,135.3 -0.23,-2.66 -1.97,-0.43 -1.61,0.99 1.61,0.71 1.42,3.4 1.42,1.61 0.91,-0.05 -0.13,0.52 1.32,1.36 -0.19,-2.31 z m -253.17,-7.36 -0.67,-2.81 1.9,-4.26 0.18,-2.26 1.16,-1.09 1.05,0.55 0.57,-0.89 0.68,0.97 0.58,-0.16 -0.19,-2.92 1.13,-1.24 -4.65,-6.05 0.75,-1.05 1.85,0.6 1.69,-3.85 2.18,-1.96 -2.23,-2.36 0.37,-0.67 -1.68,-1.13 0.18,-0.84 -0.7,-0.17 -0.16,-1.15 1.33,-0.32 2.29,2 1.04,-0.06 -0.45,-1.86 0.89,-0.96 -0.46,-3.33 1.81,0.23 0.93,-1.79 -0.38,-0.97 0.74,-2.39 1.61,-0.33 0.32,-0.77 -0.68,-0.7 0.44,-1.15 1.16,-0.12 0.88,-1.35 6.21,-0.68 3.15,1.37 2.04,-0.66 0.88,1.05 2.19,0.51 3.6,-5.46 1.8,-0.05 1.53,1.21 4.99,1.33 4.83,-3.31 0.16,-1.39 1.17,-1.18 3.1,-0.38 0.14,1.46 0.82,-0.03 0.57,-0.69 -0.73,-1.8 0.75,-1.17 -0.73,-2.94 1.35,-3.75 -0.45,-1.09 1.41,-3.35 -2.19,-2.59 1.05,-2.4 -0.26,-0.74 2.6,-1.66 0.42,-2.18 0.36,0.55 1.85,-0.38 0.82,-1.79 0.93,0.31 2.34,-1 1.65,-2.09 1.23,-3.64 -0.36,-1.14 2.01,-0.25 0.78,-1.3 -0.43,-0.65 0.69,-4.5 2.1,-0.55 0.71,-1.35 2.35,0.71 -0.04,1.01 1.49,-0.26 3,5.08 0.87,0.23 0.52,1.04 2.15,-0.95 0.45,1.88 1.11,0.78 1.68,-1.15 1.79,0.52 0.26,0.75 0.63,-0.22 0.82,-3.02 0.92,-0.39 0.67,1.66 1.52,-0.38 0.92,2.69 0.58,-1.17 1.51,-0.39 -0.52,2.36 0.91,1.05 3.46,-1.82 0.53,-2.21 0.86,-0.86 1.78,-0.21 1.84,1.66 0.91,-0.71 0.76,0.34 -0.26,0.78 0.58,0.01 1.15,-1.06 0.28,-1.2 0.42,0.95 2.97,1.5 3.19,4.96 -0.14,1.77 0.79,0.99 0.45,4.5 -0.75,2.28 -1.47,0.59 0.35,2.79 -1.12,0.66 -1.93,-1.05 -1.52,1.79 -1.58,0.78 v 0.88 l -0.91,0.79 0.68,1.04 -0.53,0.26 2.27,2.46 2.98,-0.88 0.85,0.26 0.73,1.55 1.44,0.32 -0.19,1.5 0.81,1.35 1.78,-0.81 0.05,0.89 0.84,0.34 0.34,3.17 -0.59,3.23 -1.67,0.65 -0.8,0.14 -2.92,-1.44 -1.01,1.01 0.35,2.59 -1.07,-0.04 -1.11,0.95 -1.58,-1.47 1.03,-2.22 -1.03,-0.11 -0.17,0.67 -0.78,-0.85 -5.23,0.8 -7.81,-0.45 -2.83,1.15 -1.64,-0.6 -5.9,2.39 -2.73,2.5 -3.48,5.51 -3.83,2.38 -1.83,1.88 -2.03,6.2 -1.3,1.29 -2.18,0.57 -1.53,2.94 -1.29,0.27 -0.85,1.71 -2.2,0.83 -1.12,1.78 -0.66,-0.08 -0.25,1.49 -2.11,1 -0.23,2.23 -0.19,-0.96 -0.84,0.18 -1.16,2.92 -1.15,0.54 0.16,1.1 0.86,0.31 -0.2,0.56 -1.15,-0.18 -0.16,0.78 -0.92,0.19 -1.39,2.95 -2.12,1.28 -0.25,1.16 -0.67,-0.25 -3.88,4.09 -0.3,-0.31 -2.12,1.27 -2.05,3.52 -4.4,2.58 -2.43,2.73 0.57,1.56 2.9,0.98 0.84,1.3 7.51,-1.13 0.38,0.98 -0.57,0.63 0.18,1.11 -0.61,0.13 0.53,3.41 -1.05,2.64 0.88,1.9 1.08,-1.12 1.23,0.57 0.59,-0.51 0.77,-2.24 -1.03,-0.03 -0.54,-1.08 0.75,-1.05 1.47,-1.16 2.44,-0.18 -1.87,2.77 -0.21,-0.66 -0.55,0.13 -0.58,1.04 2.18,1.2 1.89,-0.15 -1.77,1.61 -0.79,1.98 -1.21,0.13 -0.98,0.88 0.86,0.63 4.58,-0.58 2.53,-1.83 0.49,-2.08 1.51,-1.1 -0.1,2.34 -2.19,2.88 0.04,0.54 1.41,-0.09 1.4,-2.21 0.78,-3.31 0.01,-1.34 -0.78,0.4 0.53,-2.3 -0.56,-0.47 0.64,-0.22 3.98,1.56 3.13,-1.46 0.39,1.17 2.89,1.77 0.95,1.22 -0.53,0.76 0.4,1.08 2.29,2.43 2.2,1.24 -0.24,0.89 0.64,-0.22 1.4,1.53 1.63,0.26 -0.54,0.78 0.73,0.94 -0.54,0.83 -1.06,0.15 -0.13,0.81 -3.46,-1.53 0.78,1.06 0.73,0.04 0.93,1.81 1.29,0.21 -0.55,0.88 0.75,2.36 -1.12,1.27 0.07,0.98 1.91,2.1 1,-0.18 0.13,0.98 -1.41,0.63 0.29,2.15 -1.42,0.77 -0.62,1.92 -1.64,0.61 0.07,1.53 -1.14,0.35 0.97,0.49 -0.03,0.58 -1.37,0.58 -0.13,4.11 -0.9,0.68 -0.69,2.08 0.55,6.29 1.3,0.75 -1.44,1.03 -0.62,1.27 0.92,1.08 0.13,2.45 -1.69,3.82 0.29,1.23 -0.94,1.47 0.82,-0.6 0.41,0.53 -1.49,2.45 -0.06,3.28 -6.42,6.75 -1.95,4.21 -1.02,-0.72 -2.43,-0.07 0.56,-1.33 -0.42,-0.95 1.61,-1.02 0.12,-0.73 -1.46,-1.77 0.91,-1.57 -1.11,-0.14 -0.77,-2.38 -1.12,-0.34 -0.88,1.38 -1.51,0.26 -1.35,1.07 h -2.09 l -1.03,1.02 0.55,1.15 1.34,0.79 -1.15,1.25 4.45,1.14 -0.51,0.75 0.62,0.23 0.09,1.09 -1.15,0.64 -0.06,0.7 -1.53,0.12 -2.04,1.64 -2.67,-1.01 -0.77,2.14 0.39,0.85 -2.81,2.16 -1.91,0.32 -1.68,-1.08 -0.94,0.8 -1.58,-1.17 0.21,-0.47 -1.2,-0.31 -1.53,0.61 0.41,-1.2 -0.72,-1.32 -1.89,-0.52 -0.73,0.84 -2.14,0.06 -0.6,1.79 -0.98,-0.46 -0.02,2.96 -3.23,0.72 0.35,-3.22 1.11,-1.54 -0.29,-2.16 0.82,-1.03 1.95,-0.77 1.48,-2.49 -1.6,-2.82 1.15,-3.02 -1.02,-0.97 -1.98,-0.08 1.61,-1.13 1.73,0.52 0.72,-0.45 0.24,-1.3 -2.37,-0.12 -1.29,-1.5 -1.56,1.07 -5.46,-1.57 -1.17,-1.24 -0.68,-3.08 -2.56,-0.6 -0.34,-0.89 -1.95,0.47 -0.64,-1.47 -1.64,-0.84 -0.78,0.33 -0.49,1.8 -1.57,-0.51 -1.95,1.27 -0.67,-0.29 0.87,-1.5 -0.01,-1.95 -0.75,-1.3 0.92,-1.27 0.07,-1.25 -0.94,-1.92 0.65,-0.95 -0.59,-1.18 -0.78,-0.25 -0.19,-1.06 -2.57,-0.28 0.77,-1.34 -0.62,-1.56 -1.63,0.36 1.04,-2.4 -0.43,-1.05 1.27,-0.71 0.95,-2.47 1.1,-0.34 0.71,-1.22 0.94,0.04 -0.07,-3.59 1.53,0.11 4.44,-1.5 0.66,-1.68 2.42,-2.25 3.14,-0.25 1.36,-0.95 -1.1,-2.54 0.48,-0.52 -0.57,-1.32 0.48,-0.67 5.65,2.37 3.72,0.5 -0.12,-1.32 0.91,-1.13 -0.76,-2.96 1.7,-2.48 0.2,-1.64 -1.02,-1.33 1.38,-0.67 -2.92,-2.29 -0.6,0.75 -3.65,1.18 -2.84,-1.34 -0.41,0.69 -2.25,0.87 0.12,1.09 -2.48,1.25 -3.45,-0.33 -1.72,0.46 -0.84,0.98 -1,-0.85 0.26,-0.75 -3,0.34 0.95,-1.62 -0.77,-1.65 -0.27,-3.09 -2.69,-0.9 -0.99,0.49 -2.1,-1.49 -1.76,-0.26 0.89,-1.01 0.42,-2.01 1.28,-1.34 2.73,-0.69 0.87,-3.79 5.25,-3.37 0.81,-1.51 1.89,-0.48 0.37,-1.67 1.4,-0.36 0.91,-1.72 1.46,-0.56 -1.81,-1.04 0.03,-1.23 -1.21,-1.72 -5.25,0.81 -0.13,-0.49 -3.53,0.58 z M 1063,408.94 l -0.76,-0.54 1,-2.08 3.13,-2.26 2.73,1.79 0.44,-0.53 0.33,0.72 2.74,0.54 1.45,0.87 0.24,0.96 -0.28,1.07 -1.07,0.23 0.29,1.85 -0.89,2.2 -1.93,-0.05 -3.86,-1.57 -1.73,-1.28 0.1,-0.85 z m 139.03,95.81 0.44,0.36 1.64,-0.27 -0.44,-0.55 -1.09,0.15 z m -61.11,-116.98 3.48,-2.03 1.64,-0.13 0.1,0.53 -0.84,-0.16 1.03,0.23 3.55,-2.66 3.05,1.26 0.73,0.77 -0.64,0.46 2.32,-0.54 3.29,-1.54 6.13,-1.55 2.38,-1.81 0.97,-2.55 -0.55,-1.19 -0.65,0.18 -2.34,-2.89 -1.05,-0.31 0.54,0.02 -0.4,-0.43 0.49,-0.29 -0.75,-0.8 -1.02,0.32 -0.65,-1 0.62,-0.11 -4.47,-1.54 -1.49,-0.18 -1.68,1.25 -1.41,-0.16 -0.71,-0.97 -0.73,0.77 -0.07,-0.59 -1.09,0.81 0.54,0.36 -1.51,-0.24 -1.78,2.07 -0.39,-0.45 -1.52,1.12 -2.18,3.11 -2.02,1.29 -0.09,1.06 -1.87,2.22 1.01,4.18 z m 79.92,90.23 -0.06,-0.46 0.5,0.18 -1.25,-1.62 -2.54,-1.17 -5.73,-6 0.22,-1.32 -2.24,-1.63 -0.32,-0.63 0.46,-0.65 -0.64,-0.7 -1.49,-0.45 -0.99,0.77 -11.28,-3.25 -0.58,0.7 -6.47,0.37 0.85,0.54 2.05,-0.5 0.23,1.52 1.1,0.05 0.8,5.54 -2.18,1.66 2.7,1.11 1.18,1.33 -0.2,1.46 -1.24,0.49 0.63,0.4 -0.3,0.27 -1.27,-0.22 0.64,-0.27 0.01,-2.24 -0.74,-0.47 -0.92,0.28 -0.03,0.93 -1.46,1.18 -0.74,-0.93 0.27,-2.52 -3.06,-1.38 -0.72,-1.01 1.32,-1.61 0.43,0.16 -0.37,-3.03 0.49,-0.11 -1.14,-1.33 -0.39,-1.77 0.3,-3.45 0.54,-0.68 0.49,1.15 -0.54,-2.32 -3.25,-3.44 -0.2,-2.11 -3.91,-2.63 0.06,-0.84 -1.65,-0.38 -11.22,-8.4 -5.93,-5.06 -2.8,-3.53 -3.36,-2.12 -0.93,-1.28 -0.56,-0.28 -0.7,0.69 -1.26,-0.36 -5.73,-6.21 -4.29,-3.31 -2.99,-1.28 -0.99,0.53 -0.03,-0.47 -2.88,-0.86 -2.76,-1.98 -4.19,-1.07 -3.37,-2.03 -2.21,-2.93 -7.34,0.83 -6.76,-0.71 -2.54,1.4 -0.45,-1.26 -1.6,-1.45 -1.69,0.58 -0.87,1.52 -2.24,-1.41 -0.54,-1.32 -1.75,0.67 -7.5,-2.48 -7.04,-1.48 0.92,1.04 -0.46,3.46 0.58,3.08 -2.4,1.25 -0.69,2.28 2.68,-0.15 0.75,0.59 0.81,4 1.04,1.68 -0.31,2.37 0.92,0.6 0.29,1.8 -1.44,1.96 -3.61,2.9 -4.45,0.97 -1.81,-1.06 -0.33,-4.15 -0.73,-1.31 -1.42,-0.06 -2.92,-2.25 -3.25,-0.59 -0.41,-2.1 0.38,-4.36 -2.2,-1.67 0.76,-1.44 -1.95,-1.37 -6.04,5.95 -2.04,-0.72 -3.17,0.18 -3.56,-1.34 -8.21,-0.16 -3.93,-3.62 -1.26,1.33 -1.5,0.41 -2.61,-0.76 -3.24,1.44 -2.08,-0.64 -0.36,0.55 -1,-0.72 -0.11,0.87 -0.44,2.37 -0.71,0.35 0.75,1.11 -0.27,1.03 0.92,0.46 0.09,1.54 2.17,3.31 -1.44,0.33 -0.48,2.99 1.66,1.29 0.73,1.57 -1.59,1.82 0.09,1.12 0.81,0.63 -0.25,1.76 -0.88,0.54 -0.28,4.27 -0.58,0.98 -7.12,-2.61 -4.82,2.91 -5.34,-0.55 -1.29,0.78 -0.48,1.16 -1.11,-0.51 -1.13,0.27 -0.61,-0.69 -2.78,2.4 -2.65,-0.16 -1.31,0.96 -0.63,2.5 -1.07,1.39 1.37,1.83 -1.38,1.11 -2.06,0.12 -0.37,2.55 0.99,3.24 0.01,2.67 1.33,0.42 1.38,1.87 3.43,1.3 -0.06,2.82 1.29,2.08 -1.09,0.62 -1.93,4.88 -0.85,0.6 0.86,1.94 0.96,0.08 0.26,0.83 1.61,1.03 1.96,0.11 -1.9,3.75 -0.07,4.2 1.16,1.32 7.18,3.02 0.67,2.05 2.97,3.52 4.78,0.87 2.72,1.37 1.59,3.27 1.44,1.01 3.39,0.58 1.5,1.57 3.18,-0.13 -0.55,-1.8 1.13,-0.13 1.56,-2.14 1.88,1 2.82,-0.62 2.85,2.1 0.86,0.01 1.2,2 0.58,-0.44 -0.02,-2.01 1.15,-0.39 1.24,1.51 2.64,0.15 0.85,2.08 -0.27,0.98 0.51,0.31 1.53,-1.24 2.09,0.58 1.18,1.33 2.07,-0.22 2.39,-1.72 1.1,1.99 1.88,1.4 0.1,1.61 1.49,-0.14 0.13,0.84 0.66,0.22 1.82,-0.94 1.76,-0.06 0.73,2.03 1.41,0.32 0.55,2.82 1.03,1.23 2.42,0.53 -0.07,0.94 1.03,0.63 0.81,3.08 -0.41,1.08 -4.19,2.95 -0.9,1.29 0.01,1.12 -2.72,1.99 -0.08,0.7 2.35,1.82 2.38,0.25 3.36,2.48 0.85,1.49 2.04,0.63 0.08,1.98 0.73,0.76 0.67,2.82 0.43,0.37 0.95,-0.83 3.42,1.23 2.82,-2.3 0.14,1.12 0.77,-0.56 0.1,0.79 3.22,-1.14 1.86,-1.63 1.21,1.01 2.56,-0.69 2.17,1.25 2.23,-1.48 4.25,-1.44 2.65,1.47 0.36,1.17 -1.2,1.4 0.75,0.44 0.15,1.85 1.34,0.14 1.47,3.88 2.13,-0.49 5.97,-4.5 4.79,-1.89 2.48,-2.24 2.51,-1.3 4.49,-0.75 3.71,0.5 6.79,2.95 0.51,0.94 0.56,-0.66 -0.27,-2.13 0.54,-0.51 1.08,0.23 0.7,-1.81 0.96,-0.55 -0.25,-3.41 -1.6,-0.6 -0.48,-1.51 0.36,-1.15 1.04,-0.15 -0.1,-0.82 -2.54,-2.45 -1.48,-2.5 -1.69,-9.76 -3.06,-6.86 0.75,1.71 -1.53,1.76 0.4,0.5 -0.86,0.08 -1.38,-0.66 -2.6,-2.85 -0.57,-2.48 0.7,-3.05 -3.14,0.59 -2.23,2.81 -0.4,-1.38 -1.09,-0.72 -1.43,1.13 -1.26,0.13 1.92,-1.84 -2.13,-3.29 -0.97,0.01 -0.57,1.69 -1.54,1.1 -1.38,-0.26 -1.13,0.72 -1.23,-0.44 2.87,-0.87 0.67,0.53 0.55,-0.3 2.04,-3.04 2.8,1.69 0.12,0.83 2.15,-0.89 1.39,0.39 0.86,1.23 1.91,-0.91 -0.49,-1.76 1.32,-0.11 0.52,1.24 -0.88,0.5 0.97,0.28 1.23,1.79 4.73,0.92 2.75,-0.61 0.33,0.49 -2.11,0.99 0.33,0.39 4.1,-3.24 2.87,-0.81 2.27,-3.19 3.46,-2.4 0.99,-1.73 0.4,-2.99 1.53,-2.14 -0.49,-0.64 0.41,-1.04 -2.5,-1.96 -1.09,-2.73 0.71,-4.65 2.14,0.93 1.1,-0.82 0.23,-0.62 -1.28,-2.05 1.63,0.76 0.74,-1.84 0.18,3.32 1.28,0.46 0.85,-0.61 0.96,-2.88 0.93,-0.49 -0.18,4.52 -1.32,0.76 0.11,0.99 -0.65,0.78 -0.64,-0.15 -0.24,1.49 2,2.99 0.89,-0.29 0.38,0.59 -0.84,3.79 1.9,0.85 5.77,-0.22 2.55,-2.28 1.01,-0.14 7,2.88 0.58,0.43 0.32,2.88 0.96,1.68 -0.36,1.75 -0.75,0.64 2.9,1.9 0.05,0.68 0.73,-0.04 -0.38,1.06 2.64,0.23 0.88,-0.44 4.04,2.64 0.95,-0.28 -0.32,0.48 1.69,1.51 0.41,1.94 2.53,1.57 2.34,-1.84 -0.31,-2.77 0.96,1.32 -0.3,1.67 0.67,-0.26 -1.43,1.17 -0.07,1.23 1.8,0.86 1.99,-0.93 0.36,-2.12 -0.49,-0.61 -1.13,0.37 0.44,-0.81 1.36,-0.33 0.3,1.8 0.94,0.47 2.62,-0.51 -1.36,-2.32 -2.63,-1.18 -1.39,0.8 1.03,-1.55 -1.61,0.04 1.54,-0.61 0.72,-1.24 -1.19,-1.29 -1.91,1.48 1.67,-1.91 1.35,0.56 1.69,-1.43 0.93,0.11 2.24,-2.88 -1,-3.83 0.96,-2.93 -1.92,1.1 -0.62,-0.75 0.96,-0.16 -0.36,-1.81 -1.91,-0.6 -0.04,-0.87 -0.84,-0.11 2.41,-0.26 1.36,1.71 -0.24,0.65 1.34,-0.15 2.32,0.83 -1.24,0.65 4.55,-1.04 1.6,1.1 0.53,-2.05 -1.78,-1.25 -1.76,-3.21 1.52,0.98 0.72,1.42 2.25,1.41 1.91,0.27 0.55,-0.89 -0.18,-3.48 3.65,-3.26 2.14,0.53 0.47,-1.29 -0.66,-1.4 z m -18.15,25.37 0.35,0.41 3.78,-1.3 -2.41,-1.37 z m -484.64,115.17 2.25,-0.21 2.07,-1.39 2.08,-0.38 5.83,0.81 1.13,2.92 3.82,0.11 3.58,3.35 1.24,-0.31 0.4,-0.98 2.76,2.13 4.12,0.23 4.02,4.59 0.85,1.86 1.3,-0.06 1.88,0.99 2.92,-0.37 1.53,1.39 1.18,-0.33 1.55,0.52 0.63,1.66 0.63,0.15 2.17,0.17 1.35,-0.91 1.66,0.72 1.34,-1.17 1.82,0.05 0.64,1.28 1.3,-0.3 1.21,-1.23 0.69,0.72 2.71,-0.33 2.11,1.66 3.23,0.73 1.12,-1.01 -0.77,-1.25 3.07,-1.04 2.97,-0.06 0.95,0.71 5.12,-0.8 1.88,0.91 2.02,0.43 3.53,-0.58 0.13,0.49 5.25,-0.82 1.2,1.73 -0.02,1.22 1.81,1.05 -1.46,0.56 -0.91,1.72 -1.4,0.36 -0.37,1.67 -1.89,0.48 -0.81,1.51 -5.25,3.36 -0.87,3.79 -2.73,0.68 -1.28,1.34 -0.42,2.01 -0.89,1.01 1.77,0.26 2.1,1.5 0.99,-0.49 2.69,0.9 0.27,3.08 0.77,1.65 -0.95,1.62 3,-0.34 -0.25,0.76 1,0.84 0.83,-0.98 1.73,-0.46 3.44,0.33 2.48,-1.25 -0.11,-1.09 2.25,-0.87 0.4,-0.7 2.84,1.34 3.66,-1.18 0.6,-0.75 2.92,2.29 -1.38,0.67 1.02,1.33 -0.2,1.64 -1.69,2.47 0.76,2.96 -0.92,1.13 0.12,1.33 -3.71,-0.51 -5.65,-2.36 -0.48,0.66 0.57,1.33 -0.48,0.52 1.11,2.54 -1.36,0.95 -3.14,0.25 -2.43,2.25 -0.65,1.68 -4.45,1.5 -1.53,-0.1 0.07,3.59 -0.94,-0.04 -0.71,1.22 -1.1,0.34 -0.95,2.48 -1.27,0.7 0.43,1.05 -1.04,2.41 1.63,-0.37 0.63,1.56 -0.78,1.34 2.58,0.28 0.18,1.06 0.79,0.25 0.59,1.18 -0.66,0.95 0.95,1.92 -0.07,1.25 -0.92,1.27 0.75,1.3 0.01,1.95 -0.87,1.5 -1.72,0.21 -1.35,2.62 -1.23,0.18 -1.58,1.26 -1.03,-0.43 -1.44,0.38 -2.16,-1.86 -1.49,-2.63 -1.17,-0.14 -0.57,-1.55 -0.63,0.01 -0.31,0.88 -0.96,-0.53 -0.87,0.51 -0.65,-1.07 -1.75,-0.31 0.18,-1.18 -2.82,-0.02 -0.94,0.97 -2.15,-1.27 -0.98,0.31 -0.85,-0.85 -0.33,-1.26 -0.97,-0.64 -0.2,-2.03 0.77,-2.32 -1.87,-1.14 -0.28,-4.72 -2.67,-3.52 0.37,-2.99 -0.95,0.73 -0.16,-0.76 0.7,-0.73 -0.91,-0.48 0.31,-1.13 -1.13,-0.79 0.35,-1.36 -1.88,-2.66 -0.12,-0.92 0.8,-1.15 -1.85,-1 1.01,-0.91 -0.8,-0.26 0.11,-1.04 -1.11,-0.82 0.04,-0.82 -1.58,-0.85 1,-1.84 -0.46,-0.39 -0.58,0.42 -0.97,-1.59 -1.15,0.46 0.47,-1.46 -0.9,-1.07 -0.75,0.27 -2.76,-1.8 -1.47,0.29 -0.31,0.94 -1.22,-1.13 -1.96,-0.33 -1.33,-1.78 -0.94,0.26 -1.85,-1.7 -1.28,-0.04 -0.66,-0.7 -0.38,0.63 -0.32,-0.67 -0.1,0.66 -1.65,-0.77 -2.95,1.28 -3.01,0.14 -0.69,-0.68 -1.9,0.93 -0.72,-1.59 -0.05,-3.22 -1.06,-1.87 -0.5,0.23 -0.73,-1.09 0.76,-1.89 -0.22,-2.69 0.65,-0.42 0.74,0.65 1.42,-1.11 -1.17,-1.07 -0.47,-2.66 -1.31,0.66 -0.07,-0.56 0.28,-1.12 1.74,-1.85 v -1.54 l 0.64,-0.62 -0.92,-0.22 0.37,-3.22 -1.54,-1.82 -1.43,1.61 -1.29,-0.29 -1.2,-6.5 -2.67,-0.08 -2.79,1.64 -2.65,-0.17 -0.11,-3.15 3.1,-1.54 -1.68,-1.47 0.18,-0.87 -2.41,-0.5 -1.24,-1.43 0.35,-1.2 -1.42,-1.14 z"
        				},
        				{
        					"id" : "krim",
        					"title" : "Крым",
        					"d" : "m 127.6,738.47 0.07,0.29 -0.53,0.31 -0.75,1.3 -1.98,0.04 -1.66,-0.79 -0.76,0.42 -0.22,1.07 1.23,0.81 -0.57,0.59 -1.44,0.41 -0.7,0.65 0.29,1.16 0.21,-0.78 0.2,0.56 -1.21,2.56 0.64,3.71 1.15,1.92 -2.81,1.88 -3.85,0.31 -1.26,1.18 -6.67,-1.1 -1.18,0.21 -0.58,0.79 -0.89,0.46 -1.58,-0.29 -2.33,0.98 -0.29,-0.69 -0.69,-0.39 0.01,-0.87 -1.25,-1.37 -2.84,-1.87 -3.58,-1.11 -2.89,0.61 -2,1.11 -1.82,2.04 0.07,1.22 1.22,0.61 -2.26,1.16 -0.15,0.61 0.37,0.6 0.84,0.42 -0.18,0.28 -2.14,-1 -2.05,0.22 -0.42,0.53 0.14,0.77 -0.49,0.95 -1.59,0.39 -1.03,0.63 -0.81,1.81 -0.2,1.66 -1.61,1.47 -1.13,-0.4 0.06,-0.68 -0.65,-0.67 -1,-0.26 -0.39,0.27 -0.79,-0.52 -1.62,0.48 -0.01,0.41 -0.78,0.25 -0.78,-0.27 -4.81,0.48 -2,1.14 -2.08,0.66 -5.15,3.01 -1.44,1.8 -1.51,3.88 -0.72,0.37 -0.06,1.64 -1.4,-0.23 -0.99,0.62 -0.91,1.63 -2.79,0.58 -1.36,3.09 -2.26,0.41 -0.91,0.72 -1.6,0.11 -0.55,0.41 -3.09,-0.57 0.04,-0.82 0.34,-0.33 h 0.73 l 0.48,-0.88 -2.56,-4.19 -0.39,-2.3 -2.85,-1.42 -0.29,-0.54 0.05,-1.75 1.16,-0.69 0.14,-0.39 -0.24,-1.1 -1.69,-1.01 -2.42,0.95 -0.86,-0.81 -0.1,-0.75 0.43,-0.48 0.97,0.14 0.67,-0.34 -0.33,-1.49 -0.53,-0.47 -2.18,-0.08 -0.87,-0.54 -0.86,0.12 0.15,-1.41 0.64,0.07 0.69,-0.41 0.45,-1.02 0.22,-1.98 -0.44,-3.15 0.15,-1.01 -1.39,-4.21 -1.64,-2.34 -2.18,-2.01 -2.14,-1.02 -1.26,1.08 -1.54,0.07 -0.75,1.23 -0.78,-0.02 -1.06,-1.25 -1.45,-0.49 -1.22,-0.9 -2.89,-3.52 -2.61,-2.38 -2.7,-1.71 -1.72,-0.34 -3.34,0.16 -3.6,2.45 -5.31,-1.56 0.63,-0.69 0.04,-0.65 -1.16,-1.04 2.1,-2.83 1.56,-1.26 2.69,-1.61 0.91,-0.27 0.45,0.21 0.13,-0.64 2.66,-1.6 0.49,0.42 0.48,-0.26 0.24,0.26 0.64,-1.09 -0.2,-0.37 -0.65,0.02 0.1,-0.27 2.99,-2.48 6.26,-3.5 1.44,-0.24 0.55,-1.06 0.68,-3.15 -0.25,0.85 0.42,0.74 1.22,0.93 0.78,0.13 3.75,-1.62 2.49,-2.42 0.8,0.51 0.23,-0.46 0.6,-0.17 v -0.59 l 0.41,-0.25 0.33,-0.03 0.21,0.7 0.97,-0.36 0.22,0.62 0.27,-0.01 0.8,-1.62 0.42,0.07 1.17,-1.11 0.81,0.83 0.62,0.13 0.91,1.38 -0.1,-3.15 0.52,0.03 1.05,-0.98 1,0.2 0.15,-0.28 -0.49,-1.09 -2.84,-0.19 -0.79,0.31 -0.06,0.32 -0.66,-0.23 0.48,-0.8 -0.57,-4.37 0.95,-1.47 -0.92,-2.52 0.7,-0.25 -0.73,-4.24 0.99,-0.17 1.42,1.4 0.53,0.13 0.32,1.53 0.36,-0.34 0.32,0.13 -0.13,0.87 0.4,0.55 0.67,0.25 0.37,-0.33 0.8,1.14 0.22,0.08 1.04,-1.51 -0.57,-0.22 -0.23,-1.08 0.58,-0.39 0.68,0.5 0.71,1.08 v 0.58 l -0.88,1.08 0.24,0.43 -0.74,-0.26 -0.08,0.49 0.99,0.1 1.23,1.03 0.49,1.73 -0.14,0.29 -0.41,-0.22 -0.13,0.82 0.33,-0.44 0.44,0.44 0.18,-0.16 -0.03,-1.28 0.43,-0.5 0.51,-0.2 0.3,0.23 -0.32,0.14 0.1,0.5 0.4,1.02 0.3,0.06 0.3,-0.18 -0.72,-1.02 1.8,-0.31 -0.46,-0.48 -0.76,0.26 -1.04,-0.73 0.41,-0.59 2.59,-0.38 1.55,1.33 0.49,0.01 0.36,1.42 1.28,0.43 1.28,1.53 0.63,0.19 -1.51,1.57 -0.27,-0.03 -0.15,-0.65 -0.94,0.07 0.69,1.38 1.09,0.05 -0.12,0.66 1.49,-0.42 0.29,-0.41 0.42,0.4 0.14,-0.33 -0.44,-0.31 -0.3,-2.05 -0.59,-0.45 0.21,-0.55 -0.71,-0.18 0.33,0.51 -0.37,0.11 -1.02,-1.51 -0.61,-0.42 -0.41,0.23 0.25,-0.97 1.14,0.91 0.66,-0.34 1.31,0.64 0.41,-0.13 0.85,0.73 -0.01,0.61 -0.48,0.14 0.5,1.08 0.21,-0.21 -0.31,-0.8 1.09,-1.74 0.49,0.42 -0.38,1.05 0.27,0.83 1.32,0.35 0.04,0.39 0.51,-0.5 -0.25,-0.46 0.21,-0.38 -0.79,-0.24 0.05,-0.32 0.87,-0.08 0.52,-0.42 1.17,1.5 0.63,1.76 2.71,2.2 -0.38,1.4 0.3,1.11 0.96,-0.53 0.73,-1.87 1.13,0.64 0.51,-0.33 -0.98,-2.5 0.45,-0.58 -0.41,-0.4 2.83,1.83 0.36,0.68 -0.73,2.39 -2.51,1.19 -0.01,1.01 -1.29,1.13 -0.14,0.62 -1.69,0.1 0.43,0.97 2.47,-0.52 2.1,-2.32 1.66,-1.27 2.49,-0.8 0.74,-0.57 0.53,0.93 -0.37,0.63 -0.82,-0.67 -2.04,1.1 -0.54,2.71 3.2,-1.12 0.13,0.97 0.38,-0.1 0.52,0.58 -0.68,1.01 -0.49,0.2 -0.13,0.81 -1.26,0.17 -1.19,1.3 0.59,0.19 0.17,0.52 1.84,-0.83 0.48,0.1 0.81,-0.61 3.06,-0.84 -1.91,1.55 0.5,0.15 -0.03,1.05 1.37,-0.9 0.54,0.7 -0.42,0.25 -0.01,0.56 0.57,0.54 0.67,-0.48 1.71,-0.32 -0.18,1.02 0.69,0.76 1.49,0.46 2.04,3.93 0.8,3.53 -0.82,1 -1.45,0.55 -0.5,0.71 1,2.4 1.02,1.44 1.67,1.19 0.52,-0.05 0.38,-0.46 1.04,0.17 2.7,1.75 2.6,1.03 0.37,0.49 -1.01,0.92 0.81,0.57 -0.04,0.56 0.65,-1.2 2.53,-0.55 0.33,0.31 0.12,-1.73 -1.57,-0.19 -1.07,-1.89 -1.29,-0.8 -0.88,-1.73 -0.53,0.17 -2.76,-4.69 -1.51,-2.06 -0.95,-0.76 -2.49,-3.73 -0.67,-0.45 -0.76,-1.73 -0.58,-0.65 h -0.42 l -1.23,-3.72 -0.94,-1.32 0.56,-0.29 3.75,7.3 7.99,11.06 3.4,3.7 1.88,1.41 1.97,0.96 2.97,-1.44 3.82,-0.97 0.24,-0.81 1.08,-1.03 0.07,-0.46 -0.41,-0.52 2.49,-2.04 -0.08,-1.27 1,-0.59 0.79,0.35 -0.92,0.87 0.75,1.35 1.93,1.7 1.68,0.71 1.6,-0.13 1.16,-0.82 0.61,-0.86 -0.08,-1.54 0.46,-0.43 2.55,-0.95 4.23,-0.61 1.17,0.52 0.72,-0.28 0.99,0.37 1.4,1.05 1.34,-0.5 0.86,0.06 1.74,1.37 0.87,0.21 0.46,-0.21 0.21,-0.6 0.74,0.09 0.6,0.81 -0.14,0.7 z m -104.7,27.63 0.86,-0.12 0.87,0.54 2.18,0.08 0.53,0.47 0.33,1.49 -0.67,0.34 -0.97,-0.14 -0.43,0.48 0.1,0.75 0.86,0.81 2.42,-0.95 1.69,1.01 0.24,1.1 -0.14,0.39 -1.16,0.69 -0.05,1.75 0.29,0.54 2.85,1.42 0.39,2.3 2.56,4.19 -0.48,0.88 h -0.73 l -0.34,0.33 -0.04,0.82 -1.35,-0.02 -2,0.76 -1.48,0.08 -1.06,-1.64 -1.34,0.13 -0.55,-0.34 -0.5,-2.08 -0.65,-0.82 -0.44,-0.21 -1.61,0.2 -1.69,-0.72 -0.6,0.29 -1.09,-1.54 -1.86,-1.38 -0.74,-1.07 0.74,-0.38 0.01,0.87 0.25,-0.21 0.03,0.38 0.25,-1.11 0.55,1 -0.34,-1.2 0.38,-0.32 2.63,-0.62 2.67,0.16 -0.98,-0.59 -1.7,-0.29 0.76,-0.53 0.46,-1.45 -0.39,-5.71 z"
        				},
        				]
        		}
        	}
        };

        		var chart = AmCharts.makeChart( "cir_map_big", {

                        "type": "map",
                        "fontFamily": "'Open Sans', sans-serif",
        				"theme": "black",
                        "zoomDuration": 0.3,
        				"mouseWheelZoomEnabled":true,
                        "zoomControl":
                            {
                            "zoomControlEnabled":false
                            },
        				"tapToActivate":false,
        				"preventDragOut":false,
        				//"imagesSettings":{"centred":false},
        				 "dataProvider":
        					{
        					"map": "russiaTB",
        					"getAreasFromMap": true,
        					"areas": [],
        					"images":map_images

        					},
                            "areasSettings":{
                                "outlineColor":"#96a0a4",
                                "rollOverOutlineColor":"#FFFFFF",
                                "color": "#6F7885",
                                "unlistedAreasAlpha": 0.1,
                                //"rollOverColor": "#61db96",
        
                                    "balloonText":"[[title]]"
                                }


        });
        /*Конец модалка CIR карты*/	
 
        /*Модалка Среднемесячный нормативный доход сотрудника*/
        var chart = AmCharts.makeChart( "smds", {
            "type": "serial",
            "fontFamily": "'Open Sans', sans-serif",

            "categoryField": "category",
            "colors": [
                "#61DB96"
            ],
            "startDuration": 0,
            "categoryAxis": {
                "gridPosition": "start",
                "autoGridCount": false,
                "axisColor": "#a0aab7",
                "fontSize": 13,
                "color": "#A0AAB7",
                "axisThickness": 1,
                "gridThickness": 0
            },
            "trendLines": [],
            "graphs": [
                {
                "labelOffset": 7,
                "balloonText": "[[category]]:[[value]]",
                "columnWidth": 0,
                "fillAlphas": 1,
                "fixedColumnWidth": 30,
                "fontSize": 13,
                "id": "AmGraph-1",
                "labelPosition": "top",
                "color":"#A0AAB7",
                "labelText": "[[value]]",
                "title": "graph 1",
                "type": "column",
                "valueField": "column-1"
                }
            ],
            "guides": [],
            "valueAxes": [{
               "id": "ValueAxis-1",
               "axisThickness": 0,
               "gridThickness": 0,
               "labelsEnabled": false,
               "tickLength": 0,
               "title": ""
                           }
            ],
            "allLabels": [],
            "balloon": {},
            "titles": [],
            "dataProvider": [
                   {
                   "category": "1кв. 2017",
                   "column-1": "69.2"                               },
                   {
                   "category": "2кв. 2017",
                   "column-1": "69.5"                               },
                   {
                   "category": "3кв. 2017",
                   "column-1": "74.8"                               },
                   {
                   "category": "4кв. 2017",
                   "column-1": "75.9"                               },
                   {
                   "category": "1кв. 2018",
                   "column-1": "76.2"                               }
            ]
        });
        $(window).on("resize", function() {
            new iScroll('wrapper_6',{
                snap: false,
                momentum: false,
                hScrollbar: false,
                vScrollbar: false
            });
            new iScroll('kv',{
                snap: false,
                momentum: false,
                hScrollbar: false,
                vScrollbar: false
            });
            new iScroll('wrapper_1_vap',{
                snap: false,
                momentum: false,
                hScrollbar: false,
                vScrollbar: false
            });
            new iScroll('wrapper_6',{
                snap: false,
                momentum: false,
                hScrollbar: false,
                vScrollbar: false
            });
            new iScroll('wrapper_1_vap',{
                snap: false,
                momentum: false,
                hScrollbar: false,
                vScrollbar: false
            });
        });
    /*конец this.reDraw = function()*/
    }
/*конец function Modal()*/
}
