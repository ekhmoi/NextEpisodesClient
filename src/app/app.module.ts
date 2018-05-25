import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

import { TopEpisodesProvider } from '../providers/top-episodes/top-episodes';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { MyHttpProvider } from '../providers/my-http/my-http';
import { StoredSeriesProvider } from '../providers/stored-series/stored-series';
import { TvMazeProvider } from '../providers/tv-maze/tv-maze';
import { ApiProvider } from '../providers/api/api';
import { Push } from '@ionic-native/push';
import { AdMobFree } from '@ionic-native/admob-free';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      mode: 'md'
      // iconMode: 'md'
      
    }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TopEpisodesProvider,
    MyHttpProvider,
    StoredSeriesProvider,
    TvMazeProvider,
    ApiProvider,
    Push,
    AdMobFree
  ]
})
export class AppModule {}
