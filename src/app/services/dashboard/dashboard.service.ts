import { Injectable } from '@angular/core';
import { GenericserviceService } from '../../generic-services/genericservice.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private genericservices: GenericserviceService) { }
  GetDashboardData() {
    return this.genericservices.GenericServiceGetMethod("Dashboard/GetDashboardData", "");
  }
}
