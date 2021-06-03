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
@Component({
  selector: 'app-patrouille',
  templateUrl: './patrouille.component.html',
  styleUrls: ['./patrouille.component.css']
})

export class PatrouilleComponent implements OnDestroy,OnInit,AfterViewInit  {

 
  constructor(private logged: LoggedinService,public dialog: MatDialog,private route: ActivatedRoute,private apollo: Apollo) {
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
    },(error) => {
      console.log('error', `${error.message}`);
    });
      }
    );
    this.subscription = this.logged.getLogged().subscribe(
      res => {
        this.isloggedIn = res.loggedin;
      },
      err => {
        console.error(`An error occurred: ${err.message}`);
      }
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
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

