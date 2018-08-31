import { Component, OnInit } from '@angular/core';
import { InsuranceService} from './insurances.service';
import { ClientService} from '../clients/clients.service';

export interface Insurance {
  id:string,
  amountInsured:number,
  email:string,
  inceptionDate:string,
  installmentPayment:boolean,
  clientId:string
}


@Component({
  selector: 'app-insurances',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.css']
})
export class InsurancesComponent implements OnInit {
  displayedColumns : string[] = ['id', 'name', 'email', 'role'];

  dataSource: Insurance[];
  
  constructor(private insuranceService:InsuranceService, 
              private clientService: ClientService) { }

  ngOnInit() {
    let _this = this;
    this.insuranceService.getAll()
      .subscribe(data => {
        _this.dataSource = JSON.parse(JSON.stringify(data));
      });
  }
  
  getName(user){

  }

  printDate(date){
    
  }
}
