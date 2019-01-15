webpackJsonp([4],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_swiper__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_detail_detail__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_top_sell_top_sell__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_search_search__ = __webpack_require__(103);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, appService, zone) {
        this.navCtrl = navCtrl;
        this.appService = appService;
        this.zone = zone;
        this.topsell = [];
        this.currentPage = 1;
    }
    HomePage.prototype.ionViewDidLoad = function () {
        new __WEBPACK_IMPORTED_MODULE_3_swiper__["a" /* default */]('#swiper-container', {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
        });
        this.getTopSell();
        this.topSellProductInit();
    };
    /**
     * 获取热销分类
     */
    HomePage.prototype.getTopSell = function () {
        var _this = this;
        var params = { topid: "0" };
        this.appService.httpGet(__WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppGlobal */].API.getTopSell, params, function (res) {
            _this.topsell = res.data.top;
        });
    };
    /**
     * 获取热销商品
     */
    HomePage.prototype.topSellProductInit = function () {
        var self = this;
        var dropload = $('#home .scroll-content').dropload({
            scrollArea: $('#home .scroll-content'),
            domDown: {
                domClass: 'dropload-down',
                domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData: '<div class="dropload-noData">数据已经加载完毕</div>'
            },
            loadDownFn: function (me) {
                var params = {
                    categoryid: 0,
                    page: self.currentPage,
                    pageSize: 20
                };
                self.appService.httpGet(__WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppGlobal */].API.getTopData, params, function (res) {
                    self.currentPage++;
                    self.list.success(res.data, self.currentPage);
                    if (res.data >= res.total) {
                        me.lock();
                        me.noData();
                    }
                    setTimeout(function () {
                        me.resetload();
                        $('#home img.lazy').lazyload({
                            container: $("#home .waterfall-list")
                        });
                    }, 500);
                });
            },
        });
    };
    HomePage.prototype.gotoDetailPage = function (itemid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_detail_detail__["a" /* DetailPage */], {
            itemid: itemid
        });
    };
    HomePage.prototype.gotoCategory = function (categoryid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_top_sell_top_sell__["a" /* TopSellPage */], {
            categoryid: categoryid
        });
    };
    HomePage.prototype.gotoSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_search_search__["a" /* SearchPage */], {});
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("list"),
        __metadata("design:type", Object)
    ], HomePage.prototype, "list", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/pages/home/home.html"*/'<ion-content id="home" style="background-color: #f8f8f8">\n\n  <div class="main " id="homepage">\n\n    <div class="page-header">\n      <div class="logo-div">\n        <div style="display: none" class="logo"></div>\n      </div>\n      <div class="search-input" (click)="gotoSearch()">\n        <span class="search_icon"></span>\n        <span class="input_value">中长款风衣 女</span>\n      </div>\n    </div>\n\n    <div class="swiper-container" id="swiper-container">\n      <div class="swiper-wrapper">\n        <div class="swiper-slide">\n          <a href="javascript:;">\n            <img src="assets/imgs/banner/1.jpg">\n          </a>\n        </div>\n        <div class="swiper-slide">\n          <a href="javascript:;">\n            <img src="assets/imgs/banner/2.jpg">\n          </a>\n        </div>\n        <div class="swiper-slide">\n          <a href="javascript:;">\n            <img src="assets/imgs/banner/3.jpg">\n          </a>\n        </div>\n      </div>\n    </div>\n    <div class="swiper-pagination"></div>\n\n    <!--热销分类 -->\n    <div class="category-div">\n      <div class="top-sell" *ngFor="let item of topsell">\n        <a class="item" href="javascript:;" (click)="gotoCategory(item.id)">\n          <i class="iconfont {{ item.icon }}" [ngStyle]="{ \'background-color\' : item.color}"></i>\n          <span>{{ item.cName }}</span>\n        </a>\n      </div>\n    </div>\n\n    <!--销量最高-->\n    <div data-mxview="atb_like">\n      <div class="">\n        <h3 class="atb_like_title">销量最高</h3>\n\n        <list #list [startPage]="1">\n          <ng-template let-listData="listData">\n\n            <div class="waterfall-item" *ngFor="let item of listData">\n              <a href="javascript:;" (click)="gotoDetailPage(item.numIid)">\n                <div>\n                  <img class="img lazy"\n                       [attr.data-original]="item.pictUrl"\n                       src="assets/imgs/loading.gif">\n                </div>\n                <div class="info">\n                  <h3 class="title">{{item.title}}</h3>\n                  <p class="priceInfo" style="padding-bottom: 0;padding: 0 8px;">\n                    <span class="yen">¥</span>\n                    <span class="price">{{ ((item.zkFinalPrice)/100.0 - item.couponAmount).toFixed(2) }}</span>\n                    <span class="yen line-through" style="margin-left: 5px;">¥</span>\n                    <span class="price line-through extra-price">{{ ((item.zkFinalPrice)/100.0).toFixed(2) }}</span>\n                  </p>\n                  <p class="priceInfo"\n                     style="display: flex;align-items: center;padding: 0 8px;padding-bottom: 8px;">\n                    <span style="font-size: 13px;padding: 0 5px;border: 1px solid #ff5000;color: #ff5000;">{{ item.couponInfo }}</span>\n                  </p>\n                </div>\n              </a>\n            </div>\n\n          </ng-template>\n        </list>\n\n      </div>\n    </div>\n\n  </div>\n\n</ion-content>\n\n<go-top></go-top>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _c || Object])
    ], HomePage);
    return HomePage;
    var _a, _b, _c;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopSellPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iscroll__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_iscroll___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_iscroll__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__detail_detail__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the TopSellPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TopSellPage = /** @class */ (function () {
    function TopSellPage(navCtrl, navParams, appService, zone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.zone = zone;
        this.topsellCat = [];
        this.currentPage = 0;
        var win_width = $(window).width();
        $('#headimg').css('min-height', win_width / 375.0 * 150.0);
        this.topid = navParams.get('categoryid');
    }
    TopSellPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    TopSellPage.prototype.ionViewDidLoad = function () {
        this.getTopSellCatData();
        this.topSellProductInit();
    };
    TopSellPage.prototype.getTopSellCatData = function () {
        var _this = this;
        var params = { parentid: this.topid };
        this.appService.httpGet(__WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppGlobal */].API.getTopSell, params, function (res) {
            _this.topsellCat = res.data.top;
            if (_this.topsellCat.length > 0 && _this.topsellCat[0].parentid == _this.topid) {
                _this.topid = _this.topsellCat[0].id;
            }
            var self = _this;
            setTimeout(function () {
                if (self.topsellCat && self.topsellCat.length > 0) {
                    new __WEBPACK_IMPORTED_MODULE_3_iscroll___default.a('#header-nav', { scrollX: true, scrollY: false, freeScroll: true, click: true });
                }
            });
        });
    };
    /**
     * 获取热销商品
     */
    TopSellPage.prototype.topSellProductInit = function () {
        var self = this;
        this.dropload = $('#topsell .scroll-content').dropload({
            scrollArea: $('#topsell .scroll-content'),
            domDown: {
                domClass: 'dropload-down',
                domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                domNoData: '<div class="dropload-noData">数据已经加载完毕</div>'
            },
            loadDownFn: function (me) {
                self.loadData(self.currentPage, me);
            },
        });
    };
    TopSellPage.prototype.loadData = function (page, dropload) {
        var _this = this;
        var params = {
            topid: this.topid, page: page
        };
        this.appService.httpGet(__WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppGlobal */].API.getTopProductData2, params, function (res) {
            var size = res.length;
            _this.currentPage = page + 1;
            var tempResult = [];
            res.forEach(function (item) {
                item["final_price"] = (parseFloat(item.zk_final_price) - parseFloat(item.coupon_amount)).toFixed(2);
                item["zk_final_price"] = (parseFloat(item.zk_final_price)).toFixed(2);
                tempResult.push(item);
            });
            _this.list.success(tempResult, page);
            if (size < 20) {
                dropload.lock();
                dropload.noData();
            }
            setTimeout(function () {
                dropload.resetload();
                $('#topsell img.lazy').lazyload({
                    container: $("#topsell .waterfall-list")
                });
            }, 500);
        });
    };
    TopSellPage.prototype.selectCate = function (categoryid) {
        this.topid = categoryid;
        this.list.empty(this.dropload);
        var self = this;
        setTimeout(function () {
            self.currentPage = 1;
            self.dropload.resetload();
        });
    };
    TopSellPage.prototype.selectItem = function (itemid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__detail_detail__["a" /* DetailPage */], {
            itemid: itemid
        });
    };
    TopSellPage.prototype.ionScroll = function () {
        var scroH = this.content.scrollTop;
        if (scroH >= 180) {
            $('.toolbar').addClass('nv');
        }
        else {
            $('.toolbar').removeClass('nv');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("list"),
        __metadata("design:type", Object)
    ], TopSellPage.prototype, "list", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]) === "function" && _a || Object)
    ], TopSellPage.prototype, "content", void 0);
    TopSellPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-top-sell',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/pages/top-sell/top-sell.html"*/'<header class="toolbar sticky header">\n  <div class="toolbar__btn-wrapper clearfix">\n    <div class="toolbar__btn toolbar__back">\n      <a href="javascript:;" (click)="back()">\n        <i class="iconfont icon-back_light"></i>\n      </a>\n    </div>\n  </div>\n</header>\n\n\n<ion-content id="topsell" style="background-color: #f8f8f8" (ionScroll)="ionScroll()">\n\n  <div>\n    <img style="width: 100vw;min-height: 150px" id="headimg"\n         src="https://gw.alicdn.com/tfs/TB1R.cskfDH8KJjy1XcXXcpdXXa-750-300.jpg_q75.jpg" alt="">\n    <div class="header-nav-con" *ngIf="topsellCat && topsellCat.length > 0">\n      <div class="header-nav" id="header-nav" style="touch-action: none;">\n        <ul class="header-nav-list">\n\n          <li class="header-nav-item " [ngClass]="topid==item.id?\'select\':\'\'" *ngFor="let item of topsellCat">\n            <a href="javascript:;" (tap)="selectCate(item.id)">\n              <span>{{item.cName}}</span>\n            </a>\n          </li>\n\n        </ul>\n      </div>\n    </div>\n  </div>\n\n  <div data-mxview="atb_like">\n    <div class="" style="padding-top: 8px;">\n\n      <list #list>\n        <ng-template let-listData="listData">\n\n          <div class="waterfall-item" *ngFor="let item of listData">\n            <a href="javascript:;" (tap)="selectItem(item.item_id)">\n              <div>\n                <img class="img lazy"\n                     [attr.data-original]="item.pict_url"\n                     src="assets/imgs/loading.gif">\n              </div>\n              <div class="info">\n                <h3 class="title">{{item.title}}</h3>\n                <h3 class="title" style="color: #f47920; border: 1px solid #ff5000;padding: 3px;margin: 7px;" *ngIf="item.item_description">\n                  {{item.item_description}}\n                </h3>\n                <div class="priceInfo" style="padding-bottom: 8px;">\n                  <div class="coupon-icon">\n                    <span class="coupon-icon-left">券</span>\n                    <span class="coupon-icon-right">{{item.coupon_amount}}元</span>\n                  </div>\n\n                  <div style="padding: 0 8px;">\n                    <span class="yen">¥</span><span class="price">{{item.final_price}}</span>\n                    <span class="yen line-through" style="margin-left: 2px;">¥</span><span\n                    class="price line-through extra-price">{{item.zk_final_price}}</span>\n                  </div>\n                </div>\n              </div>\n            </a>\n          </div>\n\n        </ng-template>\n      </list>\n\n    </div>\n  </div>\n\n</ion-content>\n\n<go-top></go-top>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/pages/top-sell/top-sell.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _e || Object])
    ], TopSellPage);
    return TopSellPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=top-sell.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, appService, zone) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appService = appService;
        this.zone = zone;
        this.searchitems = [];
        this.currentPage = 0;
        this.searchkey = "";
        this.volumnSort = "";
        this.priceSort = "";
        this.mSort = "";
        this.showList = false;
    }
    SearchPage.prototype.ionViewDidLoad = function () { };
    /**
     * 获取搜索商品
     */
    SearchPage.prototype.getSearchProduct = function (infiniteScroll) {
        var _this = this;
        var page = this.currentPage + 1;
        var showLoading = false;
        if (infiniteScroll == null) {
            page = 1;
            showLoading = true;
        }
        ;
        var params = {
            categoryid: 0,
            page: page,
            pageSize: 20,
            q: decodeURI(this.searchkey),
            v: this.volumnSort, p: this.priceSort, m: this.mSort
        };
        this.appService.httpGet(__WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppGlobal */].API.getSearchUrl, params, function (res) {
            _this.currentPage = page;
            if (page == 1) {
                _this.searchitems = res.data;
            }
            else {
                _this.searchitems = _this.searchitems.concat(res.data);
            }
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
            if (_this.searchitems.length >= res.total) {
                if (infiniteScroll) {
                    infiniteScroll.enable(false);
                    _this.appService.toast("数据加载结束");
                    return;
                }
            }
            _this.zone.run(function () {
                setTimeout(function () {
                    $('img.lazy').lazyload({
                        container: $(".search-list")
                    });
                }, 1000);
            });
        }, showLoading);
    };
    SearchPage.prototype.gotoDetailPage = function (itemid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], {
            itemid: itemid
        });
    };
    SearchPage.prototype.searchAction = function (keyword) {
        console.log(keyword);
        this.showList = true;
        this.searchkey = keyword;
        this.searchitems = [];
        this.getSearchProduct(null);
    };
    SearchPage.prototype.showPlan = function () {
        this.showList = false;
    };
    SearchPage.prototype.black = function () {
        this.navCtrl.pop();
    };
    SearchPage.prototype.reProps = function (_a) {
        var v = _a.v, p = _a.p, m = _a.m;
        this.volumnSort = v;
        this.priceSort = p;
        this.mSort = m;
        this.getSearchProduct(null);
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/pages/search/search.html"*/'<ion-header>\n  <ion-toolbar style="padding: 0;background-color: #F0F0F0;">\n    <search-bar (searchAction)="searchAction($event)" (showPlan)="showPlan()" (black)="black()"></search-bar>\n    <search-sort *ngIf="showList" [m]="mSort" [v]="volumnSort" [p]="priceSort" (reProps)="reProps($event)">\n    </search-sort>\n  </ion-toolbar>\n</ion-header>\n\n\n\n<ion-content>\n\n  <search-plan *ngIf="!showList"></search-plan>\n  <div *ngIf="showList" style="padding-top: 38px;">\n    <div class="module list-content">\n      <div class="search-list" style="overflow: hidden">\n        <div class="search-item" *ngFor="let item of searchitems">\n          <a href="javascript:;" (click)="gotoDetailPage(item.numIid)">\n            <img class="img lazy"\n                 [attr.data-original]="item.pictUrl"\n                 src="assets/imgs/loading.gif">\n            <div class="info" style="flex: 1;">\n              <h3 class="title">{{item.title}}</h3>\n              <p class="priceInfo" style="padding-bottom: 0;">\n                <span class="yen" style="color: red;">¥</span>\n                <span class="price" style="color: red;font-weight: 700;font-size: 20px;margin-left: -2px;">\n                        {{ ((item.reservePrice)/100.0 - item.couponAmount).toFixed(2) }}\n                    </span>\n                <span class="yen line-through" style="margin-left: 5px;">¥</span>\n                <span class="price line-through extra-price">{{ ((item.reservePrice)/100.0).toFixed(2) }}</span>\n              </p>\n              <p class="priceInfo" style="display: flex;align-items: center;">\n                <!--<i class="iconfont icon-wodeyouhuijuan" style="margin-right: 7px"></i>-->\n                <span style="    font-size: 13px;padding: 0 5px;border: 1px solid #ff5000;color: #ff5000;">{{ item.couponInfo }}</span>\n              </p>\n\n              <p class="pbottom">\n                <span class="left">{{item.provcity}}</span>\n                <span class="right">月销量：{{item.volume}}</span>\n              </p>\n            </div>\n          </a>\n        </div>\n      </div>\n\n    </div>\n\n    <ion-infinite-scroll (ionInfinite)="getSearchProduct($event)">\n      <ion-infinite-scroll-content loadingSpinner="crescent" loadingText="加载中..." position="bottom" >\n      </ion-infinite-scroll-content>\n    </ion-infinite-scroll>\n  </div>\n\n\n</ion-content>\n\n<go-top></go-top>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 154:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/detail/detail.module": [
		285,
		3
	],
	"../pages/home/home.module": [
		286,
		2
	],
	"../pages/search/search.module": [
		287,
		1
	],
	"../pages/top-sell/top-sell.module": [
		288,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 154;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(223);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_search_search__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_components_module__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_top_sell_top_sell__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_top_sell_top_sell__["a" /* TopSellPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/detail/detail.module#DetailPageModule', name: 'DetailPage', segment: 'detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/top-sell/top-sell.module#TopSellPageModule', name: 'TopSellPage', segment: 'top-sell', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_top_sell_top_sell__["a" /* TopSellPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_7__app_service__["b" /* AppService */], __WEBPACK_IMPORTED_MODULE_7__app_service__["a" /* AppGlobal */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(101);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/app/app.html"*/'<ion-nav [root]="rootPage" data-drag-delay="100"></ion-nav>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _c || Object])
    ], MyApp);
    return MyApp;
    var _a, _b, _c;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_bar_search_bar__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_sort_search_sort__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__short_url_short_url__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__detail_content_detail_content__ = __webpack_require__(280);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__img_lazy_load_img_lazy_load__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__go_top_go_top__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__search_plan_search_plan__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__list_list__ = __webpack_require__(284);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__search_bar_search_bar__["a" /* SearchBarComponent */],
                __WEBPACK_IMPORTED_MODULE_2__search_sort_search_sort__["a" /* SearchSortComponent */],
                __WEBPACK_IMPORTED_MODULE_3__short_url_short_url__["a" /* ShortUrlComponent */],
                __WEBPACK_IMPORTED_MODULE_5__detail_content_detail_content__["a" /* DetailContentComponent */],
                __WEBPACK_IMPORTED_MODULE_6__img_lazy_load_img_lazy_load__["a" /* ImgLazyLoadComponent */],
                __WEBPACK_IMPORTED_MODULE_7__go_top_go_top__["a" /* GoTopComponent */],
                __WEBPACK_IMPORTED_MODULE_8__search_plan_search_plan__["a" /* SearchPlanComponent */],
                __WEBPACK_IMPORTED_MODULE_10__list_list__["a" /* ListComponent */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_4__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["a" /* FormsModule */]
            ],
            exports: [__WEBPACK_IMPORTED_MODULE_1__search_bar_search_bar__["a" /* SearchBarComponent */],
                __WEBPACK_IMPORTED_MODULE_2__search_sort_search_sort__["a" /* SearchSortComponent */],
                __WEBPACK_IMPORTED_MODULE_3__short_url_short_url__["a" /* ShortUrlComponent */],
                __WEBPACK_IMPORTED_MODULE_5__detail_content_detail_content__["a" /* DetailContentComponent */],
                __WEBPACK_IMPORTED_MODULE_6__img_lazy_load_img_lazy_load__["a" /* ImgLazyLoadComponent */],
                __WEBPACK_IMPORTED_MODULE_7__go_top_go_top__["a" /* GoTopComponent */],
                __WEBPACK_IMPORTED_MODULE_8__search_plan_search_plan__["a" /* SearchPlanComponent */],
                __WEBPACK_IMPORTED_MODULE_10__list_list__["a" /* ListComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 277:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the SearchBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SearchBarComponent = /** @class */ (function () {
    function SearchBarComponent(appService) {
        this.appService = appService;
        this.hasSelect = false;
        this.searchAction = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.showPlan = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.black = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    SearchBarComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        $('#search-input').on('keypress', function (event) {
            if (event.keyCode == 13) {
                self.searchAction.emit(self.searchkeyWord);
            }
        });
        $('#search-input').on('focus', function () {
            self.showPlan.emit();
            self.keywordChange();
            self.hasSelect = true;
        });
        $('#search-input').on('blur', function () {
            self.hasSelect = false;
            setTimeout(function () {
                if (!$('#search-input').is(":focus")) {
                    $('.search-head-list ul').html('');
                }
            }, 100);
        });
        $('#search-input').on('input', function () {
            self.keywordChange();
        });
        window["setKeyWord"] = function (value) {
            console.log(value);
            $('#search-input').val(value);
            $('#search-input').focus();
            self.keywordChange();
        };
    };
    SearchBarComponent.prototype.doblack = function () {
        this.black.emit();
    };
    SearchBarComponent.prototype.doSearchAction = function () {
        $('.search-head-list ul').html('');
        this.searchkeyWord = $('#search-input').val();
        this.searchAction.emit(this.searchkeyWord);
    };
    SearchBarComponent.prototype.clearBtnPress = function () {
        $('#search-input').val('');
        $('.search-head-list ul').html('');
        $('#search-input').focus();
        return;
    };
    SearchBarComponent.prototype.keywordChange = function () {
        var _this = this;
        var k = $('#search-input').val();
        if (k.length <= 0) {
            $('.search-head-list ul').html('');
            return;
        }
        var params = { key: k };
        this.appService.httpPost(__WEBPACK_IMPORTED_MODULE_1__app_app_service__["a" /* AppGlobal */].API.getSearchkey, params, function (res) {
            var newk = $('#search-input').val();
            if (newk.length <= 0) {
                $('.search-head-list ul').html('');
                return;
            }
            if (k != newk) {
                return;
            }
            if (!_this.hasSelect) {
                $('.search-head-list ul').html('');
                return;
            }
            var result = '';
            for (var i = 0; i < res.length; i++) {
                var item = res[i];
                result += '<li><a onclick="setKeyWord(\'' + item[0] + '\')"><i class="iconfont icon-search search-icon"></i>'
                    + item[0] + '</a></li>';
            }
            $('.search-head-list ul').html(result);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], SearchBarComponent.prototype, "searchAction", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], SearchBarComponent.prototype, "showPlan", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */])
    ], SearchBarComponent.prototype, "black", void 0);
    SearchBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'search-bar',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/search-bar/search-bar.html"*/'<header class="search-head">\n  <div class="search-content">\n    <a href="javascript:;" class="btn" (click)="doblack()">\n      <i class="iconfont icon-back_light"></i>\n    </a>\n    <i class="iconfont icon-search search-icon"></i>\n    <input id="search-input" class="search-input" type="text" autocomplete="off" [(ngModel)]="searchkeyWord">\n    <a href="javascript:;" class="btn" (click)="doSearchAction()" >\n      搜索\n    </a>\n    <div class="clear-btn" (click)="clearBtnPress()">\n      <i class="iconfont icon-clear search-icon" style="float:right"></i>\n    </div>\n  </div>\n  <div class="search-head-list">\n    <ul></ul>\n  </div>\n</header>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/search-bar/search-bar.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_app_service__["b" /* AppService */]])
    ], SearchBarComponent);
    return SearchBarComponent;
}());

