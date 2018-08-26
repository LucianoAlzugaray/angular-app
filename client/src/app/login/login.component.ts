import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private Auth: AuthService) { }

  ngOnInit() {
  }

  loginUser(event){
    event.preventDefault();
    console.log(event);
    let username = event.target.querySelector('#username').value;
    let password = event.target.querySelector('#password').value;
    console.log('username' + username);
    console.log('password' + password);
    
    this.Auth.getUserDetails(username, password);

  }

}
