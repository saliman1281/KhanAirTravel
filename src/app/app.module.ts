import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RightbarComponent } from './layout/rightbar/rightbar.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { DealerComponent } from './dealer/dealer/dealer.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { TicketinformationComponent } from './ticket/ticketinformation/ticketinformation.component';
import { TicketsdetailComponent } from './ticket/ticketsdetail/ticketsdetail.component';
import { RouterModule } from '@angular/router';
import { DealerdetailComponent } from './dealer/dealerdetail/dealerdetail.component';
import { DailyexpenseComponent } from './expense/dailyexpense/dailyexpense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenericserviceService } from './generic-services/genericservice.service';
import { ServicesService } from './services/services.service';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AddticketComponent } from './ticket/addticket/addticket.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


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
    TicketinformationComponent,
    TicketsdetailComponent,
    DealerdetailComponent,
    DailyexpenseComponent,
    PagenotfoundComponent,
    FilterPipe,
    AddticketComponent
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
