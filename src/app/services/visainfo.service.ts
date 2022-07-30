import { Injectable } from '@angular/core';
import { GenericserviceService } from '../generic-services/genericservice.service';

@Injectable({
  providedIn: 'root'
})
export class VisaInfoService {

  constructor(private genericservices: GenericserviceService) { }

  AddVisaDetail(data: any) {
    return this.genericservices.GenericServicePostMethod("VisaInfo/AddVisaDetail", data);
  }

  GetVisaDetail(data: any) {
    return this.genericservices.GenericServicePostMethod("VisaInfo/GetVisaDetail", data);
  }
  GetVisaInfo(data: any) {
    return this.genericservices.GenericServiceGetMethod("VisaInfo/GetVisaInfo?visaNo=" + data, "");
  }
}
