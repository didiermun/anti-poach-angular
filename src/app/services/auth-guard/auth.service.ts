import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
  constructor() {}
  public isAuthorized(): boolean {
    const level = localStorage.getItem('code_level');
    if(!level){
        return false;
    }
    if(level == "ADMIN"){
        return true
    }
    return false;
  }
}