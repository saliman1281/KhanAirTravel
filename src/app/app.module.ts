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
import { ReportsComponent } from './components/reports/reports/reports.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { TicketsdetailComponent } from './components/ticket/ticketsdetail/ticketsdetail.component';
import { RouterModule } from '@angular/router';
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
import { AddvisaComponent } from './components/visa/addvisa/addvisa.component';
import { VisadetailComponent } from './components/visa/visadetail/visadetail.component';
import { VisainstalmentComponent } from './components/visa/visainstalment/visainstalment.component';
import { TicketserviceService } from './services/ticketservice.service';
import { TicketinstalmentService } from './services/ticketinstalment.service';
import { DealerinstalmentComponent } from './components/dealer/dealerinstalment/dealerinstalment.component';
import { AddDealerComponent } from './components/dealer/add-dealer/add-dealer.component';
import { DealerdetailsComponent } from './components/dealer/dealerdetails/dealerdetails.component';
import {CommonService} from './services/commonservice/common.service';
import { SettingComponent } from './components/setting/setting/setting.component';
import { DealerTransactionComponent } from './components/dealer/dealerTransaction/dealer-transaction/dealer-transaction.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    RightbarComponent,
    CustomerComponent,
    ReportsComponent,
    AddCustomerComponent,
    TicketsdetailComponent,
    DailyexpenseComponent,
    PagenotfoundComponent,
    FilterPipe,
    AddticketComponent,
    TicketinstalmentComponent,
    AddvisaComponent,
    VisadetailComponent,
    VisainstalmentComponent,
    DealerinstalmentComponent,
    AddDealerComponent,
    DealerdetailsComponent,
    SettingComponent,
    DealerTransactionComponent
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
  providers: [
    GenericserviceService, 
    ServicesService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
