import {Component, NgZone, ViewChild} from '@angular/core';
import {NavController, IonicPage} from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";
import Swiper from "swiper"
import {DetailPage} from "../../pages/detail/detail";
import {TopSellPage} from "../../pages/top-sell/top-sell";
import {SearchPage} from "../../pages/search/search";

declare let $: any;
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  topsell: Array<any> = [];
  currentPage: number = 1;
  @ViewChild("list") list;

  constructor(public navCtrl: NavController, public appService: AppService,private zone: NgZone) {
  }

  ionViewDidLoad() {
    new Swiper('#swiper-container', {
      slidesPerView: 1,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
    });
    this.getTopSell();
    this.topSellProductInit();
  }

  /**
   * 获取热销分类
   */
  getTopSell() {
    var params = {topid: "0"};
    this.appService.httpGet(AppGlobal.API.getTopSell, params, res => {
      this.topsell = res.data.top;
    })
  }

  /**
   * 获取热销商品
   */
  topSellProductInit(){
    let self = this;
    var dropload = $('#home .scroll-content').dropload({
      scrollArea: $('#home .scroll-content'),
      domDown: {
        domClass: 'dropload-down',
        domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
        domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
        domNoData: '<div class="dropload-noData">数据已经加载完毕</div>'
      },
      loadDownFn: function (me) {
        let params = {
          categoryid: 0,
          page: self.currentPage,
          pageSize: 20
        };
        self.appService.httpGet(AppGlobal.API.getTopData, params, res => {
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
          },500)

        })
      },
    });
  }

  gotoDetailPage(itemid){
    this.navCtrl.push(DetailPage, {
      itemid: itemid
    })
  }

  gotoCategory(categoryid){
    this.navCtrl.push(TopSellPage, {
      categoryid: categoryid
    })
  }

  gotoSearch(){
    this.navCtrl.push(SearchPage, {})
  }

}
