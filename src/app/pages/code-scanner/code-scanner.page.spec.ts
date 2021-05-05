import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodeScannerPage } from './code-scanner.page';

describe('CodeScannerPage', () => {
  let component: CodeScannerPage;
  let fixture: ComponentFixture<CodeScannerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeScannerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeScannerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
