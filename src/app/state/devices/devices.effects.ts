
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of, EMPTY } from 'rxjs';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { DevicesService } from 'src/app/services/devices/devices.service';
import * as devicesAction from './devices.actions';
import { DeviceInfo } from 'src/app/models/login-out.model';

@Injectable()
export class DevicesEffects {
    constructor(private actions$: Actions, private deviceService: DevicesService) {
    }

    @Effect()
    getDeviceUser$: Observable<Action> = this.actions$
        .pipe(
            ofType(devicesAction.ActionTypes.LIST_USER_DEVICE),
            switchMap(() =>
                this.deviceService.getListDeviceUser().
                    pipe(
                    map(devices => new devicesAction.GetListDevicesSuccess(devices)),
                        catchError(err => of(new devicesAction.GetListDevicesFail(err)))
                    )
            )
    );

    @Effect()
    getStatusDevice$: Observable<Action> = this.actions$
        .pipe(
            ofType(devicesAction.ActionTypes.GET_STATUS_DEVICE),
            map((action: devicesAction.GetStatusDevices) => action.payload),
            switchMap((prm) =>
                this.deviceService.getStatusDevice(prm).
                    pipe(
                        map(devices => new devicesAction.GetStatusDevicesSuccess(devices)),
                        catchError(err => of(new devicesAction.GetStatusDevicesFail(err)))
                    )
            )
        );
}