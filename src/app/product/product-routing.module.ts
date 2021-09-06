import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddproductComponent } from './add-product/add-product.component';
import { productListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: productListComponent },
  { path: 'add-product', component: AddproductComponent },
  { path: 'add-product/:id', component: AddproductComponent },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class productRoutingModule {}
