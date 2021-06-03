import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
 
 
@Injectable()
export class AuthGuardService implements CanActivate {
 
    constructor(private _router:Router) {
    }
 
    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        const level = localStorage.getItem('code_level');
        const token = localStorage.getItem('token');
        console.log(level);
 
        if (!level || !token)  {
            this._router.navigateByUrl('/404');
            return false;
        } 
        return true;
    }
 
}