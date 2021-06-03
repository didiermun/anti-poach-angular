import {Patrouille} from '../../types/patrouille'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, Inject,ElementRef,OnDestroy, ViewChild, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Apollo, QueryRef,gql } from 'apollo-angular';
import { NotifierService } from 'angular-notifier';
import {DeletePatrouilleComponent} from '../dialogs/delete-pat/delete-pat.component';
import {LoggedinService} from '../services/loggedin/loggedin.service';



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

const DELETE_PATROUILLES = gql`
  mutation deletePatrouille($id: ID!) {
    deletePatrouille(id: $id) {
      id
      family
    }
  }
`;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy  {
  loading: boolean = true;
  patrouilles: any[] = [];
  delete!: boolean;
  value!: boolean;
  subscription: any;
  patrouilleQuery!: QueryRef<any>;
  private querySubscription!: Subscription;
  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService,private logged: LoggedinService,private apollo: Apollo,public dialog: MatDialog) {
    this.notifier = notifierService;
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(DeletePatrouilleComponent, {});

    dialogRef.afterClosed().subscribe(result => {
     if(result == "1"){
      this.apollo.mutate({
        mutation: DELETE_PATROUILLES,
        variables: {
          id: id
        }
      }).subscribe(({ data }) => {
        this.notifier.notify('info', 'Patrouille Deleted');
      },(error) => {
        console.log('there was an error sending the query', error);
      });
     }
    });
  }
  refresh() {
    this.patrouilleQuery.refetch()
  }
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
    this.patrouilleQuery = this.apollo.watchQuery<any>({
      query: GET_PATROUILLES,
      pollInterval: 500,
    });
    this.querySubscription = this.patrouilleQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.patrouilles = data.patrouilles;
    },(error) => {
      console.log('error', `${error.message}`);
    });

      this.subscription = this.logged.getLogged().subscribe(
        res => {
          this.value = res.loggedin;
        },
        err => {
          console.error(`An error occurred: ${err.message}`);
        }
      );
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

}

