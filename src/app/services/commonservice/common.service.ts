import { Injectable } from '@angular/core';
import { GenericserviceService } from '../../generic-services/genericservice.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private genericservices: GenericserviceService) { }

  GetCommonData() {
    return this.genericservices.GenericServiceGetMethod("Common/GetCommonData","");
  }
  GetAirLineList() {
    return this.genericservices.GenericServiceGetMethod("Common/GetAirLineList","");
  }
  AddAirLine(data: any) {
    return this.genericservices.GenericServicePostMethod("Common/AddAirLine", data);
  }
  GetRepresentativeList(data: any) {
    return this.genericservices.GenericServiceGetMethod("Common/GetRepresentativeList?dealerId=" + data,"");
  }
  AddRefInfo(data: any) {
    return this.genericservices.GenericServicePostMethod("Common/AddRefInfo", data);
  }
  CreateDBBackUp() {
    return this.genericservices.GenericServiceGetMethod("Common/CreateDBBackUp", "");
  }
  AddRepresentative(data: any) {
    return this.genericservices.GenericServicePostMethod("Common/AddRefInfo", data);
  }
  AddTicketType(data: any) {
    return this.genericservices.GenericServicePostMethod("Common/AddTicketType", data);
  }
  GetTicketTypeList() {
    return this.genericservices.GenericServiceGetMethod("Common/GetTicketTypeList","");
  }
  AddVisaType(data: any) {
    return this.genericservices.GenericServicePostMethod("Common/AddVisaType", data);
  }
  GetVisaTypeList() {
    return this.genericservices.GenericServiceGetMethod("Common/GetVisaTypeList","");
  }
}
