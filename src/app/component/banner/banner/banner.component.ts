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

  constructor(private bannerService: BannerService) { }

  ngOnInit() {
    this.bannerService.getBannerList();
  }

  ngAfterViewInit() {
    this.fillArrayList()
  }

  public slideOpts = {
    slidesPerView: "auto",
    spaceBetween: 16,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 2500
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },

      setTransition(duration) {
        const swiper = this;
        swiper.slides
          .transition(duration)
          .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
          .transition(duration);
      }
    }
  }

  async fillArrayList() {
    this.bannerList = this.bannerService.arrayBanner()
  }

}
