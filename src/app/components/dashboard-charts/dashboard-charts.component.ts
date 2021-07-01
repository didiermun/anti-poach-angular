import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef,gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

const GET_STATS = gql`
  query latest_stats {
    latest_stats{
      year
      month
      numberOfReports
    }
  }
`;

@Component({
  selector: 'app-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.css']
})
export class DashboardChartsComponent implements OnInit {
  stats: any[] = [];
  width: Observable<number>;
  statsQuery!: QueryRef<any>;
  loading: boolean = true;
  subscription: any;
  private querySubscription!: Subscription;

  constructor(private apollo: Apollo,breakpointObserver: BreakpointObserver) { 
    this.width = breakpointObserver.observe('(min-width: 800px)')
      .pipe(map(({matches}) => matches ? 800 : 400));
  }
  saleData = [
    { name: "January", value: 40 },
    { name: "February", value: 29 },
    { name: "March", value: 52 },
    { name: "April", value: 36 },
    { name: "May", value: 38 }
  ]; 
  giveName(month: number): string{

    let name:string = month == 1? "January": month == 2? "February": month == 3? "March": month == 4? "April": month == 5? "May": month == 6? "June":month == 7? "July": month == 8?"August":month == 9? "September":month == 10? "October": month == 11?"November": "December";
    return name;
  }
  mapData(data: any): any[]{
    let stats:any[] = [];
    for(var i = 0; i < data.length; i++){
      let element = {
        name: this.giveName(data[i].month),
        value: data[i].numberOfReports
      }
      stats = [...stats,element]
    }
    return stats;
  }
  ngOnInit(): void {
    this.statsQuery = this.apollo.watchQuery<any>({
      query: GET_STATS,
      pollInterval: 500,
    });
    this.querySubscription = this.statsQuery
  .valueChanges
  .subscribe(({ data, loading }) => {
    console.log(data.latest_stats);
    this.stats = this.mapData(data.latest_stats);
    this.loading = loading;
},(error) => {
  console.log('error', `${error.message}`);
});
  }

}
