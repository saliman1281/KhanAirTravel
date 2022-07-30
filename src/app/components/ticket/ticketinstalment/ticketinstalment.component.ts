import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TicketInstalmentRequest, TicketInstalmentResponse } from '../ticketmodel/ticketinstalmentmodel';
import { TicketinstalmentService } from 'src/app/services/ticketinstalment.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { summaryFileName } from '@angular/compiler/src/aot/util';
declare var $: any;

@Component({
  selector: 'app-ticketinstalment',
  templateUrl: './ticketinstalment.component.html',
  styleUrls: ['./ticketinstalment.component.css'],
  providers: [DatePipe]
})
export class TicketinstalmentComponent implements OnInit {
  sum: number = 0;
  remainingAmount: number = 0;
  
  ticketNum: string = "";
  searchText: string = "";
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  ticketInstalmentRequest: TicketInstalmentRequest;
  ticketInstalmentResponse: TicketInstalmentResponse[] = [];

  constructor(private datePipe: DatePipe, private _ticketinstalmentservice: TicketinstalmentService) {
    this.ticketInstalmentRequest = new TicketInstalmentRequest();

  }

  ngOnInit(): void {
    this.ticketInstalmentRequest.modifiedBy = "";
    this.ticketInstalmentRequest.ticketNumber = this.ticketNum;
    this.GetAllTicketInstalment();

  }
  GetAllTicketInstalment() {
    //this.spinner.show('ticket');
    this.ticketInstalmentRequest.option = "getallticketinstalment";
    this._ticketinstalmentservice.GetTicketInstalmentDetail(this.ticketInstalmentRequest).subscribe((res: any) => {
      this.ticketInstalmentResponse = res;
      //this.SumofInstalment();
      // this.ticketInstalmentResponse=this.datePipe.transform(this.ticketInstalmentResponse.createdDate, 'yyyy-MM-dd');

      //this.spinner.hide('ticket');
    });
  }
  TicketDetailUpdate(param: any) {

  }
  CloseTicketDetailModal() {
    this.ticketNum = "";
    $('#ticketDetailModal').modal('hide');
  }

  AddTicketDetail() {
    //this.submitted = true;
    if (this.CheckInstalment()) {
        this.ticketInstalmentRequest.option = "insert";
        this._ticketinstalmentservice.AddTicketInstalmentDetail(this.ticketInstalmentRequest).subscribe((res) => {
          if(res)
          {
          this.sendMessageEvent.emit(res);
          this.GetAllTicketInstalment();
          this.remainingAmount-=this.ticketInstalmentRequest.ticketInstalmentAmount;
          this.showToast('Record Successfully inserted');
          this.ticketInstalmentRequest.ticketInstalmentAmount=0;
        }
        //this.CloseTicketDetailModal();
      });
    }

  }

  ticketDetailId: number = 0;
  OpenDeleteModal(param: any) {
    if (param != null && param != "") {
      this.ticketDetailId = param;
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
  DeleteTicketDetail() {
      this.ticketInstalmentRequest.ticketInstalmentId = this.ticketDetailId;
      this.ticketInstalmentRequest.option = "deleinstalment";
      this._ticketinstalmentservice.AddTicketInstalmentDetail(this.ticketInstalmentRequest).subscribe((res) => {
      this.sendMessageEvent.emit(res);
      this.GetAllTicketInstalment();
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
  // SumofInstalment() {
  //   for (var i = 0; i < this.ticketInstalmentResponse.length; i++) {
  //     this.sum += this.ticketInstalmentResponse[i].ticketInstalmentAmount;
  //     console.log(this.sum);
  //   }
  //}
  isRemaning: boolean = false;
  CheckInstalment(): boolean {
    this.isRemaning = false;
    let instamt = Number(this.ticketInstalmentRequest.ticketInstalmentAmount);
    if (instamt != 0 && instamt <= this.remainingAmount) {
      this.isRemaning = false;
      return true;
    }
    this.isRemaning = true;
    return false;
  }
}