//# sourceMappingURL=search-bar.js.map

/***/ }),

/***/ 278:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchSortComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the SearchSortComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SearchSortComponent = /** @class */ (function () {
    function SearchSortComponent() {
        this.v = "";
        this.p = "";
        this.m = "";
        this.reProps = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    SearchSortComponent.prototype.selectChange = function () {
        $('.select').removeClass('select');
        if (this.p) {
            if (this.p == 'a') {
                $('#price1').addClass('select');
            }
            else {
                $('#price2').addClass('select');
            }
            return;
        }
        if (this.v) {
            $('#sell').addClass('select');
        }
        else {
            $('#normal').addClass('select');
        }
    };
    SearchSortComponent.prototype.normalsort = function () {
        this.v = "";
        this.p = "";
        this.m = "";
        this.reProps.emit({ v: this.v, p: this.p, m: this.m });
        this.selectChange();
    };
    SearchSortComponent.prototype.sellsort = function () {
        this.v = "d";
        this.p = "";
        this.m = "";
        this.reProps.emit({ v: this.v, p: this.p, m: this.m });
        this.selectChange();
    };
    SearchSortComponent.prototype.pricesort = function (p_sort) {
        this.v = "";
        this.p = p_sort;
        this.m = "";
        this.reProps.emit({ v: this.v, p: this.p, m: this.m });
        this.selectChange();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], SearchSortComponent.prototype, "v", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], SearchSortComponent.prototype, "p", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], SearchSortComponent.prototype, "m", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]) === "function" && _a || Object)
    ], SearchSortComponent.prototype, "reProps", void 0);
    SearchSortComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'search-sort',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/search-sort/search-sort.html"*/'<div class="module list-sort" data-module="category" data-mode="category-mode10">\n  <div class="category clear"\n       style="background-color: rgb(255, 255, 255); position: relative; top: 0px;">\n    <ul class="category-wrap clear">\n      <li class="select" id="normal">\n        <a href="javascript:void(0)" data-tab="综合排序" (click)="normalsort()">\n          默认排序\n        </a>\n      </li>\n      <li id="sell">\n        <a href="javascript:void(0)" data-tab="销量" (click)="sellsort()">\n          月销量\n        </a>\n      </li>\n      <li id="price1">\n        <a href="javascript:void(0)" data-tab="价格从低到高" (click)="pricesort(\'a\')">\n          价格 <i class="iconfont icon-up" style="margin-left: 5px;font-size: 10px;"></i>\n        </a>\n      </li>\n      <li id="price2">\n        <a href="javascript:void(0)" data-tab="价格从高到低" (click)="pricesort(\'d\')">\n          价格 <i class="iconfont icon-down" style="margin-left: 5px;font-size: 10px;"></i>\n        </a>\n      </li>\n    </ul>\n\n  </div>\n</div>\n<!--style="position: fixed;left: 0;right: 0;"-->\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/search-sort/search-sort.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], SearchSortComponent);
    return SearchSortComponent;
    var _a;
}());

