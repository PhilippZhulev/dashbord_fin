function Ka_tile () {
    this.reDraw = function() {
        try {
        this.refresh();
            var globalSettings = this.globalSettings;
        globals.settings = this.globalSettings;
        //var expData=JSON.parse("["+this.globalSettings.Settings.expData+"]");

        globals.renderComponent (globalSettings,{
            tag : "div",
            className : ["tiles__wrapper__item", "item_4"],
            html:
            '   <div class="tiles__wrapper__tile">' +
            '       <div class="container">' +
            '          <div class="row">' +
            '              <div class="col-12">' +
            '                   <span class="tiles__wrapper__tile_title">Категории аренды<span>млрд. руб</span></span>' +
            '              </div>' +
            '          </div>' +
            '      </div>' +
            '      <div class="chart_element__container">' +
            '           <div class="chart_element__chart ka"><span class="chart_value sopf_value">19.6</span><div class="chart_element___inner" id="ka"></div></div>' +
            '           <div class="chart_element__legend ka">' +
            '                <span class="legend__item"><i style="background: #61DB96"></i>Валютные дог-ры</span>' +
            '                <span class="legend__item"><i style="background: #F5A623"></i>Объекты ЦА</span>' +
            '                <span class="legend__item"><i style="background: #6EC7F7"></i>Переформат. ВСП</span>' +
            '                <span class="legend__item"><i style="background: #2ACED0"></i>Комм. помещения</span>' +
            '                <span class="legend__item"><i style="background: #8064a2"></i>Муниц. помещения</span>' +
            '           </div>' +
            '      </div>' +
            '   </div>'
        });

        var finishedColors = [
            "#61DB96",
            "#F5A623",
            "#6EC7F7",
            "#2ACED0",
            "#8064a2",
            "#a76eff",
            "#64A7D2",
            "#04D215",
            "#0D52D1",
            "#2A0CD0",
            "#8A0CCF",
            "#CD0D74"];

        var chart = AmCharts.makeChart( "ka", {
            "type": "pie",
            "fontFamily": "'Open Sans', sans-serif",
            //"startAngle": 10,
            "categoryField": "category",
            "balloonText":"[[category]]:<br>[[val]] млрд. руб",
            "thousandsSeparator": " ",
            "startDuration":0,
            "outlineThickness":1,
            "outlineAlpha":1,
            "outlineColor":"#36414d",
            "sequencedAnimation":false,
            "percentPrecision":0,
            "labelText": "[[val]]",
           // "labelsEnabled": false,
            "titleField": "category",
            "valueField": "val",
            "allLabels": [],
            "color":"#a1abb8",
            "innerRadius":"70%",
            "fontSize":13,
            "balloon": {},
            "pullOutRadius": "0%",
            "startRadius": "50%",
            //"autoMargins": false,
            // "marginBottom":10,
            // "marginRight":10,
            // "marginLeft":10,
            // "marginTop":10,
            "labelTickAlpha": 0.2,
            "labelTickColor": "#a1abb8",
            "labelRadius": 10,
            "titles": [],
 			"colors":  finishedColors  ,
			"dataProvider": [
                {"category": "Валютные договоры","val": "2.6"},
                {"category": "Объекты ЦА","val": "4.2"},
                {"category": "Переформатированные ВСП","val": "3.4"},
                {"category": "Коммерческие помещения","val": "8.6"},
                {"category": "Муниципальные помещения","val": "0.8"}
            ]
		});
    }
    catch(e){
        globals.renderComponent (globalSettings, {
            tag : "div",
            className : ["tiles__wrapper__item", "item_4"],
            html:
            '<div class="tiles__wrapper__tile i_err_404">' +
            '   <span>Нет данных...</span>' +
            '</div>'
        });
        console.warn(e);
    }

    }
}
