import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
    id: string;
}

@Component({
    selector: 'app-clientinfo',
    templateUrl: './clientInfo.component.html',
    styleUrls: ['./clientInfo.component.css']
  })
export class ClientInfoComponent implements OnInit { 

    constructor(
        public dialogRef: MatDialogRef<ClientInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    ngOnInit(){}

    okClick(): void {
        this.dialogRef.close();
      }
}
