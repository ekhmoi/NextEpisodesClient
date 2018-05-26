import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  public favorites: TvMaze.Show[] = [];
  public loading: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {

  }

  ionViewWillEnter() {
    this.loading = true;
    this.api.getFavorites()
      .subscribe(
        (res: any) => {
          // this.loading = false;
          this.favorites = res.data.favorites;
        },
        (err) => {
          // this.loading = false;
          console.log(err);
        }
      );
  }
}
