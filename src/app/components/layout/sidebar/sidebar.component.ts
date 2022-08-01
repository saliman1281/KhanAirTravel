import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isDashboard: boolean = true;
  isCustomer: boolean = false;
  isDealerHistory: boolean = false;
  isDealerRecord: boolean = false;
  isReport: boolean = false;
  isExpense: boolean = false;
  isSetting: boolean=false;
  isDealerTransaction: boolean=false;

  constructor(private _router: Router) {
    _router.events.subscribe((val) => {
      this.routeActive();
    })
  }

  ngOnInit() {
  }
  RoutTo(param: string) {
    let link: any[] = [param];
    this.routeActive();
    this._router.navigate(link);
  }
  routeActive() {
    let clientDomain = "";
    clientDomain = window.location.pathname + window.location.search;

    this.isDashboard = false;
    this.isCustomer = false;
    this.isDealerHistory = false;
    this.isDealerRecord = false;
    this.isReport = false;
    this.isExpense = false;
    this.isSetting = false;
    this.isDealerTransaction=false;

    if (clientDomain.includes('customer') || clientDomain.includes('ticketsdetail') ||clientDomain.includes('visadetail')) {
      this.isCustomer = true;
    }
    else if (clientDomain.includes('dealerdetails')) {
      this.isDealerHistory = true;
      this.isDealerRecord = true;
    }
    else if (clientDomain.includes('dealerTransaction')) {
      this.isDealerHistory = true;
      this.isDealerTransaction = true;
    }
    else if (clientDomain.includes('reports')) {
      this.isReport = true;
    }
    else if (clientDomain.includes('dailyexpense')) {
      this.isExpense = true;
    }
    else if (clientDomain.includes('setting')) {
      this.isSetting = true;
    }
    else {
      this.isDashboard = true;
    }
  }
}
