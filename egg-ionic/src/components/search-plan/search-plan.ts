import {Component} from '@angular/core';
import {AppGlobal, AppService} from "../../app/app.service";
declare let $: any;

/**
 * Generated class for the SearchPlanComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'search-plan',
    templateUrl: 'search-plan.html'
})
export class SearchPlanComponent {

    hotkeys: Array<any> = [];

    constructor(private appService:AppService) {
    }

    ngAfterViewInit(){
        this.getHotKey();
    }

    /**
     * 获取搜索商品
     */
    getHotKey() {
        this.appService.httpGet(AppGlobal.API.getSearchHotKeyWord, {}, res => {
            this.hotkeys = res.data.hot;
        })
    }

    hotKeyBtnPress(value) {
        window['doKeyWordAction'](value)
    }

}
