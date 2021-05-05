import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { DevicesService } from 'src/app/services/devices/devices.service';
import * as fromStore from 'src/app/state/app.reducer';
import * as fromDevicesAction from 'src/app/state/devices/devices.actions';
import * as fromDevicesSelector from 'src/app/state/devices/devices.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { DeviceStatusInModel } from 'src/app/models/device-info-in.model';
import { DeviceStatusOutModel } from 'src/app/models/device-info-out.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sildes-home',
  templateUrl: './sildes-home.component.html',
  styleUrls: ['./sildes-home.component.scss'],
})
export class SildesHomeComponent implements OnInit {
    @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas: ElementRef;
    deviceIds = [];
    private doughnutChart: Chart;
    charText: any;
    deviceStatus: DeviceStatusOutModel[];
    slideOpts = {
        initialSlide: 1,
        speed: 400
    };
    totalOn: number = 0;
    totalOff: number = 0;
    constructor(private deviceService: DevicesService, private store: Store<fromStore.AppState>, public translate: TranslateService) {
        this.translate.get('SLIDE_COMP').subscribe(val => {
            this.charText = val;
        })
        //this.store.select(fromDevicesSelector.getListDeviceUser).subscribe(val => {
        //    if (val) {
        //        this.totalOff = 0;
        //        this.totalOn = 0;
        //        this.deviceIds = [];
        //        for (var i = 0; i < val.length; i++) {
        //            this.deviceIds.push(val[i].deviceId);
        //        }
        //        this.initStatus();
        //    }
           
        //})

        this.store.select(fromDevicesSelector.setStatusDevice).subscribe(val => {
            this.deviceStatus = val;
            this.totalOff = 0;
            this.totalOn = 0;
            if (val) {
                this.initStatus();
            }
        });
    }

    ngOnInit() {
       // this.initdoughnutChart();
        // this.initStatus();
        if (this.deviceStatus && this.deviceStatus.length > 0) {
            this.initdoughnutChart([0, 0]);
        }

    }

    initStatus() {
        var prm = [];
        for (var i = 0; i < this.deviceStatus.length; i++) {
            if (this.deviceStatus[i].active != '0') {
                this.totalOn = this.totalOn + 1;
            } else {
                this.totalOff = this.totalOff + 1;
            }
        }
        prm.push(this.totalOn);
        prm.push(this.totalOff);
        this.initdoughnutChart(prm);
    }

    initdoughnutChart(prm: number[]) {
        //console.log(this.charText);
        if (!this.doughnutCanvas) {
            return;
        }
        if (this.doughnutChart != null) {
            this.doughnutChart.destroy();
        }
        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
            type: "doughnut",
            data: {
                labels: [this.charText.NORMAL, this.charText.OFFLINE],
                datasets: [
                    {
                        data: prm,
                        backgroundColor: [
                            //"#fd1717",
                            "#4fe04c",
                            "#8e8d85"
                        ],
                        borderWidth: 0
                        //hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
                    }
                ]
            },
            options: {
                cutoutPercentage: 60,
                //title: {
                //    position: "right",
                //    display: true,
                //    text: 'Plant Status'
                //},
                legend: {
                    display: false,
                    position: "right",
                    labels: {
                        usePointStyle: true,
                    }
                },
                //elements: {
                //    center: {
                //        text: 'Red is 2/3 of the total numbers',
                //        color: '#FF6384', // Default is #000000
                //        fontStyle: 'Arial', // Default is Arial
                //        sidePadding: 10, // Default is 20 (as a percentage)
                //        minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
                //        lineHeight: 25 // Default is 25 (in px), used for when text wraps
                //    }
                //}
            },
            //plugins: {
            //    afterDatasetsDraw: function (chartInstance) {
            //        //onProgress: function (animation) {
            //        //var chartInstance = this.chart;
            //        var ctx = chartInstance.ctx;
            //        ctx.textAlign = 'center';
            //        // ctx.fillStyle = "rgba(255, 243, 243)";
            //        ctx.textBaseline = 'middle';

            //        // Ajout d'un titre de l�gende
            //        var titreLegendeX = chartInstance.legend.legendHitBoxes[0].left ;
            //        var titreLegendeY = chartInstance.legend.legendHitBoxes[0].top - 70;
            //        ctx.fillStyle = "#000000";
            //        ctx.font = "15px sans-serif";
            //        ctx.fillText("Plant Status", titreLegendeX, titreLegendeY);
            //    },
            //    beforeInit: (chart, options) => {
            //        chart.legend.afterFit = () => {
            //            if (chart.legend.margins) {
            //                // Put some padding around the legend/labels
            //                chart.legend.options.labels.padding = -40;
            //                // Because you added 20px of padding around the whole legend,
            //                // you will need to increase the height of the chart to fit it
            //                //chart.width -= 20;
            //            }
            //        };
            //    },
            //    beforeDraw: (chart) => {
            //        var width = chart.chart.width,
            //            height = chart.chart.height,
            //            ctx = chart.chart.ctx;

            //        ctx.restore();
            //        var fontSize = (height / 114).toFixed(2);
            //        ctx.font = fontSize + "em sans-serif";
            //        ctx.textBaseline = "middle";

            //        var text = `1%`,
            //            textX = Math.round((width - ctx.measureText(text).width) / 2),
            //            textY = height / 2;

            //        ctx.fillText(text, textX, textY);
            //        ctx.save();

            //    }
            //}
        });
    }
}
