import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted: Boolean = false;
  message: String;
  showError: Boolean = false;
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //alert("remove token");
    this.cookieService.delete('token');
  }
  onSubmit(form: NgForm) {
    console.log('sub');
    this.submitted = true;
    //  console.log(form.value);
    if (form.valid) {
      try {
        this.authService.login(form.value).subscribe(
          (res) => {
            console.log(res);
            this.cookieService.set('token', res['token']);
            this.router.navigate(['']);
          },
          (err: HttpErrorResponse) => {
            if (err.status == 401) {
              alert('Invalid credentials');
            }
          }
        );
      } catch (err) {
        console.log(err)
      }
    }
  }
}
