import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { ApiProvider } from '../providers/api/api';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private push: Push,
    private api: ApiProvider,
    private admobFree: AdMobFree
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initApp();
    });
  }

  public initApp(): void {
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      id: 'ca-app-pub-1064727486518319/7624280366',
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare().then(r => console.log(r)).catch(e => console.log(e));
    const pushObject: PushObject = this.push.init({});
    if (!localStorage.getItem('API_TOKEN')) {
      this.api.getToken().subscribe(
        () => {
          pushObject.on('registration').subscribe((res) => {
            console.log(res);
            this.api.registerDevice(res.registrationId);
          });
        }
      );
    } else {
      this.api.getFavorites().subscribe();
      pushObject.clearAllNotifications();
    }

  }
}
