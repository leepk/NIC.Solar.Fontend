import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from 'src/app/models/weather.model';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class WeatherService {
    currentLang: string;
    constructor(private http: HttpClient, private trans: TranslateService) {
        this.currentLang = trans.currentLang ? trans.currentLang : 'vi';
    }

    getWeatheritemsbyLatLong(prm: Weather): Observable<any> {
      
        return this.http.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${prm.lat}&lon=${prm.long}&exclude=hourly&appid=8adb646d88e38cfc010fc34fd491a222&lang=${this.currentLang}`
        );
    }

    private extractData(res: any) {
        let body = res.json();
        return body.list || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        errMsg = error.message ? error.message : error.toString();
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}