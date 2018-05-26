import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TV_MAZE_URL } from '../../constants';
import { map } from 'rxjs/operators';

/*
  Generated class for the TvMazeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TvMazeProvider {

  constructor(public http: HttpClient) {
  }

  public getTop(date?: string): Observable<TvMaze.Schedule[]> {
    const params: any = { };
    if (date) {
      params.date = date;
    }
    return this.http.get<TvMaze.Schedule[]>(`${TV_MAZE_URL}schedule`, { params })
    .pipe(map((res) => {
      return res.sort((a, b) => b.show.weight - a.show.weight);
    }));
  }

  public getShowDetails(id: number): Observable<TvMaze.ShowDetails> {
    return this.http.get<TvMaze.ShowDetails>(`${TV_MAZE_URL}shows/${id}?embed[]=nextepisode&embed[]=previousepisode`);
  }

  public search(keyword: string): Observable<TvMaze.Schedule[]> {
    const params = {
      q: keyword
    };

    return this.http.get<TvMaze.Schedule[]>(`${TV_MAZE_URL}search/shows`, { params }).pipe(map((res) => {
      return res.sort((a, b) => b.show.weight - a.show.weight);
    }));
  }
}
