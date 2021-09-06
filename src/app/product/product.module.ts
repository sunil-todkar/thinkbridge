import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule } from 'ngx-bootstrap/modal';

import { productRoutingModule } from './product-routing.module';
import { productListComponent } from './product-list/product-list.component';
import { AddproductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

@NgModule({
  declarations: [
    productListComponent,
    AddproductComponent,
    ViewProductComponent,
  ],
  imports: [
    CommonModule,
    productRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RatingModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
  ],
  exports: [productListComponent],
})
export class productModule {}
