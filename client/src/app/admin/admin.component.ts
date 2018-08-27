import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  user: Object;

  constructor() { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }
  
  printUser() {
    this.user = localStorage.getItem('user');
    console.log(this.user);
  }
}
