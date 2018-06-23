//Костыль IE10 replaceWidth
function ReplaceWith(Ele) {
    'use-strict'; // For safari, and IE > 10

    var parent = this.parentNode,
        i = arguments.length,
        firstIsNode = +(parent && typeof Ele === 'object');

    if (!parent) {
        return;
    }

    while (i-- > firstIsNode) {
        if (parent && typeof arguments[i] !== 'object'){
            arguments[i] = document.createTextNode(arguments[i]);
        }
        if (!parent && arguments[i].parentNode) {
            arguments[i].parentNode.removeChild(arguments[i]);
            continue;
        }
        parent.insertBefore(this.previousSibling, arguments[i]);
    }

    if (firstIsNode) {
        parent.replaceChild(Ele, this);
    }
}

$(document).on("ready",function () {
    alert("Загрузился!");
});



// prevent all scroll //
$('body').on('touchmove', function(e) {
    e.preventDefault();
});

// apply iscroll to scrolling element
// requires use of id

//чистим link c sab css
var link = document.querySelectorAll('link[data-sap-ui-ready="true"]');

for(var i = 0; i < link.length;i++) {
    link[i].parentNode.removeChild(link[i]);
}

var globals = {};

globals.title = "Главный экран";
globals.title_group_bank = "Группа";

globals.tap = function(el, func) {
    function getEvent(w) {
        if(w <= 1200) {
            el.ontouchstart = function(e) {
                e.preventDefault();
                func.call(this, e)
            };
        }else {
            el.onclick = function(e) {
                e.preventDefault();
                func.call(this, e)
            };
        }
    }

    getEvent(window.outerWidth);
    window.onresize = function (ev) {
        getEvent(this.outerWidth);
    }
}



var update = new Event("dash.update");

globals.page = ".p_main";
globals.prevPage = [];
//Событие UPDATE
globals.update = function() {
    return document.dispatchEvent(update);
};
//Заменить sab елемент на custom
globals.renderComponent = function(prop) {
    var app = document.createElement(prop.tag);

    for(var i = 0; i < prop.className.length; i++) {
        app.classList.add(prop.className[i]);
    }
    var myClass = globals.settings.teg + '_COMPONENT';

    app.innerHTML = prop.html;
    app.classList.add(myClass);

    if(document.getElementById(globals.settings.teg + '_COMPONENT') !== null) {
        document.getElementById(globals.settings.teg + '_COMPONENT').parentNode.parentNode.replaceWith(app);
    }else {
        document.querySelector("." + myClass).replaceWith(app);
    }
}

//Заменитm выбранный sab елемент на custom
globals.refactor = function(prop) {
    var app = document.createElement(prop.tag);

    for(var i = 0; i < prop.className.length; i++) {
        app.classList.add(prop.className[i]);
    }

    if(prop.cloneInner === true) {
        var inner = document.getElementById(prop.target).innerHTML;
        app.innerHTML = inner;
    }

    document.getElementById(prop.target).parentNode.replaceWith(app);
}
//селекты в шапке
globals.CustomSelect = function(options) {

    var div = $(".custom_select__dropdown");
    $(document).on("touchstart", function (e){
        e.preventDefault();
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            if(div.hasClass("active")) {
                div.removeClass("active");
            }
        }
    });

    function findElenment(className, func) {
        var el = document.querySelectorAll(className);
        for(var i = 0;i < el.length; i++) {
            func.call(el[i]);
        }
    }

    this.initSelect = function () {
        var _this = [];
        findElenment(options.class, function () {

            _this.push(this.lastElementChild);

            var drop = this.lastElementChild,
                th = this,
                now = null;

            globals.tap(this, function (e) {
                if(e.target.nodeName !== "SPAN") {
                    _this.forEach(function (item) {
                        item.classList.remove("active");
                    });
                    setTimeout(function () {
                        drop.classList.add("active");
                    }, 300);

                    now = this;

                    globals.opDrop = 1;
                }
            });

            var _els = [];
            for(var i = 0; i < drop.childNodes.length;i++) {

                if(drop.childNodes[i].nodeName !== "#text") {
                    _els.push(drop.childNodes[i]);

                    globals.tap(drop.childNodes[i], function (e) {
                        _els.forEach(function (item) {
                            item.classList.remove("active");
                        });
                        this.classList.add("active");
                        this.parentNode.classList.remove("active");

                        now.firstElementChild.innerHTML = this.textContent;

                        document.querySelector("." + drop.getAttribute("data-input")).value = this.getAttribute("data-item");

                        if(options.callback !== undefined) {
                            options.callback(now.firstElementChild);
                        }
                    });
                }
            }
        });
    }();
}

//Модалочка
globals.ModalWindow = function(options) {
    this.init = function() {
        var el = document.getElementsByClassName(options.modal)[0],
            btn = document.querySelectorAll(options.btns),
            now = null,
            attr;

        for(var i = 0; i < btn.length; i++) {
            globals.tap(btn[i], function(e) {
                setTimeout(function () {
                    el.classList.add("active");
                }, 200);

                attr = this.getAttribute("data-target");
                var attrTitle = this.getAttribute("data-title");

                now = attr;
                document.querySelector(".modal_title").innerHTML = attrTitle;
                document.getElementById(attr).classList.add("active");
            });
        }

        globals.tap(document.querySelectorAll("span.modal_close")[0], function(e) {
            el.classList.remove("active");
            document.getElementById(now).classList.remove("active");
        });

        var div = $(".modal_inner");
        $(document).on("touchstart", function (e){
            e.preventDefault();
            if (!div.is(e.target) && div.has(e.target).length === 0) {
                if($("." + options.modal).hasClass("active")) {
                    el.classList.remove("active");
                    document.getElementById(attr).classList.remove("active");
                }
            }
        });

    }();
}

//навигация
globals.navigation = function (prop) {
    globals.tap(document.querySelector(prop.btn), function (e) {
        globals.prevPage.push(globals.page);
        globals.page = prop.page;
        var els = document.querySelectorAll(".tiles__wrapper");

        for(var i = 0; i < els.length; i++) {
            els[i].classList.remove("active");
        }

        if(prop.page !== undefined) {
            document.querySelector(prop.page).classList.add("active");
        }

        if(prop.callback !== undefined) {
            prop.callback();
            console.log(globals.prevPage);
        }
        globals.update();
    });
};

//Коллапсы
globals.Collapse = function (els, prop) {
    var acc = document.querySelectorAll(els);
    var i;

    function param(els) {
        var panel = els.nextElementSibling;
        els.classList.toggle("active");
        if (panel.style.maxHeight){
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
        return false;
    }

    for (i = 0; i < acc.length; i++) {
        globals.tap(acc[i], function(event) {
            param(this);
        });
        if(prop !== undefined) {
            if(prop.open === true) {
                param(acc[i]);
            }
        }
    }
}

//Контроль слайдов
globals.chartSlideController = function(options) {
    var btn = document.getElementsByClassName(options.btnClass)[0];
    var blocks = document.querySelectorAll(options.blockClass);

    globals.tap(btn, function() {
        for(var i = 0; i < blocks.length; i++) {

            if(blocks[i].classList.length > 2) {
                blocks[i].classList.remove("active");
                btn.classList.remove("active");
            }else {
                blocks[i].classList.add("active");
                btn.classList.add("active");
            }
        }
    });
}
