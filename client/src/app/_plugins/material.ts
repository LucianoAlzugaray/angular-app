import {MatButtonModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  imports: [
      MatButtonModule, 
      MatFormFieldModule,
      MatInputModule,
      MatButtonToggleModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule
    ],
  exports: [
      MatButtonModule, 
      MatFormFieldModule,
      MatInputModule,
      MatButtonToggleModule,
      MatTableModule,
      MatSortModule,
      MatPaginatorModule
    ],
})
export class MaterialModule { }