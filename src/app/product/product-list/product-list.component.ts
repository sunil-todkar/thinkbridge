import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';

import { productService } from '../../core/services/product.service';
import { ViewProductComponent } from '../view-product/view-product.component';
import { IProduct } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class productListComponent implements OnInit {
  productsListData: IProduct[] = [];
  modalRef: BsModalRef;
  p: number = 1;
  isLoading: boolean = false;
  total: number = 0;
  max = 5;
  isReadonly = true;
  perPage = 10;
  bsModalRef?: BsModalRef;
  Mess: string = 'Hello';

  constructor(
    private productService: productService,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.loadproductData();
  }

  // load products data
  loadproductData() {
    this.isLoading = true;
    this.productService.showproducts().subscribe((response: any) => {
      // console.log('product Response Is - ', response);
      this.productsListData = response;
      this.total = this.productsListData.length;
      console.log('********  this.total - ', this.total);
      this.isLoading = false;

      if (this.p !== 1) {
        this.p = Math.ceil(this.total / this.perPage);
      }
    });
  }

  addNewproduct() {
    this.router.navigate(['/add-product']);
  }

  onUpdateproduct(id: number) {
    this.router.navigate(['/add-product', id]);
  }

  // On delete a product
  onDeleteproduct(id: number) {
    Swal.fire({
      title: 'Do you want to delete a product?',
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.SpinnerService.show();
        this.productService.deleteproduct(id).subscribe(
          (response: any) => {
            this.SpinnerService.hide();
            this.loadproductData();
            Swal.fire({
              title: 'product Deleted Successfully!',
              showCancelButton: true,
              confirmButtonText: `Ok`,
            });
          },
          (error) => {
            this.SpinnerService.hide();
            Swal.fire({
              title: 'Error! Please try again later..',
              showCancelButton: true,
              confirmButtonText: `Ok`,
            });
          }
        );
      } else if (result.isDenied) {
      }
    });
  }

  // Opens view product data
  openModalWithComponent(id: any) {
    const producObj = this.productsListData.find((item) => {
      return item.id == id;
    });

    const initialState = {
      product: producObj,
    };
    this.bsModalRef = this.modalService.show(ViewProductComponent, {
      initialState,
      class: 'modal-lg',
    });
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}
