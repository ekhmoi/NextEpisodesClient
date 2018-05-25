import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { URLS } from '../../constants';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  public favorites: TvMaze.Show[] = [];
  constructor(public http: HttpClient, public platform: Platform) {
    console.log('Hello ApiProvider Provider');
  }

  public getToken() {
    const device = this.platform.is('ios') ? 'Apple' : this.platform.is('md') ? 'Google' : '';
    return this.http.post(`${URLS.SERVER_URL}/init`, { device }).map((response: any) => {
      localStorage.setItem('API_TOKEN', response.data.token);
      return response;
    });
  }

  public registerDevice(deviceId: string): void {
    let url = `${URLS.SERVER_URL}/register-device`;
    alert('registering device at url: ' + url);
    this.http.post(url, {
      deviceId,
      token: localStorage.getItem('API_TOKEN')
    })
      .subscribe(
        (res: any) => {
          console.log('registered device', res);
        },
        (err) => {
          console.log('could not register device', err);
        }
      );
  }

  public addFavorite(showId: number): void {
    this.http.post(`${URLS.SERVER_URL}/add-favorite`, {
      token: localStorage.getItem('API_TOKEN'),
      showId
    }).subscribe((res: any) => {
      this.favorites = res.data.favorites
    });
  }

  public removeFavorite(showId: number): void {
    this.http.post(`${URLS.SERVER_URL}/remove-favorite`, {
      token: localStorage.getItem('API_TOKEN'),
      showId
    }).subscribe((res: any) => {
      this.favorites = res.data.favorites;
    });
  }

  public getFavorites() {
    return this.http.post(`${URLS.SERVER_URL}/get-favorites`, { token: localStorage.getItem('API_TOKEN') }).map((res: any) => {
      this.favorites = res.data.favorites;
      return res;
    });
  }

  public isFavorite(id): boolean {
    return typeof this.favorites.find(favorite => favorite.id === id) !== 'undefined';
  }
}
