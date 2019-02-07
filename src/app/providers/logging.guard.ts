import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';
import { StorageService } from './localStorage';

@Injectable({
  providedIn: 'root'
})
export class LoggingGuard implements CanActivate {

  constructor(private router: Router,
    private storage: StorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    if (this.storage.getData('ngStorage-token')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;

  }


}
