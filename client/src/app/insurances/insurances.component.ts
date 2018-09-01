import { Component, OnInit, ViewChild } from '@angular/core';
import { InsuranceService} from './insurances.service';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material';
import { ClientInfoComponent } from '../clients/clientInfo.component';

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
  loading: boolean = true;
  empty: boolean = false;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private insuranceService:InsuranceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.insuranceService.getAll()
      .subscribe(data => {
        this.loading = false;
        if(data){
          this.dataSource = new MatTableDataSource<Insurance>(JSON.parse(JSON.stringify(data)));
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.empty = true;
        }
      });
  }


  openDialog(client):void {
      console.log(client.id);
      const dialogRef = this.dialog.open(ClientInfoComponent, {
        width: '250px',
        data: {id: client.id }
      });
    }  
}
