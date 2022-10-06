import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AirLineRequest, AirLineResponse, DealerCommonResponse, RepresentativeCommonResponse, RepresentativeRequest, TicketTypeRequest, TicketTypeResponse, VisaTypeRequest, VisaTypeResponse } from 'src/app/commonmodels/commonmodel';
import { CommonService } from 'src/app/services/commonservice/common.service';
import Swal from 'sweetalert2';
import { TicketInfoRequest } from '../../ticket/ticketmodel/ticketmodel';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  // addCustomerForm: FormGroup;
  errorMessage: string = "";

  isUpdate: boolean = false;

  representative: boolean = true;
  airline: boolean = false;
  tickettype: boolean = false;
  visatype: boolean = false;

  representativeRequest: RepresentativeRequest;
  airLineRequest: AirLineRequest;
  ticketTypeRequest: TicketTypeRequest;
  visaTypeRequest: VisaTypeRequest;

  dealerCommonResponse: DealerCommonResponse[] = [];
  representativeCommonResponse: RepresentativeCommonResponse[] = [];
  airlineResponse: AirLineResponse[];
  ticketTypeResponse: TicketTypeResponse[] = [];
  visaTypeResponse: VisaTypeResponse[] = [];
  ticketReqObj: TicketInfoRequest;

  constructor(private fb: FormBuilder, private _commonService: CommonService) {
    this.ResetAll();
  }

  ngOnInit(): void {
    this.GetAllDealer();
    this.GetAirLineList();
    this.GetTicketTypeList();
  }
  GetAllDealer() {
    this._commonService.GetCommonData().subscribe((res: any) => {
      this.dealerCommonResponse = res;
      this.dealerCommonResponse = this.dealerCommonResponse.sort((a, b) => a.dealerName > b.dealerName ? 1 : -1);
      this.representativeRequest.dealerId = this.dealerCommonResponse[0].dealerId;
      this.RepresentativeList(this.representativeRequest.dealerId);
    });
  }
  AddRepresentative() {
    if (this.representativeRequest.dealerId == null && this.representativeRequest.representativeName == null) {
      this.errorMessage = "Please Select Dealer And Enter Representative Name.";
      return;
    }
    this.representativeRequest.modifiedBy = '';
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
    this.airLineRequest.modifiedBy = '';
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
    this.ticketTypeRequest.modifiedBy = '';
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
    this.visaTypeRequest.modifiedBy = '';
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
  GetAirLineList() {
    this._commonService.GetAirLineList().subscribe((res: any) => {
      this.airlineResponse = res;
      this.airlineResponse = this.airlineResponse.sort((a, b) => a.airLineABR > b.airLineABR ? 1 : -1);
    });
  }
  GetTicketTypeList() {
    this._commonService.GetTicketTypeList().subscribe((res: any) => {
      this.ticketTypeResponse = res;
      this.ticketTypeResponse = this.ticketTypeResponse.sort((a, b) => a.ticketTypeName > b.ticketTypeName ? 1 : -1);
    });
  }
  RepresentativeList(dealerid: any) {
    this._commonService.GetRepresentativeList(dealerid).subscribe((res: any) => {
      this.representativeCommonResponse = res;
      if (this.ticketReqObj.representId == 0) {
        this.ticketReqObj.representId = this.representativeCommonResponse[0].representId;
      }
    });
  }
  GetAllVisaType() {
    this._commonService.GetVisaTypeList().subscribe((res: any) => {
      this.visaTypeResponse = res;
      this.visaTypeResponse = this.visaTypeResponse.sort((a, b) => a.visaTypeName > b.visaTypeName ? 1 : -1);
    });
  }
  GetDealerName(repId: number) {
    return this.dealerCommonResponse.find(x => x.dealerId == repId).dealerName;
  }
  ClickTab(type: number) {
    this.representative = false;
    this.airline = false;
    this.tickettype = false;
    this.visatype = false;
    switch (type) {
      case 1: {
        this.airline = true;
        break;
      }
      case 2: {
        this.tickettype = true;
        break;
      }
      case 3: {
        this.visatype = true;
        break;
      }
      default: {
        this.representative = true;
        break;
      }
    }
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