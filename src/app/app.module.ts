import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { RightbarComponent } from './components/layout/rightbar/rightbar.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { DealerComponent } from './components/dealer/dealer/dealer.component';
import { ReportsComponent } from './components/reports/reports/reports.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { TicketsdetailComponent } from './components/ticket/ticketsdetail/ticketsdetail.component';
import { RouterModule } from '@angular/router';
import { DealerdetailComponent } from './components/dealer/dealerdetail/dealerdetail.component';
import { DailyexpenseComponent } from './components/expense/dailyexpense/dailyexpense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericserviceService } from './generic-services/genericservice.service';
import { ServicesService } from './services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AddticketComponent } from './components/ticket/addticket/addticket.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TicketinstalmentComponent } from './components/ticket/ticketinstalment/ticketinstalment.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    RightbarComponent,
    CustomerComponent,
    DealerComponent,
    ReportsComponent,
    AddCustomerComponent,
    TicketsdetailComponent,
    DealerdetailComponent,
    DailyexpenseComponent,
    PagenotfoundComponent,
    FilterPipe,
    AddticketComponent,
    TicketinstalmentComponent
  ],
  imports: [
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule

  ],
  entryComponents: [AddticketComponent],
  providers: [GenericserviceService, ServicesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
