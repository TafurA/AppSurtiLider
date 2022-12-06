import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProductPageRoutingModule } from './detail-product-routing.module';

import { DetailProductPage } from './detail-product.page';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { ListProductComponent } from 'src/app/component/product/list-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProductPageRoutingModule
  ],
  declarations: [DetailProductPage, HeaderComponent, MenuFixedComponent, ProductComponent, ListProductComponent]
})
export class DetailProductPageModule { }