//# sourceMappingURL=search-sort.js.map

/***/ }),

/***/ 279:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShortUrlComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_app_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ShortUrlComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ShortUrlComponent = /** @class */ (function () {
    function ShortUrlComponent(appService) {
        this.appService = appService;
        this.short_url = "";
        this.itemDetail = null;
        var clipboard = new ClipboardJS('.keycopy', {
            text: function () {
                return this.short_url;
            }
        });
        clipboard.on('success', function (e) {
            $('.code').addClass('select');
            $('.keycopy')[0].innerText = "已复制";
        });
        // this.getShortUrl();
    }
    ShortUrlComponent.prototype.ngOnChanges = function (changes) {
        if (changes['itemDetail'].previousValue !== changes['itemDetail'].currentValue) {
            if (this.itemDetail["couponClickUrl"]) {
                this.getShortUrl();
            }
        }
    };
    ShortUrlComponent.prototype.getShortUrl = function () {
        var _this = this;
        var params = {
            itemid: this.itemDetail["itemId"],
            url: this.itemDetail["couponClickUrl"],
            text: this.itemDetail["title"],
            logo: this.itemDetail["pictUrl"]
        };
        this.appService.httpGet(__WEBPACK_IMPORTED_MODULE_1__app_app_service__["a" /* AppGlobal */].API.getShortUrl, params, function (res) {
            _this.short_url = res.data.shorturl;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], ShortUrlComponent.prototype, "itemDetail", void 0);
    ShortUrlComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'short-url',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/short-url/short-url.html"*/'<div class="module" *ngIf="short_url">\n  <div class="details-mode5" style="margin-top:0px;margin-bottom:5px;">\n    <div class="details-code">\n      <div class="code">\n        <span class="code" id="details-mode5-code">{{short_url}}</span>\n        <button class="keycopy">一键复制</button>\n      </div>\n    </div>\n    <p class="details-desp">复制上方淘口令，打开手机淘宝购买</p>\n  </div>\n\n</div>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/short-url/short-url.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__app_app_service__["b" /* AppService */]])
    ], ShortUrlComponent);
    return ShortUrlComponent;
}());

