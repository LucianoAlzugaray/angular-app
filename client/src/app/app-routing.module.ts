import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }       from './login/login.component';
import { InsurancesComponent }  from './insurances/insurances.component';
import { ClientsComponent }     from './clients/clients.component';
import { AdminComponent }       from './admin/admin.component';
import { AuthGuard }            from './_guards/auth.guard'
const routes: Routes = [
  {    
    path: '',
    component: AdminComponent,
    children: [
      { 
        path: '', 
        redirectTo: 'clients', 
        pathMatch: 'full' 
      },
      {
        path: 'insurances', 
        component: InsurancesComponent, 
        canActivate: [AuthGuard]
      },
      {
        path: 'clients', 
        component: ClientsComponent,
        canActivate: [AuthGuard] 
      },
    ]
  }, 
  { 
    path: 'login', 
    component: LoginComponent 
  },
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
  ClientsComponent,
  AdminComponent
]