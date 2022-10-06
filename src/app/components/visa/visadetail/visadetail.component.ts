import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerticketserviceService } from 'src/app/services/customerticketservice.service';
import { VisaInfoService } from 'src/app/services/VisaInfo.service';
import { CustomerResponse } from '../../customer/customermodel/customer-request';
import { VisaInfoRequest, VisaInfoResponse } from '../visamodel/visainfo';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-visadetail',
  templateUrl: './visadetail.component.html',
  styleUrls: ['./visadetail.component.css']
})
export class VisadetailComponent implements OnInit {
  customerObj: CustomerResponse;
  visaInfoRequest: VisaInfoRequest;
  visaInfoResponse: VisaInfoResponse[] = [];
  searchText: string = '';
  visaNum: string = '';

  @ViewChild('visatemp', { read: ViewContainerRef, static: false }) private visaDetailview: ViewContainerRef;
  @ViewChild('visatInstalmentView', { read: ViewContainerRef, static: false }) private visaInstalmentView: ViewContainerRef;


  constructor(private _visainfoservice: VisaInfoService, private _customerticketservice: CustomerticketserviceService,
    private _router: Router, private spinner: NgxSpinnerService, private vcref: ViewContainerRef, private cfr: ComponentFactoryResolver,
  ) {
    this.customerObj = new CustomerResponse();
    this.visaInfoRequest = new VisaInfoRequest();
  }

  ngOnInit(): void {
    let result = this._customerticketservice.GetSharingData();
    if (result != undefined) {
      this.customerObj = result;
      this.GetVisaDetail(this.customerObj.customerCNIC);

    }
    else {
      this._router.navigateByUrl("/customer");
    }
  }
  GetVisaDetail(csCNIC: any) {
    this.spinner.show('visa');
    this.visaInfoRequest.customerCnic = csCNIC;
    this.visaInfoRequest.option = 'getAll';
    this._visainfoservice.GetVisaDetail(this.visaInfoRequest).subscribe((res: any) => {
      this.visaInfoResponse = res;
      this.spinner.hide('visa');
    });
  }

  OpenAddModal() {
    this.NavigateToAddVisaInfo();
    $('#addModal').modal('show');
  }
  CloseAddModal() {
    this.visaDetailview.clear();
    $('#addModal').modal('hide');
  }

  async NavigateToAddVisaInfo() {
    this.vcref.clear();
    const { AddvisaComponent } = await import('../addvisa/addvisa.component');
    let greetcomp = this.visaDetailview.createComponent(
      this.cfr.resolveComponentFactory(AddvisaComponent)
    );
    greetcomp.instance.customerObjj = this.customerObj;
    greetcomp.instance.sendMessageEvent.subscribe(data => {
      if (data == 'close') {
        this.CloseAddModal();
      } else if (data == 'SUCCESS') {
        this.showToast('Record Successfully inserted');
        this.GetVisaDetail(this.customerObj.customerCNIC);
        this.CloseAddModal();
      } else {
        this.showToast('Record Successfully updated');
        this.GetVisaDetail(this.customerObj.customerCNIC);
        this.CloseAddModal();
      }
    })
  }
  async navigateToVisaUpdate(visaNum: any, param: any) {
    $('#addModal').modal('show');
    this.vcref.clear();
    const { AddvisaComponent } = await import('../addvisa/addvisa.component');
    let greetcomp = this.visaDetailview.createComponent(
      this.cfr.resolveComponentFactory(AddvisaComponent)
    );
    greetcomp.instance.customerObjj = this.customerObj;
    greetcomp.instance.visaNo = visaNum;
    greetcomp.instance.editString = param;
    greetcomp.instance.sendMessageEvent.subscribe(data => {
      if (data == 'close') {
        this.CloseAddModal();
      } else if (data == 'SUCCESS' && visaNum == "") {
        this.showToast('Record Successfully inserted');
        this.GetVisaDetail(this.customerObj.customerCNIC);
        this.CloseAddModal();
      } else {
        this.showToast('Record Successfully updated');
        this.GetVisaDetail(this.customerObj.customerCNIC);
        this.CloseAddModal();
      }
    })
  }
  async OpenVisaInstalmentModal(param: any, remaining = 0) {
    if (param != null && param != "") {
      
      $('#visaDetailModal').modal('show');
      this.visaInstalmentView.clear();
      const { VisainstalmentComponent } = await import('../visainstalment/visainstalment.component');
      let greetcomp = this.visaInstalmentView.createComponent(
        this.cfr.resolveComponentFactory(VisainstalmentComponent)
      );
      greetcomp.instance.visaNum = param;
      greetcomp.instance.remainingAmount = remaining;
      greetcomp.instance.sendMessageEvent.subscribe(data => {
        if (data == 'close') {
          // this.CloseTicketDetailModal();
        } else if (data == 'SUCCESS' && this.visaNum == "") {
          this.showToast('Record Successfully inserted');
          this.GetVisaDetail(this.customerObj.customerCNIC);
         // this.CloseVisaDetailModal();
        } else {
          this.showToast('Record Successfully updated');
          this.GetVisaDetail(this.customerObj.customerCNIC);
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
      this.visaInfoRequest.visaNumber = this.visaNum;
      this.visaInfoRequest.option = 'delete';
      this._visainfoservice.AddVisaDetail(this.visaInfoRequest).subscribe((res: any) => {
        this.showToast('Record Successfully deleted');
        this.GetVisaDetail(this.customerObj.customerCNIC);
        this.CloseDeleteModal();
      });
    }
  }
  showToast(msg) {
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 5000,
      title: "Success!", text: msg, icon: 'success'
    });
  }
}

 