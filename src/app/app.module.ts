import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { NewReportComponent } from './components/new-report/new-report.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PatrouilleComponent } from './components/patrouille/patrouille.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { NewRecordComponent } from './components/dialogs/new-record/new-record.component';
import { NewEditComponent } from './components/dialogs/new-edit/new-edit.component';
import {MatMenuModule} from '@angular/material/menu';
import { DeletePatrouilleComponent } from './components/dialogs/delete-pat/delete-pat.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NotifierModule } from 'angular-notifier';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReportsComponent } from './components/reports/reports.component';
import { CodesComponent } from './components/codes/codes.component';
import { DashIndexComponent } from './components/dash-index/dash-index.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';
import {AuthGuardService} from './services/guards/authGuardService';
import { DashboardChartsComponent } from './components/dashboard-charts/dashboard-charts.component';
import { DateAgoPipe } from './date-ago.pipe'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TopNavComponent,
    NewReportComponent,
    PatrouilleComponent,
    NewRecordComponent,
    NewEditComponent,
    DeletePatrouilleComponent,
    NotfoundComponent,
    DashboardComponent,
    ReportsComponent,
    CodesComponent,
    DashIndexComponent,
    DashboardChartsComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatChipsModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    FormsModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatIconModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GraphQLModule,
    HttpClientModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    NgxSkeletonLoaderModule,
    NotifierModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    NgxChartsModule,
    MatTabsModule
    
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
