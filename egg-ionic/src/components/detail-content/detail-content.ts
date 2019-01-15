import { Component, Input, SimpleChanges } from '@angular/core';
import {SafeHtml} from '@angular/platform-browser';

declare let $: any;
/**
 * Generated class for the DetailContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detail-content',
  templateUrl: 'detail-content.html'
})
export class DetailContentComponent {

  @Input() content: SafeHtml;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof (changes['content'].previousValue) !== typeof (changes['content'].currentValue)){

      setTimeout(function () {

        $("img").each(function (index,item) {
          var data_src = $(item).attr('data-src');
          var src = $(item).attr('src');
          if (data_src){
            data_src = data_src.replace('_.webp', "");
            $(item).attr('data-src', data_src);
          }
          if (src){
            src = src.replace('_.webp', "");
            $(item).attr('src', src);
          }
        });
        $("img").each(function (index,item) {
          var data_src = $(item).attr('data-ks-lazyload');
          var src = $(item).attr('src');
          if (data_src){
            data_src = data_src.replace('_.webp', "");
            $(item).attr('data-ks-lazyload', data_src);
          }
          if (src){
            src = src.replace('_.webp', "");
            $(item).attr('src', src);
          }
        });

        $('img').lazyload({
          data_attribute: 'ks-lazyload',
          effect: 'fadeIn',
          threshold: 180 ,
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
  }

}