//# sourceMappingURL=short-url.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailContentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the DetailContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var DetailContentComponent = /** @class */ (function () {
    function DetailContentComponent() {
    }
    DetailContentComponent.prototype.ngOnChanges = function (changes) {
        if (typeof (changes['content'].previousValue) !== typeof (changes['content'].currentValue)) {
            setTimeout(function () {
                $("img").each(function (index, item) {
                    var data_src = $(item).attr('data-src');
                    var src = $(item).attr('src');
                    if (data_src) {
                        data_src = data_src.replace('_.webp', "");
                        $(item).attr('data-src', data_src);
                    }
                    if (src) {
                        src = src.replace('_.webp', "");
                        $(item).attr('src', src);
                    }
                });
                $("img").each(function (index, item) {
                    var data_src = $(item).attr('data-ks-lazyload');
                    var src = $(item).attr('src');
                    if (data_src) {
                        data_src = data_src.replace('_.webp', "");
                        $(item).attr('data-ks-lazyload', data_src);
                    }
                    if (src) {
                        src = src.replace('_.webp', "");
                        $(item).attr('src', src);
                    }
                });
                $('img').lazyload({
                    data_attribute: 'ks-lazyload',
                    effect: 'fadeIn',
                    threshold: 180,
                    container: $("#des-con")[0],
                });
                $('img').lazyload({
                    data_attribute: 'src',
                    effect: 'fadeIn',
                    threshold: 180,
                    container: $("#des-con")[0],
                });
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], DetailContentComponent.prototype, "content", void 0);
    DetailContentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'detail-content',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/detail-content/detail-content.html"*/'<div class="tshop-psm" style="background-color: white" *ngIf="content">\n  <div class="desc-title">\n    <i class="icon iconfont desc-title-icon icon-piclight" aria-hidden="true"></i>\n    商品详情\n  </div>\n  <div id="des-con" [innerHTML]="content"></div>\n</div>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/detail-content/detail-content.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], DetailContentComponent);
    return DetailContentComponent;
}());

