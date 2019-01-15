import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopSellPage } from './top-sell';

@NgModule({
  declarations: [
    TopSellPage,
  ],
  imports: [
    IonicPageModule.forChild(TopSellPage),
  ],
})
export class TopSellPageModule {}
