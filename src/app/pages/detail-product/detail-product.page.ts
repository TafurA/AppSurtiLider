import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { LoginService } from 'src/app/service/login/login.service';

import { ProductService } from 'src/app/service/product/product.service';
import { ShopingCarService } from 'src/app/service/shoping-car.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.page.html',
})
export class DetailProductPage implements OnInit {

  public product = {
    productCode: "",
    nameProduct: "",
    description: "",
    price: "",
    imgProduct: "",
    galery: [],
    discount: "",
    quantityProduct: 0,
    priceFinal: 0,
    cantpun_b: 0,
    puntos: 0,
    valpun_b: "0",
    valor: "0"
  }

  isProductInCar = false
  counterProductsCar = 0

  isDescriptionDropdown = false

  public favoriteList = new Array()
  isFavorite = false

  public isDiscountProduct = false
  totalProductDiscount: any;
  totalProductValue: number;

  constructor(
    public productService: ProductService,
    private rutaActiva: ActivatedRoute,
    public shopingCarService: ShopingCarService,
    public loginService: LoginService,
    public navControler: NavController,
    public favoriteService: FavoriteService
  ) {

  }

  ngOnInit() {
    this.validateSession()
  }

  public slideOpts = {
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    loopedSlides: 3,
    coverflowEffect: {
      rotate: 0,
      stretch: -20,
      depth: 400,
      modifier: 1,
      slideShadows: false
    },
    on: {
      beforeInit() {
        const swiper = this;

        swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
        swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate() {
        const swiper = this;
        const {
          width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
        } = swiper;
        const params = swiper.params.coverflowEffect;
        const isHorizontal = swiper.isHorizontal();
        const transform$$1 = swiper.translate;
        const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
        const rotate = isHorizontal ? params.rotate : -params.rotate;
        const translate = params.depth;
        // Each slide offset from center
        for (let i = 0, length = slides.length; i < length; i += 1) {
          const $slideEl = slides.eq(i);
          const slideSize = slidesSizesGrid[i];
          const slideOffset = $slideEl[0].swiperSlideOffset;
          const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

          let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
          let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
          // var rotateZ = 0
          let translateZ = -translate * Math.abs(offsetMultiplier);

          let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
          let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

          // Fix for ultra small values
          if (Math.abs(translateX) < 0.001) translateX = 0;
          if (Math.abs(translateY) < 0.001) translateY = 0;
          if (Math.abs(translateZ) < 0.001) translateZ = 0;
          if (Math.abs(rotateY) < 0.001) rotateY = 0;
          if (Math.abs(rotateX) < 0.001) rotateX = 0;

          const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

          $slideEl.transform(slideTransform);
          $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
          if (params.slideShadows) {
            // Set shadows
            let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
            let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
            if ($shadowBeforeEl.length === 0) {
              $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
              $slideEl.append($shadowBeforeEl);
            }
            if ($shadowAfterEl.length === 0) {
              $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
              $slideEl.append($shadowAfterEl);
            }
            if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
            if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
          }
        }

        // Set correct perspective for IE10
        if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
          const ws = $wrapperEl[0].style;
          ws.perspectiveOrigin = `${center}px 50%`;
        }
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

  public async getProcessDataProductDetail() {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        console.log("this.productService.arrayDetailProduct[0]")
        this.product.productCode = params.productId;
        this.productService.getProductDetail(this.product.productCode).then(() => {
          this.product.nameProduct = this.productService.arrayDetailProduct[0].nameProduct
          this.product.description = this.productService.arrayDetailProduct[0].descrProduct
          this.product.price = this.productService.arrayDetailProduct[0].precioSinDcto
          this.product.imgProduct = this.productService.arrayDetailProduct[0].img_prod1
          this.product.galery.push(this.productService.arrayDetailProduct[0].img_prod1)
          this.product.galery.push(this.productService.arrayDetailProduct[0].img_prod2)
          this.product.galery.push(this.productService.arrayDetailProduct[0].img_prod3)
        }).then(() => this.showDropdownDescription());
      }
    );

  }

  public showDropdownDescription() {
    if (this.product.description.length > 180) {
      this.isDescriptionDropdown = true
    } else {
      this.isDescriptionDropdown = false
    }
  }

  public addQuantitifyProductToCar() {
    this.shopingCarService.addProductQuantityDetail(this.product)
  }

  public removeQuantitifyProductToCar() {
    this.shopingCarService.removeProductQuantity(this.product.productCode)

    if (this.counterProductsCar == 0) {
      const alert = document.querySelector(".js-alert-product")
      alert.classList.add("is-show")
      alert.classList.add("is-informative")
      alert.querySelector(".c-product-alert__title").innerHTML = "Producto eliminado del carrito"

      setTimeout(() => {
        alert.classList.remove("is-show")
      }, 3000)
    }
  }

  addProductToFavorite(idProduct) {
    this.favoriteService.addProductToFavorite(idProduct).finally(() => {
      console.log(idProduct)
      if (this.favoriteService.productAddSuccess()) {
        this.isFavorite = true
      }
    });
  }

  removeProductToFavorite(idProduct) {
    this.favoriteService.removeFavoriteProducts(idProduct).finally(() => {
      if (!this.favoriteService.productAddSuccess()) {
        this.isFavorite = false
      }
    });
  }

  async fillArrayFavoriteList() {
    this.favoriteService.getFavoriteProductsList().then(() => {
      this.favoriteList = this.favoriteService.arrayDataFavorites

      console.log(this.favoriteList)

      for (let index = 0; index < this.favoriteList.length; index++) {
        const element = this.favoriteList[index];
        if (element.codeProduct == this.product.productCode) {
          this.isFavorite = true
        }
      }
    })
  }

  async getProductData(e) {
    this.shopingCarService.saveIntoCar(e)
  }

  toggleDropdown(e) {
    e.target.closest(
      ".o-detail__dropdown"
    ).classList.toggle("is-dropdown-show")
  }

  private validateSession() {
    if (this.loginService.validateSession()) {
      this.getProcessDataProductDetail();
      this.fillArrayFavoriteList();

      if (localStorage.getItem("productsCar")) {
        const localStorageProduct = JSON.parse(localStorage.getItem("productsCar"))
        localStorageProduct.forEach(element => {
          if (element.productCode == this.product.productCode) {
            this.counterProductsCar = element.quantityProduct
          }
        });
      }

    } else {
      this.navControler.navigateForward("/login")
    }
  }
}
