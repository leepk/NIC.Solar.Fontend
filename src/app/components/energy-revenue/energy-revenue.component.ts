import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceInforInModel } from 'src/app/models/device-info-in.model';
import { EnergyRevenuetModel } from 'src/app/models/energy-revenue.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-energy-revenue',
  templateUrl: './energy-revenue.component.html',
  styleUrls: ['./energy-revenue.component.scss'],
})
export class EnergyRevenueComponent implements OnInit {
    displayFormat = 'DD/MM/YYYY';
    selectedDate: string;// = new Date();
    typeFilterDate: string = 'day';
    currentDate: string;

    deviceId: string;
    charText: any;
    dataChart: EnergyRevenuetModel[];
    constructor(public translate: TranslateService,
        private route: ActivatedRoute, private deviceService: DevicesService) {
        this.selectedDate = new Date().toISOString();
        this.currentDate = moment().format('DD/MM/YYYY');
        this.deviceId = this.route.snapshot.paramMap.get('id');
    }
    chartType: string = 'line';
    ngOnInit() {
        //this.translate.get('ENERGY_REVENUE_COMP').subscribe(val => {
        //    this.charText = val;
        var param = <DeviceInforInModel>{
            deviceId: this.deviceId,
            transactionDate: moment(this.selectedDate).format('YYYYMMDD')
        }
        this.initDate(param);
        //})
    }

    initDate(param: DeviceInforInModel) {
        this.deviceService.getEnergyRevenue(param, this.typeFilterDate).subscribe(val => {
            if (this.typeFilterDate == 'day') {
                this.dataChart = val.sort((n1, n2) => {
                    return new Date(new Date(n1.TransactionDate).toDateString()).getTime() - new Date(new Date(n2.TransactionDate).toDateString()).getTime() || n1.xdata - n2.xdata;
                });
            } else {
                this.dataChart = val.sort((n1, n2) => {
                    return n1.xdata - n2.xdata;
                });
            }
        });
    }

    nextDate() {
        
        if (this.typeFilterDate == 'day') {
            this.selectedDate = moment(this.selectedDate).add(1, 'd').toISOString();
        } else if (this.typeFilterDate == 'month') {
            this.selectedDate = moment(this.selectedDate).add(1, 'M').toISOString();
        } else if (this.typeFilterDate == 'year' || this.typeFilterDate == 'life-time') {
            this.selectedDate = moment(this.selectedDate).add(1, 'y').toISOString();
        }
        var param = <DeviceInforInModel>{
            deviceId: this.deviceId,
            transactionDate: moment(this.selectedDate).format('YYYYMMDD')
        }
        this.initDate(param);
    }

    prevDate() {
        
        if (this.typeFilterDate == 'day') {
            this.selectedDate = moment(this.selectedDate).subtract(1, 'd').toISOString();
        } else if (this.typeFilterDate == 'month') {
            this.selectedDate = moment(this.selectedDate).subtract(1, 'M').toISOString();
        } else if (this.typeFilterDate == 'year' || this.typeFilterDate == 'life-time') {
            this.selectedDate = moment(this.selectedDate).subtract(1, 'y').toISOString();
        }
        var param = <DeviceInforInModel>{
            deviceId: this.deviceId,
            transactionDate: moment(this.selectedDate).format('YYYYMMDD')
        }
        this.initDate(param);
    }

    changeDateTab(e) {
        var param = <DeviceInforInModel>{
            deviceId: this.deviceId,
        }
        this.typeFilterDate = e.detail.value;
        if (this.typeFilterDate == 'day') {
            param.transactionDate = moment().format('YYYYMMDD');
            this.displayFormat = 'DD/MM/YYYY'
            this.chartType = "line";
        } else if (this.typeFilterDate == 'month') {
            this.displayFormat = 'MM/YYYY'
            param.transactionDate = moment(this.selectedDate).format('YYYYMMDD');
            this.chartType = "bar";
        } else if (this.typeFilterDate == 'year' || this.typeFilterDate == 'life-time') {
            this.displayFormat = 'YYYY'
            param.transactionDate = moment(this.selectedDate).format('YYYYMMDD');
            this.chartType = "bar";
        }
        else{
            this.chartType = "bar";
        }

        this.initDate(param);
    }

    changeDate(e) {

    }
}
