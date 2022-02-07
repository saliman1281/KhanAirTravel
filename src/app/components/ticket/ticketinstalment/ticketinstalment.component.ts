import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Swal from 'sweetalert2';
import { TicketDetailRequest, TicketDetailResponse } from '../ticketmodel/ticketDtailModel';
declare var $: any;

@Component({
  selector: 'app-ticketinstalment',
  templateUrl: './ticketinstalment.component.html',
  styleUrls: ['./ticketinstalment.component.css']
})
export class TicketinstalmentComponent implements OnInit {

  ticketNum: string = "";
  searchText: string = "";
  @Output() sendMessageEvent: EventEmitter<any> = new EventEmitter<any>();
  ticketDetailRequest: TicketDetailRequest;
  ticketDetailResponse: TicketDetailResponse[] = [];

  constructor() {
    this.ticketDetailRequest = new TicketDetailRequest();

  }

  ngOnInit(): void {
    this.ticketDetailRequest.modifiedBy = "";
  }
  TicketDetailUpdate(param: any) {

  }
  CloseTicketDetailModal() {
    this.ticketNum = "";
    $('#ticketDetailModal').modal('hide');
  }
  AddTicketDetail() {
    this.CloseTicketDetailModal();
    this.showToast('Record Successfully inserted');
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
    // this.ticketDetailId
  }

  showToast(msg) {
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 5000,
      title: "Success!", text: msg, icon: 'success'
    });
  }
}
