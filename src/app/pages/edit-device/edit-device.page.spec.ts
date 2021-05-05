import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditDevicePage } from './edit-device.page';

describe('EditDevicePage', () => {
  let component: EditDevicePage;
  let fixture: ComponentFixture<EditDevicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDevicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
