import { Router, CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthgaurdService implements CanActivate {
  constructor(private cookie: CookieService, private router: Router) {}

  canActivate() {
    let token = this.cookie.get('token');
    if (!token) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
