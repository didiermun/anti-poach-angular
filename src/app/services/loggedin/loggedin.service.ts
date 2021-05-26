import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

interface Logged {
  value: boolean;
}
const token:string = localStorage.getItem('token') || '';
@Injectable({
  providedIn: 'root'
})
export class LoggedinService {

  constructor() { }
  val = token == ''?false:true; 
  private initialToken: Logged = {value: this.val};
  private LoggedVal = new BehaviorSubject<Logged>(this.initialToken);

  /** Allows subscription to the behavior subject as an observable */
  getLogged(): Observable<Logged> {
    return this.LoggedVal.asObservable();
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
