import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {AppGlobal, AppService} from "../../app/app.service";
import Swiper from "swiper";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

declare let $: any;
/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  data: Object = {};
  contentHtml: SafeHtml ;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sanitizer: DomSanitizer,
              public appService: AppService) {

    let itemid = navParams.get('itemid');

    this.getItemDetail(itemid);
  }

  back(){
    this.navCtrl.pop();
  }

  getItemDetail(itemid){
    let params = {
      itemid: itemid,
    };
    this.appService.httpGet(AppGlobal.API.getTopDetail, params, res => {

      this.data = res.data;
      if (this.data["content"]){
        this.contentHtml = this.sanitizer.bypassSecurityTrustHtml(this.data["content"]);
      }
      setTimeout(function () {
        new Swiper('#carousel', {
          pagination: {
            el: '.dots',
            type: 'fraction',
          },
          direction : 'horizontal',
        });
      })

    }, true)
  }

  ionScroll(){
    let scroH = this.content.scrollTop;
    if(scroH >= 375){  //距离顶部大于可见宽度
      $('.toolbar').addClass('nv')
    }else {
      $('.toolbar').removeClass('nv')
    }
  }

}
