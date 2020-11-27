import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { user } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted: Boolean = false;
  message: String;
  showError: Boolean = false;
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  restrictAlphabets(e) {
    var x = e.which || e.keycode;
    if (x >= 48 && x <= 57) return true;
    else return false;
  }

  signUp(form: NgForm) {
    this.submitted = true;
    console.log(form);
    if (form.valid) {
      const user = form.value as user;
      user.isAdmin = typeof(user.isAdmin) == "boolean" ? user.isAdmin: false;
      this.userService.createUser(user).subscribe(
        (res) => {
          alert('Sign-up successfull!. Please login');
          this.router.navigate(['login']);
        },
        (err: HttpErrorResponse) => {
          console.log(err.error);
          if (err.error && err.error.message) {
            alert(err.error.message);
          }
        }
      );
    }
  }
}
