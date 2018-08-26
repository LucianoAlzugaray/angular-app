import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { InsurancesComponent }  from './insurances/insurances.component';
import { UsersComponent }       from './users/users.component';
import { AdminComponent }       from './admin/admin.component';

const routes: Routes = [
  {    
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {path: 'insurances', component: InsurancesComponent },
      {path: 'users', component: UsersComponent },
    ]
  }, 
  { path: 'login', component: LoginComponent },
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
  UsersComponent,
  AdminComponent
]