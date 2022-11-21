import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SwiperModule],
  exports: [RouterModule],
})
export class HomePageRoutingModule { }
