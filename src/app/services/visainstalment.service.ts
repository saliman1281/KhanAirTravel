import { Injectable } from '@angular/core';
import { GenericserviceService } from '../generic-services/genericservice.service';

@Injectable({
  providedIn: 'root'
})
export class VisainstalmentService {

  constructor(private genericservices: GenericserviceService) { }

  AddVisaInstalmentDetail(data: any) {
    return this.genericservices.GenericServicePostMethod("VisaInstalment/AddVisaInstalment", data);
  }
  GetVisaInstalmentDetail(data: any) {
    return this.genericservices.GenericServicePostMethod("VisaInstalment/GetVisaInstalment", data);
  }
}
