import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URLS } from '../../constants';
import { Parser } from '../../models/Parser';
import { Observable, Observer } from 'rxjs';

/*
  Generated class for the MyHttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyHttpProvider {

    public hash_key: string;
    public user_id: string;

    constructor(public http: HttpClient) {
        // this.loadAuthDetails().subscribe(
        //     (auth) => {
        //         this.hash_key = auth.result.hash_key[0];
        //         this.user_id = auth.result.user_id[0];
        //     }
        // )
    }

    public loadAuthDetails(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            const params: any = {
                service: 'login',
                device_id: new Date().getTime().toString()
            };

            this.http.get(URLS.LOGIN, { params, responseType: 'text' })
                .subscribe(
                    async (res) => {
                        const auth: any = await Parser.fromString(res);
                        observer.next(auth);
                    }
                );
        });
    }

    get(url, params): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            if (!this.user_id || !this.hash_key) {
                this.loadAuthDetails().subscribe(
                    auth => {
                        this.hash_key = auth.result.hash_key[0];
                        this.user_id = auth.result.user_id[0];

                        this.http.get(url, this.authorizeParams(params)).subscribe((r) => observer.next(r), e => observer.error(e));
                    }
                )
            } else {
                this.http.get(url, this.authorizeParams(params)).subscribe((r) => observer.next(r), e => observer.error(e));
            }
        });
    }

    private authorizeParams(params: any): any {
        if (!params) {
            return {}
        }

        if (!params.params) {
            return params;
        }

        params.params = { ...params.params, hash_key: this.hash_key, user_id: this.user_id }
        return params;
    }
}
