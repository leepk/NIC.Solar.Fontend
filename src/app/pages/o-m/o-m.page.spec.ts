import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OMPage } from './o-m.page';

describe('OMPage', () => {
  let component: OMPage;
  let fixture: ComponentFixture<OMPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OMPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OMPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
