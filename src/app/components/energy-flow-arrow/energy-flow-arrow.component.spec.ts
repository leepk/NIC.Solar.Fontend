import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnergyFlowArrowComponent } from './energy-flow-arrow.component';

describe('EnergyFlowArrowComponent', () => {
  let component: EnergyFlowArrowComponent;
  let fixture: ComponentFixture<EnergyFlowArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyFlowArrowComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnergyFlowArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
