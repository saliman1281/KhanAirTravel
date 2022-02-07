import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerResponse } from 'src/app/components/customer/customermodel/customer-request';
import { CustomerticketserviceService } from 'src/app/services/customerticketservice.service';
import { TicketserviceService } from 'src/app/services/ticketservice.service';
import { TicketInfoResponse } from '../ticketmodel/ticketmodel';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;

@Component({
  selector: 'app-ticketsdetail',
  templateUrl: './ticketsdetail.component.html',
  styleUrls: ['./ticketsdetail.component.css']
})
export class TicketsdetailComponent implements OnInit {

  customerObj: CustomerResponse;
  ticketInfoResponse: TicketInfoResponse[] = [];
  ticketNum: string = '';
  searchText: string = '';

  @ViewChild('greettemp', { read: ViewContainerRef, static: false }) private greetviewcontainerref: ViewContainerRef;
  @ViewChild('ticketInstalmentView', { read: ViewContainerRef, static: false }) private ticketInstalmentView: ViewContainerRef;

  constructor(private _route: ActivatedRoute, private cfr: ComponentFactoryResolver, private vcref: ViewContainerRef, private spinner: NgxSpinnerService,
    private _ticketservice: TicketserviceService, private _customerticketservice: CustomerticketserviceService, private _router: Router) {
    this.customerObj = new CustomerResponse();
  }
  ngOnInit() {
    const abc = this._route.snapshot.paramMap.get('cnic');
    if (abc == null || abc == "") {
      // this._router.navigateByUrl("/customer");
    }
    else {
      this.GetAllTicketOfCustomer(abc);
    }

    let result = this._customerticketservice.GetSharingData();
    if (result != undefined) {
      this.customerObj = result;
      this.GetAllTicketOfCustomer(this.customerObj.customerCNIC);

    }
    else {
      this._router.navigateByUrl("/customer");
    }
  }

  GetAllTicketOfCustomer(csCNIC: any) {
    this.spinner.show('ticket');
    this._ticketservice.GetAllTicketOfCustomer(csCNIC).subscribe((res: any) => {
      this.ticketInfoResponse = res;
      this.spinner.hide('ticket');
    });
  }

  OpenAddModal() {
    this.AddTicketInfo();
    $('#addModal').modal('show');
  }
  CloseAddModal() {
    this.greetviewcontainerref.clear();
    $('#addModal').modal('hide');
  }
  async navigateToTicketUpdate(ticketNum: any) {
    $('#addModal').modal('show');
    this.vcref.clear();
    const { AddticketComponent } = await import('../addticket/addticket.component');
    let greetcomp = this.greetviewcontainerref.createComponent(
      this.cfr.resolveComponentFactory(AddticketComponent)
    );
    greetcomp.instance.customerObjj = this.customerObj;
    greetcomp.instance.ticketNo = ticketNum;
    greetcomp.instance.sendMessageEvent.subscribe(data => {
      if (data == 'close') {
        this.CloseAddModal();
      } else if (data == 'SUCCESS' && this.ticketNum == "") {
        this.showToast('Record Successfully inserted');
        this.GetAllTicketOfCustomer(this.customerObj.customerCNIC);
        this.CloseAddModal();
      } else {
        this.showToast('Record Successfully updated');
        this.GetAllTicketOfCustomer(this.customerObj.customerCNIC);
        this.CloseAddModal();
      }
    })

  }
  async AddTicketInfo() {

    this.vcref.clear();
    const { AddticketComponent } = await import('../addticket/addticket.component');
    let greetcomp = this.greetviewcontainerref.createComponent(
      this.cfr.resolveComponentFactory(AddticketComponent)
    );
    greetcomp.instance.customerObjj = this.customerObj;
    greetcomp.instance.sendMessageEvent.subscribe(data => {
      if (data == 'close') {
        this.CloseAddModal();
      } else if (data == 'SUCCESS' && this.ticketNum == "") {
        this.showToast('Record Successfully inserted');
        this.GetAllTicketOfCustomer(this.customerObj.customerCNIC);
        this.CloseAddModal();
      } else {
        this.showToast('Record Successfully updated');
        this.GetAllTicketOfCustomer(this.customerObj.customerCNIC);
        this.CloseAddModal();
      }
    })
  }
  OpenDeleteModal(param: any) {
    if (param != null && param != "") {
      this.ticketNum = param;
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
  DeleteTicket() {
    if (this.ticketNum != null && this.ticketNum != "") {
      this._ticketservice.DeleteTicket(this.ticketNum).subscribe((res: any) => {
        this.showToast('Record Successfully deleted');
        this.GetAllTicketOfCustomer(this.customerObj.customerCNIC);
        this.CloseDeleteModal();
      });
    }
  }
  async OpenTicketDetailModal(param: any) {
    if (param != null && param != "") {
      //this.ticketNum = param;
      $('#ticketDetailModal').modal('show');
      this.ticketInstalmentView.clear();
      const { TicketinstalmentComponent } = await import('../ticketinstalment/ticketinstalment.component');
      let greetcomp = this.ticketInstalmentView.createComponent(
        this.cfr.resolveComponentFactory(TicketinstalmentComponent)
      );
      greetcomp.instance.ticketNum = param;
      greetcomp.instance.sendMessageEvent.subscribe(data => {
        if (data == 'close') {
          this.CloseTicketDetailModal();
        } else if (data == 'SUCCESS' && this.ticketNum == "") {
          this.showToast('Record Successfully inserted');
          this.GetAllTicketOfCustomer(this.customerObj.customerCNIC);
          this.CloseTicketDetailModal();
        } else {
          this.showToast('Record Successfully updated');
          this.GetAllTicketOfCustomer(this.customerObj.customerCNIC);
          this.CloseTicketDetailModal();
        }
      })

    }
    else {
      this.showToast('Please select record to add detail');
      //alert('Please select record to delete');
    }
  }
  CloseTicketDetailModal() {
    this.ticketNum = "";
    this.ticketInstalmentView.clear();
    $('#ticketDetailModal').modal('hide');
  }
  AddTicketDetail() {
    this.CloseTicketDetailModal();
    this.showToast('Record Successfully inserted');
  }

  showToast(msg) {
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 5000,
      title: "Success!", text: msg, icon: 'success'
    });
  }
}
