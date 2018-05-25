import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public favorites: TvMaze.Show[] = [];
  public loading: boolean = false;
  constructor(
    public navCtrl: NavController,
    public api: ApiProvider
  ) {

  }

  ionViewWillEnter() {
    this.loading = true;
    this.api.getFavorites()
    .finally(() => { this.loading = false})
    .subscribe((res: any ) => {
      this.favorites = res.data.favorites;
    });
  }
}
