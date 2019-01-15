import { Component } from '@angular/core';
declare let $: any;

/**
 * Generated class for the GoTopComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'go-top',
  templateUrl: 'go-top.html'
})
export class GoTopComponent {

  constructor() {}

  ngAfterViewInit(){

    $(".scroll-content").scroll(function(){
      if($(this).scrollTop()>500){//当window的scrolltop距离大于1时，go to top按钮淡出，反之淡入
        $(".am-gotop").fadeIn();
      } else {
        $(".am-gotop").fadeOut();
      }
    });
    $('.am-gotop a').click(function(){
      $('.scroll-content').animate({scrollTop:0},'slow');
    });

  }

}
