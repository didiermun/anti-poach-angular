import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

interface Types {
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
  foods: Types[] = [
    {value: 'ROUTINE', viewValue: 'ROUTINE'},
    {value: 'CHOC', viewValue: 'CHOC'},
    {value: 'SOUS_TENTE', viewValue: 'SOUS TENTE'},
    {value: 'MIXTE', viewValue: 'MIXTE'},
    {value: 'TRACKING', viewValue: 'TRACKING'}
  ];

  sectors: Types[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '3'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'}
  ];
  compositions: Types[] = [
    {value: 'PNV', viewValue: 'PNV'},
    {value: 'KRC', viewValue: 'KRC'},
    {value: 'PNVi', viewValue: 'PNVi'},
    {value: 'MGNP', viewValue: 'MGNP'},
  ];
  families: Types[] = [
    {value: 'Agashya', viewValue: 'Agashya'},
    {value: 'Umubano', viewValue: 'Umubano'},
    {value: 'Hirwa', viewValue: 'Hirwa'},
    {value: 'Umuhoza', viewValue: 'Umuhoza'},
    {value: 'Sabyinyo', viewValue: 'Sabyinyo'},
    {value: 'Kwitonda', viewValue: 'Kwitonda'},
    {value: 'Susa', viewValue: 'Susa'},
    {value: 'Isimbi', viewValue: 'Isimbi'},
    {value: 'Igisha', viewValue: 'Igisha'},
    {value: 'Ntambara', viewValue: 'Ntambara'},
    {value: 'Musirikari', viewValue: 'Musirikari'},
    {value: 'Mutobo', viewValue: 'Mutobo'},
    {value: 'Mafunzo', viewValue: 'Mafunzo'},
    {value: 'Kureba', viewValue: 'Kureba'},
    {value: 'Titus', viewValue: 'Titus'},
    {value: 'Pablo', viewValue: 'Pablo'},
    {value: 'Kubona', viewValue: 'Kubona'},
  ];

  foodControl = new FormControl();
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]> | undefined;
  fruits: string[] = [];
  allFruits: string[] = ['Didier Munezero', 'Donart Aime', 'Ukwizagira Froincois', 'Healer Gakstital', 'Cyuzuzo Zodiac'];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  constructor(private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));
      this.form = new FormGroup({
        food: this.foodControl,
      });

      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
  }

}
