import { Injectable } from '@angular/core';
import {GenericserviceService} from '../../generic-services/genericservice.service';

@Injectable({
  providedIn: 'root'
})
export class DealerinfoService {

  constructor(private genericservices: GenericserviceService) { }
  GetAllDealer() {
    return this.genericservices.GenericServiceGetMethod("DealerInfo/GetAllDealer", "");
  }
  GetDealerInfo(data: any) {
    return this.genericservices.GenericServiceGetMethod("DealerInfo/GetDealerInfo?dealerId=" + data, "");
  }
  AddDealerInfo(data: any) {
    return this.genericservices.GenericServicePostMethod("DealerInfo/AddDealerInfo", data);
  }
  UpdateDealerInfo(data: any) {
    return this.genericservices.GenericServicePostMethod("DealerInfo/UpdateDealerInfo", data);
  }
}
