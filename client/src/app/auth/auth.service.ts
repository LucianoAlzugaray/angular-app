import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL  =  'http://localhost:8081';
  constructor(private http:HttpClient) { }

  getUserDetails(username, password){
    return this.http.post(`${this.API_URL}/users/login`, {username, password});
  }
}
