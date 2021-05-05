import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-energy-flow-stop',
  templateUrl: './energy-flow-stop.component.html',
  styleUrls: ['./energy-flow-stop.component.scss'],
})
export class EnergyFlowStopComponent implements OnInit {
  @Input() color: string = 'danger';
  constructor() { }

  ngOnInit() {}

}
