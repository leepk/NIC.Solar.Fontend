import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import * as moment from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceInfo } from 'src/app/models/login-out.model';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { IonRefresher } from '@ionic/angular';
import * as fromStore from 'src/app/state/app.reducer';
import * as fromDevicesAction from 'src/app/state/devices/devices.actions';
import * as fromDevicesSelector from 'src/app/state/devices/devices.selectors';
import { Store } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DeviceStatusInModel } from 'src/app/models/device-info-in.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

    currentTab = 'tab1';
    isFirstLoad = true;
    devices: DeviceInfo[];
   // devices$: Observable<DeviceInfo[]>;
    refreshEvt: any;

    constructor(private router: Router, private route: ActivatedRoute, private devicesService: DevicesService,
        private store: Store<fromStore.AppState>, public auth: AuthenticationService) {
        //var state = router.getCurrentNavigation().extras.state;
        //this.devices = state['devices'];
        //console.log(this.devices);
        //if ((state['devices'] as DeviceInfo[])) {
            
        //}

        this.store.select(fromDevicesSelector.getListDeviceUser).subscribe(val => {
            if (!val) {
                return;
            }
            this.devices = val;
            var pr = <DeviceStatusInModel>{}
            var devices = "";

            for (var i = 0; i < val.length; i++) {
                if (i == val.length - 1) {
                    devices = devices + val[i].deviceId;
                } else {
                    devices = devices + val[i].deviceId + `,`;
                }
            }
            pr.devices = devices;
            if (pr.devices && pr.devices.length > 0) {
                this.store.dispatch(new fromDevicesAction.GetStatusDevices(pr));
            }

            if (this.refreshEvt) {
                this.refreshEvt.target.complete();
            }
        });

        this.store.select(fromDevicesSelector.setStatusDevice).subscribe(val => {
            if (!val) {
                return;
            }
            var temp = JSON.parse(JSON.stringify(this.devices)) as DeviceInfo[];
            for (var i = 0; i < val.length; i++) {
                temp.forEach(item => {
                    if (item.deviceId == val[i].deviceID) {
                        item.active = val[i].active;
                    }
                })
            }
            this.devices = temp;
        })
    }

    ngOnInit() {
        //this.getListDeviceUser();
        this.store.dispatch(new fromDevicesAction.GetListDevices());
    }

    changeTabs(e) {
        this.isFirstLoad = false;
        this.currentTab = e.detail.value;
    }

    doRefresh(e) {
        this.refreshEvt = e;

        //this.getListDeviceUser(e);
        this.store.dispatch(new fromDevicesAction.GetListDevices());

    }

    getListDeviceUser(e?: any) {
        this.devicesService.getListDeviceUser().subscribe(val => {
            this.devices = val.devices;
            if (e) {
                console.log(e);
                e.target.complete()
            }
        })
    }
    newUser() {
        this.router.navigate([`new-user`]);
    }
    plantDistribution() {
        this.router.navigate([`plant-distribution`]);

    }
    search() {
        //this.router.navigate([`search-plant`]);
    }
    addDevice() {

    }
}
