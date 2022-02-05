import { Injectable } from '@angular/core';
import { GenericserviceService } from '../generic-services/genericservice.service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private genericservices: GenericserviceService) { }

  GetAllCustomer() {
    return this.genericservices.GenericServiceGetMethod("Customer/GetAllCustomer", "");
  }

  AddCustomer(data: any) {
    return this.genericservices.GenericServicePostMethod("Customer/AddCustomer", data);
  }

  UpdateCustomer(data: any) {
    return this.genericservices.GenericServicePostMethod("Customer/UpdateCustomer", data);
  }

  GetCustomer(data: any) {
    return this.genericservices.GenericServiceGetMethod("Customer/GetCustomer?custId=" + data, "");
  }

  DeleteCustomer(data: any) {
    return this.genericservices.GenericServiceGetMethod("Customer/DeleteCustomer?custId=" + data, "");
  }

  CustomerDuplicate(data: any) {
    return this.genericservices.GenericServiceGetMethod("Customer/CustomerDuplicate?custId=" + data, "");
  }
}
