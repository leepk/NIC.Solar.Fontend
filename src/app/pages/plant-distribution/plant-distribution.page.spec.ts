import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlantDistributionPage } from './plant-distribution.page';

describe('PlantDistributionPage', () => {
  let component: PlantDistributionPage;
  let fixture: ComponentFixture<PlantDistributionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantDistributionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantDistributionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
