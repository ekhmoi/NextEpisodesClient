import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episode } from '../../models/Episode';
import { URLS } from '../../constants';
import cheerio from 'cheerio';
import { Parser } from '../../models/Parser';
import { MyHttpProvider } from '../my-http/my-http';
import { Observable, Observer } from 'rxjs';
import { RecentEpisodes } from '../../interfaces/RecentEpisodes';
import { EpisodeOverview } from '../../models/EpisodeOverview';

/*
  Generated class for the TopEpisodesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TopEpisodesProvider {
  public topEpisodesFor: {
    today?: Episode[],
    tomorrow?: Episode[],
    yesterday?: Episode[]
  } = {}
  private $: CheerioStatic;

  constructor(public http: HttpClient, public myHttp: MyHttpProvider) {
  }

  public getRecent(): Observable<any> {
    return Observable.create((observer: Observer<RecentEpisodes>) => {

      const params: any = {
        service: 'recent',
        currentTab: 0,
        tier: 1,
        hourFormat: 0
      };

      this.myHttp.get(URLS.API_URL + '/services.php', { params, responseType: 'text' })
        .subscribe(
          async (res) => {
            let episodes;
            let response = await Parser.fromString(res);
            observer.next(new RecentEpisodes(response));
          }
        )
    });
  }

  public getOverview(show_id: string): Observable<EpisodeOverview> {
    return Observable.create((observer: Observer<EpisodeOverview>) => {

      const params: any = {
        ver: '2',
        service: 'overview',
        currentTab: 0,
        tier: 1,
        hourFormat: 0,
        show_id
      };

      this.myHttp.get(URLS.API_URL + '/services.php', { params, responseType: 'text' })
        .subscribe(
          async (res) => {
            let episodes;
            let response = await Parser.fromString(res);
            observer.next(new EpisodeOverview(response));
          }
        )
    });
  }


  // public getToday(): Promise<Episode[]> {
  //   if (!this.topEpisodesFor.today) {
  //     return this.loadHomePage().then(() => {
  //       return this.topEpisodesFor.today;
  //     });
  //   } else {
  //     return Promise.resolve(this.topEpisodesFor.today);
  //   }
  // }

  // public getYesterday(): Promise<Episode[]> {
  //   if (!this.topEpisodesFor.yesterday) {
  //     return this.loadHomePage().then(() => {
  //       return this.topEpisodesFor.yesterday;
  //     });
  //   } else {
  //     return Promise.resolve(this.topEpisodesFor.yesterday);
  //   }
  // }

  // public getTomorrow(): Promise<Episode[]> {
  //   if (!this.topEpisodesFor.tomorrow) {
  //     return this.loadHomePage().then(() => {
  //       return this.topEpisodesFor.tomorrow;
  //     });
  //   } else {
  //     return Promise.resolve(this.topEpisodesFor.tomorrow);
  //   }
  // }

  // private loadHomePage(): Promise<any> {
  //   return this.http.get(URLS.TOP_SERIES, { responseType: 'text' }).toPromise().then((res) => {
  //     this.$ = cheerio.load(res);

  //     this.topEpisodesFor.today = this.parseRow(this.$(this.getRowQueryForChild(2)));
  //     this.topEpisodesFor.tomorrow = this.parseRow(this.$(this.getRowQueryForChild(4)));
  //     this.topEpisodesFor.yesterday = this.parseRow(this.$(this.getRowQueryForChild(6)));
  //     return this.topEpisodesFor;
  //   });
  // }

  // private parseRow(element: Cheerio): Episode[] {
  //   const episodes: Episode[] = [];
  //   const children = element.find('.homeitem');
  //   for (let i = 0; i < children.length; i++) {
  //     episodes.push(Episode.fromHTML(children[i]));
  //   }
  //   return episodes;
  // }

  // private getRowQueryForChild(child: number): string {
  //   return `#resizeTable  table > tbody > tr > td > table > tbody > tr:nth-child(${child})`
  // }

}
