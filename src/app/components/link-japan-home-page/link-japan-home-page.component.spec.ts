import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LinkJapanHomePageComponent } from './link-japan-home-page.component';

describe('LinkJapanHomePageComponent', () => {
  let component: LinkJapanHomePageComponent;
  let fixture: ComponentFixture<LinkJapanHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkJapanHomePageComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LinkJapanHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
