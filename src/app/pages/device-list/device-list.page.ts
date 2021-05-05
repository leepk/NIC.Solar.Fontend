import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { DeviceInfo } from 'src/app/models/login-out.model';
import * as fromStore from 'src/app/state/app.reducer';
import * as fromDevicesAction from 'src/app/state/devices/devices.actions';
import * as fromDevicesSelector from 'src/app/state/devices/devices.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.page.html',
  styleUrls: ['./device-list.page.scss'],
})
export class DeviceListPage implements OnInit {
    selectedFilter: string;
    devices: DeviceInfo[];
    _filterDevices: DeviceInfo[];
    //devices$: Observable<DeviceInfo[]>;

    deviceId: string;
    prams: any;
    refreshEvt: any;
    constructor(private router: Router, private menu: MenuController, private store: Store<fromStore.AppState>,
        private deviceService: DevicesService, private route: ActivatedRoute, public auth: AuthenticationService) {
        this.deviceId = this.route.snapshot.paramMap.get('id');
        this.store.select(fromDevicesSelector.getListDeviceUser).subscribe(val => {
            if (!val) {
                this.store.dispatch(new fromDevicesAction.GetListDevices());
            } else {
                this.devices = val;
                this._filterDevices = JSON.parse(JSON.stringify(val));
                this.prams = {
                    value: val.length
                }
            }
            if (this.refreshEvt) {
                this.refreshEvt.target.complete();
            }
        });
    }

    ngOnInit() {
        this.selectedFilter = 'all';
        if (this.deviceId != null || this.deviceId != undefined) {
            this.getListDeviceUser();
        } else {
            //this.getListDevice();
           // this.store.dispatch(new fromDevicesAction.GetListDevices());

        }
    }

    doRefresh(e)
    {
        this.refreshEvt = e;
        if (this.deviceId != null || this.deviceId != undefined) {
            this.getListDeviceUser(e);

        } else {
            //this.getListDevice(e);
            this.store.dispatch(new fromDevicesAction.GetListDevices());
        }
    }

    smartCenter() {
        this.router.navigate([`smart-energy-center/${this.deviceId}`]);
    }

    addDevice() {
        this.router.navigate([`add-device`]);
    }
    editDevice(editObj) {
        this.router.navigate([`edit-device/${editObj.deviceId}`]);
    }
    openSideMenu() {
        this.menu.open();
    }
    pickSaleDate() {

    }

    search(event) {
        if (event.detail.value == '' || event.detail.value == null || event.detail.value == undefined) {
            this._filterDevices = this.devices;
        } else {
            this._filterDevices = this.devices.filter(item => item.name.toLowerCase().includes(event.detail.value.toLowerCase()))
        }
        this.prams = {
            value: this._filterDevices.length
        }
        console.log(this._filterDevices);
    }

    getListDevice(e?: any) {
        this.deviceService.getListDevice().subscribe(val => {
            this.devices = val.devices;
            this._filterDevices = JSON.parse(JSON.stringify(val.devices));
            this.prams = {
                value: val.devices.length
            }
            if (e) {
                e.target.complete()
            }
        })
    }

    getListDeviceUser(e?: any) {
        this.deviceService.getListDeviceUser().subscribe(val => {
            this.devices = val.devices;
            this._filterDevices = JSON.parse(JSON.stringify(val.devices));

            this.prams = {
                value: val.devices.length
            }
            if (e) {
                e.target.complete()
            }
        })
    }

    selectFilter(value: string) {
        console.log(value)
        this.selectedFilter = value;
    }
}
