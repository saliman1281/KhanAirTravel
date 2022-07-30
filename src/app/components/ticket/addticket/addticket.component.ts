import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerResponse } from 'src/app/components/customer/customermodel/customer-request';
import { TicketserviceService } from 'src/app/services/ticketservice.service';
import { TicketInfoRequest, TicketInfoResponse } from '../ticketmodel/ticketmodel';
import { DatePipe } from '@angular/common';
import { AirLineResponse, DealerCommonResponse, RepresentativeCommonResponse, RepresentativeRequest, TicketTypeRequest, TicketTypeResponse} from 'src/app/commonmodels/commonmodel';
import { CommonService } from 'src/app/services/commonservice/common.service';
declare var $: any;

@Component({
  selector: 'app-addticket',
  templateUrl: './addticket.component.html',
  styleUrls: ['./addticket.component.css'],
  providers: [DatePipe]
})
export class AddticketComponent implements OnInit {

  @Input() customerObjj: CustomerResponse;
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  addTicketForm: FormGroup;
  editString: string = "";
  dealerCommonResponse:DealerCommonResponse[]=[];
  representativeCommonResponse:RepresentativeCommonResponse[]=[];
  representativeRequest:RepresentativeRequest;
  airlineResponse:AirLineResponse[];
  ticketTypeResponse:TicketTypeResponse[]=[];
  
  ticketReqObj: TicketInfoRequest;
  //ticketResponseObj: TicketInfoResponse;
  submitted = false;

  isReturn: boolean = false;

  @Input() ticketNo: string = "";

  constructor(private _commonService:CommonService,private datePipe: DatePipe, private fb: FormBuilder, private _ticketservice: TicketserviceService) {
    this.ticketReqObj = new TicketInfoRequest();
    this.representativeRequest=new RepresentativeRequest();
  }
  ngOnInit() {
    this.TicketFormValidation();
    if (this.ticketNo != "") {
      this.GetTicketInfo(this.ticketNo);      
      this.GetAllDealer(2);
      this.GetAirLineList(2);
      this.GetTicketTypeList(2);
    }
    else{
      this.ticketReqObj.airlineTypeId =1;
      this.ticketReqObj.ticketTypeId = 1;
      this.ticketReqObj.modifiedBy = "";
      
      this.GetAllDealer(1);
      this.GetAirLineList(1);
      this.GetTicketTypeList(1);
    }
    this.HidePaidAmountInput();
  }
  get f() { return this.addTicketForm.controls; }

  TicketFormValidation() {
    this.addTicketForm = this.fb.group({
      dealer:[''],
      representative:[''],
      repName:[''],
      airLineName:[''],
      repMobile:[''],
      ticketNumber: ['', [Validators.required]],
      ticketPNR: ['', [Validators.required]],
      airlineType: [''],
      fromLocation: ['', [Validators.required]],
      toLocation: ['', [Validators.required]],
      bookingDate: [''],
      ticketCost: [0, [Validators.required]],
      ticketRetail: [0, [Validators.required]],
      ticketAmountPaid: [0],
      ticketType: [''],
      returnFrom: [''],
      returnTo: [''],
      returnDate: [''],
      hotelName: [''],
      hotelCostPrice: [''],
      hotelRetailPrice: [''],
      hotelBokingDate: [''],
      passportImage: [''],
    })
  }
  TicketTypeChange() {
    this.isReturn = false;
    if (this.ticketReqObj.ticketTypeId == 2)
      this.isReturn = true;

  }
  AddTicket() {
    //this.customerReq.customerImagePath = "";
    if (this.CheckGreater()) {
      this.ticketReqObj.customerCNIC = this.customerObjj.customerCNIC;
      this.ticketReqObj.customerId = this.customerObjj.customerId;
      this.submitted = true;
      if (this.addTicketForm.valid) {
        this._ticketservice.AddticketInfo(this.ticketReqObj).subscribe((res) => {
          this.sendMessageEvent.emit(res);
        });
      }
    }
    else {
      console.error("form is invalid");
    }
  }
  CloseModal() {
    this.sendMessageEvent.emit('close');
  }
  updateTicketInfo() {
    this.submitted = true;
    if (this.addTicketForm.valid) {
      this._ticketservice.UpdateTicketInfo(this.ticketReqObj).subscribe((res) => {
        this.sendMessageEvent.emit(res);
      });
    }
    else {
      console.log("form is invalid");
    }
  }
  GetAllDealer(type:number){
    this._commonService.GetCommonData().subscribe((res: any) => {
      this.dealerCommonResponse = res;
      this.dealerCommonResponse=this.dealerCommonResponse.sort((a,b) => a.dealerName > b.dealerName ? 1 : -1);
      if(type==1)
      this.ticketReqObj.dealerId=this.dealerCommonResponse[0].dealerId;

      this.RepresentativeList(this.ticketReqObj.dealerId);

    });
  }
  GetAirLineList(type:number){
    this._commonService.GetAirLineList().subscribe((res: any) => {
      this.airlineResponse = res;      
      this.airlineResponse=this.airlineResponse.sort((a,b) => a.airLineABR > b.airLineABR ? 1 : -1);
      if(type==1)
      this.ticketReqObj.airlineTypeId=this.airlineResponse[0].airLineId;
    });
  }
  GetTicketTypeList(type:number){
    this._commonService.GetTicketTypeList().subscribe((res: any) => {
      this.ticketTypeResponse = res;
      this.ticketTypeResponse=this.ticketTypeResponse.sort((a,b) => a.ticketTypeName > b.ticketTypeName ? 1 : -1);
      if(type==1)
      this.ticketReqObj.ticketTypeId=this.ticketTypeResponse[0].ticketId;
    });
  }
  RepresentativeList(dealerid:any){
    this._commonService.GetRepresentativeList(dealerid).subscribe((res: any) => {
      this.representativeCommonResponse = res;
      if(this.ticketReqObj.representId==0){
        this.ticketReqObj.representId=this.representativeCommonResponse[0].representId;
      }
    });
  }  
  GetTicketInfo(ticketNo) {
    this._ticketservice.GetTicketInfo(ticketNo).subscribe((res: any) => {
      if (res != null) {
        this.ticketReqObj = res;
        this.ticketReqObj.bookingDate = this.datePipe.transform(this.ticketReqObj.bookingDate, 'yyyy-MM-dd');
        this.ticketReqObj.returnDate = this.datePipe.transform(this.ticketReqObj.returnDate, 'yyyy-MM-dd');
        this.ticketReqObj.hotelBokingDate = this.datePipe.transform(this.ticketReqObj.hotelBokingDate, 'yyyy-MM-dd');
        this.TicketTypeChange();
        this.GetAllDealer(1);
      }
      //else
      //this._router.navigate(["/addcustomer", { cnic: customerabc, }]);

    }),
      error => {
        //this._router.navigateByUrl("/customer");
      };
  }

  onReset() {
    this.submitted = false;
    this.addTicketForm.reset();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  isRemaning: boolean = false;
  CheckGreater(): boolean {
    this.isRemaning = false;
     let paidprice=Number(this.ticketReqObj.ticketAmountPaid);
     let retailprice=Number(this.ticketReqObj.ticketRetail);
    if ( paidprice<=retailprice) {
      this.isRemaning = false;
      return true;
    }
    this.isRemaning = true;
    return false;
  }
  HidePaidAmountInput(): boolean {
    if (this.editString == 'edit') {
      return false;
    }
    return true;
  }
}
