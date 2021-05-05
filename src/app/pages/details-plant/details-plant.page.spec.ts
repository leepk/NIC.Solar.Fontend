import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsPlantPage } from './details-plant.page';

describe('DetailsPlantPage', () => {
  let component: DetailsPlantPage;
  let fixture: ComponentFixture<DetailsPlantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsPlantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsPlantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
