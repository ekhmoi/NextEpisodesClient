import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import { TvMazeProvider } from '../../providers/tv-maze/tv-maze';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  public keyword: string = '';
  public loading: boolean = false;
  public results: any[] = [];
  public formControl = new FormControl('');
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public tvMaze: TvMazeProvider
  ) {
  }

  ionViewDidLoad() {
    console.log(this.formControl);
    this.formControl.valueChanges.debounceTime(1000).subscribe((newKeyword) => {
      console.log(newKeyword);
      this.onInput(newKeyword);
    });
  }

  public onInput(ev: any): void {
    this.loading = true;
    console.log(ev);

    this.tvMaze.search(ev)
      .subscribe(
        res => {
          this.results = res;
          console.log(this.results)
        }
      )
  }
}
