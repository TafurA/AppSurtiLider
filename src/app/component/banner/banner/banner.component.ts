import { Component, OnInit } from '@angular/core';

import { BannerService } from 'src/app/service/banner/banner.service';
import { SwiperModule } from 'swiper/angular';

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  imports: [SwiperModule]
})

export class BannerComponent implements OnInit {

  public bannerList = new Array();

  public optionsSlider = {
    slidesPerView: "auto",
    loop: true,
    autoHeight: true,
    autoplay: {
      delay: 5000,
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  }

  constructor(private bannerService: BannerService) {
  }

  ngOnInit() {
    this.bannerService.getBannerList()
  }

  ngAfterViewInit() {
    this.fillArrayList()
  }

  fillArrayList() {
    this.bannerList = this.bannerService.arrayBanner()
  }

}