//# sourceMappingURL=detail-content.js.map

/***/ }),

/***/ 281:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImgLazyLoadComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ImgLazyLoadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ImgLazyLoadComponent = /** @class */ (function () {
    function ImgLazyLoadComponent() {
        this.default = 'assets/imgs/loading.gif';
    }
    ImgLazyLoadComponent.prototype.ngOnInit = function () {
        var _this = this;
        var img = new Image();
        img.src = this.src;
        img.onload = function () {
            _this.default = _this.src;
        };
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", String)
    ], ImgLazyLoadComponent.prototype, "src", void 0);
    ImgLazyLoadComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'img-lazy-load',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/img-lazy-load/img-lazy-load.html"*/'<img src="{{default}}" alt="">\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/img-lazy-load/img-lazy-load.html"*/
        })
    ], ImgLazyLoadComponent);
    return ImgLazyLoadComponent;
}());

//# sourceMappingURL=img-lazy-load.js.map

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoTopComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the GoTopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var GoTopComponent = /** @class */ (function () {
    function GoTopComponent() {
    }
    GoTopComponent.prototype.ngAfterViewInit = function () {
        $(".scroll-content").scroll(function () {
            if ($(this).scrollTop() > 500) {
                $(".am-gotop").fadeIn();
            }
            else {
                $(".am-gotop").fadeOut();
            }
        });
        $('.am-gotop a').click(function () {
            $('.scroll-content').animate({ scrollTop: 0 }, 'slow');
        });
    };
    GoTopComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'go-top',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/go-top/go-top.html"*/'<!-- 返回顶部 -->\n<div class="am-gotop" style="display: none;z-index: 999;">\n  <a class="fq-top">\n    <i class="iconfont icon-top"></i>\n  </a>\n</div>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/go-top/go-top.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], GoTopComponent);
    return GoTopComponent;
}());

