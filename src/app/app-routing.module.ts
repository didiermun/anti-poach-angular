import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component'
import {HomeComponent} from './home/home.component'
import { NewReportComponent} from './new-report/new-report.component'
import {PatrouilleComponent} from './patrouille/patrouille.component'
import {NotfoundComponent} from  './notfound/notfound.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {ReportsComponent} from './reports/reports.component'
import {DashIndexComponent} from './dash-index/dash-index.component'
import {AuthGuardService} from './services/guards/authGuardService'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'new-report',canActivate: [AuthGuardService], component: NewReportComponent},
  { path: 'patrouille/:patrouilleId',component: PatrouilleComponent },
  {path: 'admin', component: DashboardComponent,data: {roles: ['ADMIN']},canActivate: [AuthGuardService],children:[
    { path: '', component: DashIndexComponent},
    {path: 'reports',component:ReportsComponent},
  ]},
  {path: '', component: HomeComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
