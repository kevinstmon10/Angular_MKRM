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

    getSensor(id, token): Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        return this._http.get(this.url+'sensor/'+id, {headers: headers});
    }

    updateSensor(id, sensor, token): Observable<any>{
        let json = JSON.stringify(sensor);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);

        return this._http.put(this.url+'sensor/'+id, params, {headers: headers});
    }

    getLastData(id, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        return this._http.get(this.url+'sensor/'+id+'/last', {headers: headers});
    }

    getHistoyData(id, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        ///especial para highcharts
        return this._http.get(this.url+'historial/sensor/'+id, {headers: headers});
    }
    /* Grafica de tiempo real */
    getRealTimeDefaultData(id, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        ///especial para highcharts
        return this._http.get(this.url+'tr/sensor/'+id+'&default', {headers: headers});
    }
    getRealTimeDefault1(id, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        ///especial para highcharts
        return this._http.get(this.url+'tr/sensor/'+id+'&1', {headers: headers});
    }

    /* Grafica de tiempo real */
    getTenData(id, token):Observable<any>{
        let headers = new HttpHeaders().set('Content-type', 'application/x-www-formurlencoded')
        .set('Authorization', token);

        ///especial para highcharts
        return this._http.get(this.url+'last_ten/sensor/'+id, {headers: headers});
    }

}