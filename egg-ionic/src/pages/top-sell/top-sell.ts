import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";
import IScroll from 'iscroll';
import {DetailPage} from "../detail/detail";
declare let $: any;

/**
 * Generated class for the TopSellPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-sell',
  templateUrl: 'top-sell.html',
})
export class TopSellPage {

  topsellCat: Array<any> = [];
  currentPage: number = 0;
  topid: number ;
  dropload: any;
  @ViewChild("list") list;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService,private zone: NgZone) {
    var win_width = $(window).width();
    $('#headimg').css('min-height',win_width/375.0*150.0);

    this.topid = navParams.get('categoryid');
  }

  back(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    this.getTopSellCatData();
    this.topSellProductInit();
  }

  getTopSellCatData(){
    let params = { parentid: this.topid };
    this.appService.httpGet(AppGlobal.API.getTopSell, params, res => {
      this.topsellCat = res.data.top;

      if (this.topsellCat.length>0&&this.topsellCat[0].parentid == this.topid){
        this.topid = this.topsellCat[0].id;
      }

      let self = this;
      setTimeout(function () {

        if (self.topsellCat && self.topsellCat.length > 0){
          new IScroll('#header-nav', {scrollX: true, scrollY: false, freeScroll: true,click: true });
        }
      });
    })
  }


  /**
   * 获取热销商品
   */
  topSellProductInit(){
    let self = this;

    this.dropload = $('#topsell .scroll-content').dropload({
      scrollArea: $('#topsell .scroll-content'),
      domDown: {
        domClass: 'dropload-down',
        domRefresh: '<div class="dropload-refresh">↑上拉加载更多</div>',
        domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
        domNoData: '<div class="dropload-noData">数据已经加载完毕</div>'
      },
      loadDownFn: function (me) {
        self.loadData(self.currentPage,me);
      },
    });
  }

  loadData(page, dropload){
    let params = {
      topid: this.topid, page: page
    };
    this.appService.httpGet(AppGlobal.API.getTopProductData2, params, res => {
      let size = res.length;
      this.currentPage = page+1;
      let tempResult = [];
      res.forEach(function (item) {
        item["final_price"] = (parseFloat(item.zk_final_price) - parseFloat(item.coupon_amount)).toFixed(2);
        item["zk_final_price"] = (parseFloat(item.zk_final_price)).toFixed(2);
        tempResult.push(item);
      });

      this.list.success(tempResult, page);
      if (size < 20) {
        dropload.lock();
        dropload.noData();
      }
      setTimeout(function () {
        dropload.resetload();
        $('#topsell img.lazy').lazyload({
          container: $("#topsell .waterfall-list")
        });
      },500)

    });
  }


  selectCate(categoryid){
    this.topid = categoryid;
    this.list.empty(this.dropload);
    let self = this;
    setTimeout(function () {
      self.currentPage = 1;
      self.dropload.resetload();
    });
  }

  selectItem(itemid){
    this.navCtrl.push(DetailPage, {
      itemid: itemid
    })
  }

  ionScroll(){
    let scroH = this.content.scrollTop;
    if(scroH >= 180){  //距离顶部大于可见宽度
      $('.toolbar').addClass('nv')
    }else {
      $('.toolbar').removeClass('nv')
    }
  }
}
