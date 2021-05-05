import { Router } from '@angular/router';
import * as ApiConst from '../api.const';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginInModel } from 'src/app/models/login-in.model';
import { LoginOutModel } from 'src/app/models/login-out.model';
import { AuthenticationService } from '../authentication.service';
import { NewAccInModel } from 'src/app/models/new-account-in.model';
import { BaseOutModel } from 'src/app/models/base-out.model';
import { ChangepswInModel } from 'src/app/models/change-password-in.model';
import { AcountInfoOutModel } from 'src/app/models/account-info-out.model';
import { Storage } from '@ionic/storage';
import * as fromStore from 'src/app/state/app.reducer';
import * as fromDevicesAction from 'src/app/state/devices/devices.actions';
import * as fromDevicesSelector from 'src/app/state/devices/devices.selectors';
import { Store } from '@ngrx/store';
import { DeviceInforOutModel } from 'src/app/models/device-info-out.model';

@Injectable()
export class UsersService {

    constructor(private httpClient: HttpClient, private auth: AuthenticationService,
        private router: Router, private storage: Storage, private store: Store<fromStore.AppState>) { }

    login(params: LoginInModel): Observable<LoginOutModel> {
        return this.httpClient.post<LoginOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.LOGIN}`, params).pipe(
            map(val => {
                localStorage.setItem('token', val.token);
                localStorage.setItem('username', params.acountname);
                this.auth.setRole(val.admin == '1');
                return val;
            })
        );
    }

    logout() {
        this.storage.remove("autologin").finally(() => {
            localStorage.removeItem('token');
            this.store.dispatch(new fromDevicesAction.GetListDevicesSuccess(<DeviceInforOutModel>{ devices: [] }));

            this.router.navigateByUrl('/login', { replaceUrl: true });
        })
    }

    createAccount(params: NewAccInModel): Observable<BaseOutModel> {
        return this.httpClient.post<BaseOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.NEWACCOUNT}`, params);
    }

    chagePassword(params: ChangepswInModel): Observable<BaseOutModel> {
        return this.httpClient.post<BaseOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.CHANGEPW}`, params);
    }

    getListAccount(): Observable<AcountInfoOutModel> {
        return this.httpClient.get<AcountInfoOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.LIST_ACCOUNT}`);
    }
}
