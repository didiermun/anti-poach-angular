import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './components/login/login.component'
import {HomeComponent} from './components/home/home.component'
import { NewReportComponent} from './components/new-report/new-report.component'
import {PatrouilleComponent} from './components/patrouille/patrouille.component'
import {NotfoundComponent} from  './components/notfound/notfound.component'
import {DashboardComponent} from './components/dashboard/dashboard.component'
import {ReportsComponent} from './components/reports/reports.component'
import {DashIndexComponent} from './components/dash-index/dash-index.component'
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
  imports: [RouterModule.forRoot(routes,{})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
