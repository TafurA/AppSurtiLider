import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { BannerComponent } from 'src/app/component/banner/banner/banner.component';
import { MarcasComponent } from 'src/app/component/marcas/marcas/marcas.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, BannerComponent, MarcasComponent]
})
export class HomePageModule { }
