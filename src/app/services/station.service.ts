import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { global } from './global';
import { Station } from '../models/Station';

@Injectable()
export class StationService {
    public url: string;
    public token;
    public identity;

    constructor(
        public _http: HttpClient
    ){
        this.url = global.url;
    }

    getStations(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        return this._http.get(this.url+"stations", {headers: headers});
    }


    getSensors(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        return this._http.get(this.url+'stations/'+id+'/sensors', {headers: headers});
    }

    getLastData(id, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        return this._http.get(this.url+'sensor/'+id, {headers: headers});
    }

}