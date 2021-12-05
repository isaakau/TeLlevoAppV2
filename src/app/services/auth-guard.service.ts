import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { StorageService } from "./bd.service";

@Injectable({
  providedIn: "root"
})

export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
              private storage: StorageService) {}

canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);

    let authInfo = {
      authenticated: this.storage.get('auth')
    };
    
    if (!authInfo.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}