import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { GridProductComponent } from 'src/app/component/product/grid-product.component';
import { SearchPage } from './search.page';
import { SearchPageRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [
    SearchPage,
    HeaderComponent,
    MenuFixedComponent,
    ProductComponent,
    GridProductComponent
  ]
})
export class SearchPageModule { }
