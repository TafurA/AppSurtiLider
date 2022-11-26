import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCategoryPageRoutingModule } from './detail-category-routing.module';

import { DetailCategoryPage } from './detail-category.page';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { CategoryComponent } from 'src/app/component/category/category.component';
import { CategoryProductComponent } from 'src/app/component/product/category-product.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCategoryPageRoutingModule
  ],
  declarations: [DetailCategoryPage, HeaderComponent, MenuFixedComponent, CategoryComponent, ProductComponent, CategoryProductComponent]
})
export class DetailCategoryPageModule {}
