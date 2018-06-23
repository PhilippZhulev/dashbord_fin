function Pa_tile () {
    this.reDraw = function() {
        try {
            this.refresh();

            var globalSettings = this.globalSettings;
            //var expData=JSON.parse("["+this.globalSettings.Settings.cir_data+"]");
            console.log(this.globalSettings.Settings);

            globals.renderComponent(globalSettings, {
                tag: "div",
                className: ["tiles__wrapper__item", "item_1"],
                html:
                '                                    <div class="tiles__wrapper__tile">' +
                '                                        <div class="container">' +
                '                                            <div class="row">' +
                '                                                <div class="col-12">' +
                '                                                    <span class="tiles__wrapper__tile_title">Правила аллокации</span>' +
                '                                                    <span class="table_item">Основные драйверы аллокации:</span>' +
                '                                                    <ul class="pa_list">' +
                '                                                        <li>Прямое отнесение</li>' +
                '                                                        <li>ЕРКЦ: по объему трафика</li>' +
                '                                                        <li>Самоинкассация: кол-во транзакций, объем денежной наличности</li>' +
                '                                                        <li>Эквайринг (POS)<br>' +
                '                                                           >РБ - 50%<br>' +
                '                                                           >КБ/CIB - по норм. расходов на оборудование' +
                '                                                        </li>' +
                '                                                        <li>ВСП ОКР КБ: 100% на КБ/CIB</li>' +
                '                                                    </ul>' +
                '                                                </div>' +
                '                                            </div>' +
                '                                        </div>' +
                '                                    </div>'
            });
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
