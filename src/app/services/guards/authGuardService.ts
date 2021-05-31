import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private _router:Router ) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        const level = localStorage.getItem('level');
 
        if (!level)  {
            this._router.navigateByUrl('/');
            return false;
        } 
        return true;
    }
 
}