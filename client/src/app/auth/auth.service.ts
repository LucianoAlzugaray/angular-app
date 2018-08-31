import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL  =  'http://localhost:8081';
  constructor(private http:HttpClient, private router:Router) { }

  getUserDetails(username, password){
    return this.http.post(`${this.API_URL}/users/login`, {username, password});
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  isUserLogged(){
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
