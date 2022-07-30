import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerticketserviceService } from 'src/app/services/customerticketservice.service';
import { VisaInfoService } from 'src/app/services/VisaInfo.service';
import { CustomerResponse } from '../../customer/customermodel/customer-request';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import {DealerinfoService} from 'src/app/services/dealerservice/dealerinfo.service';
import{DealerInfoRequest, DealerInfoResponse} from '../dealermodel/dealerinfo';
declare var $: any;

@Component({
  selector: 'app-dealerdetails',
  templateUrl: './dealerdetails.component.html',
  styleUrls: ['./dealerdetails.component.css']
})
export class DealerdetailsComponent implements OnInit {
  dealerInfoRequest:DealerInfoRequest;
  dealerInfoResponse:DealerInfoResponse[]=[];
  
  //visaInfoRequest: VisaInfoRequest;
  //visaInfoResponse: VisaInfoResponse[] = [];
  searchText: string = '';
  visaNum: string = '';

  @ViewChild('dealertemp', { read: ViewContainerRef, static: false }) private dealerView: ViewContainerRef;
  @ViewChild('visatInstalmentView', { read: ViewContainerRef, static: false }) private visaInstalmentView: ViewContainerRef;


  constructor(private _dealerinfoService:DealerinfoService,private _visainfoservice: VisaInfoService, private _customerticketservice: CustomerticketserviceService,
    private _router: Router, private spinner: NgxSpinnerService, private vcref: ViewContainerRef, private cfr: ComponentFactoryResolver,
  ) {
    this.dealerInfoRequest = new DealerInfoRequest();
  }

  ngOnInit(): void {
    this.GetAllDealer();
  }

  GetAllDealer() {
    this.spinner.show('visa');
    this._dealerinfoService.GetAllDealer().subscribe((res: any) => {
      this.dealerInfoResponse = res;
      this.spinner.hide('visa');
    });
  }

  OpenAddModal() {
    this.NavigateToAddVisaInfo();
    $('#addModal').modal('show');
  }

  CloseAddModal() {
    this.dealerView.clear();
    $('#addModal').modal('hide');
  }

  async NavigateToAddVisaInfo() {
    this.dealerView.clear();
    const { AddDealerComponent } = await import('../add-dealer/add-dealer.component');
    let greetcomp = this.dealerView.createComponent(
      this.cfr.resolveComponentFactory(AddDealerComponent)
    );
    greetcomp.instance.DelearObj = this.dealerInfoRequest;
    greetcomp.instance.sendMessageEvent.subscribe(data => {
      if (data == 'close') {
        this.CloseAddModal();
      } else if (data == 'SUCCESS') {
        this.showToast('Record Successfully inserted');
        this.GetAllDealer();
        this.CloseAddModal();
      } else {
        this.showToast('Record Successfully updated');
        this.GetAllDealer();
        this.CloseAddModal();
      }
    })
  }

  async navigateToDelearUpdate(dealerNum: any, param: any) {
    $('#addModal').modal('show');
    this.dealerView.clear();
    const { AddDealerComponent } = await import('../add-dealer/add-dealer.component');
    let greetcomp = this.dealerView.createComponent(
      this.cfr.resolveComponentFactory(AddDealerComponent)
    );
    greetcomp.instance.DelearObj = this.dealerInfoRequest;
    greetcomp.instance.delearNo = dealerNum;
    greetcomp.instance.editString = param;
    greetcomp.instance.sendMessageEvent.subscribe(data => {
      if (data == 'close') {
        this.CloseAddModal();
      } else if (data == 'SUCCESS' && dealerNum == 0) {
        this.showToast('Record Successfully inserted');
        this.GetAllDealer();
        this.CloseAddModal();
      } else {
        this.showToast('Record Successfully updated');
        this.GetAllDealer();
        this.CloseAddModal();
      }
    })
  }

  async OpenDealerModal(param: any, remaining = 0) {
    if (param != null && param != "") {
      $('#visaDetailModal').modal('show');
      this.visaInstalmentView.clear();
      const { DealerinstalmentComponent } = await import('../dealerinstalment/dealerinstalment.component');
      let greetcomp = this.visaInstalmentView.createComponent(
        this.cfr.resolveComponentFactory(DealerinstalmentComponent)
      );
      greetcomp.instance.visaNum = param;
      greetcomp.instance.remainingAmount = remaining;
      greetcomp.instance.sendMessageEvent.subscribe(data => {
        if (data == 'close') {
          // this.CloseTicketDetailModal();
        } else if (data == 'SUCCESS' && this.visaNum == "") {
          this.showToast('Record Successfully inserted');
          this.GetAllDealer();
         // this.CloseVisaDetailModal();
        } else {
          this.showToast('Record Successfully updated');
          this.GetAllDealer();
          this.CloseVisaDetailModal();
        }
      });
    }
    else {
      this.showToast('Please select record to add detail');
      //alert('Please select record to delete');
    }
  }

  CloseVisaDetailModal() {
    this.visaNum = "";
    this.visaInstalmentView.clear();
    $('#visaDetailModal').modal('hide');
  }

  OpenDeleteModal(param: any) {
    if (param != null && param != "") {
      this.visaNum = param;
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

  DeleteVisaInfo() {
    if (this.visaNum != null && this.visaNum != "") {
     // this.dealerInfoRequest.visaNumber = this.visaNum;
      //this.dealerInfoRequest.option = 'delete';
      // this._visainfoservice.GetAllDealer(this.visaInfoRequest).subscribe((res: any) => {
      //   this.showToast('Record Successfully deleted');
      //   this.GetVisaDetail(this.customerObj.customerCNIC);
      //   this.CloseDeleteModal();
      //});
    }
  }

  showToast(msg) {
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 5000,
      title: "Success!", text: msg, icon: 'success'
    });
  }
}
 
