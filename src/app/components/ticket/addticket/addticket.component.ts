import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerResponse } from 'src/app/customer/customermodel/customer-request';
import { TicketserviceService } from 'src/app/services/ticketservice.service';
import { TicketInfoRequest, TicketInfoResponse } from '../ticketmodel/ticketmodel';
import { DatePipe } from '@angular/common';


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
  ticketReqObj: TicketInfoRequest;
  //ticketResponseObj: TicketInfoResponse;
  submitted = false;

  isReturn: boolean = false;

  @Input() ticketNo: string = "";

  constructor(private datePipe: DatePipe, private fb: FormBuilder, private _ticketservice: TicketserviceService) {
    this.ticketReqObj = new TicketInfoRequest();
  }
  ngOnInit() {

    this.ticketReqObj.airlineType = "PIA";
    this.ticketReqObj.ticketType = "single";
    this.ticketReqObj.modifiedBy = "";
    this.TicketFormValidation();
    if (this.ticketNo != "") {
      this.GetTicketInfo(this.ticketNo);
    }

  }
  get f() { return this.addTicketForm.controls; }

  TicketFormValidation() {
    this.addTicketForm = this.fb.group({
      ticketNumber: ['', [Validators.required]],
      ticketPNR: ['', [Validators.required]],
      airlineType: [''],
      fromLocation: ['', [Validators.required]],
      toLocation: ['', [Validators.required]],
      bookingDate: [''],
      ticketCost: [0, [Validators.required]],
      ticketRetail: [0, [Validators.required]],
      ticketAmountPaid: [0, [Validators.required]],
      ticketType: [''],
      returnFrom: [''],
      returnTo: [''],
      returnDate: [''],
      passportImage: [''],
    })
  }
  TicketTypeChange() {
    this.isReturn = false;
    if (this.ticketReqObj.ticketType == "return")
      this.isReturn = true;

  }
  AddTicket() {
    //this.customerReq.customerImagePath = "";
    this.ticketReqObj.customerCNIC = this.customerObjj.customerCNIC;
    this.ticketReqObj.customerId = this.customerObjj.custormerId;
    this.submitted = true;
    if (this.addTicketForm.valid) {
      this._ticketservice.AddticketInfo(this.ticketReqObj).subscribe((res) => {
        this.sendMessageEvent.emit(res);
      });
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

  GetTicketInfo(ticketNo) {

    this._ticketservice.GetTicketInfo(ticketNo).subscribe((res: any) => {
      if (res != null) {
        this.ticketReqObj = res;
        this.ticketReqObj.bookingDate = this.datePipe.transform(this.ticketReqObj.bookingDate, 'yyyy-MM-dd');
        this.ticketReqObj.returnDate = this.datePipe.transform(this.ticketReqObj.returnDate, 'yyyy-MM-dd');
        this.TicketTypeChange();
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
  CheckGreater(): boolean {

    if (this.ticketReqObj.ticketAmountPaid > this.ticketReqObj.ticketRetail) {
      return true;
    }
    return false;

  }

}
