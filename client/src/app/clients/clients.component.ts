import { Component, OnInit } from '@angular/core';
import { ClientService} from './clients.service';
export interface Client {
  name: string;
  email: string;
  id: string;
  role: string;
}


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  displayedColumns : string[] = ['id', 'name', 'email', 'role'];

  dataSource: Client[];
  
  constructor(private clientService:ClientService) { }

  ngOnInit() {
    let _this = this;
    this.clientService.getAll()
      .subscribe(data => {
        console.log(data)
        _this.dataSource = JSON.parse(JSON.stringify(data));
      });
  }
 
}
