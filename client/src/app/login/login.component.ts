import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService, private router:Router) { }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    console.log(event);
    let username = event.target.querySelector('#username').value;
    let password = event.target.querySelector('#password').value;
    
    this.Auth.getUserDetails(username, password)
    .subscribe(data => {
      localStorage.setItem('user', JSON.parse(JSON.stringify(data)).user);
      localStorage.setItem('token', JSON.parse(JSON.stringify(data)).token);
      localStorage.setItem('loggedIn', 'true');
      this.router.navigate(['users']);

    });
  }

}
