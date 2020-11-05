import { user } from './../models/user';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUser() {
    return this.http.get('http://localhost:5000/api/user', this.setHeaders("token"));
  }

  createUser(user:user){
    return this.http.post('http://localhost:5000/signup', user ,this.setHeaders())
  }

  setHeaders(token?:String) {
    let headers = {
      Accept: 'application/json',
      'content-type': 'application/json',
    };
    if(token){
      headers["Authorization"] = this.cookieService.get('token');
    }
    return { headers: new HttpHeaders(headers) };
  }
}