//# sourceMappingURL=go-top.js.map

/***/ }),

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPlanComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the SearchPlanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SearchPlanComponent = /** @class */ (function () {
    function SearchPlanComponent() {
    }
    SearchPlanComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'search-plan',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/search-plan/search-plan.html"*/'<div id="hot">\n  <div id="J_SEARCH_HISTORY">\n    <h1 class="search-title">\n      历史搜索\n      <span class="clear-cache" ><i class="icon-delete"></i>清除记录</span>\n    </h1>\n    <section id="history-words" data-spm="8001" class="search-list-keys">\n    </section>\n  </div>\n  <div id="J_SEARCH_KGB">\n    <h1 class="search-title">热门搜索</h1>\n    <section data-spm="8002" class="search-list-keys">\n\n      <!--<% hotkeywords.forEach(function(item){ %>-->\n      <!--<a href="/search?q=<%= item %>" class="item"><%= item %></a>-->\n      <!--<% }); %>-->\n\n    </section>\n  </div>\n</div>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/search-plan/search-plan.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], SearchPlanComponent);
    return SearchPlanComponent;
}());

//# sourceMappingURL=search-plan.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var ListComponent = /** @class */ (function () {
    function ListComponent() {
        this.startPage = 0;
        this.listArray = { listData: [] };
    }
    ListComponent.prototype.success = function (topSp, page) {
        if (page == this.startPage) {
            this.listArray.listData = topSp;
        }
        else {
            this.listArray.listData = this.listArray.listData.concat(topSp);
        }
    };
    ListComponent.prototype.empty = function (dropload) {
        this.listArray.listData = [];
        dropload.noData(false);
        dropload.unlock();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Number)
    ], ListComponent.prototype, "startPage", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["q" /* ContentChild */])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* TemplateRef */]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* TemplateRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* TemplateRef */]) === "function" && _a || Object)
    ], ListComponent.prototype, "wlist", void 0);
    ListComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'list',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/list/list.html"*/'<div class="waterfall" id="like-list-con">\n\n  <div class="waterfall-list">\n\n    <ng-container *ngTemplateOutlet="wlist; context: listArray"></ng-container>\n\n  </div>\n</div>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/components/list/list.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ListComponent);
    return ListComponent;
    var _a;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppGlobal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AppService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppGlobal = /** @class */ (function () {
    function AppGlobal() {
    }
    //缓存key的配置
    AppGlobal.cache = {
        slides: "_dress_slides",
        categories: "_dress_categories",
        products: "_dress_products",
    };
    //接口基地址
    AppGlobal.domain = "http://212.64.57.254:8080/swtaobao3";
    AppGlobal.porxyUrl = "http://127.0.0.1:3001/api/url";
    AppGlobal.API = {
        // 首页
        getTopData: '/api/top',
        // 商品详细
        getTopDetail: '/api/detail',
        // 商品口令
        getShortUrl: '/api/shorturl',
        // 首页最高销售
        getTopSell: '/api/topsell',
        // 搜索
        getSearchUrl: '/search/se',
        getSearchkey: 'http://127.0.0.1:3001/api/key',
        // 搜索热词
        getSearchHotKeyWord: '/search/hot',
        // 热门销售
        getTopProductData: '/three/top',
        getTopProductData2: 'http://127.0.0.1:3001/three/topproduct',
        // 热门销售分类
        getTopCate: '/three/cate',
    };
    AppGlobal = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AppGlobal);
    return AppGlobal;
}());

