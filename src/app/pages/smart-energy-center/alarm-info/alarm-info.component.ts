import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm-info',
  templateUrl: './alarm-info.component.html',
  styleUrls: ['./alarm-info.component.scss'],
})
export class AlarmInfoComponent implements OnInit {
    currentTab: string;

    constructor() {
        this.currentTab = 'active-alarm';
    }

    ngOnInit() {
    }

    changeTabs(e) {
        this.currentTab = e.detail.value;
    }

}
