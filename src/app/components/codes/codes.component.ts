import {AfterViewInit,OnInit, Component, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { NewEditComponent } from '../../dialogs/new-edit/new-edit.component';


const GET_CODES = gql`
query codes{
  codes{
    _id
    level
    code
  }
}
`
export interface codeI{
  id: string;
  code: string;
  level: string;
}
@Component({
  selector: 'app-codes',
  templateUrl: './codes.component.html',
  styleUrls: ['./codes.component.css']
})
export class CodesComponent implements OnInit {
  loading: boolean = true;
  codes: codeI[] = [];
  patrouilleQuery!: QueryRef<any>;
  subscription: any;
  isloggedIn: boolean = false;
  private querySubscription!: Subscription;
  
  displayedColumns: string[] = ['code', 'level'];
  dataSource!: MatTableDataSource<codeI>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public dialog: MatDialog,private apollo: Apollo) { 
  }
  addNew() {
    const dialogRef = this.dialog.open(NewEditComponent, {
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
     console.log("result: "+ result);
    });
  }

  ngAfterViewInit() {
   
  }

  refresh() {
    this.patrouilleQuery.refetch()
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.querySubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.patrouilleQuery = this.apollo.watchQuery<any>({
      query: GET_CODES,
      pollInterval: 500,
    });
    this.querySubscription = this.patrouilleQuery
  .valueChanges
  .subscribe(({ data, loading }) => {
    this.codes = data.codes;
    this.dataSource = new MatTableDataSource(this.codes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = loading;
},(error) => {
  console.log('error', `${error.message}`);
});
  }

}
