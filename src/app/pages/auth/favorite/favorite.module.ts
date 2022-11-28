import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxPaginationModule } from 'ngx-pagination';

import { FavoritePageRoutingModule } from './favorite-routing.module';

import { FavoritePage } from './favorite.page';
import { HeaderBackComponent } from 'src/app/component/layout/header-back/header-back.component';
import { GridProductComponent } from 'src/app/component/product/grid-product.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritePageRoutingModule,
    NgxPaginationModule
  ],
  declarations: [FavoritePage, HeaderBackComponent, ProductComponent, GridProductComponent]
})
export class FavoritePageModule { }
