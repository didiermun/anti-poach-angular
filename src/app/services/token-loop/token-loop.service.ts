import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable } from 'rxjs';

interface Token {
  value: string;
}

const token:string = localStorage.getItem('token') || '';
@Injectable()
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
   * @param val a number representing the current value
   * @param delta a number representing the positive or negative change in current value
   */
    setCount(val: string, delta: string): void {
      this.countToken.next({value: delta});
    }
  
    /** Resets the count to the initial value */
    resetCount(): void {
      this.countToken.next(this.initialToken);
    }
}
