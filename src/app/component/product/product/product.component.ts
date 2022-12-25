import { Component, Input, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { LoginService } from 'src/app/service/login/login.service';
import { ShopingCarService } from 'src/app/service/shoping-car.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})

export class ProductComponent implements OnInit {

  @Input() productObject: any = new Array();

  public favoriteList = new Array();
  public isFavorite = false;
  public isNormalProduct = true;
  public isDiscountProduct = false;
  public isCashbackProduct = false;

  public totalProductDiscount = 0
  public totalProductValue = 0

  public totalValueCashback = 0
  public totalPriceCashback = 0

  constructor(
    public favoriteService: FavoriteService,
    public shopingCarService: ShopingCarService,
    private alertController: AlertController,
    public loginService: LoginService,
    public navController: NavController
  ) { }

  ngOnInit() {
    this.productWithCashback()
    this.productWithDiscount()
    if (window.location.pathname == "/favorite") {
      this.getFavoriteTag()
    } else {
      this.getFavoriteTagAnotherPages()
    }
  }

  addProductToFavorite(idProduct) {
    if (this.loginService.validateSession()) {
      this.favoriteService.addProductToFavorite(idProduct).finally(() => {
        console.log(idProduct)
        if (this.favoriteService.productAddSuccess()) {
          this.isFavorite = true
        }
      });
    } else {
      this.navController.navigateForward("/login")
    }
  }

  removeProductToFavorite(idProduct) {
    this.favoriteService.removeFavoriteProducts(idProduct).finally(() => {
      if (!this.favoriteService.productAddSuccess()) {
        this.isFavorite = false
      }
    });
  }

  public productWithCashback() {
    if (this.productObject.valor > "0") {
      this.isCashbackProduct = true
      this.totalValueCashback = this.productObject.valpun_b
      this.totalPriceCashback = this.productObject.valor
    }
  }

  public productWithDiscount() {

    const descuentoFormated = parseInt(this.productObject.porcDescuento)

    if (descuentoFormated.toFixed(0) > "0") {
      this.isDiscountProduct = true
      this.totalProductDiscount = this.productObject.precioSinDcto
      this.totalProductValue = parseInt(this.productObject.porcDescuento)
    }
  }

  getFavoriteTag() {
    this.fillArrayFavoriteList().then(() => {
      for (let index = 0; index < this.favoriteList.length; index++) {
        const element = this.favoriteList[index];
        if (element.productCode == this.productObject.productCode) {
          this.isFavorite = true
        }
      }
    })
  }

  getFavoriteTagAnotherPages() {
    this.favoriteService.getFavoriteProductsList().then(() => {
      this.fillArrayFavoriteList().finally(() => {
        this.getFavoriteTag()
      })
    })
  }

  async fillArrayFavoriteList() {
    this.favoriteList = this.favoriteService.arrayFavorites()
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Cashback',
      subHeader: `Por cada ${this.totalValueCashback} recibe ${this.totalPriceCashback} COP en cashback`,
      cssClass: "c-alert is-success",
      buttons: ['OK'],
    });

    await alert.present();
  }

  async getProductData(e) {
    if (this.loginService.validateSession()) {
      this.shopingCarService.saveIntoCar(e)
    }
    else {
      this.navController.navigateForward("/login")
    }
  }

}
