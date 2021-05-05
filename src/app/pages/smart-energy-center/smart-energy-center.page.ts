import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-smart-energy-center',
  templateUrl: './smart-energy-center.page.html',
  styleUrls: ['./smart-energy-center.page.scss'],
})
export class SmartEnergyCenterPage implements OnInit {
    currentTab: string;

    constructor() {
        this.currentTab = 'real-time-info';
    }

    ngOnInit() {
    }

    changeTabs(e) {
        this.currentTab = e.detail.value;
    }
    setting() {

    }
}
