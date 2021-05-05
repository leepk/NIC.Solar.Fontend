import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnergyFlowStopComponent } from './energy-flow-stop.component';

describe('EnergyFlowStopComponent', () => {
  let component: EnergyFlowStopComponent;
  let fixture: ComponentFixture<EnergyFlowStopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyFlowStopComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnergyFlowStopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
