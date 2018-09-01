import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceService} from './insurances.service';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';

export interface Insurance {
  id:string,
  amountInsured:number,
  email:string,
  inceptionDate:string,
  installmentPayment:boolean,
  clientId:string,
  userName:string
}


@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.css']
})
export class InsurancesComponent implements OnInit {
  displayedColumns : string[] = ['id', 'userName', 'amountInsured', 'email', 'inceptionDate', 'installmentPayment'];
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private insuranceService:InsuranceService) { }

  ngOnInit() {
    this.insuranceService.getAll()
      .subscribe(data => {
        this.dataSource = new MatTableDataSource<Insurance>(JSON.parse(JSON.stringify(data)));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
