import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required]
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required]
  });
  stepperOrientation: Observable<StepperOrientation>;

  form: FormGroup;
  foods: Food[] = [
    {value: 'ROUTINE', viewValue: 'ROUTINE'},
    {value: 'CHOC', viewValue: 'CHOC'},
    {value: 'SOUS_TENTE', viewValue: 'SOUS TENTE'},
    {value: 'MIXTE', viewValue: 'MIXTE'},
    {value: 'TRACKING', viewValue: 'TRACKING'}
  ];

  foodControl = new FormControl();
  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
      this.form = new FormGroup({
        food: this.foodControl,
      });
  }

  ngOnInit(): void {
  }

}
