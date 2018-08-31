import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string = '';
  password:string = '';

  constructor(private Auth: AuthService, private router:Router) { }

  ngOnInit() {
  }

  loginUser(){
 
    this.Auth.getUserDetails(this.username, this.password)
    .subscribe(data => {
      localStorage.setItem('token', JSON.parse(JSON.stringify(data)).token);
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['clients']);
    });
  }

}
