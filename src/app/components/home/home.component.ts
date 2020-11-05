import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { user } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user: user;
  constructor(userService: UserService, router: Router) {
    userService.getUser().subscribe(
      (response) => {
        this.user = response as user;
      },
      (err:HttpErrorResponse) => {
        console.log(err);
        if (err.status == 401) {
          alert(err.error.message)
          router.navigate(['login']);
        }
      }
    );
  }

  ngOnInit(): void {}
}
