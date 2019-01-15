import { Component, Input } from '@angular/core';

/**
 * Generated class for the ImgLazyLoadComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'img-lazy-load',
  templateUrl: 'img-lazy-load.html'
})
export class ImgLazyLoadComponent {

  default: string = 'assets/imgs/loading.gif';
  @Input() src: string //要显示的图片

  ngOnInit() {
    let img = new Image();
    img.src = this.src;
    img.onload = () => {
      this.default = this.src;
    }
  }

}
