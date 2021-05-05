import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MapUserDevicePage } from './map-user-device.page';

describe('MapUserDevicePage', () => {
  let component: MapUserDevicePage;
  let fixture: ComponentFixture<MapUserDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapUserDevicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapUserDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
