import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { NotifierService } from 'angular-notifier';
import { gql,Apollo } from 'apollo-angular';
import { Router} from '@angular/router';
import {map, startWith} from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

interface Types {
  value: string;
  viewValue: string;
}

const NEW_PATROUILLE = gql`
  mutation newPatrouille($data: NewPatrouille!) {
    newPatrouille(patrouille: $data) {
      id
    }
  }
`


@Component({
  selector: 'app-new-report',
  templateUrl: './new-report.component.html',
  styleUrls: ['./new-report.component.css']
})
export class NewReportComponent implements OnInit {

  report: any ={
    nTeamMembers: 0,
    composition: '',
    date: new Date(),
    names:[],
    sector: 0,
    family: '',
    path: '',
    gpsNO: '',
    feuilleNO: '',
    type: '',
    teamLeader: '',
  };
  firstFormGroup = this._formBuilder.group({
    composition: ['',Validators.required],
    date: [new Date(),Validators.required],
    sector: ['',Validators.required],
    family: ['',Validators.required],
    path: ['',Validators.required],
    gpsNO: [,Validators.required],
    feuilleNO: [,Validators.required],
    type: ['',Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
   teamLeader: ['', Validators.required],
   nTeamMembers: [,Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required]
  });
  stepperOrientation: Observable<StepperOrientation>;
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
  isLinear = true;
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]> | undefined;
  fruits: string[] = [];
  private readonly notifier: NotifierService;
  teamLeader: string | undefined;
  allFruits: string[] = ['Didier Munezero', 'Donart Aime', 'Ukwizagira Froincois', 'Healer Gakstital', 'Cyuzuzo Zodiac'];

  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto')
  matAutocomplete!: MatAutocomplete;

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();


    if (value) {
      this.fruits.push(value);
    }

    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  valid: boolean = true;
  disable: boolean = true;

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
  }
  submit(){
    this.valid = this.fruits.length == this.secondFormGroup.value.nTeamMembers;
    if(this.fruits.length == this.secondFormGroup.value.nTeamMembers){
    let data = {...this.secondFormGroup.value,...this.firstFormGroup.value, names: this.fruits}
    data.date = data.date.toString();
    data.gpsNO = Math.round(data.gpsNO)
    data.feuilleNO = Math.round(data.feuilleNO)
    data.sector = parseInt(data.sector);
    this.apollo.mutate({
      mutation: NEW_PATROUILLE,
      variables: {
        data: data
      }
    }).subscribe(({ data }) => {
      console.log('got data', data);
      let response: any = data;
      this.router.navigateByUrl(`/patrouille/${response.newPatrouille.id}`);
    },(error) => {
      if(error.networkError){
        this.notifier.notify('error','Internet connection problems detected')
      }
      console.log('there was an error sending the query', error);
      console.error(error);
    });
  }
  }
  constructor(private router: Router,notifierService: NotifierService,private apollo: Apollo,private _formBuilder: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.notifier = notifierService;
    this.stepperOrientation = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 'horizontal' : 'vertical'));

      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit(): void {
  }

}
