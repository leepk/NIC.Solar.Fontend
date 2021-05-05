import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { DeviceInforInModel } from 'src/app/models/device-info-in.model';
import * as moment from 'moment';
import { DeviceInfoOnDay, DeviceInfoOnFull } from 'src/app/models/device-info-out.model';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as fromStore from 'src/app/state/app.reducer';
import * as fromDevicesAction from 'src/app/state/devices/devices.actions';
import * as fromDevicesSelector from 'src/app/state/devices/devices.selectors';
import { Store } from '@ngrx/store';
import { DeviceInfo } from 'src/app/models/login-out.model';
import { WeatherService } from 'src/app/services/weather/weather.service';
import { Weather } from 'src/app/models/weather.model';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-details-plant',
  templateUrl: './details-plant.page.html',
  styleUrls: ['./details-plant.page.scss'],
})
export class DetailsPlantPage implements OnInit {
    currentTab = 'tab1';
    isOpen = false;
    deviceId: string;
    title: string;
    rsOnFull: DeviceInfoOnFull;
    device: DeviceInfo;
    weather: any;
    currentDate: any;
    constructor(private router: Router, private route: ActivatedRoute, private deviceService: DevicesService, private weatherService: WeatherService,
        public alertController: AlertController, public auth: AuthenticationService, private store: Store<fromStore.AppState>,
        private geolocation: Geolocation) {
        this.deviceId = this.route.snapshot.paramMap.get('id');
        this.store.select(fromDevicesSelector.getListDeviceUser).subscribe(val => {
            if (val) {
                this.device = val.find(item => item.deviceId == this.deviceId);
            }
        });
        this.title = this.route.snapshot.paramMap.get('name');
        this.currentDate = moment().format('DD/MM/YYYY');
    }

    ngOnInit() {
        this.onFull();
        //this.geolocation.getCurrentPosition().then((resp) => {
        //    // resp.coords.latitude
        //    // resp.coords.longitude
        //    var prm = <Weather>{
        //        lat: resp.coords.latitude,
        //        long: resp.coords.longitude
        //    }
        //    console.log(11111111, prm)

        //    this.weatherService.getWeatheritemsbyLatLong(prm).subscribe(val => {
        //        this.weather = val;
        //    });
        //}).catch((error) => {
        //    console.log('Error getting location', error);
        //});
        
    }

    changeTabs(e) {
        this.currentTab = e.detail.value;
    }

    cal() {
        this.isOpen = true;
    }
    cal2() {
        this.isOpen = false;
    }
    //addDevice() {
    //    this.router.navigate([`add-device`]);
    //}
    deviceList() {
        //this.router.navigate([`device-list/${this.deviceId}`]);
    }

    async mapUserClick() {
        this.router.navigate([`map-user-device/${this.deviceId}`]);
    }

    onFull() {
        var params = <DeviceInforInModel>{
            deviceId: this.deviceId,
            transactionDate: moment().format('YYYYMMDD')
        }
        this.deviceService.getOnFull(params).subscribe(val => {
            this.rsOnFull = val;
        });
    }
}
