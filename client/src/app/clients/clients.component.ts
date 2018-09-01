import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService} from './clients.service';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

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
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private clientService:ClientService) { }

  ngOnInit() {
    this.clientService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Client>(JSON.parse(JSON.stringify(data)));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
 
}
