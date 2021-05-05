import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WifiConfigPage } from './wifi-config.page';

describe('WifiConfigPage', () => {
  let component: WifiConfigPage;
  let fixture: ComponentFixture<WifiConfigPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WifiConfigPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WifiConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
