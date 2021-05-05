import { HttpClient, HttpBackend, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Config } from '../commons/core.const';

@Injectable({
  providedIn: 'root'
})
export class AppConfig {

  static Settings: Config = new Config();
  private http: HttpClient;
  constructor(private httpBackEnd: HttpBackend) {
    this.http = new HttpClient(httpBackEnd);
  }
  load() {
    return new Promise<void>((resolve, reject) => {
      //this.http.get(`${api.url}${api.GetConfigs}`).toPromise().then((response: Config) => {
        
      //  //AppConfig.Settings = <Config>response;
      //  Object.keys(<Config>response).map(function (key, index) {
      //    AppConfig.Settings[key] = <Config>response[key];
          
      //  });
      //  resolve();
      //}).catch((response: any) => {
      //  resolve();
      //  //reject(`Could not load file settings: ${JSON.stringify(response)}`);
      //});
    });
  }
}
