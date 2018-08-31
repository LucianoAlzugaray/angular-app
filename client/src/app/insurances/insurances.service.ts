  import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  API_URL  =  'http://localhost:8081';
  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(`${this.API_URL}/insurances/`);
  }

}
