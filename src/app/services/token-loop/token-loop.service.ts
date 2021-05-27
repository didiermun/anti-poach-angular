import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

interface Token {
  value: string;
}

const token:string = localStorage.getItem('token') || '';
@Injectable({
  providedIn: 'root'
})
export class TokenLoopService {

  constructor() { }
  private initialToken: Token = {value: token};
  private countToken = new BehaviorSubject<Token>(this.initialToken);

  /** Allows subscription to the behavior subject as an observable */
  getToken(): Observable<Token> {
    return this.countToken.asObservable();
  }

   /**
   * Allows updating the current value of the behavior subject
   * @param val a string representing the current value
   * @param delta a string representing the positive or negative change in current value
   */
    setToken(): void {
      this.countToken.next({value: localStorage.getItem('token') || ''});
    }
  
    /** Resets the string to the initial value */
    resetCount(): void {
      this.countToken.next({value: localStorage.getItem('token') || ''});
    }
}
