import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TvMazeProvider } from '../../providers/tv-maze/tv-maze';
import { ONE_DAY_IN_MS } from '../../constants';

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
  public pendingRequests = 2;
  public tomorrow: TvMaze.Schedule[] = [];
  public today: TvMaze.Schedule[] = [];
  public loading: boolean = false;

  private tomorrowDate: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tvMaze: TvMazeProvider
  ) {
  }

  ionViewDidLoad() {
    const tomorrow = new Date().getTime() + ONE_DAY_IN_MS;
    this.tomorrowDate = new Date(tomorrow).toISOString().slice(0, 10);

    this.loading = true;

    this.tvMaze.getTop().subscribe(
      (res) => {
        this.today = res;
        this._handleResponse();
      },
      (err) => {
        this._handleResponse();
      }
    );

    this.tvMaze.getTop(this.tomorrowDate).subscribe(
      (res) => {
        this.tomorrow = res;

        this._handleResponse();
      },
      (err) => {
        this._handleResponse();
      }
    );
  }

  private _handleResponse(): void {
    this.pendingRequests -= 1;
    if (this.pendingRequests === 0) {
      this.loading = false;
    }
  }
}
