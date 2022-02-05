import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer/customer.component';
import { DealerComponent } from './dealer/dealer/dealer.component';
import { ReportsComponent } from './reports/reports/reports.component';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { TicketinformationComponent } from './ticket/ticketinformation/ticketinformation.component';
import { TicketsdetailComponent } from './ticket/ticketsdetail/ticketsdetail.component';
import { DealerdetailComponent } from './dealer/dealerdetail/dealerdetail.component';
import { DailyexpenseComponent } from './expense/dailyexpense/dailyexpense.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'dealer', component: DealerComponent },
  { path: 'dealerdetail', component: DealerdetailComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'addcustomer', component: AddCustomerComponent },
  { path: 'ticketinformation', component: TicketinformationComponent },
  { path: 'ticketsdetail', component: TicketsdetailComponent },
  { path: 'dailyexpense', component: DailyexpenseComponent },
  { path: '**', component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
