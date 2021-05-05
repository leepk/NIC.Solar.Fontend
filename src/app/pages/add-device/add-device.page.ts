import { Component, OnInit, ViewChild } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router } from '@angular/router';
import { DeviceInModel } from 'src/app/models/device-in.model';
import { IonDatetime } from '@ionic/angular';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { ErrorDialogUtils } from 'src/app/shared/utils/error-dialog.utils';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {
    displayFormat = 'DD/MM/YYYY';
    params = <DeviceInModel>{
        deviceId: null,
        manufactureDate: null,
        manufacturer: null,
        deviceName: null,
        saleDate: null,
        serialNumber: null,
        address: null,    
        pantType: null,
        pantNumber: null,
        pantCapacity: null,
        batteryType: null,
        batteryCapacity: null,    
        latitude: null,
        longitude: null,
        inverterType: null,
        inverterCapacity: null
    };
    @ViewChild("datepickerManu", { static: true }) datepickerManu: IonDatetime;
    @ViewChild("datepickerSale", { static: true }) datepickerSale: IonDatetime;
    textTrans: any;

    constructor(private router: Router, private deviceService: DevicesService, public translate: TranslateService,
        private dialog: ErrorDialogUtils, private location: Location) {
    }

    ngOnInit() {
        this.translate.get('ADD_DEVICE').subscribe(val => {
            this.textTrans = val;
        })
    }

    pickManuDate() {
        this.datepickerManu.open();
    }

    pickSaleDate() {
        this.datepickerSale.open();
    }

    confirm() {
        if (!this.checkValid()) {
            return;
        }
        this.deviceService.addDevice(this.params).subscribe(val => {
            this.dialog.openDialogResponse(val).then(rs => {
                if (rs) {
                    this.location.back();
                }
            })
        })

    }
    scan() {
        this.router.navigate([`code-scanner`]);
    }

    checkValid(): boolean {
        if (this.params.deviceId == null || this.params.deviceId == '') {
            this.dialog.openDialogOK(this.textTrans['DEVICE_PLACEHOLDER']);
            return false;
        }
        return true;
    }
}
