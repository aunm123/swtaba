import { Component, Input, SimpleChanges } from '@angular/core';
import {AppGlobal, AppService} from "../../app/app.service";
declare let $: any;
declare let ClipboardJS: any;
/**
 * Generated class for the ShortUrlComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'short-url',
  templateUrl: 'short-url.html'
})
export class ShortUrlComponent {

  short_url:string = "";
  @Input() itemDetail: object = null;

  constructor(public appService: AppService) {
    var clipboard = new ClipboardJS('.keycopy',{
      text: function() {
        return this.short_url;
      }
    })
    clipboard.on('success', function(e) {
      $('.code').addClass('select');
      $('.keycopy')[0].innerText = "已复制"
    })

    // this.getShortUrl();

  }

  ngOnChanges(changes: SimpleChanges): void{
    if (changes['itemDetail'].previousValue !== changes['itemDetail'].currentValue){
      if (this.itemDetail["couponClickUrl"]){
        this.getShortUrl();
      }
    }
  }

  getShortUrl(){
    let params = {
      itemid: this.itemDetail["itemId"],
      url: this.itemDetail["couponClickUrl"],
      text: this.itemDetail["title"],
      logo: this.itemDetail["pictUrl"]
    };
    this.appService.httpGet(AppGlobal.API.getShortUrl, params, res => {
      this.short_url = res.data.shorturl;
    })
  }

}
