import { Component, Output, EventEmitter } from '@angular/core';
import {AppGlobal, AppService} from "../../app/app.service";
declare let $: any;

/**
 * Generated class for the SearchBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {

  searchkeyWord: string;
  hasSelect: boolean = false;
  @Output() searchAction:EventEmitter<String> = new EventEmitter();
  @Output() showPlan:EventEmitter<any> = new EventEmitter();
  @Output() black:EventEmitter<any> = new EventEmitter();

  constructor(private appService: AppService){}

  ngAfterViewInit(){
    let self = this;
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
        if (!$('#search-input').is(":focus")){
          $('.search-head-list ul').html('');
        }
      },100)
    });
    $('#search-input').on('input', function () {
      self.keywordChange();
    });
    window["setKeyWord"] = function (value) {
      console.log(value);
      $('#search-input').val(value);
      $('#search-input').focus();
      self.keywordChange();
    }

  }

  doblack(){
    this.black.emit();
  }

  doSearchAction(){
    $('.search-head-list ul').html('');
    this.searchkeyWord = $('#search-input').val();
    this.searchAction.emit(this.searchkeyWord);
  }

  clearBtnPress() {
    $('#search-input').val('');
    $('.search-head-list ul').html('');
    $('#search-input').focus();
    return;
  }

  keywordChange() {
    var k = $('#search-input').val();
    if (k.length <= 0) {
      $('.search-head-list ul').html('');
      return;
    }
    var params = {key: k};

    this.appService.httpPost(AppGlobal.API.getSearchkey, params, res => {

      var newk = $('#search-input').val();
      if (newk.length <= 0) {
        $('.search-head-list ul').html('');
        return;
      }
      if (k!=newk){
        return ;
      }
      if (!this.hasSelect) {
        $('.search-head-list ul').html('');
        return;
      }
      var result = '';
      for (var i = 0; i < res.length; i++) {
        var item = res[i];
        result += '<li><a onclick="setKeyWord(\'' + item[0] + '\')"><i class="iconfont icon-search search-icon"></i>'
          + item[0] + '</a></li>'
      }
      $('.search-head-list ul').html(result);

    });
  }

}
