import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { CategoryComponent } from 'src/app/component/category/category.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { GridProductComponent } from 'src/app/component/product/grid-product.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    CategoryPage,
    ProductComponent,
    GridProductComponent,
    HeaderComponent,
    MenuFixedComponent,
    CategoryComponent,
  ]
})
export class CategoryPageModule { }
