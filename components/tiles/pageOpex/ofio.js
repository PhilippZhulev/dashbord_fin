function Ofio_tile () {

    //
    // this.reDraw=function(){
    //     console.warn("Ofio_tile");
    //     var counter=0;
    //     var that=this;
    //     var arr ="fio";
    //     // this.reDrawTile();
    //
    //
    //     if(!this.globalSettings.Settings.break)
    //     {
    //         that.callZTLFunction("getCache",
    //             function(data)
    //             {
    //                 var a=arr.split('$$_$$');
    //                 var d= data.split('$$_$$');
    //                 that.globalSettings.Settings.break=true;
    //                 for(var i=0;i<d.length;i++)
    //                 {
    //                     that.globalSettings[a[i]]=JSON.parse(d[i]);
    //                 }
    //                 that.reDrawOfio(a);
    //             },arr
    //         );
    //     }else{
    //         this.globalSettings.Settings.break=undefined;
    //     }
    // }
    //
    //
    // this.reDrawOfio = function(disc) {
    //     this.refresh();
    //     var dataR= this.globalSettings[disc[0]];
    //     var colors=["#dfdfdf","#6EC7F7","#61DB96","#61DB96", "#dfdfdf"]
    //
    //     var data=[];

     /*   for(var i=0,i<dataR.length;i++){
            var obj={};
            obj.name=dataR[i].category;
            obj.open=dataR[i].fact;
            obj.close=dataR[i].plan;
            obj.color=colors[i];
            obj.balloonValue=dataR[i].fact_prev;
            data.push(obj)

        }*/
    this.reDraw = function(a) {
        try {
            console.warn("Ofio_tile");
            this.refresh();
            var incoming_data = window.data.fio;//this.globalSettings[a[0]];
            var globalSettings = this.globalSettings;
            var data=[];
            var colors=["#dfdfdf","#6EC7F7","#61DB96","#61DB96", "#dfdfdf"]
   for(var i=0;i<incoming_data.length;i++){
       var obj={};
       obj.name=incoming_data[i].category;
       obj.open=parseFloat(incoming_data[i].fact)||100;
       obj.close=parseFloat(incoming_data[i].plan)||100;
       obj.color=colors[i];
       obj.balloonValue=incoming_data[i].fact_prev;
       data.push(obj)}

       var screen_data = [];


       /*data = [
           {
               "name": "План 2018",
               "open": 110,
               "close": 129.8,
               "color": "#dfdfdf",
               "balloonValue": "129.8"
           },
           {
               "name": "Повышенные<br>начисления резервов<br> по обязательствам",
               "open": 129.8,
               "close": 135,
               "color": "#6EC7F7",
               "balloonValue": "0.2"
           },
           {
               "name": "Перенос сроков<br>оплаты АХР",
               "open": 129.8,
               "close": 123.5,
               "color": "#61DB96",
               "balloonValue": "-6.3"
           },
           {
               "name": "Недоосвоение по<br>отнесению на расходы<br>Проектного лимита",
               "open": 123.5,
               "close": 122.4,
               "color": "#61DB96",
               "balloonValue": "-2.1"
           },
           {
               "name": "Факт 2018",
               "open": 110,
               "close": 121.2,
               "color": "#dfdfdf",
               "balloonValue": "-8.6"
           }
       ]*/


       //var globalSettings1 = this.globalSettings;
       //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

       globals.renderComponent(globalSettings, {
           tag: "div",
           className: ["tiles__wrapper__item", "item_2"],
           html:
           '   <div class="tiles__wrapper__tile">' +
           '       <div class="container">' +
           '          <div class="row">' +
           '              <div class="col-12">' +
           '                   <span class="tiles__wrapper__tile_title">Факторы изменения<span>млрд. руб</span></span>' +
           '              </div>' +
           '          </div>' +
           '      </div>' +
           '      <div class="chart_element__container">' +
           '           <div class="chart_element__chart ofio_chart" id="ofio_chart"></div>' +
           '      </div>' +
           '   </div>'
       });

       var chart = AmCharts.makeChart("ofio_chart", {
           "type": "serial",
           "fontFamily": "'Open Sans', sans-serif",
           "categoryField": "name",
           "columnWidth": 0.6,
           "color":"#a1abb8",
           "rotate": true,
           "marginRight": 40,
           "theme": "dark",
           "export": {
               "enabled": true
           },
           "categoryAxis": {
               "gridPosition": "start",
               "axisColor": "#a0aab7",
               "color": "#c9cbce",
               "fontSize": 14,
               "gridThickness": 0,
               "axisAlpha": 0
           },
           "trendLines": [],
           "graphs": [
               {
                   "balloonText": "[[category]]:<br>[[value]] млрд. руб",
                   "colorField": "color",
                   "fillAlphas": 0.8,
                   "id": "AmGraph-1",
                   "fixedColumnWidth": 20,
                   "fontSize": 13,
                   "labelText": "[[balloonValue]]",
                   "lineColor": "#36414D",
                   "color": "#DCDDDF",
                   "openField": "open",
                   "type": "column",
                   "valueField": "close"
               }
           ],
           "guides": [],
           "valueAxes": [
               {
                   "axisFrequency": 0,
                   "id": "ValueAxis-1",
                   "logarithmic": true,
                   "color": "#DCDDDF",
                   "axisAlpha": 0,
                   "axisThickness": 0,
                   "gridThickness": 0,
                   "labelOffset": 1,
                   "labelsEnabled": false,
                   "tickLength": 0
               }
           ],
           "allLabels": [],
           "balloon": {},
           "titles": [],
           "dataProvider": data
       });


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
