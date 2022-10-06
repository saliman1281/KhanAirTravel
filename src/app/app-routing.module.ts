import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerComponent } from './components/customer/customer/customer.component';
import { ReportsComponent } from './components/reports/reports/reports.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { TicketsdetailComponent } from './components/ticket/ticketsdetail/ticketsdetail.component';
import { DailyexpenseComponent } from './components/expense/dailyexpense/dailyexpense.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { VisadetailComponent } from './components/visa/visadetail/visadetail.component';
import { DealerdetailsComponent } from './components/dealer/dealerdetails/dealerdetails.component';
import { SettingComponent } from './components/setting/setting/setting.component';
import { DealerTransactionComponent } from './components/dealer/dealerTransaction/dealer-transaction/dealer-transaction.component';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'dealerdetails', component: DealerdetailsComponent },
  { path: 'dealerTransaction', component: DealerTransactionComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'addcustomer', component: AddCustomerComponent },
  { path: 'ticketsdetail', component: TicketsdetailComponent },
  { path: 'visadetail', component: VisadetailComponent },
  { path: 'dailyexpense', component: DailyexpenseComponent },
  { path: 'setting', component: SettingComponent },
  { path: '**', component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
