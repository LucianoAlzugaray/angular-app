import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private context:string;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit() {
    
  }
  
  logout() {
    this.authService.logout();
  }

  isAdmin(){
    return this.authService.getRole() == 'admin';
  }

  goToClients(){
    if (this.router.url != '/clients')
      this.router.navigate(['clients']);
  }


  goToInsurances(){
    if (this.router.url != '/insurances')
      this.router.navigate(['insurances']);
  }
}
