import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { VisainstalmentService } from 'src/app/services/visainstalment.service';
import Swal from 'sweetalert2';
import { VisaInstalmentRequest, VisaInstalmentResponse } from '../../visa/visamodel/visainsalment';
declare var $: any;

@Component({
  selector: 'app-dealerinstalment',
  templateUrl: './dealerinstalment.component.html',
  styleUrls: ['./dealerinstalment.component.css']
})
export class DealerinstalmentComponent implements OnInit {
  remainingAmount: number = 0;
  submitted: boolean = false;
  isRemaning:boolean=false;
  visaNum: string = "";
  searchText: string = "";
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  visaInstalmentRequest: VisaInstalmentRequest;
  visaInstalmentResponse: VisaInstalmentResponse[] = [];
  constructor(private _visainstalmentService: VisainstalmentService) {
    this.visaInstalmentRequest = new VisaInstalmentRequest();
  }

  ngOnInit(): void {
    this.visaInstalmentRequest.modifiedBy = "";
    this.visaInstalmentRequest.visaNumber = this.visaNum;
    this.GetAllVisatInstalment();
  }
  CloseVisaInstalmentModal() {
    this.visaNum = "";
    $('#visaDetailModal').modal('hide');
  }
  GetAllVisatInstalment() {
    this._visainstalmentService.GetVisaInstalmentDetail(this.visaInstalmentRequest).subscribe((res: any) => {
      this.visaInstalmentResponse = res;
    });
  }

  AddVisaInstalmentDetail() {
    this.submitted = true;
    if (this.CheckInstalment()) {
      this.visaInstalmentRequest.option = "insert";
      this._visainstalmentService.AddVisaInstalmentDetail(this.visaInstalmentRequest).subscribe((res) => {
        if (res) {
          this.sendMessageEvent.emit(res);
          this.GetAllVisatInstalment();
          this.remainingAmount -= this.visaInstalmentRequest.visaInstalmentAmount;
          this.showToast('Record Successfully inserted');
          this.visaInstalmentRequest.visaInstalmentAmount = 0;
        }
        //this.CloseVisaInstalmentModal();
      });
    }
  }


  visaId: number = 0;
  OpenDeleteModal(param: any) {
    if (param != null && param != "") {
      this.visaId = param;
      $('#deleteModal').modal('show');
    }
    else {
      this.showToast('Please select record to delete');
      //alert('Please select record to delete');
    }
  }
  CloseDeleteModal() {
    $('#deleteModal').modal('hide');
  }
  DeleteVisaInstalment() {
    this.visaInstalmentRequest.visaInstalmentId = this.visaId;
    this.visaInstalmentRequest.option = "delete";
    this._visainstalmentService.AddVisaInstalmentDetail(this.visaInstalmentRequest).subscribe((res) => {
    this.sendMessageEvent.emit(res);
    this.GetAllVisatInstalment();
    this.CloseDeleteModal();
    this.showToast('Record Successfully deleted');
    });
  }

  showToast(msg) {
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 5000,
      title: "Success!", text: msg, icon: 'success'
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  CheckInstalment(): boolean {
    this.isRemaning = false;
    let instamt = Number(this.visaInstalmentRequest.visaInstalmentAmount);
    if (instamt != 0 && instamt <= this.remainingAmount) {
      this.isRemaning = false;
      return true;
    }
    this.isRemaning = true;
    return false;
  }
}
