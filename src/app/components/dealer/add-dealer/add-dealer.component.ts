import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealerinfoService } from 'src/app/services/dealerservice/dealerinfo.service';
import { DealerInfoRequest } from '../dealermodel/dealerinfo';


@Component({
  selector: 'app-add-dealer',
  templateUrl: './add-dealer.component.html',
  styleUrls: ['./add-dealer.component.css']
})
export class AddDealerComponent implements OnInit {

  addDealerForm: FormGroup;
  dealerInfoRequest:DealerInfoRequest;
  @Input() DelearObj: DealerInfoRequest;
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  editString: string = "";
  submitted = false;
  @Input() delearNo: number = 0;

  constructor(private _dealerinfoService:DealerinfoService,private fb: FormBuilder) {
    this.dealerInfoRequest = new DealerInfoRequest();
  }

  ngOnInit(): void {
    this.DealerFormValidation();
    if (this.delearNo != 0) {
      this.GetDealerInfo(this.delearNo);
    }
  }
  get f() { return this.addDealerForm.controls; }
  DealerFormValidation() {
    this.addDealerForm = this.fb.group({
      dealerName: ['', [Validators.required]],
      dealerCNIC: ['', [Validators.required]],
      dealerMobile: ['', [Validators.required]],
      dealerAddress: ['', [Validators.required]],
      
    })
  }
  CloseModal() {
    this.sendMessageEvent.emit('close');
  }
  AddDealer() {
    this.submitted = true;
      if (this.addDealerForm.valid) {
        this._dealerinfoService.AddDealerInfo(this.dealerInfoRequest).subscribe((res) => {
          this.sendMessageEvent.emit(res);
        });
      }
    else
      console.error("form is invalid");
  }
  updateDealerInfo() {
      if (this.addDealerForm.valid) {
        this._dealerinfoService.UpdateDealerInfo(this.dealerInfoRequest).subscribe((res) => {
          this.sendMessageEvent.emit(res);
        });
      }
    else {
      console.log("form is invalid");
    }
  }
  GetDealerInfo(dealerNum:any) {
    this._dealerinfoService.GetDealerInfo(dealerNum).subscribe((res: any) => {
      if (res != null) {
        this.dealerInfoRequest = res;
       // console.log(this.dealerInfoRequest);
      }
      //else
      //this._router.navigate(["/addcustomer", { cnic: customerabc, }]);

    }),
      error => {
        //this._router.navigateByUrl("/customer");
      };
  }
 
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}