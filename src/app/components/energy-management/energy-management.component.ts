import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { GestureController, Gesture } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { DevicesService } from 'src/app/services/devices/devices.service';
import { DeviceInforInModel } from 'src/app/models/device-info-in.model';
import { ActivatedRoute } from '@angular/router';
import { EnergyManagementModel } from 'src/app/models/energy-management.model';

@Component({
  selector: 'app-energy-management',
  templateUrl: './energy-management.component.html',
  styleUrls: ['./energy-management.component.scss'],
})
export class EnergyManagementComponent implements OnInit {

    displayFormat = 'DD/MM/YYYY';
    selectedDate: string;// = new Date();
    currentDate: string;
    typeFilterDate: string = 'day';
    @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;
    @ViewChild("cursor", { static: true }) cursor: ElementRef;

    
    private lineChart: Chart;
    deviceId: string;
    charText: any;
    constructor(public gestureCtrl: GestureController, public translate: TranslateService,
        private route: ActivatedRoute, private deviceService: DevicesService) {
        this.selectedDate = new Date().toISOString();
        this.currentDate = moment().format('DD/MM/YYYY');
        this.deviceId = this.route.snapshot.paramMap.get('id');
    }
    chartType: string = 'line';
    ngOnInit() {
        this.translate.get('ENERGY_MANAGEMENT_COMP').subscribe(val => {
            this.charText = val;
            var param = <DeviceInforInModel>{
                deviceId: this.deviceId,
                transactionDate: moment(this.selectedDate).format('YYYYMMDD') //'20200724'
            }
            this.initDate(param);
        })
    }

    initDate(param: DeviceInforInModel) {
        
        this.deviceService.getEnergyManagement(param, this.typeFilterDate).subscribe(val => {
            var data;
            
            if (this.typeFilterDate == 'day') {
                data = val.sort((n1, n2) => {
                    return new Date(new Date(n1.TransactionDate).toDateString()).getTime() - new Date(new Date(n2.TransactionDate).toDateString()).getTime() || n1.xdata - n2.xdata;
                    return n1.xdata - n2.xdata;
                });
            } else {
                data = val.sort((n1, n2) => {
                    return n1.xdata - n2.xdata;
                });
            }
            this.initLineChart(data);
        })
    }

    nextDate() {
        
        if (this.typeFilterDate == 'day') {
            //param.transactionDate = moment(this.currentDate).format('YYYYMMDD');
            this.selectedDate = moment(this.selectedDate).add(1, 'd').toISOString();
        } else if (this.typeFilterDate == 'month') {
            this.selectedDate = moment(this.selectedDate).add(1, 'M').toISOString();
            //param.transactionDate = moment(this.selectedDate).format('YYYYMMDD');

        } else if (this.typeFilterDate == 'year' || this.typeFilterDate == 'life-time') {
            this.selectedDate = moment(this.selectedDate).add(1, 'y').toISOString();
            //param.transactionDate = moment(this.selectedDate).format('YYYYMMDD');

        }
        var param = <DeviceInforInModel>{
            deviceId: this.deviceId,
            transactionDate: moment(this.selectedDate).format('YYYYMMDD')
        }

        this.initDate(param);
    }

    prevDate() {
        
        if (this.typeFilterDate == 'day') {
            //param.transactionDate = moment().format('YYYYMMDD');
            this.selectedDate = moment(this.selectedDate).subtract(1, 'd').toISOString();
        } else if (this.typeFilterDate == 'month') {
            this.selectedDate = moment(this.selectedDate).subtract(1, 'M').toISOString();
            //param.transactionDate = moment(this.selectedDate).format('YYYYMMDD');
        } else if (this.typeFilterDate == 'year' || this.typeFilterDate == 'life-time') {
            this.selectedDate = moment(this.selectedDate).subtract(1, 'y').toISOString();
            //param.transactionDate = moment(this.selectedDate).format('YYYYMMDD');
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
            //  transactionDate: moment(this.selectedDate).format('YYYYMMDD')
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
        var param = <DeviceInforInModel>{
            deviceId: this.deviceId,
            transactionDate: moment(this.selectedDate).format('YYYYMMDD')
        };
        this.initDate(param);
    }

    initLineChart(data: EnergyManagementModel[] = []) {
        if (this.lineChart != null) {
            this.lineChart.destroy();
        }
        var labels = [];
        var values = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(data[i].xdata);
            values.push(data[i].incoming);
        }
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: this.chartType,
            data: {
                labels: labels,//['00:00', '04:00', '08:00', '12:00', '16:00'],
                datasets: [{
                    label: this.charText.PRODUCTION,
                    fill: true,
                    borderWidth: 1,
                    borderColor: "#F5982D",
                    backgroundColor:  "#F5982D",//"rgba(0, 255, 0, 0.3)",
                    yAxisID: "y-axis-0",
                    pointRadius:0,
                    data: values//[3, 4, 5, 6, 6, 7]
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 25,
                        bottom: 0
                    },
                },
                
                reponsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                    }
                },
                scales: {
                    yAxes: [{
                        position: "left",
                        ticks: {
                            beginAtZero: true
                        },
                        //scaleLabel: {
                        //    display: true,
                        //    labelString: 'kWh',
                        //},
                        id: "y-axis-0"
                    }],
                    xAxes: [{
                        maxBarThickness: 10
                     }]
                },
                animation: {
                    onComplete: (chart) => {
                        //var controller = e.chart;
                        var chart = chart.chart;
                       
                        var yAxis = chart.scales['y-axis-0'];
                        var xOffset = chart.width - (chart.width - 5);
                        var yOffset = chart.height - (chart.height - 8);
                        chart.ctx.fillText('kW', xOffset, yOffset);                        
                    }
                },
                tooltips: {
                    mode: 'x',
                    intersect: false
                },
            }
        });

        const gesture: Gesture = this.gestureCtrl.create({
            el: this.lineCanvas.nativeElement,
            threshold: 15,
            gestureName: 'my-gesture',
            onMove: ev => this.onMoveHandler(ev)
        }, true);
        gesture.enable();
    }
    private onMoveHandler(detail) {
        var offsetLeft = this.cursor.nativeElement.offsetLeft;
        var domElement = this.cursor.nativeElement;
        var clientX = parseInt(detail.currentX) - 15 - parseInt(offsetLeft);
        this.lineChart = this.cursor.nativeElement.getContext('2d');
        //console.log(offsetLeft)
        this.lineChart.clearRect(0, 0, domElement.width, domElement.height),
            this.lineChart.beginPath(),
            this.lineChart.moveTo(clientX, 0),
            this.lineChart.lineTo(clientX, domElement.height),
            this.lineChart.setLineDash([10, 10]),
            this.lineChart.strokeStyle = "#333",
            this.lineChart.stroke()
    }
}
