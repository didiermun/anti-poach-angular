import { Inject,Component, OnInit,OnDestroy, ViewChild,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import {NewRecordComponent} from '../dialogs/new-record/new-record.component';

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
@Component({
  selector: 'app-patrouille',
  templateUrl: './patrouille.component.html',
  styleUrls: ['./patrouille.component.css']
})

export class PatrouilleComponent implements OnDestroy,OnInit,AfterViewInit  {

 
  constructor(public dialog: MatDialog,private route: ActivatedRoute,private apollo: Apollo) { }
  loading!: boolean;
  patrouille: any = {patrouille:{},records:[]};
  private querySubscription!: Subscription;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  addNew() {
    const dialogRef = this.dialog.open(NewRecordComponent, {
      data: { p_id: this.patrouille.patrouille.id}
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log("result: "+ result);
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.querySubscription = this.apollo.watchQuery<any>({
          query: GET_PATROUILLES,
          variables: {
            id: params['patrouilleId'],
          },
        })
          .valueChanges
          .subscribe(({ data, loading }) => {
            console.log(data);
            this.loading = loading;
            this.patrouille = data.patrouille;
          });
      }
    );
  }
  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

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



