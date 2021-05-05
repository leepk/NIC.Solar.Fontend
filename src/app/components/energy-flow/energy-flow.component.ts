import { Component, OnInit, Input } from '@angular/core';
import { DeviceInfoOnDay } from 'src/app/models/device-info-out.model';
import { DeviceInforInModel } from 'src/app/models/device-info-in.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DevicesService } from 'src/app/services/devices/devices.service';
import * as moment from 'moment';

@Component({
  selector: 'app-energy-flow',
  templateUrl: './energy-flow.component.html',
  styleUrls: ['./energy-flow.component.scss'],
})
export class EnergyFlowComponent implements OnInit {
    flow: DeviceInfoOnDay;
    deviceId: string;
    dataRefresh: number;
    constructor(private router: Router, private route: ActivatedRoute, private deviceService: DevicesService) {
        this.deviceId = this.route.snapshot.paramMap.get('id');

    }

    ngOnInit() {
        this.onDay();
        setInterval(() => {      
            this.onDay();
            this.dataRefresh += 1;
      },50000);
    }
    onDay() {
        var params = <DeviceInforInModel>{
            deviceId: this.deviceId,
            transactionDate: moment().format('YYYYMMDD')
        }
        this.deviceService.getOnDay(params).subscribe(val => {
            this.flow = val;
        });
    }
}
