import {Component, Input, Output, EventEmitter, ContentChild, TemplateRef} from '@angular/core';

declare let $: any;

/**
 * Generated class for the ListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'list',
  templateUrl: 'list.html'
})
export class ListComponent {

  @Input() startPage : number = 0;
  @ContentChild(TemplateRef) wlist: TemplateRef<any>;


  listArray = { listData: [] };

  constructor() {
  }

  success(topSp,page) {
    if (page == this.startPage) {
      this.listArray.listData = topSp;
    } else {
      this.listArray.listData = this.listArray.listData.concat(topSp);
    }
  }

  empty(dropload){
    this.listArray.listData = [];
    dropload.noData(false);
    dropload.unlock();
  }

}
