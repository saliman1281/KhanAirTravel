import { Injectable } from '@angular/core';
import { GenericserviceService } from '../generic-services/genericservice.service';

@Injectable({
  providedIn: 'root'
})
export class TicketserviceService {

  constructor(private genericservices: GenericserviceService) { }

  AddticketInfo(data: any) {
    return this.genericservices.GenericServicePostMethod("TicketInfo/AddticketInfo", data);
  }

  UpdateTicketInfo(data: any) {
    return this.genericservices.GenericServicePostMethod("TicketInfo/UpdateTicketInfo", data);
  }

  GetAllTicketOfCustomer(data: any) {
    return this.genericservices.GenericServiceGetMethod("TicketInfo/GetAllTicketOfCustomer?customerCNIC=" + data, "");
  }

  GetTicketInfo(data: any) {
    return this.genericservices.GenericServiceGetMethod("TicketInfo/GetTicketInfo?ticketNumber=" + data, "");
  }
  DeleteTicket(data: any) {
    return this.genericservices.GenericServiceGetMethod("TicketInfo/DeleteTicket?ticketNumber=" + data, "");
  }
}
