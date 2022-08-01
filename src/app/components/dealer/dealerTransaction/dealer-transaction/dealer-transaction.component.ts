import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DealerInfoRequest, DealerInfoResponse } from '../../dealermodel/dealerinfo';
declare var $: any;

@Component({
  selector: 'app-dealer-transaction',
  templateUrl: './dealer-transaction.component.html',
  styleUrls: ['./dealer-transaction.component.css']
})
export class DealerTransactionComponent implements OnInit {

  dealerInfoRequest:DealerInfoRequest;
  dealerInfoResponse:DealerInfoResponse[]=[];
  searchText: string = '';

  constructor(private _router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }
  OpenAddModal() {
    $('#addModal').modal('show');
  }
  CloseAddModal() {
    $('#addModal').modal('hide');
  }
}
export class DealerTransactionRequest {

}
export class DealerTransactionResponse {
  
}