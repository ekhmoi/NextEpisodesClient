import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StoredSeriesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StoredSeriesProvider implements OnInit {
  private series: any[] = [];
  private storageName: string = 'stored_series';
  private storeLoaded: boolean = false;

  constructor(private storage: Storage) {
  }

  async ngOnInit() {
    this.series =  await this.get();
    this.storeLoaded = true;
  }
  
  store(serie: any) {
    this.series.push(serie);
    this.updateStorage();
  }

  get(): Promise<any[]> {
    return this.storage.get(this.storageName).then((series) => series ? series : []);
  }

  remove(serie: any) {
    const index = this.series.map(s => s.showId).indexOf(serie.showId);
    this.series.splice(index, 1);
    this.updateStorage();
  }

  async getById(id) {
    if (!this.storeLoaded) {
      this.series = await this.get();
      this.storeLoaded = true;
    } 

    return Promise.resolve(this.series.find(s => s.showId === id));
  }

  private updateStorage(): void {
    this.storage.set(this.storageName, this.series);
  }

}
