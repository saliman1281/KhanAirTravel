import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerticketserviceService {

  constructor() { }
  obj: any;
  ShairingData(data: any) {
    this.obj = data;
  }
  GetSharingData() {
    return this.obj;
  }

  
}
