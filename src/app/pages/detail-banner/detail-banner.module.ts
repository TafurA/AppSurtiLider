import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IonicModule } from '@ionic/angular';

import { DetailBannerPageRoutingModule } from './detail-banner-routing.module';

import { DetailBannerPage } from './detail-banner.page';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { GridProductComponent } from 'src/app/component/product/grid-product.component';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailBannerPageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [DetailBannerPage, HeaderComponent, MenuFixedComponent, ProductComponent, GridProductComponent]
})
export class DetailBannerPageModule { }
