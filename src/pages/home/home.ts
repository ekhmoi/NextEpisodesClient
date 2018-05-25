import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopEpisodesProvider } from '../../providers/top-episodes/top-episodes';
import { Episode } from '../../models/Episode';
import { RecentEpisodes } from '../../interfaces/RecentEpisodes';
import { TvMazeProvider } from '../../providers/tv-maze/tv-maze';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public segment: string = 'today';
  public tomorrow: TvMaze.Schedule[] = [];
  public today: TvMaze.Schedule[] = [];


  constructor(
    public navCtrl: NavController,
    public topEpisodes: TopEpisodesProvider,
    public tvMaze: TvMazeProvider
  ) {
  }

  ionViewDidLoad() {
    this.tvMaze.getTop().subscribe((res) => { this.today = res; });

    this.tvMaze.getTop(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0,10)).subscribe((res) => { this.tomorrow = res; });
  }
}