var AppService = /** @class */ (function () {
    function AppService(loadingCtrl, alertCtrl, toastCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.globalLoading = null;
    }
    AppService.prototype.handleError = function (error) {
        var msg = '';
        if (error.status == 400) {
            msg = '请求无效(code：404)';
            console.log('请检查参数类型是否匹配');
        }
        if (error.status == 404) {
            msg = '请求资源不存在(code：404)';
            console.error(msg + '，请检查路径是否正确');
        }
        if (error.status == 500) {
            msg = '服务器发生错误(code：500)';
            console.error(msg + '，请检查路径是否正确');
        }
        console.log(error);
        if (msg != '') {
            this.toast(msg);
        }
    };
    /**
     * 参数编码
     * @param params
     * @returns {string}
     */
    AppService.prototype.encode = function (params) {
        var str = '';
        if (params) {
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var value = params[key];
                    str += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
                }
            }
            str = '?' + str.substring(0, str.length - 1);
        }
        return str;
    };
    /**
     * http get 函数
     * @param url
     * @param params
     * @param callback
     * @param {boolean} loader
     */
    AppService.prototype.httpGet = function (pkurl, params, callback, loader) {
        if (loader === void 0) { loader = false; }
        var loading = this.loadingCtrl.create({});
        if (loader) {
            loading.present();
        }
        var resultParams = params;
        resultParams.pkurl = AppGlobal.domain + pkurl;
        resultParams.m = "GET";
        if (pkurl.indexOf('http') >= 0) {
            resultParams.pkurl = pkurl;
        }
        var self = this;
        $.ajax({
            type: 'POST',
            url: AppGlobal.porxyUrl,
            contentType: "application/x-www-form-urlencoded",
            data: resultParams,
            success: function (res) {
                try {
                    var d = res;
                    if (loader) {
                        loading.dismiss();
                    }
                    var result = d == null ? "[]" : d;
                    callback(JSON.parse(result));
                }
                catch (e) {
                    if (loader) {
                        loading.dismiss();
                    }
                    self.handleError(e);
                }
            },
            error: function (error) {
                if (loader) {
                    loading.dismiss();
                }
                self.handleError(error);
            }
        });
    };
    /**
     * http post 函数
     * @param url
     * @param params
     * @param callback
     * @param {boolean} loader
     */
    AppService.prototype.httpPost = function (pkurl, params, callback, loader) {
        if (loader === void 0) { loader = false; }
        var loading = this.loadingCtrl.create();
        if (loader) {
            loading.present();
        }
        var resultParams = params;
        resultParams.pkurl = AppGlobal.domain + pkurl;
        resultParams.m = "POST";
        if (pkurl.indexOf('http') >= 0) {
            resultParams.pkurl = pkurl;
        }
        var self = this;
        $.ajax({
            type: 'POST',
            url: AppGlobal.porxyUrl,
            contentType: "application/x-www-form-urlencoded",
            data: resultParams,
            success: function (res) {
                var d = res;
                if (loader) {
                    loading.dismiss();
                }
                var result = d == null ? "[]" : d;
                callback(JSON.parse(result));
            },
            error: function (error) {
                if (loader) {
                    loading.dismiss();
                }
                self.handleError(error);
            }
        });
    };
    /**
     * 全局 Alert
     * @param message
     * @param callback
     */
    AppService.prototype.alert = function (message, callback) {
        if (callback) {
            var alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: [{
                        text: "确定",
                        handler: function (data) {
                            callback();
                        }
                    }]
            });
            alert.present();
        }
        else {
            var alert = this.alertCtrl.create({
                title: '提示',
                message: message,
                buttons: ["确定"]
            });
            alert.present();
        }
    };
    /**
     * 全局 Toast
     * @param message
     * @param callback
     */
    AppService.prototype.toast = function (message, callback) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            dismissOnPageChange: true,
        });
        toast.present();
        if (callback) {
            callback();
        }
    };
    /**
     * 全局 显示 Loading
     * @param message
     * @param callback
     */
    AppService.prototype.showLoading = function () {
        if (this.globalLoading == null) {
            this.globalLoading = this.loadingCtrl.create({});
            this.globalLoading.present();
        }
    };
    /**
     * 全局 隐藏 Loading
     * @param message
     * @param callback
     */
    AppService.prototype.hideLoading = function () {
        if (this.globalLoading != null) {
            this.globalLoading.dismissAll();
            this.globalLoading = null;
        }
    };
    /**
     * 设置全局参数
     * @param {string} key
     * @param obj
     */
    AppService.prototype.setItem = function (key, obj) {
        try {
            var json = JSON.stringify(obj);
            window.localStorage[key] = json;
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    };
    /**
     * 获取全局参数
     * @param {string} key
     * @param callback
     */
    AppService.prototype.getItem = function (key, callback) {
        try {
            var json = window.localStorage[key];
            var obj = JSON.parse(json);
            callback(obj);
        }
        catch (e) {
            console.error("window.localStorage error:" + e);
        }
    };
    AppService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ToastController */]) === "function" && _c || Object])
    ], AppService);
    return AppService;
    var _a, _b, _c;
}());

