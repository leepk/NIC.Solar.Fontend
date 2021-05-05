import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceInfo } from 'src/app/models/login-out.model';

@Component({
  selector: 'app-plant',
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.scss'],
})
export class PlantComponent implements OnInit {
    @Input() device: DeviceInfo;
    constructor(private router: Router) {

    }

    ngOnInit() { }

    detail() {
        this.router.navigate([`details-plant/${this.device.deviceId}/${this.device.name}`]);
    }
}
