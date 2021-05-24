import {Patrouille} from '../../types/patrouille'

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ElementRef,OnDestroy, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';



const GET_PATROUILLES = gql`
  query patrouilles {
    patrouilles {
      family
      path
      id
      date
    }
  }
`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy  {
  loading!: boolean;
  patrouilles: any;

  private querySubscription!: Subscription;

  constructor(private apollo: Apollo) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  size: Patrouille = {
    date: new Date,
    id: "didier",
    type: "",
    sector: 0,
    family: "",
    path: "",
    composition: "",
    nTeamMembers: 6,
    names: [""],
    teamLeader: "",
    gpsNO: 2,
    feuilleNO: 2,
  };
  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]> | undefined;
  fruits: string[] = ['Today'];
  allFruits: string[] = ['Yesterday', 'This week', 'This month'];

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
  ngOnInit(): void {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_PATROUILLES
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        console.log(data);
        this.loading = loading;
        this.patrouilles = data.patrouilles;
      });
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}
