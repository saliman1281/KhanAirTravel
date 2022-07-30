import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DealerCommonResponse, RepresentativeCommonResponse, RepresentativeRequest, VisaTypeResponse } from 'src/app/commonmodels/commonmodel';
import { CommonService } from 'src/app/services/commonservice/common.service';
import { VisaInfoService } from 'src/app/services/VisaInfo.service';
import { CustomerResponse } from '../../customer/customermodel/customer-request';
import { VisaInfoRequest } from '../visamodel/visainfo';
declare var $: any;


@Component({
  selector: 'app-addvisa',
  templateUrl: './addvisa.component.html',
  styleUrls: ['./addvisa.component.css']
})
export class AddvisaComponent implements OnInit {
  firstN: string;
  lastN: string;
  addVisaForm: FormGroup;
  visaInfoRequest: VisaInfoRequest;
  @Input() customerObjj: CustomerResponse;
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  submitted = false;
  editString: string = "";
  @Input() visaNo: string = "";
  dealerCommonResponse:DealerCommonResponse[]=[];
  representativeCommonResponse:RepresentativeCommonResponse[]=[];
  representativeRequest:RepresentativeRequest;
  visaTypeResponse:VisaTypeResponse[]=[];

  constructor(private _commonService:CommonService,private fb: FormBuilder, private _visaInfoService: VisaInfoService) {
    this.visaInfoRequest = new VisaInfoRequest();
    this.representativeRequest=new RepresentativeRequest();
  }

  ngOnInit(): void {    
    this.VisaFormValidation();
    this.GetAllDealer();
    this.GetAllVisaType();
    if (this.visaNo != "") {
      this.GetVisaInfo(this.visaNo);
    }
    this.visaInfoRequest.dealerId=1005;
  }
  get f() { return this.addVisaForm.controls; }
  VisaFormValidation() {
    this.addVisaForm = this.fb.group({
      visaNumber: ['', [Validators.required]],
      dealer:[''],
      repName:[''],
      repMobile:[''],
      representative:[''],
      visaType: ['', [Validators.required]],
      visaCountry: ['', [Validators.required]],
      visaCostPrice: ['', [Validators.required]],
      visaRetailPrice: ['', [Validators.required]],
      visaPaidAmount: [''],
    })
  }
  CloseModal() {
    this.sendMessageEvent.emit('close');
  }
  AddVisa() {
    if (this.CheckGreater()) {
      this.visaInfoRequest.customerCnic = this.customerObjj.customerCNIC;
      this.visaInfoRequest.option = 'insert';
      this.submitted = true;
      if (this.addVisaForm.valid) {
        this._visaInfoService.AddVisaDetail(this.visaInfoRequest).subscribe((res) => {
          this.sendMessageEvent.emit(res);
        });
      }
    }
    else
      console.error("form is invalid");

  }
  updateVisaInfo() {
    if (this.CheckGreater()) {
      this.visaInfoRequest.visaNumber = this.visaNo;
      this.visaInfoRequest.option = 'update';
      this.submitted = true;
      if (this.addVisaForm.valid) {
        this._visaInfoService.AddVisaDetail(this.visaInfoRequest).subscribe((res) => {
          this.sendMessageEvent.emit(res);
        });
      }
    }
    else {
      console.log("form is invalid");
    }
  }
  GetVisaInfo(visaNo) {
    this._visaInfoService.GetVisaInfo(visaNo).subscribe((res: any) => {
      if (res != null) {
        this.visaInfoRequest = res;
        console.log(this.visaInfoRequest);
      }
      //else
      //this._router.navigate(["/addcustomer", { cnic: customerabc, }]);

    }),
      error => {
        //this._router.navigateByUrl("/customer");
      };
  }
  GetAllDealer(){
    this._commonService.GetCommonData().subscribe((res: any) => {
      this.dealerCommonResponse = res;   
      this.dealerCommonResponse=this.dealerCommonResponse.sort((a,b) => a.dealerName > b.dealerName ? 1 : -1); 
      this.visaInfoRequest.dealerId = this.dealerCommonResponse[0].dealerId;
      this.RepresentativeList(this.visaInfoRequest.dealerId);

    });
  }
  GetAllVisaType(){
    this._commonService.GetVisaTypeList().subscribe((res: any) => {
      this.visaTypeResponse = res;
      this.visaTypeResponse=this.visaTypeResponse.sort((a,b) => a.visaTypeName > b.visaTypeName ? 1 : -1);
      this.visaInfoRequest.visaTypeId = this.visaTypeResponse[0].visaTypeId;
    });
  }
  RepresentativeList(dealerid:any){
    this._commonService.GetRepresentativeList(dealerid).subscribe((res: any) => {
      this.representativeCommonResponse = res;
      if(this.visaInfoRequest.representId==0){
        this.visaInfoRequest.representId=this.representativeCommonResponse[0].representId;
      }
    });
  }
  isRemaning: boolean = false;
  CheckGreater(): boolean {
    this.isRemaning = false;
    let paidprice = Number(this.visaInfoRequest.visaPaidAmount);
    let retailprice = Number(this.visaInfoRequest.visaRetailPrice);
    if (paidprice <= retailprice) {
      this.isRemaning = false;
      return true;
    }
    this.isRemaning = true;
    return false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
