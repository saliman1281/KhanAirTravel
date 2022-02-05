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
  isReport: boolean = false;
  isExpense: boolean = false;
  //isAppoinmentHistory: boolean;

  constructor(private _router: Router) {
    _router.events.subscribe((val) => {
      let clientDomain = window.location.href;
      if (clientDomain.includes('customer') || clientDomain.includes('ticketsdetail')) {
        this.isDashboard = false;
        this.isCustomer = true;
        this.isDealerHistory = false;
        this.isReport = false;
        this.isExpense = false;
      }
      else if (clientDomain.includes('dealer')) {
        this.isDashboard = false;
        this.isCustomer = false;
        this.isDealerHistory = true;
        this.isReport = false;
        this.isExpense = false;
      }
      else if (clientDomain.includes('reports')) {
        this.isDashboard = false;
        this.isCustomer = false;
        this.isDealerHistory = false;
        this.isReport = true;
        this.isExpense = false;
      }
      else if (clientDomain.includes('dailyexpense')) {
        this.isDashboard = false;
        this.isCustomer = false;
        this.isDealerHistory = false;
        this.isReport = false;
        this.isExpense = true;
      }
      else {
        this.isDashboard = true;
        this.isCustomer = false;
        this.isDealerHistory = false;
        this.isReport = false;
        this.isExpense = false;
      }
    })
  }

  ngOnInit() {
  }
  GoToDashboard() {
    let link: any[] = [''];
    this._router.navigate(link);
  }
  GoToCustomer() {
    let link: any[] = ['customer'];
    this._router.navigate(link);
  }
  GoToDealer() {
    let link: any[] = ['dealer'];
    this._router.navigate(link);
  }
  GoToExpense() {
    let link: any[] = ['dailyexpense'];
    this._router.navigate(link);
  }
  GoToReports() {
    let link: any[] = ['reports'];
    this._router.navigate(link);
  }
  routeActive() {
    let clientDomain = "";
    clientDomain = window.location.pathname + window.location.search;
    if (clientDomain.includes('customer') && clientDomain.includes('ticketsdetail')) {
      this.isDashboard = false;
      this.isCustomer = false;
      this.isDealerHistory = false;
      this.isReport = true;
      this.isExpense = false;
      //this.isAppoinmentHistory = false;
    }
    else if (clientDomain.includes('dealer')) {
      this.isDashboard = false;
      this.isCustomer = false;
      this.isDealerHistory = true;
      this.isReport = false;
      this.isExpense = false;
      //this.isAppoinmentHistory = false;
    }
    else if (clientDomain.includes('reports')) {
      this.isDashboard = false;
      this.isCustomer = false;
      this.isDealerHistory = true;
      this.isReport = false;
      this.isExpense = false;
      //this.isAppoinmentHistory = false;
    }
    else if (clientDomain.includes('dailyexpense')) {
      this.isDashboard = false;
      this.isCustomer = false;
      this.isDealerHistory = false;
      this.isReport = false;
      this.isExpense = true;
    }
    else {
      this.isDashboard = true;
      this.isCustomer = false;
      this.isDealerHistory = false;
      this.isReport = false;
      this.isExpense = false;
    }
  }
}
