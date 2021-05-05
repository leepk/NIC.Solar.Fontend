import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnviromentalContributionComponent } from './enviromental-contribution.component';

describe('EnviromentalContributionComponent', () => {
  let component: EnviromentalContributionComponent;
  let fixture: ComponentFixture<EnviromentalContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnviromentalContributionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnviromentalContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
