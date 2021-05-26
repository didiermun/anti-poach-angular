import { Component, OnInit,OnDestroy, ViewChild,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { QueryRef,Apollo, gql } from 'apollo-angular';
import {NewRecordComponent} from '../dialogs/new-record/new-record.component';
import {LoggedinService} from '../services/loggedin/loggedin.service';
import {MatSort} from '@angular/material/sort';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}


export interface DialogData {
  animal: string;
  name: string;
}
const GET_PATROUILLES = gql`
  query patrouille($id: ID!) {
    patrouille(id: $id) {
      records{
        id
        p_id
        time
        wpt
        easting
        northing
        observation
        otype
        number
        sitename
        remarks
      }
      patrouille{
        id
        date
        type
        sector
        family
        path
        composition
        nTeamMembers
        teamLeader
        gpsNO
        feuilleNO
        names
      }
    }
  }
`;
export interface UserData {
  id: string;
  name: string;
  progress: string;
  color: string;
}

export interface Record{
  id: string;
  northing: number;
  easting: number;
  wpt: number;
  observation: string;
  otype: string;
  remarks: string[];
  number: number;
  sitename: string;
}
export interface pat{
  patrouille: any;
  records: Record[];
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
@Component({
  selector: 'app-patrouille',
  templateUrl: './patrouille.component.html',
  styleUrls: ['./patrouille.component.css']
})

export class PatrouilleComponent implements OnDestroy,OnInit,AfterViewInit  {

 
  constructor(private logged: LoggedinService,public dialog: MatDialog,private route: ActivatedRoute,private apollo: Apollo) {
     // Create 100 users
    //  const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

     // Assign the data to the data source for the table to render
    //  this.dataSource = new MatTableDataSource(this.patrouille.records);
   }
  loading: boolean = true;
  patrouille: pat = {patrouille:{},records:[]};
  patrouilleQuery!: QueryRef<any>;
  subscription: any;
  isloggedIn: boolean = false;
  private querySubscription!: Subscription;
  
  displayedColumns: string[] = ['time', 'wpt','location','number','observation','otype','sitename'];
  dataSource!: MatTableDataSource<Record>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  addNew() {
    console.log(this.patrouille.patrouille.id)
    const dialogRef = this.dialog.open(NewRecordComponent, {
      data: { p_id: this.patrouille.patrouille.id}
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log("result: "+ result);
    });
  }
  refresh() {
    this.patrouilleQuery.refetch()
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.patrouilleQuery = this.apollo.watchQuery<any>({
          query: GET_PATROUILLES,
          variables: {
            id: params['patrouilleId'],
          },
          pollInterval: 500,
        });
        this.querySubscription = this.patrouilleQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.patrouille = data.patrouille;
        this.dataSource = new MatTableDataSource(this.patrouille.records);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = loading;
    });
      }
    );
    this.subscription = this.logged.getLogged().subscribe(
      res => {
        this.isloggedIn = res.value;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
  ngAfterViewInit() {
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    name: name,
    progress: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))]
  };
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];



