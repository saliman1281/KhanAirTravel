import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { DealerComponent } from './components/dealer/dealer/dealer.component';
import { ReportsComponent } from './components/reports/reports/reports.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { TicketinformationComponent } from './components/ticket/ticketinformation/ticketinformation.component';
import { TicketsdetailComponent } from './components/ticket/ticketsdetail/ticketsdetail.component';
import { DealerdetailComponent } from './components/dealer/dealerdetail/dealerdetail.component';
import { DailyexpenseComponent } from './components/expense/dailyexpense/dailyexpense.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';


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
