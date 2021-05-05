import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import { GestureController, Gesture, IonSelectOption } from '@ionic/angular';
@Component({
  selector: 'app-historical-info',
  templateUrl: './historical-info.component.html',
  styleUrls: ['./historical-info.component.scss'],
})
export class HistoricalInfoComponent implements OnInit {
    displayFormat = 'DD/MM/YYYY';
    selectedDate: string;// = new Date();
    @ViewChild("lineCanvas", { static: true }) lineCanvas: ElementRef;
    @ViewChild("cursor", { static: true }) cursor: ElementRef;
    selectOptionsSignalPoint: any;
   

    private lineChart: Chart;

    constructor(public gestureCtrl: GestureController) { }

    ngOnInit() {
        this.selectedDate = new Date().toISOString();

        this.selectOptionsSignalPoint = {
            header: 'Select signal point',
        };
        this.initLineChart();
    }

    initLineChart() {
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
            type: "line",
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00'],
                datasets: [{
                    label: "Power Grid voltage(V)",
                    fill: true,
                    borderWidth: 1,
                    borderColor: "green",
                    backgroundColor: "rgba(0, 255, 0, 0.3)",
                    yAxisID: "y-axis-0",
                    data: [3, 4, 5, 6, 6, 7]
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 25,
                        bottom: 0
                    }
                },
                reponsive: true,
                legend: {
                    display: true,
                    position: "top",
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
                    }]
                },
                animation: {
                    //onComplete: (chart) => {
                    //    //var controller = e.chart;
                    //    var chart = chart.chart;
                    //    var yAxis = chart.scales['y-axis-0'];
                    //    var xOffset = chart.width - (chart.width - 5);
                    //    var yOffset = chart.height - (chart.height - 8);
                    //    chart.ctx.fillText('kWh', xOffset, yOffset);
                    //}
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
        var clientX = parseInt(detail.currentX)  - parseInt(offsetLeft);
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

    changeDate(e) {

    }
}
