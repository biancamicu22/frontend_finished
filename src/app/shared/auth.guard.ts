import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../services/user.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: UserService,
        private jwtHelper: JwtHelperService,
    ) { }

    private performRedirect(route: ActivatedRouteSnapshot){
            this.router.navigate(['/login'], { queryParams: {  } });
    }
    
    canActivate(route: ActivatedRouteSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        if(localStorage.getItem("userData") != "null"){
            console.log(this.jwtHelper.isTokenExpired(currentUser.token))
            if (currentUser != null) {
                if(this.jwtHelper.isTokenExpired(currentUser.token)){
                    this.performRedirect(route);
                        return false;
                }
                const uRole = this.authenticationService.GetUserRole();
                if(uRole == undefined || uRole == ""){
                    this.performRedirect(route);
                    return false;
                }
                return true;
            }
            else if(currentUser == null){
                this.performRedirect(route);
                return false;
            }
        }
        else{
            this.performRedirect(route);
                        return false;
        }
    }
}