import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UtenteService } from '../servizi/utente.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private utenteService : UtenteService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.utenteService.is_logged && this.utenteService.isAbilitato()){
        return this.utenteService.isAdmin();
      }else{
        this.router.navigate(['/login']);
        return false;

      }
   
  }
  
}
