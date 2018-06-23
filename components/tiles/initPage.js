function initPage () {

    this.initPage0=function(){
        console.warn("initPage0")
        //this.getBuffer("capex$$_$$capex_graph_data$$_$$chis$$_$$cir$$_$$cir_map$$_$$focus$$_$$kr$$_$$opex$$_$$opex_graph_data","run");

        this.getBuffer("kro$$_$$do$$_$$do_inf$$_$$sopf$$_$$fio$$_$$up$$_$$tp$$_$$sr$$_$$kv$$_$$sptch$$_$$schtch1$$_$$schtch2$$_$$schtch_total$$_$$dchtch$$_$$pokaz_nedv$$_$$ofin$$_$$ka$$_$$krpn$$_$$cir$$_$$opex$$_$$chis$$_$$capex$$_$$kr$$_$$kr_dzo$$_$$focus$$_$$opex_graph_data$$_$$capex_graph_data$$_$$cir_map$$_$$cir_modal_map$$_$$cir_modal","run");
    }

    this.run = function(a) {
        var that= this
        console.warn("run0")
        window.data={};
        for(var i=0;i<a.length;i++){
            window.data[a[i]]=this.globalSettings[a[i]]
        }
        //this.globalSettings.that_c.fireEvent("tech2");
       //
        // this.globalSettings.that_c.firePropertiesChangedAndEvent(["SettingsTP"],"tech2");
        function func() {
            that.globalSettings.that_c.fireEvent("tech2");
        }

        setTimeout(func, 1000);



    }
}
