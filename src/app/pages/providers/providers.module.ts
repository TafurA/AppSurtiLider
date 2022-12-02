import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvidersPageRoutingModule } from './providers-routing.module';

import { ProvidersPage } from './providers.page';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { GridProductComponent } from 'src/app/component/product/grid-product.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvidersPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [ProvidersPage, HeaderComponent, MenuFixedComponent, ProductComponent, GridProductComponent]
})
export class ProvidersPageModule { }
