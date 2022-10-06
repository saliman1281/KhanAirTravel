import { Injectable } from '@angular/core';
import { GenericserviceService } from '../generic-services/genericservice.service';

@Injectable({
  providedIn: 'root'
})
export class TicketinstalmentService {

  constructor(private genericservices: GenericserviceService) { }

  AddTicketInstalmentDetail(data: any) {
    return this.genericservices.GenericServicePostMethod("TicketInstalment/AddTicketInstalmentDetail", data);
  }

  GetTicketInstalmentDetail(data: any) {
    return this.genericservices.GenericServicePostMethod("TicketInstalment/GetTicketInstalmentDetail", data);
  }

}
