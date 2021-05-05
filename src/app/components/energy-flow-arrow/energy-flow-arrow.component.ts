import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-energy-flow-arrow',
  templateUrl: './energy-flow-arrow.component.html',
  styleUrls: ['./energy-flow-arrow.component.scss'],
})
export class EnergyFlowArrowComponent implements OnInit {
    @Input() color: string = 'medium';
  constructor() { }

  ngOnInit() {}

}
