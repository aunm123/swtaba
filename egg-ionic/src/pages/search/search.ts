import {Component, SimpleChanges, NgZone, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";
import {DetailPage} from "../detail/detail";

declare let $: any;

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-search',
    templateUrl: 'search.html',
})
export class SearchPage {

    searchitems: Array<any> = [];
    currentPage: number = 1;
    searchkey: string = "";
    volumnSort: string = "";
    priceSort: string = "";
    mSort: string = "";
    showList: boolean = false;
    dropload: any;
    @ViewChild("list") list;

    constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService, private zone: NgZone) {
    }

    ionViewDidLoad() {}

    /**
     * 获取搜索商品
     */
    getSearchProduct() {

        let self = this;
        this.dropload = $('#search .scroll-content').dropload({
            scrollArea: $('#search .scroll-content'),
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
    }

    loadData(page, dropload){

        let params = {
            categoryid: 0,
            page: this.currentPage, // 当前页
            pageSize: 20, // 每页显示个数
            q: this.appService.encodeSearchKey(this.searchkey),
            v: this.volumnSort, p: this.priceSort, m: this.mSort
        };
        this.appService.httpGet(AppGlobal.API.getSearchUrl, params, res => {
            this.currentPage = page+1;

            this.list.success(res.data, page);
            if (res.data >= res.total) {
                dropload.lock();
                dropload.noData();
            }
            setTimeout(function () {
                dropload.resetload();
                $('#search img.lazy').lazyload({
                    container: $("#search .search-list")
                });
            }, 500)

        })
    }


    gotoDetailPage(itemid) {
        this.navCtrl.push(DetailPage, {
            itemid: itemid
        })
    }

    searchAction(keyword) {
        this.showList = true;
        if (!this.dropload){
            this.getSearchProduct();
        }
        this.searchkey = keyword;
        this.searchitems = [];
        let self = this;
        setTimeout(function () {
            self.currentPage = 1;
            self.dropload.resetload();
        });
    }

    showPlan() {
        this.showList = false;
    }

    black() {
        this.navCtrl.pop();
    }

    reProps({v, p, m}) {
        this.volumnSort = v;
        this.priceSort = p;
        this.mSort = m;
        let self = this;
        setTimeout(function () {
            self.currentPage = 1;
            self.dropload.resetload();
        });
    }

}
