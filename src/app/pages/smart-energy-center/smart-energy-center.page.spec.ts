import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SmartEnergyCenterPage } from './smart-energy-center.page';

describe('SmartEnergyCenterPage', () => {
  let component: SmartEnergyCenterPage;
  let fixture: ComponentFixture<SmartEnergyCenterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartEnergyCenterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SmartEnergyCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
