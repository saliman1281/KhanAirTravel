import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { CustomerResponse } from '../customermodel/customer-request';
import swal from 'sweetalert2';
import Swal from 'sweetalert2';
import { CustomerticketserviceService } from 'src/app/services/customerticketservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerResponse: CustomerResponse[] = [];
  custID: string = '';
  searchText: string = '';


  constructor(private _service: ServicesService, private _customerticketservice: CustomerticketserviceService,
    private _router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.GetAllCustomer();
  }
  GetAllCustomer() {
    this.spinner.show('customer');
    this._service.GetAllCustomer().subscribe((res: any) => {
      this.customerResponse = res;
      this.spinner.hide('customer');
    });
  }
  OpenDeleteModal(param: any) {
    if (param != null && param != "") {
      this.custID = param;
      $('#deleteModal').modal('show');
    }
    else {
      alert('Please select record to delete');
    }
  }
  CloseDeleteModal() {
    $('#deleteModal').modal('hide');
  }
  DeleteCustomer() {
    if (this.custID != null && this.custID != "") {
      this._service.DeleteCustomer(this.custID).subscribe((res: any) => {
        this.custID = "";
        this.showToast();
        this.CloseDeleteModal();
        this.GetAllCustomer();
      });
    }

  }
  navigateToAdd() {
    this._router.navigate(["/addcustomer", { cnic: "0", }]);
  }
  navigateTo(customerabc: any) {
    this._router.navigate(["/addcustomer", { cnic: customerabc, }]);
  }

  navigateToTicket(customerabc: any) {
    this._customerticketservice.ShairingData(customerabc);
    this._router.navigate(["/ticketsdetail"]);
  }

  showToast() {
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, title: "Success!", text: 'Successfully Deleted', icon: 'success'
    });
  }
}
