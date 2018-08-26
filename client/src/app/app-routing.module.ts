import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { InsurancesComponent }  from './insurances/insurances.component';
import { UsersComponent }       from './users/users.component';

const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'insurances', component: InsurancesComponent },
  {path: 'users', component: UsersComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}

export const routingComponents = [
  LoginComponent,
  InsurancesComponent,
  UsersComponent
]