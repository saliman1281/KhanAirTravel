import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isBackUp:string="";
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.GetDashboardData();
  }
  GetDashboardData() {
    this.dashboardService.GetDashboardData().subscribe((res: any) => {
      if (res != null) {
        this.isBackUp=res;
      }

    }),
      error => {
        //this._router.navigateByUrl("/customer");
      };
  }
}
