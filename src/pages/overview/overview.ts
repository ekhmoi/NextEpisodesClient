import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TvMazeProvider } from '../../providers/tv-maze/tv-maze';
import { ApiProvider } from '../../providers/api/api';

/**
 * Generated class for the OverviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-overview',
  templateUrl: 'overview.html',
})
export class OverviewPage {
  public episode: TvMaze.Schedule;
  public previousEpisode;
  public nextEpisode;
  public showDetails: TvMaze.ShowDetails;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public tvMaze: TvMazeProvider,
    public api: ApiProvider
  ) {
    const episode: TvMaze.Schedule = this.navParams.get('episode');

    if (episode) {
      this.episode = episode;
      this.tvMaze.getShowDetails(episode.show.id)
      .subscribe(res => {
        this.showDetails = res;
      })
    }
  }

  public get isSaved(): boolean {
    if (!this.showDetails) {
      return false;
    } else {
      return this.api.isFavorite(this.showDetails.id);
    }
  }
  
  public toggleSaved(): void {
    if (this.isSaved) {
      // Remove From saved
      this.api.removeFavorite(this.showDetails.id)
    } else {
      // Add to saved
      this.api.addFavorite(this.showDetails.id)
    }
  }
  
  ionViewDidLoad() {
  }
}
