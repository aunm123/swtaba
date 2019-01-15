import { Component, SimpleChanges, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  currentPage: number = 0;
  searchkey: string = "";
  volumnSort: string = "";
  priceSort: string = "";
  mSort: string = "";
  showList: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public appService: AppService,private zone: NgZone) {}

  ionViewDidLoad() {}

  /**
   * 获取搜索商品
   */
  getSearchProduct(infiniteScroll) {

    let page = this.currentPage + 1;
    let showLoading = false;
    if (infiniteScroll == null) {
      page = 1;
      showLoading = true;
    };
    let params = {
      categoryid: 0,
      page: page, // 当前页
      pageSize: 20, // 每页显示个数
      q: decodeURI(this.searchkey),
      v: this.volumnSort, p: this.priceSort, m: this.mSort
    };
    this.appService.httpGet(AppGlobal.API.getSearchUrl, params, res => {

      this.currentPage = page;

      if (page == 1) {
        this.searchitems = res.data;
      } else {
        this.searchitems = this.searchitems.concat(res.data);
      }
      if (infiniteScroll) {
        infiniteScroll.complete();
      }
      if (this.searchitems.length >= res.total){
        if (infiniteScroll) {
          infiniteScroll.enable(false);
          this.appService.toast("数据加载结束");
          return
        }
      }

      this.zone.run(() => {
        setTimeout(function () {
          $('img.lazy').lazyload({
            container: $(".search-list")
          });
        }, 1000)
      })


    },showLoading)
  }


  gotoDetailPage(itemid){
    this.navCtrl.push(DetailPage, {
      itemid: itemid
    })
  }

  searchAction(keyword) {
    console.log(keyword);
    this.showList = true;
    this.searchkey = keyword;
    this.searchitems = [];
    this.getSearchProduct(null);
  }

  showPlan(){
    this.showList = false;
  }

  black(){
    this.navCtrl.pop();
  }

  reProps({v,p,m}){
    this.volumnSort = v;
    this.priceSort = p;
    this.mSort = m;
    this.getSearchProduct(null);
  }

}
