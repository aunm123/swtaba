KISSY.add("address-detail/wlroute", function (e, i, a, s, t, r) {
    var d = i.all, n = "\u8bf7\u9009\u62e9", l = "J_WlAreaInfo", c = "J_WlAddressCon", o = "J_WlServiceInfo",
        u = "J_WlServiceListCon", f = "J_WlAreaTabs", v = "J_WlAddressInfo", m = "J_WlServiceTitle",
        g = "J_ServiceMarkInfo", h = "J_WlServiceTitleMark", p = "wl-info-active", A = "serviceFeeListInfo";
    FRAME_HTML = ['<div class="wl-areainfo clearfix">', '<span id="', l, '" class="wl-areacon"><span id="J-From"></span> \u81f3 <span id="J-To"></span></span><span class="loading" id="J-Loading"></span>', "</div>", '<div id="', o, '" class="wl-serviceinfo"></div>', '<div id="', A, '" class="wl-serviceinfo"></div>', '<div id="', h, '" class="wl-serviceinfo"></div>'].join(""), SERVICEPOP_HTML = '<div class="wl-servicelist-con" id="' + u + '"></div>', ADDRESSTABCON_HTML = '<div id="' + c + '" class="wl-addresslist-con"></div>', AREA_TEMP = '<span class="wl-addressinfo" id="' + v + '" title="{{areaInfoAll}}">{{areaInfo}} <s></s></span>{{#if( markInfo !== undefined )}}<span>{{markInfo}}</span>{{/if}}', SERVICE_TEMP = ["{{#if( id !== undefined )}}", '<span class="wl-servicetitle" id="', m, '">{{{info}}} <s></s></span>', "{{else}}", "<span>{{{info}}}</span>", "{{/if}}"].join(""), serviceFeeList_TEMP = ["{{#if(serviceFeeList!==undefined)}}", "{{#each(serviceFeeList)}}", '<span class="serviceFeeListInfo">{{serviceFeeSignText}}', "{{serviceFee/100}}\u5143 </span>", "{{/each}}", "{{/if}}"].join(""), SERVICE_TEMP_MARK = ["{{#if( serviceIcon !== undefined )}}", "{{#if( serviceLink !== undefined )}}", '<a target="_blank" href="{{serviceLink}}"><img height="12" style="vertical-align:text-bottom" src="{{serviceIcon}}"></a>', "{{else}}", '<img height="12" style="vertical-align:text-bottom" src="{{serviceIcon}}">', "{{/if}}", "{{/if}}", '{{#if( markInfo !== undefined )}}<span class="wl-servicemarkinfo" id="', g, '">{{{markInfo}}}</span>', "{{/if}}"].join(""), LIST_TEMP = ['<ul class="wl-list-con">', "{{#each(list)}}", '<li class="J-WlListItem wl-list-item {{#if (isDefault === true )}} wl-list-active {{/if}}" data-id="{{id}}" {{#if( markInfo !== undefined )}} data-markInfo="{{markInfo}}" {{/if}} data-title="{{info}}">{{{info}}} <s>&#xf00b2;</s></li>', "{{/each}}", "</ul>"].join(""), LIST_ADDRESS_TEMP = ['<ul class="wl-list-add-con clearfix">', "{{#each(list)}}", '<li class="J-WlListItem wl-list-item {{#if ( isDefault === true )}} wl-list-add-active {{/if}} {{#if ( isLimite === true )}}isLimite{{/if}}" data-id="{{c}}" data-title="{{n}}" >{{{n}}}</li>', "{{/each}}", "</ul>"].join(""), LIST_ADDRESS_ALL_TEMP = ['<div class="wl-areatab-con" id="' + f + '">', '<a href="#" id="J-PopupClose" class="address-all-close"></a><div id="J-AddressAllTitle" class="address-all-title-par clearfix">', '<div class="address-all-title J-AddressTitle address-all-title-hidden" data-title="Province"  id="J-AddressAllTitle-province"></div>', '<div class="address-all-title J-AddressTitle address-all-title-hidden" data-title="City"  id="J-AddressAllTitle-city"></div>', '<div class="address-all-title J-AddressTitle address-all-title-hidden" data-title="Area"  id="J-AddressAllTitle-area"></div>', '<div class="address-all-title J-AddressTitle address-all-title-hidden" data-title="Other"  id="J-AddressAllTitle-other"></div>', "</div>", '<div id="J-AddressAllCon" class="address-all-con-par clearfix">', '<!--div class="address-all-con"  id="J-AddressAllCon"></div-->', "</div></div>"].join(""), jsTrackerSendArr = [], ajaxOr = false;
    function D(i) {
        var a = this;
        a.arg = KISSY.merge({
            renderId: "",
            itemId: "",
            userId: "",
            skuId: "default",
            initData: "",
            initUrl: "",
            immediateRender: true,
            maxAddressLength: 10,
            debug: false,
            addressUrl: "//division-data.alicdn.com/simple/addr_3_001.js",
            changeAnyInfo: function () {
            },
            renderAddressCallback: function () {
            },
            renderServiceCallback: function () {
            }
        }, i);
        if (!a.arg.initData.data.serviceInfo) {
            a.arg.initData.data.serviceInfo = {}
        }
        if (!e.one("#" + a.arg.renderId)) {
            return false
        }
        a.arg.notLimiteArea = [];
        if (typeof g_config != "undefined") {
            if (typeof g_config.sibRequest != "undefined") {
                if (typeof g_config.sibRequest.data != "undefined") {
                    if (typeof g_config.sibRequest.data.sellableArea != "undefined") {
                        if (e.isArray(g_config.sibRequest.data.sellableArea)) {
                            a.arg.notLimiteArea = g_config.sibRequest.data.sellableArea
                        }
                    }
                }
            }
        }
        if (a.arg.immediateRender) {
            if (a.arg.initData.data && a.arg.initData.data.areaId) {
                e.getScript(a.arg.addressUrl, {
                    success: function () {
                        a.addressDataAll = a._processData(tdist);
                        a.arg.initData.data.userCity = (a.parseId(a.arg.initData.data.areaId) || {}).userCity;
                        a.init()
                    }
                })
            } else {
                a.init()
            }
        }
    }

    e.augment(D, {
        init: function () {
            var i = this;
            i.initTemplate();
            if (i.arg.initData.success) {
                e.one("#" + i.arg.renderId).html(FRAME_HTML);
                i.areaEle = e.one("#" + l);
                i.fromEle = e.one("#J-From");
                i.toEle = e.one("#J-To");
                i.serviceEle = e.one("#" + o);
                i.checkAddressType()
            } else {
                i.errorFun("dataError", 108, "\u7ec4\u4ef6\u4f20\u9012initData\u521d\u59cb\u5316\u6570\u636e\u6709\u8bef");
                return false
            }
        }, initTemplate: function () {
            var e = this, i = s;
            e.areaTemp = new i(AREA_TEMP);
            e.serviceTemp = new i(SERVICE_TEMP);
            e.serviceTempMark = new i(SERVICE_TEMP_MARK);
            e.listTemp = new i(LIST_TEMP);
            e.listAddressTem = new i(LIST_ADDRESS_TEMP);
            e.serviceFeeListInfo = new i(serviceFeeList_TEMP)
        }, checkAddressType: function () {
            var i = this, a = i.arg.initData.data;
            i.initData = a;
            i.editFrom();
            if (a.addressList && a.addressList.length > 0) {
                i.createCY();
                i.jsTarckerSend({
                    msg: "\u663e\u793a\u5e38\u7528\u6536\u8d27\u5730\u5740",
                    category: "log",
                    line: 142,
                    nick: i.arg.userId
                })
            } else {
                i.createSJ();
                i.jsTarckerSend({
                    msg: "\u663e\u793a\u4e09\u7ea7\u5730\u5740",
                    category: "log",
                    line: 142,
                    nick: i.arg.userId
                })
            }
            if (i.arg.notLimiteArea.length > 0) {
                if (!e.inArray(Number(a.areaId), i.arg.notLimiteArea)) {
                    d("#J_juValid").siblings(".tb-msg").one("p").html("\u8be5\u5b9d\u8d1d\u5728\u60a8\u6240\u9009\u5730\u533a\u9650\u5236\u8d2d\u4e70");
                    d("#J_juValid").siblings(".tb-msg").show();
                    var s = d(".J_LinkBuy"), t = d(".J_LinkAdd");
                    if (s) {
                        d(".J_LinkBuy").addClass("tb-disabled")
                    }
                    if (t) {
                        d(".J_LinkAdd").addClass("tb-disabled")
                    }
                    return false
                }
            }
        }, createCY: function () {
            var e = this, i = e.initData;
            e.addressListCY = i.addressList;
            e.addressData = e.checkoutDefault(i.addressList);
            e.editTo({addressInfo: e.addressData.info, addressMarkInfo: e.addressData.markInfo});
            e.createAddressListCY()
        }, createSJ: function () {
            var e = this, i = e.initData;
            if (i.areaId && Number(i.areaId) != 1 && i.areaName) {
            } else {
                i.areaName = "\u5168\u56fd";
                i.areaId = "1";
                e.jsTarckerSend({
                    msg: "\u663e\u793a\u4e09\u7ea7\u5730\u5740\uff0c\u4f46\u662f\u5b9a\u4f4d\u4e0d\u5230\u7528\u6237\u5730\u5740\uff0c\u663e\u793a\u5168\u56fd",
                    category: "log",
                    line: 177,
                    nick: e.arg.userId
                })
            }
            e.editTo({addressInfo: i.areaName, addressMarkInfo: i.markInfo});
            e.initPopupSimple("addressList", LIST_ADDRESS_ALL_TEMP, v);
            e.addressData = {id: i.areaId, info: i.areaName, markInfo: i.markInfo};
            e.initSJEvent();
            e.arg.renderAddressCallback();
            e.createService()
        }, initSJEvent: function () {
            var i = this;
            r.undelegate(document, "click", "#" + v, arguments.cell);
            r.delegate(document, "click", "#" + v, function (a) {
                if (ajaxOr) {
                    return false
                }
                if (i.addressDataAll) {
                    i.initRequestAddressUrl(i.addressDataAll)
                } else {
                    e.getScript(i.arg.addressUrl, {
                        success: function () {
                            var e = i._processData(tdist);
                            i.initRequestAddressUrl(e)
                        }
                    });
                    i.jsTarckerSend({
                        msg: "\u5c55\u5f00\u4e09\u7ea7\u5730\u5740",
                        category: "log",
                        line: 216,
                        nick: i.arg.userId
                    })
                }
            })
        }, _processData: function (i) {
            var a = this, s = i, t = {}, r;
            if (a.arg.mixAddressData) {
                KISSY.mix(s, a.arg.mixAddressData, true)
            }
            e.each(s, function (e, i) {
                r = s[i];
                if (r[1] === "0") {
                    r[1] = "990000"
                }
                if (!t[i]) {
                    t[i] = {n: r[0], p: r[1], ch: [], c: i}
                } else {
                    t[i].n = r[0];
                    t[i].p = r[1];
                    t[i].c = i
                }
                if (!t[r[1]]) {
                    t[r[1]] = {ch: [i]}
                } else {
                    t[r[1]].ch.push(i)
                }
            });
            return t
        }, initRequestAddressUrl: function (i) {
            var a = this;
            a.addressDataAll = i, areaData = i[a.addressData.id];
            a.subAddrD = {};
            if (areaData && Number(areaData.id) != 1) {
                a.subAddrD = a.parseId(a.addressData.id)
            } else {
                a.subAddrD.userProvince = {id: "1", name: "\u5168\u56fd"};
                a.subAddrD.level = 1
            }
            a.createSJList(a.subAddrD);
            a.initEventSJ();
            a.showPop(e.one("#" + v), "addressListPupop")
        }, initEventSJ: function () {
            var i = this, a = i.addressDataAll;
            d("#J-PopupClose").on("click", function (e) {
                i.addressListPupop.hide();
                return false
            });
            d(".J-AddressTitle").on("click", function (s) {
                var t = s.currentTarget, r = d(t).attr("data-title"), n = d(t).index();
                if (d(t).hasClass("address-all-title-selected")) {
                    return false
                }
                if (!i.subAddrDL) {
                    i.subAddrDL = e.clone(i.subAddrD)
                }
                if (n == 2) {
                    delete i.subAddrDL.userArea;
                    i.subAddrDL.userCity.child = a[i.subAddrDL.userCity.id].ch;
                    i.subAddrDL.level = 2
                } else if (n == 1) {
                    delete i.subAddrDL.userArea;
                    delete i.subAddrDL.userCity;
                    i.subAddrDL.userProvince.child = a[i.subAddrDL.userProvince.id].ch;
                    i.subAddrDL.level = 1
                } else if (n == 0) {
                    i.subAddrDL = {level: 1, userProvince: {id: "1", name: "\u5168\u56fd"}}
                }
                i.clearTitleTabsSJ(n);
                i.createSJList(i.subAddrDL)
            })
        }, clearTitleTabsSJ: function (i) {
            var a = this;
            e.filter(d(".J-AddressTitle"), function (e, a) {
                if (a > i) {
                    d(e).removeClass("address-all-title-selected").addClass("address-all-title-hidden").html("")
                }
            })
        }, createSJList: function (e) {
            var i = this, a = e, s = a.level;
            if (this.arg.lang == "zh_TW") {
                n = "\u8acb\u9078\u64c7"
            }
            d(".J-AddressTitle").removeClass("address-all-title-selected").addClass("address-all-title-hidden").html("");
            if (s == 1) {
                if (a.userProvince.child && a.userProvince.child.length > 0) {
                    i.displayTitleSJ("province", a.userProvince.name, {selectId: a.userProvince.id}, false);
                    i.displayTitleSJ("city", n, {parId: a.userProvince.id}, true)
                } else {
                    i.displayTitleSJ("province", n, {parId: 1}, true)
                }
            } else if (s == 2) {
                i.displayTitleSJ("province", a.userProvince.name, {selectId: a.userProvince.id}, false);
                if (a.userCity.child && a.userCity.child.length > 0) {
                    i.displayTitleSJ("city", a.userCity.name, {selectId: a.userCity.id}, false);
                    i.displayTitleSJ("area", n, {parId: a.userCity.id}, true)
                } else {
                    i.displayTitleSJ("city", a.userCity.name, {selectId: a.userCity.id}, true)
                }
            } else {
                if (a.userProvince.id == "990000") {
                    i.displayTitleSJ("province", a.userProvince.name, {selectId: a.userProvince.id}, false);
                    i.displayTitleSJ("city", a.userCity.name, {selectId: a.userCity.id}, false);
                    i.displayTitleSJ("area", a.userArea.name, {selectId: a.userArea.id}, false);
                    if (s == 4) {
                        i.displayTitleSJ("other", n, {selectId: a.userOther.id}, true)
                    } else {
                        i.displayTitleSJ("other", n, {parId: a.userArea.id}, true)
                    }
                    return
                }
                i.displayTitleSJ("province", a.userProvince.name, {selectId: a.userProvince.id}, false);
                i.displayTitleSJ("city", a.userCity.name, {selectId: a.userCity.id}, false);
                i.displayTitleSJ("area", a.userArea.name, {selectId: a.userArea.id}, true)
            }
        }, displayTitleSJ: function (e, i, a, s) {
            var t = this;
            if (!s) {
                d("#J-AddressAllTitle-" + e).removeClass("address-all-title-selected address-all-title-hidden").html(i + "<s></s>")
            } else {
                t.listAddressSj(t.listAddressTem.render(t.findSiblingsSJ(a)));
                d("#J-AddressAllTitle-" + e).removeClass("address-all-title-hidden").addClass("address-all-title-selected").html(i + "<s></s>")
            }
        }, listAddressSj: function (e) {
            var i = this, a = i.addressDataAll;
            d("#J-AddressAllCon").addClass("address-all-con-selected").html(e);
            d("#J-AddressAllCon .J-WlListItem").on("click", function (e) {
                var s = e.currentTarget, t = d(s).attr("data-id");
                if (d(s).hasClass("wl-list-add-active")) {
                    i.addressListPupop.hide();
                    return false
                }
                if (d(s).hasClass("isLimite")) {
                    return false
                }
                d("#J-AddressAllCon .J-WlListItem").removeClass("wl-list-add-active");
                d(s).addClass("wl-list-add-active");
                if (a[t].ch && a[t].ch.length > 0) {
                    i.subAddrDL = i.parseId(t);
                    i.createSJList(i.subAddrDL)
                } else {
                    i.endEditAddrSJ(t)
                }
            })
        }, endEditAddrSJ: function (e) {
            var i = this;
            i.addressData = {id: e, info: i.addressDataAll[e].n};
            delete i.subAddrDL;
            i.subAddrD = i.parseId(e);
            i.addressListPupop.hide();
            d("#" + v).html(i.returnTitle(i.subAddrD) + "<s></s>");
            var a = d(".J_LinkBuy");
            if (a) {
                if (a.hasClass("tb-disabled")) {
                    a.removeClass("tb-disabled")
                }
                d("#J_juValid").siblings(".tb-msg").hide()
            }
            var s = d(".J_LinkAdd");
            if (s) {
                if (s.hasClass("tb-disabled")) {
                    s.removeClass("tb-disabled")
                }
                d("#J_juValid").siblings(".tb-msg").hide()
            }
            if (i.arg.initUrl) {
                i.ajaxFun({
                    url: i.arg.initUrl,
                    jsonpCallback: "jsonp211",
                    data: {areaId: i.addressData.id, itemId: i.arg.itemId}
                }, i.requestInitURL, i.returnAllData)
            } else {
                i.returnAllData()
            }
            i.jsTarckerSend({
                msg: "\u5207\u6362\u4e86\u4e09\u7ea7\u5730\u5740",
                category: "log",
                line: 400,
                nick: i.arg.userId
            })
        }, findSiblingsSJ: function (i) {
            var a = this, s = a.addressDataAll, t = [], r;
            if (i.selectId) {
                r = s[s[i.selectId].p].ch;
                e.each(r, function (r, d) {
                    if (r != i.selectId) {
                        s[r].isDefault = false
                    } else {
                        s[r].isDefault = true
                    }
                    s[r].isLimite = false;
                    if (a.arg.notLimiteArea.length > 0) {
                        if (e.inArray(Number(r), a.arg.notLimiteArea)) {
                            s[r].isLimite = false
                        } else {
                            s[r].isLimite = true
                        }
                    }
                    t.push(s[r])
                })
            } else {
                r = s[i.parId].ch;
                if (e.isArray(a.arg.notLimiteArea)) {
                    e.each(r, function (i, r) {
                        s[i].isLimite = false;
                        if (a.arg.notLimiteArea.length > 0) {
                            if (e.inArray(Number(i), a.arg.notLimiteArea)) {
                                s[i].isLimite = false
                            } else {
                                s[i].isLimite = true
                            }
                        }
                        s[i].isDefault = false;
                        t.push(s[i])
                    })
                }
            }
            return {list: t}
        }, parseId: function (e) {
            var i = this, a = i.addressDataAll, s = {userProvince: {id: "1", name: "\u5168\u56fd"}, level: 1};
            var t = a[e];
            if (!a[e] || Number(e) == 1) {
                return s
            }
            if (Number(t.p) == 1) {
                s = {userProvince: {id: t.c, name: t.n, child: t.ch}, level: 1};
                return s
            }
            if (t.ch && t.ch.length > 0) {
                if (a[t.p].p === "990000") {
                    s = {
                        userProvince: {id: a[t.p].p, name: a[a[t.p].p].n},
                        userCity: {id: t.p, name: a[t.p].n},
                        userArea: {id: t.c, name: t.n},
                        level: 3
                    }
                } else {
                    s = {
                        userCity: {id: e, name: t.n, child: t.ch},
                        userProvince: {id: t.p + "", name: a[t.p].n},
                        level: 2
                    }
                }
            } else {
                if (a[a[t.p].p].p == "990000") {
                    s = {
                        userProvince: {id: this.getParseData(t, 1).c, name: this.getParseData(t, 1).n},
                        userCity: {id: this.getParseData(t, 2).c, name: this.getParseData(t, 2).n},
                        userArea: {id: t.p, name: a[t.p].n},
                        userOther: {id: t.c, name: t.n},
                        level: 4
                    }
                } else if (Number(a[t.p].p) != 1) {
                    s = {
                        userProvince: {id: a[t.p].p, name: a[a[t.p].p].n},
                        userCity: {id: t.p, name: a[t.p].n},
                        userArea: {id: t.c, name: t.n},
                        level: 3
                    }
                } else {
                    s = {userProvince: {id: t.p, name: a[t.p].n}, userCity: {id: t.c, name: t.n}, level: 2}
                }
            }
            return s
        }, editFrom: function () {
            var e = this;
            if (e.initData.sendCity) {
                e.fromEle.text(e.initData.sendCity)
            } else {
                e.fromEle.text("\u5168\u56fd")
            }
        }, editTo: function (e) {
            var i = this;
            i.toEle.html(i.areaTemp.render({
                areaInfoAll: e.addressInfo,
                areaInfo: i.cutWords(e.addressInfo, i.arg.maxAddressLength),
                markInfo: e.addressMarkInfo
            }))
        }, getParseData: function (e, i) {
            var a = this.addressDataAll;
            var s = 0;
            var t = [];
            while (e.p != "1") {
                s++;
                e = a[e.p];
                t.push(e)
            }
            return t[t.length - i]
        }, createAddressListCY: function () {
            var e = this;
            e.initPopupSimple("addressList", ADDRESSTABCON_HTML, v);
            d("#" + c).html(e.listTemp.render({list: e.addressListCY, title: "\u5e38\u7528\u6536\u8d27\u5730\u5740"}));
            e.initAddressTitleEvent("addressListPupop", v);
            e.initSingleListEvent(c, v, function (i) {
                if (i != undefined) {
                    e.addressData = e.initData.addressList[i];
                    e.editTo({addressInfo: e.addressData.info, addressMarkInfo: e.addressData.markInfo});
                    if (e.arg.initUrl) {
                        e.ajaxFun({
                            url: e.arg.initUrl,
                            jsonpCallback: "jsonp211",
                            data: {areaId: e.addressData.id, itemId: e.arg.itemId}
                        }, e.requestInitURL, e.returnAllData)
                    } else {
                        e.returnAllData()
                    }
                    e.jsTarckerSend({
                        msg: "\u5207\u6362\u4e86\u5e38\u7528\u6536\u8d27\u5730\u5740",
                        category: "log",
                        line: 544,
                        nick: e.arg.userId
                    })
                }
                e["addressListPupop"].hide()
            });
            e.arg.renderAddressCallback();
            e.createService()
        }, requestInitURL: function (e) {
            var i = this;
            if (e && e.success && e.data) {
                var e = e.data;
                i.initData = e;
                i.fromEle.text(e.sendCity);
                i.createService()
            } else {
                i.errorFun("requestError", 583, "\u5207\u6362\u5730\u5740\u53d1\u8d77\u7684\u8bf7\u6c42\u8fd4\u56de\u6570\u636e\u51fa\u9519")
            }
        }, initAddressTitleEvent: function (e, i) {
            var a = this;
            r.undelegate(document, "click", "#" + i, arguments.cell);
            r.delegate(document, "click", "#" + i, function (i) {
                a.showPop(i.currentTarget, e)
            })
        }, initSingleListEvent: function (e, i, a) {
            var s = this;
            r.undelegate("#" + e, "click", ".J-WlListItem", arguments.cell);
            r.delegate("#" + e, "click", ".J-WlListItem", function (e) {
                if (!d(e.currentTarget).hasClass("wl-list-active")) {
                    d(e.currentTarget).addClass("wl-list-active").siblings().removeClass("wl-list-active");
                    a(d(e.currentTarget).index())
                } else {
                    a()
                }
            })
        }, checkoutDefault: function (i) {
            var a = {};
            e.each(i, function (e, i) {
                if (e.isDefault) {
                    a = e;
                    return false
                }
            });
            return a
        }, createService: function (e) {
            var i = this;
            i.serviceData = i.initServiceDataFun(i.initData.serviceInfo, i.arg.skuId);
            d("#" + o).html(i.serviceTemp.render(i.serviceData));
            d("#" + h).html(i.serviceTempMark.render(i.serviceData));
            d("#" + A).html(i.serviceFeeListInfo.render(i.serviceData));
            if (i.serviceListData) {
                i.initPopupSimple("serviceList", SERVICEPOP_HTML, m);
                d("#" + u).html(i.listTemp.render({list: i.serviceListData, title: "\u7269\u6d41\u670d\u52a1"}));
                i.initAddressTitleEvent("serviceListPupop", m);
                i.initSingleListEvent(u, m, function (e) {
                    if (e != undefined) {
                        i.jsTarckerSend({
                            msg: "\u5207\u6362\u4e86\u7269\u6d41\u670d\u52a1",
                            category: "log",
                            line: 637,
                            nick: i.arg.userId
                        });
                        i.serviceData = i.serviceListData[e];
                        d("#" + o).html(i.serviceTemp.render(i.serviceData));
                        d("#" + h).html(i.serviceTempMark.render(i.serviceData));
                        d("#" + A).html(i.serviceFeeListInfo.render(i.serviceData));
                        i.returnAllData()
                    }
                    i["serviceListPupop"].hide()
                })
            }
            i.arg.renderServiceCallback();
            i.returnAllData(e)
        }, initServiceDataFun: function (e, i) {
            var a = this;
            if (e.info) {
                return {info: e.info.info}
            } else if (e.list && e.list.length > 0) {
                a.serviceListData = e.list;
                return a.checkoutDefault(e.list)
            } else if (e.sku) {
                return a.skuChanged(i)
            }
        }, skuChanged: function (e) {
            var i = this;
            if (e) {
                if (!i.initData.serviceInfo.sku[e]) {
                    e = "default"
                }
                i.jsTarckerSend({msg: "\u5207\u6362\u4e86sku", category: "log", line: 688, nick: i.arg.userId});
                i.serviceSkuId = e;
                i.serviceListData = i.initData.serviceInfo.sku[e];
                return i.checkoutDefault(i.serviceListData)
            }
        }, onChangeSku: function (e, i) {
            var a = this;
            if (!a.initData.serviceInfo.sku || !a.initData.serviceInfo.sku[e]) {
                e = "default"
            }
            if (e != a.serviceSkuId) {
                a.arg.skuId = e;
                a.createService(i)
            }
        }, returnAllData: function (i) {
            var a = this, s = {
                addressData: a.getCustomAreaInfo(),
                serviceData: a.getCustomServiceInfo(),
                requestInitUrlData: a.getRequestInitUrlData(),
                initData: a.arg.initData.data
            };
            if (i) {
                s.changeSkuByUser = i
            }
            if (a.subAddrD) {
                s.addressData = e.merge(s.addressData, a.subAddrD)
            }
            a.arg.changeAnyInfo(s)
        }, getCustomAreaInfo: function () {
            var e = this;
            return {
                itemId: e.arg.itemId,
                sendCity: e.initData.sendCity,
                userArea: {id: e.addressData.id, name: e.addressData.info},
                userId: e.arg.userId
            }
        }, getCustomServiceInfo: function () {
            return this.serviceData
        }, getRequestInitUrlData: function () {
            return this.initData
        }, showPop: function (i, a) {
            i = e.one(i);
            var s = this, t, r, n = d("#" + s.arg.renderId).offset();
            if (!i.hasClass(p)) {
                t = s[a];
                r = i.offset();
                t.set("xy", [r.left, r.top + 20]);
                t.show()
            }
        }, returnTitle: function (e) {
            var i = this, a = e, s = "";
            if (a.userProvince) {
                s += a.userProvince.name
            }
            if (a.userCity) {
                if (s != a.userCity.name) {
                    s += a.userCity.name
                }
            }
            if (a.userArea) {
                s += a.userArea.name
            }
            if (a.userOther) {
                s += a.userOther.name
            }
            s = s.replace("\u56fd\u9645", "");
            return s
        }, ajaxFun: function (i, s, t) {
            var r = this, n = {
                type: "get", timeout: 10, dataType: "jsonp", success: function (e) {
                    d("#J-Loading").hide();
                    ajaxOr = false;
                    s.call(r, e)
                }, error: function (e, i) {
                    d("#J-Loading").hide();
                    t.call(r);
                    ajaxOr = false;
                    r.errorFun(i, 761, "ajax\u8bf7\u6c42\u6570\u636e\u51fa\u9519:")
                }
            };
            n = e.merge(n, i);
            a(n)
        }, showLoading: function () {
            var e = this;
            ajaxOr = true;
            if (e.arg.requestShowLoading) {
                d("#J-Loading").show()
            }
        }, initPopupSimple: function (e, i, a) {
            var s = this, r = s[e + "Pupop"];
            if (!r) {
                r = new t.Popup({content: i, zIndex: 999, triggerType: "click", mask: {closeOnClick: true}});
                r.render();
                s[e + "Pupop"] = r;
                r.on("show", function () {
                    d("#" + a).addClass(p)
                });
                r.on("hide", function () {
                    delete s.subAddrDL;
                    d("#" + a).removeClass(p)
                })
            }
        }, errorFun: function (e, i, a) {
            var s = this;
            var t = e.toLowerCase() === "timeout" ? "(\u8bf7\u6c42\u8d85\u65f6)" : "(\u7cfb\u7edf\u51fa\u9519)";
            if (e == "dataError") {
                t = ""
            }
            if (a) {
                a += t
            } else {
                a = t
            }
            s.jsTarckerSend({msg: a, line: i, nick: s.arg.userId})
        }, cutWords: function (e, i) {
            if (e && e.length > i) {
                e = e.slice(0, i) + "..."
            }
            return e
        }, loadJsTracker: function () {
            var e = this, i = document.getElementsByTagName("head")[0], a = document.createElement("script");
            a.setAttribute("type", "text/javascript");
            a.setAttribute("id", "JSTrackerCCEle");
            a.setAttribute("src", "//g.alicdn.com/ccc/bird-jstracker/1.0.2/jstracker.js");
            i.appendChild(a);
            return a
        }, jsTarckerSend: function (e) {
            var i = this;
            try {
                if (e) {
                    if (i.arg.debug) {
                        e.debug = true
                    }
                    jsTrackerSendArr.push(e)
                }
                if (window.JSTrackerCC && jsTrackerSendArr.length > 0) {
                    for (var a = 0, s = jsTrackerSendArr.length; a < s; a++) {
                        JSTrackerCC.send(jsTrackerSendArr[a])
                    }
                    jsTrackerSendArr = []
                } else {
                    if (d("#JSTrackerCCEle").length == 0) {
                        var t = i.loadJsTracker();
                        t.onload = t.onreadystatechange = function () {
                            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
                                i.jsTarckerSend()
                            }
                        }
                    }
                }
            } catch (r) {
            }
        }
    });
    return D
}, {requires: ["node", "io", "kg/xtemplate/4.3.0/", "kg/overlay/6.1.3/", "event", "address-detail/wlroute.css"]});