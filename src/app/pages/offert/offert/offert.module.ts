import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OffertPageRoutingModule } from './offert-routing.module';

import { OffertPage } from './offert.page';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { CategoryComponent } from 'src/app/component/category/category.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { GridProductComponent } from 'src/app/component/product/grid-product.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OffertPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    OffertPage,
    HeaderComponent,
    MenuFixedComponent,
    CategoryComponent,
    ProductComponent,
    GridProductComponent
  ]
})
export class OffertPageModule { }
