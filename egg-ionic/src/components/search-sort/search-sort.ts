import { Component, Input, Output, EventEmitter } from '@angular/core';
declare let $: any;

/**
 * Generated class for the SearchSortComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-sort',
  templateUrl: 'search-sort.html'
})
export class SearchSortComponent {

  @Input() v: string = "";
  @Input() p: string = "";
  @Input() m: string = "";
  @Output() reProps: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  selectChange(){
    $('.select').removeClass('select');
    if (this.p){
      if (this.p=='a'){
        $('#price1').addClass('select')
      }else {
        $('#price2').addClass('select')
      }
      return ;
    }
    if (this.v){
      $('#sell').addClass('select')
    }else {
      $('#normal').addClass('select')
    }
  }

  normalsort() {
    this.v = "";
    this.p = "";
    this.m = "";
    this.reProps.emit({v: this.v,p: this.p,m: this.m });
    this.selectChange()
  }
  sellsort() {
    this.v = "d";
    this.p = "";
    this.m = "";
    this.reProps.emit({v: this.v,p: this.p,m: this.m });
    this.selectChange()
  }
  pricesort(p_sort) {
    this.v = "";
    this.p = p_sort;
    this.m = "";
    this.reProps.emit({v: this.v,p: this.p,m: this.m });
    this.selectChange()
  }


}
