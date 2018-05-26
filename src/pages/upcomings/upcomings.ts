import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TvMazeProvider } from '../../providers/tv-maze/tv-maze';

/**
 * Generated class for the UpcomingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upcomings',
  templateUrl: 'upcomings.html',
})
export class UpcomingsPage {

  public tomorrow: TvMaze.Schedule[] = [];
  public today: TvMaze.Schedule[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tvMaze: TvMazeProvider
  ) {
  }

  ionViewDidLoad() {
    this.tvMaze.getTop().subscribe((res) => { this.today = res; });

    this.tvMaze.getTop(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0,10)).subscribe((res) => { this.tomorrow = res; });
  }
}
