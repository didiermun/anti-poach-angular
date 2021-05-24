import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {HomeComponent} from './home/home.component'
import { NewReportComponent} from './new-report/new-report.component'
import {PatrouilleComponent} from './patrouille/patrouille.component'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'new-report', component: NewReportComponent},
  { path: 'patrouille/:patrouilleId',component: PatrouilleComponent },
  {path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
