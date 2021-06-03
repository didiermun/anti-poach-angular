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

export interface Logged {
  loggedin: boolean;
  code_level: string;
}
const token = localStorage.getItem('token');
const code_level = localStorage.getItem('code_level');
let val:boolean = false;
let c_l: string = "USER"
if(code_level){
  c_l = code_level;
}
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
  private initialToken: Logged = {loggedin: val,code_level:c_l};
  private LoggedVal = new BehaviorSubject<Logged>(this.initialToken);

  getLogged(): Observable<Logged> {
    const token = localStorage.getItem('token');
    if(!token){
      this.setLogged(false,"");
    }
    else{
    this.refetch();
  }
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
          if(data.me.code){
            localStorage.setItem('code_level',data.me.code.level);
            this.setLogged(data.me.success,data.me.code.level);
          }
          else{
            this.setLogged(data.me.success,"USER");
          }
      }
      });
  }


    setLogged(loggedin: boolean, code_level: string): void {
      this.LoggedVal.next({loggedin: loggedin,code_level: code_level});
    }
  
    /** Resets the logged to the initial value */
    resetLogged(): void {
      this.LoggedVal.next(this.initialToken);
    }
}
