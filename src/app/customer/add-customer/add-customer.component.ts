import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import Swal from 'sweetalert2';
import { CustomerRequest } from '../customermodel/customer-request';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  addCustomerForm: FormGroup;
  customerReq: CustomerRequest;
  submitted = false;
  custID: string = '';
  cnicDuplicate = false;

  constructor(private _service: ServicesService, private fb: FormBuilder, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {

    const abc = this._route.snapshot.paramMap.get('cnic');
    if (abc == null || abc == "") {
      this._router.navigateByUrl("/customer");
    }
    else if (abc == "0") {
      this.custID = abc;
    }
    else {
      this.GetCustomer(abc);
    }


    this.customerFormValidation();
    this.customerReq = new CustomerRequest();

    this.customerReq.customerImagePath = "";
    this.customerReq.modifiedBy = "";
    this.customerReq.gender = "male";


  }

  customerFormValidation() {
    this.addCustomerForm = this.fb.group({
      customerFirstName: ['', Validators.required, Validators.maxLength(48)],
      customerLastName: ['', Validators.required, Validators.maxLength(48)],
      customerFatherName: ['', Validators.required, Validators.maxLength(48)],
      customerCNIC: ['', Validators.required, Validators.maxLength(15)],
      customerPassport: ['', Validators.required, Validators.maxLength(15)],
      customerMobiel: ['', Validators.required, Validators.maxLength(14)],
      customerWhatsApp: ['', Validators.maxLength(14)],
      customerAddress: ['', Validators.required, Validators.maxLength(198)],
      custoerImage: [''],
      gender: ['', Validators.required],
    })
  }

  get f() { return this.addCustomerForm.controls; }
  GetCustomer(custID) {

    this._service.GetCustomer(custID).subscribe((res: any) => {
      if (res.customerCNIC != null) {
        this.customerReq = res;
      }
      else
        this._router.navigateByUrl("/customer");

    }),
      error => {
        this._router.navigateByUrl("/customer");
      };
  }


  addCustomer() {
    //this.customerReq.customerImagePath = "";
    this.submitted = true;
    if (this.addCustomerForm.valid) {
      this._service.AddCustomer(this.customerReq).subscribe((res) => {
        this.onReset();
        this.showToast();
        this._router.navigateByUrl("/customer");
        //this.GetAllCustomer();
      });
      console.log(this.customerReq);
    }
    else {
      console.log("form is invalid");
    }
  }

  updateCustomer() {
    // this.customerReq.customerImagePath = "";
    this.submitted = true;
    if (this.addCustomerForm.valid) {
      this._service.UpdateCustomer(this.customerReq).subscribe((res) => {
        this.onReset();
        this._router.navigateByUrl("/customer");
        //this.GetAllCustomer();
      });
      console.log(this.customerReq);
    }
    else {
      console.log("form is invalid");
    }
  }

  onReset() {
    this.submitted = false;
    this.addCustomerForm.reset();
  }

  showToast() {
    Swal.fire({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 2000, title: "Success!", text: 'Successfully Added Customer', icon: 'success'
    });
  }

  SearchDuplicate(cnic: any) {
    this.cnicDuplicate = false;
    if (cnic != null && cnic != "") {
      this._service.CustomerDuplicate(cnic).subscribe((res: any) => {
        if (res != "") {
          this.cnicDuplicate = true;
        }

      });
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
