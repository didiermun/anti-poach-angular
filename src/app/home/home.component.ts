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
  patrouilles: any[] = [];
  delete!: boolean;
  patrouilleQuery!: QueryRef<any>;
  private querySubscription!: Subscription;

  constructor(private apollo: Apollo,public dialog: MatDialog) {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '330px',
      data: {animal: this.delete}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.delete = result;
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
    // this.querySubscription = this.apollo.watchQuery<any>({
    //   query: GET_PATROUILLES
    // })
    //   .valueChanges
    //   .subscribe(({ data, loading }) => {
    //     console.log(data);
    //     this.loading = loading;
    //     this.patrouilles = data.patrouilles;
    //   });
    this.patrouilleQuery = this.apollo.watchQuery<any>({
      query: GET_PATROUILLES,
      pollInterval: 500,
    });
    this.querySubscription = this.patrouilleQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.patrouilles = data.patrouilles;
      });
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

}


@Component({
  selector: 'dialog-dialog',
  templateUrl: 'delete-dialog.component.html',
})
export class DeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) public data: boolean) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
