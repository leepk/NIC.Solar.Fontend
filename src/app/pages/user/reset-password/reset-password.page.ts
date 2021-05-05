import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
    styleUrls: ['./reset-password.page.scss'],
    encapsulation: ViewEncapsulation.None

})
export class ResetPasswordPage implements OnInit {
    firstFormGroup: FormGroup;
    isOptional = false;
    hide = true;
    hide2 = true;

    @ViewChild('stepper') stepper: MatStepper;

    
    constructor(private _formBuilder: FormBuilder) {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    nextClicked(event) {
        // complete the current step
        this.stepper.selected.completed = true;
        // move to next step
        this.stepper.next();
    }

}
