import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPlantPage } from './search-plant.page';

describe('SearchPlantPage', () => {
  let component: SearchPlantPage;
  let fixture: ComponentFixture<SearchPlantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPlantPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPlantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
