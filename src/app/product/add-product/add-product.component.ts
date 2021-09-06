import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

import { productService } from '../../core/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddproductComponent implements OnInit {
  productForm: FormGroup;
  submitted = false;
  modalRef: BsModalRef;
  idParam: string = '';
  isUpadte: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private productService: productService,
    private router: Router,
    private actRouter: ActivatedRoute,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['', Validators.required],
      Price: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([0-9]*[1-9][0-9]*(.[0-9]+)?|[0]+.[0-9]*[1-9][0-9]*)$'
          ),
        ],
      ],
      Ratings: ['', [Validators.required, Validators.pattern('[1-5]')]],
      Status: ['true', Validators.required],
    });

    this.idParam = this.actRouter.snapshot.params['id'];
    if (this.idParam) {
      this.isUpadte = true;
      this.updateForm();
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }

    // display form values on success
    let product = this.productForm.value;
    this.createproduct(product);
  }

  // Create a product method
  createproduct(product: any) {
    this.SpinnerService.show();
    if (this.isUpadte) {
      this.productService
        .updateproduct(this.idParam, product)
        .subscribe((response: any) => {
          this.SpinnerService.hide();
          Swal.fire({
            title: 'product Updated Successfully!',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
          this.onBack();
        }),
        (error: any) => {
          console.log('Error - ', error);
          this.SpinnerService.hide();
          Swal.fire({
            title: 'Error! Please try again later..',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
        };
    } else {
      this.productService.createproducts(product).subscribe((response: any) => {
        this.SpinnerService.hide();
        Swal.fire({
          title: 'product Created Successfully!',
          showCancelButton: true,
          confirmButtonText: `Ok`,
        });
        this.onBack();
      }),
        (error: any) => {
          console.log('Error - ', error);
          this.SpinnerService.hide();
          Swal.fire({
            title: 'Error! Please try again later..',
            showCancelButton: true,
            confirmButtonText: `Ok`,
          });
        };
    }
  }

  updateForm() {
    this.SpinnerService.show();
    this.productService
      .getCotactDetails(this.idParam)
      .subscribe((response: any) => {
        this.productForm.patchValue(response);
        this.SpinnerService.hide();
      });
  }

  onBack() {
    this.router.navigate(['']);
  }
}