//# sourceMappingURL=app.service.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_swiper__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__ = __webpack_require__(26);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailPage = /** @class */ (function () {
    function DetailPage(navCtrl, navParams, sanitizer, appService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sanitizer = sanitizer;
        this.appService = appService;
        this.data = {};
        var itemid = navParams.get('itemid');
        this.getItemDetail(itemid);
    }
    DetailPage.prototype.back = function () {
        this.navCtrl.pop();
    };
    DetailPage.prototype.getItemDetail = function (itemid) {
        var _this = this;
        var params = {
            itemid: itemid,
        };
        this.appService.httpGet(__WEBPACK_IMPORTED_MODULE_2__app_app_service__["a" /* AppGlobal */].API.getTopDetail, params, function (res) {
            _this.data = res.data;
            if (_this.data["content"]) {
                _this.contentHtml = _this.sanitizer.bypassSecurityTrustHtml(_this.data["content"]);
            }
            setTimeout(function () {
                new __WEBPACK_IMPORTED_MODULE_3_swiper__["a" /* default */]('#carousel', {
                    pagination: {
                        el: '.dots',
                        type: 'fraction',
                    },
                    direction: 'horizontal',
                });
            });
        }, true);
    };
    DetailPage.prototype.ionScroll = function () {
        var scroH = this.content.scrollTop;
        if (scroH >= 375) {
            $('.toolbar').addClass('nv');
        }
        else {
            $('.toolbar').removeClass('nv');
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], DetailPage.prototype, "content", void 0);
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/pages/detail/detail.html"*/'<header class="toolbar sticky header">\n  <div class="toolbar__btn-wrapper clearfix">\n    <div class="toolbar__btn toolbar__back">\n      <a href="javascript:;" (click)="back()">\n        <i class="iconfont icon-back_light"></i>\n      </a>\n    </div>\n  </div>\n</header>\n\n<ion-content (ionScroll)="ionScroll()">\n\n  <div class="app">\n\n    <div class="carousel" id="carousel">\n      <div class="swiper-wrapper" style="min-width: 100vw;min-height: 100vw;">\n\n        <div data-index="0" *ngIf="data.pictUrl" class="swiper-slide">\n          <img-lazy-load class="mui-lazy slick-image lazy" [src]="data.pictUrl"></img-lazy-load>\n        </div>\n\n        <div [attr.data-index]="i+1" class="swiper-slide" *ngFor="let itemimg of data.smallimg; let i = index">\n          <img-lazy-load class="mui-lazy slick-image lazy" [src]="itemimg.url"></img-lazy-load>\n        </div>\n      </div>\n      <div class="dots"></div>\n    </div>\n\n    <div class="info">\n      <div class="base">\n        <div class="prices-wrapper">\n          <div class="prices">\n            <div class="price-title"></div>\n            <div class="price">{{ ((data.zkFinalPrice)/100.0 - data.couponAmount).toFixed(2) }}</div>\n            <span class="price-tag text" *ngIf="data.couponInfo">{{data.couponInfo}}</span>\n          </div>\n          <div class="extra-price"><p>价格<span class="price-span line-through">￥{{((data.zkFinalPrice)/100.0).toFixed(2)}}</span></p></div>\n          <div class="price-intl"></div>\n          <div class="price-tip"></div>\n        </div>\n        <short-url [itemDetail]="data"></short-url>\n        <div class="title-wrapper"><h2 class="title">{{data.title}}</h2></div>\n        <div class="delivery-box">\n          <span class="delivery-price" *ngIf="data.provcity">货源地：{{ data.provcity }}</span>\n          <span class="month-sold">月销量：{{data.volume}}</span>\n        </div>\n      </div>\n    </div>\n\n    <detail-content [content]="contentHtml"></detail-content>\n\n  </div>\n\n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar style="height: 50px;box-shadow: 0px 1px 10px #dadada;">\n    <div class="bar">\n      <div class="bar-btn-wrapper">\n        <a id="totb" class="bar-btn bar-buynow" href="javascript:;">淘宝领劵</a>\n      </div>\n    </div>\n  </ion-toolbar>\n</ion-footer>\n\n\n<go-top></go-top>\n'/*ion-inline-end:"/Users/tim/Desktop/openSource/swtaba/egg-ionic/src/pages/detail/detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_4__angular_platform_browser__["c" /* DomSanitizer */],
            __WEBPACK_IMPORTED_MODULE_2__app_app_service__["b" /* AppService */]])
    ], DetailPage);
    return DetailPage;
}());

//# sourceMappingURL=detail.js.map

/***/ })

},[200]);
//# sourceMappingURL=main.js.map