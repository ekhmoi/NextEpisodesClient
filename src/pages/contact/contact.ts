import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TvMazeProvider } from '../../providers/tv-maze/tv-maze';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  public keyword: string = '';
  public loading: boolean = false;
  public results: any[] = [];
  public formControl = new FormControl('');
  constructor(
    public navCtrl: NavController,
    public tvMaze: TvMazeProvider
  ) {
    this.formControl.valueChanges.debounceTime(1000).subscribe((newKeyword) => {
      this.onInput(newKeyword);
    })
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
