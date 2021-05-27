import { Injectable } from '@angular/core';
import { Subscription,BehaviorSubject,Observable } from 'rxjs';
import { Apollo, QueryRef,gql } from 'apollo-angular';

const ME = gql`
  query me {
    me {
      success
      code{
        level
        code
      }
    }
  }
`;

interface Logged {
  value: boolean;
}
const token = localStorage.getItem('token');
let val:boolean = false;
 if(!token){
   val = false;
 }
 else{
   val = true;
 }
@Injectable({
  providedIn: 'root'
})
export class LoggedinService {

  data: any;
  meQuery!: QueryRef<any>;
  private querySubscription!: Subscription;
  constructor(private apollo: Apollo) { }
  private initialToken: Logged = {value: val};
  private LoggedVal = new BehaviorSubject<Logged>(this.initialToken);

  /** Allows subscription to the behavior subject as an observable */
  getLogged(): Observable<Logged> {
    // this.refetch();
    return this.LoggedVal.asObservable();
  }

  refetch(): void{
    this.meQuery = this.apollo.watchQuery<any>({
      query: ME,
      pollInterval: 1000,
    });
    this.querySubscription = this.meQuery
      .valueChanges
      .subscribe(({ data, loading }) => {
        if(!loading){
        console.log(data.me.success);
        this.setLogged(data.me.success,data.me.success);
      }
      });
  }

   /**
   * Allows updating the current value of the behavior subject
   * @param val a bool representing the current value
   * @param delta bool number representing the positive or negative change in current value
   */
    setLogged(val: boolean, delta: boolean): void {
      this.LoggedVal.next({value: delta});
    }
  
    /** Resets the logged to the initial value */
    resetLogged(): void {
      this.LoggedVal.next(this.initialToken);
    }
}
