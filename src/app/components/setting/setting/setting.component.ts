import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirLineRequest, DealerCommonResponse, RepresentativeRequest, TicketTypeRequest, VisaTypeRequest } from 'src/app/commonmodels/commonmodel';
import { CommonService } from 'src/app/services/commonservice/common.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  // addCustomerForm: FormGroup;
  errorMessage: string = "";

  representativeRequest: RepresentativeRequest;
  airLineRequest: AirLineRequest;
  ticketTypeRequest: TicketTypeRequest;
  visaTypeRequest: VisaTypeRequest;

  dealerCommonResponse: DealerCommonResponse[] = [];
  constructor(private fb: FormBuilder, private _commonService: CommonService) {
    this.ResetAll();
  }

  ngOnInit(): void {
    this.GetAllDealer();
  }
  GetAllDealer() {
    this._commonService.GetCommonData().subscribe((res: any) => {
      this.dealerCommonResponse = res;
      this.dealerCommonResponse=this.dealerCommonResponse.sort((a,b) => a.dealerName > b.dealerName ? 1 : -1);
      this.representativeRequest.DealerId=this.dealerCommonResponse[0].dealerId;
    });
  }
  AddRepresentative() {
    if (this.representativeRequest.DealerId == null && this.representativeRequest.RepName == null) {
      this.errorMessage = "Please Select Dealer And Enter Representative Name.";
      return;
    }
    this.representativeRequest.modifiedBy='';
    this._commonService.AddRepresentative(this.representativeRequest).subscribe((res: any) => {
      this.showToast('Record Successfully inserted');
      console.log(res);
      this.ResetAll();

    });
  }
  AddAirLine() {
    if (this.airLineRequest.AirLineABR == null && this.airLineRequest.AirLineFullName == null) {
      this.errorMessage = "Please Enter AirLine Name And Short Name.";
      return;
    }
    this.airLineRequest.modifiedBy='';
    this._commonService.AddAirLine(this.airLineRequest).subscribe((res: any) => {
      this.showToast('Record Successfully inserted');
      console.log(res);
      this.ResetAll();


    });
  }
  AddTicketType() {
    if (this.ticketTypeRequest.TicketTypeName == null) {
      this.errorMessage = "Please Enter Ticket Type.";
      return;
    }
    this.ticketTypeRequest.modifiedBy='';
    this._commonService.AddTicketType(this.ticketTypeRequest).subscribe((res: any) => {
      this.showToast('Record Successfully inserted');
      console.log(res);
      this.ResetAll();
    });
  }
  AddVisaType() {
    if (this.visaTypeRequest.VisaTypeName == null) {
      this.errorMessage = "Please Enter Visa Type.";
      return;
    }
    this.visaTypeRequest.modifiedBy='';
    this._commonService.AddVisaType(this.visaTypeRequest).subscribe((res: any) => {
      this.showToast('Record Successfully inserted');
      console.log(res);
      this.ResetAll();
    });
  }
  ResetAll() {
    this.errorMessage = "";
    this.representativeRequest = new RepresentativeRequest();
    this.airLineRequest = new AirLineRequest();
    this.ticketTypeRequest = new TicketTypeRequest();
    this.visaTypeRequest = new VisaTypeRequest();
  }
  showToast(msg) {
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 5000,
      title: "Success!", text: msg, icon: 'success'
    });
  }
  // customerFormValidation() {
  //   this.addCustomerForm = this.fb.group({
  //     RepName: ['', Validators.required],
  //     DealerName: ['', Validators.required],
  //   })
  // }

  // get f() { return this.addCustomerForm.controls; }
}