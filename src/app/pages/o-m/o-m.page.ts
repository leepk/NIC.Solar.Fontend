import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-o-m',
  templateUrl: './o-m.page.html',
  styleUrls: ['./o-m.page.scss'],
})
export class OMPage implements OnInit {
    currentTab: string;

    constructor() {
        this.currentTab = 'plant-status';

    }

    ngOnInit() {
    }
    changeTabs(e) {
        this.currentTab = e.detail.value;
    }
}
