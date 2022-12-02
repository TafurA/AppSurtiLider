import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProvidersPageRoutingModule } from './detail-providers-routing.module';

import { DetailProvidersPage } from './detail-providers.page';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { ProviderProductComponent } from 'src/app/component/product/provider-product.component';
import { HeaderBackComponent } from 'src/app/component/layout/header-back/header-back.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProvidersPageRoutingModule
  ],
  declarations: [DetailProvidersPage, HeaderComponent, HeaderBackComponent, MenuFixedComponent, ProductComponent, ProviderProductComponent]
})
export class DetailProvidersPageModule { }
