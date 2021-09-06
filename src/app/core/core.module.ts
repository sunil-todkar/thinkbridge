import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { productService } from './services/product.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule],
  providers: [productService],
})
export class CoreModule {}
