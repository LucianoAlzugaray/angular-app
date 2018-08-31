import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AuthService} from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  API_URL  =  'http://localhost:8081';
  constructor(private http:HttpClient, private authService:AuthService) { }
  
  
  getAll(){
    console.log(`${this.API_URL}/users/`);
    return this.http.get(`${this.API_URL}/users/`);
  }

}
