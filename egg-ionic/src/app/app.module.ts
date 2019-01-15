import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AppGlobal, AppService} from "./app.service";
import {DetailPage} from "../pages/detail/detail";
import {SearchPage} from "../pages/search/search";
import {ComponentsModule} from "../components/components.module";
import {TopSellPage} from "../pages/top-sell/top-sell";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    SearchPage,
    TopSellPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    SearchPage,
    TopSellPage
  ],
  providers: [
    StatusBar,
    ComponentsModule,
    SplashScreen, AppService, AppGlobal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
