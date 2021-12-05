import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { StorageService } from "./bd.service";

@Injectable({
  providedIn: "root"
})

export class AuthGuardService implements CanActivate {
  constructor(private router: Router,
              private storage: StorageService) {}

  autenticado = this.storage.get("auth")
canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route);
    console.log(this.autenticado);
    
    let authInfo = {
      authenticated: this.autenticado
      
    };
    
    if (!authInfo.authenticated) {
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }
}