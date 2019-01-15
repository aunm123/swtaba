import { NgModule } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar';
import { SearchSortComponent } from './search-sort/search-sort';
import { ShortUrlComponent } from './short-url/short-url';
import { CommonModule } from '@angular/common';
import { DetailContentComponent } from './detail-content/detail-content';
import { ImgLazyLoadComponent } from './img-lazy-load/img-lazy-load';
import { GoTopComponent } from './go-top/go-top';
import { SearchPlanComponent } from './search-plan/search-plan';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list';
@NgModule({
	declarations: [SearchBarComponent,
    SearchSortComponent,
    ShortUrlComponent,
    DetailContentComponent,
    ImgLazyLoadComponent,
    GoTopComponent,
    SearchPlanComponent,
    ListComponent],
	imports: [
    CommonModule,
    FormsModule
  ],
	exports: [SearchBarComponent,
    SearchSortComponent,
    ShortUrlComponent,
    DetailContentComponent,
    ImgLazyLoadComponent,
    GoTopComponent,
    SearchPlanComponent,
    ListComponent]
})
export class ComponentsModule {}
