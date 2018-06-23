function Load () {
    this.reDraw = function () {
        this.refresh();
    }

    $(window).on("load", function () {
        alert(1);
    });
}