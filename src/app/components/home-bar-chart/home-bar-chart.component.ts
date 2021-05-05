import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Chart } from 'chart.js';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { EnergyRevenuetModel } from 'src/app/models/energy-revenue.model';
import * as moment from 'moment';

@Component({
  selector: 'app-home-bar-chart',
  templateUrl: './home-bar-chart.component.html',
  styleUrls: ['./home-bar-chart.component.scss'],
})
export class HomeBarChartComponent implements OnInit {
    @ViewChild("barCanvas", { static: true }) barCanvas: ElementRef;
    private barChart: Chart;
    @Input() dataChart: EnergyRevenuetModel[];
    //@Input() type: string;
    charText: any;
    @Input() chartType: string = 'line';
    constructor(public translate: TranslateService) { }

    ngOnInit() {
        this.translate.get('ENERGY_REVENUE_COMP').subscribe(text => {
            this.charText = text;
        })
    }
    ngOnChanges() {
        if (this.dataChart) {
            this.initBarChart(this.charText, this.dataChart);
        }
    }
    initBarChart(texts: string[], data: EnergyRevenuetModel[] = []) {
        if (this.barChart != null) {
            this.barChart.destroy();
        }
        var labels = [];
        var values1 = [];
        var values2 = [];
        for (var i = 0; i < data.length; i++) {
            labels.push(data[i].xdata);
            values1.push(data[i].incoming);
            values2.push(data[i].outcoming);

        }
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: this.chartType,
            data: {
                labels: labels,//[1,2,3,4,5,5,6,7,7,8,8],
                datasets: [{
                    label: this.charText ? this.charText['ENERGY'] : '',
                    fill: false,
                    borderWidth: 1,
                    borderColor: "#F5982D",
                    backgroundColor: "#F5982D",
                    pointRadius:0,
                    //yAxisID: "y-axis-0",
                    data: values1,//[3,4,5,6,6,7]
                }, 
                {
                    label: this.charText ? this.charText['INCOME'] : '',
                    fill: false,
                    borderWidth: 1,
                    borderColor: "#36abe0",
                    backgroundColor: "#36abe0",
                    pointRadius:0,
                    //yAxisID: "y-axis-0",
                    data: values2,//[8,9,,5,4,4],
                }]
            },
            options: {
                barValueSpacing: 10,
                scales: {
                  yAxes: [{                    
                    ticks: {
                      min: 0,
                    }
                  }],
                  xAxes: [{
                    maxBarThickness: 10
                 }]
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 25,
                        bottom: 0
                    }
                } ,
           
                reponsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                    }
                },
              }
            /*options: {
                tooltips: {
                    mode: 'index'
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 25,
                        bottom: 0
                    }
                } ,
           
                reponsive: true,
                legend: {
                    display: true,
                    position: "bottom",
                    labels: {
                        usePointStyle: true,
                    }
                },
                scales: {
                    xAxes: [{
                        stacked: true,
                    }],
                    yAxes: [{
                        stacked: true,
                        position: "left",
                        ticks: {
                            beginAtZero: true
                        },
                        //scaleLabel: {
                        //    display: true,
                        //    labelString: 'kWh',
                        //},
                        //id: "y-axis-0"
                    }]
                },
                animation: {
                    onComplete: (chart) => {
                        /*var controller = e.chart;
                        console.log(chart)
                        var chart = chart.chart;
                        var yAxis = chart.scales['y-axis-0'];
                        var xOffset = chart.width - (chart.width - 5);
                        var yOffset = chart.height - (chart.height - 8);
                        chart.ctx.fillText('kW', xOffset, yOffset);
                        var xOffset2 = chart.width - 25;
                        chart.ctx.fillText('kW', xOffset2, yOffset);
                    }
                },
            }*/
        });
    }
}
