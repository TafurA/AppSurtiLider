import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  canActivate() {
    if (!localStorage.userSessionData) {
      return false
    }
    return true;
  }

}
