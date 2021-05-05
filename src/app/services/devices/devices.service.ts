import { Router } from '@angular/router';
import * as ApiConst from '../api.const';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseOutModel } from 'src/app/models/base-out.model';
import { DeviceInfo, LoginOutModel } from 'src/app/models/login-out.model';
import { DeviceInforOutModel, DeviceInfoOnDay, DeviceInfoOnFull, DeviceStatusOutModel } from 'src/app/models/device-info-out.model';
import { DeviceInforInModel, DeviceStatusInModel } from 'src/app/models/device-info-in.model';
import { EditDeviceOutModel } from 'src/app/models/login-out.model'
import { DeviceInModel, DeviceUserInModel } from 'src/app/models/device-in.model';
import { EnergyManagementModel } from 'src/app/models/energy-management.model';
import { EnergyRevenuetModel } from 'src/app/models/energy-revenue.model';
import { AcountInfoOutModel, AcountInfo, AcountOfDevice } from 'src/app/models/account-info-out.model';

@Injectable()

export class DevicesService {

    constructor(private httpClient: HttpClient) { }

    getListDeviceUser(): Observable<DeviceInforOutModel> {
        return this.httpClient.get<DeviceInforOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.LIST_DEVICE_USER}`, {}).pipe(
            map(val => {
                //localStorage.removeItem('Token');
                //localStorage.removeItem('phone');
                //(<any>window).AccountKitPlugin.logout();
                // this.router.navigate([`logout`], { replaceUrl: true });
                //this.store.dispatch(new fromUserAction.SetError(null))
                /*val.devices.forEach(item => {
                    item.active = '0'
                });*/
                return val;
            })
        );
    }
    getInfoDevice(id: string): Observable<EditDeviceOutModel> {
        return this.httpClient.post<EditDeviceOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.INFO_DEVICE}/${id}`, null);
    }

    //getFlowEnergy(): Observable<DeviceInfo>{

    //}

    getListDevice(): Observable<DeviceInforOutModel> {
        return this.httpClient.get<DeviceInforOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.LIST_DEVICE}`);
    }

    getOnFull(params: DeviceInforInModel): Observable<DeviceInfoOnFull> {
        return this.httpClient.post<DeviceInfoOnFull>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ONFULL}`, params);
    }

    getOnDay(params: DeviceInforInModel): Observable<DeviceInfoOnDay> {
        return this.httpClient.post<DeviceInfoOnDay>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ONDAY}`,params);
    }

    addDevice(params: DeviceInModel): Observable<BaseOutModel> {
        return this.httpClient.post<BaseOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ADDdEVICE}`, params);
    }
    updateDevice(params: DeviceInModel): Observable<BaseOutModel> {
        return this.httpClient.post<BaseOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.UPDATEdEVICE}`, params);
    }

    getStatusDevice(prams: DeviceStatusInModel): Observable<DeviceStatusOutModel[]> {

        return this.httpClient.post<DeviceStatusOutModel[]>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.STATUSDEVICE}`, prams);
    }

    getEnergyManagement(params: DeviceInforInModel, mode: string): Observable<EnergyManagementModel[]> {
        var url;
        if (mode == 'day') {
            url = `${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ENERGY_MANAGEMENT_DAY}`
        } else if (mode == 'month') {
            url = `${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ENERGY_MANAGEMENT_MONTH}`

        } else if (mode == 'year') {
            url = `${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ENERGY_MANAGEMENT_YEAR}`

        } else if (mode == 'life-time') {
            url = `${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ENERGY_MANAGEMENT_ALL}`
        }

        return this.httpClient.post<EnergyManagementModel[]>(url, params);
    }

    getEnergyRevenue(params: DeviceInforInModel, mode: string): Observable<EnergyRevenuetModel[]> {
        var url;
        if (mode == 'day') {
            url = `${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ENERGY_REVENUE_DAY}`
        } else if (mode == 'month') {
            url = `${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ENERGY_REVENUE_MONTH}`

        } else if (mode == 'year') {
            url = `${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ENERGY_REVENUE_YEAR}`

        } else if (mode == 'life-time') {
            url = `${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.ENERGY_REVENUE_ALL}`
        }
        return this.httpClient.post<EnergyRevenuetModel[]>(url, params);
    }

    getListAccountDevice(id: string): Observable<AcountOfDevice[]> {
        var prm = <DeviceInforInModel>{
            deviceId: id
        }
        return this.httpClient.post<AcountOfDevice[]>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.LIST_ACCOUNT_DEVICE}`, prm);
    }

    mapUserToDevice(params: DeviceUserInModel): Observable<BaseOutModel> {
        return this.httpClient.post<BaseOutModel>(`${ApiConst.ApiUrl.HOST}${ApiConst.ApiUrl.MAP_USER_DEVICE}`, params);
    }
}
