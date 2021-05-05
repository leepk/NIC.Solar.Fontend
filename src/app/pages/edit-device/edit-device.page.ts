import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceInModel } from 'src/app/models/device-in.model';
import { IonDatetime } from '@ionic/angular';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { ErrorDialogUtils } from 'src/app/shared/utils/error-dialog.utils';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.page.html',
  styleUrls: ['./edit-device.page.scss'],
})
export class EditDevicePage implements OnInit {
  displayFormat = 'DD/MM/YYYY';
  //params: DeviceInModel;
    params = <DeviceInModel>{
        deviceId: null,
        manufactureDate: null,
        manufacturer: null,
        deviceName: null,
        saleDate: null,
        serialNumber: null,
        address: null,    
        pantType: null,
        pantNumber: 0,
        pantCapacity: 0,
        batteryType: null,
        batteryCapacity: 0,    
        latitude: 0,
        longitude: 0,
        active: "1",
        inverterType: null,
        inverterCapacity: 0
    };
    @ViewChild("datepickerManu", { static: true }) datepickerManu: IonDatetime;
    @ViewChild("datepickerSale", { static: true }) datepickerSale: IonDatetime;
    textTrans: any;
    title: string;
    deviceId: string;

    constructor(private router: Router, private route: ActivatedRoute, private deviceService: DevicesService, public translate: TranslateService,
        private dialog: ErrorDialogUtils, private location: Location) {
    }

    ngOnInit() {
        this.translate.get('ADD_DEVICE').subscribe(val => {
            this.textTrans = val;
        })
        this.deviceId = this.route.snapshot.paramMap.get('id');        
        this.getInfoDevice();
        this.title = this.textTrans['EDIT_TITLE'] + this.deviceId;
        
    }
    pickManuDate() {
      this.datepickerManu.open();
  }

  pickSaleDate() {
      this.datepickerSale.open();
  }

  confirm() {      
      this.deviceService.updateDevice(this.params).subscribe(val => {
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
  getInfoDevice(e?: any) {
    this.deviceService.getInfoDevice(this.deviceId).subscribe(val => {
        this.params = <DeviceInModel>JSON.parse(JSON.stringify(val.device));
        console.log(this.params);
        this.params.deviceId = this.deviceId;
        this.params.deviceName = this.params.name;
        this.params.active = (this.params.active == "1")?("1"):("0");
        console.log("active: " + this.params.active);
        if (e) {
            e.target.complete()
        }
    })
}

}
