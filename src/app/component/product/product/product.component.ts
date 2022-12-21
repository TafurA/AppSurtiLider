import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

import { FavoriteService } from 'src/app/service/favorite/favorite.service';
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

  constructor(public favoriteService: FavoriteService, public shopingCarService: ShopingCarService, private alertController: AlertController) { }

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
    this.favoriteService.addProductToFavorite(idProduct).finally(() => {
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

  public productWithCashback() {
    if (this.productObject.valor > "0") {
      this.isCashbackProduct = true
      this.totalValueCashback = this.productObject.valpun_b
      this.totalPriceCashback = this.productObject.valor
    }
  }

  public productWithDiscount() {
    if (this.productObject.porcDescuento > "0") {
      this.isDiscountProduct = true
      this.totalProductDiscount = this.productObject.precioSinDcto
      this.totalProductValue = this.productObject.porcDescuento
    }
  }

  getFavoriteTag() {
    this.fillArrayList().then(() => {
      for (let index = 0; index < this.favoriteList.length; index++) {
        const element = this.favoriteList[index];
        if (element.code == this.productObject.code) {
          this.isFavorite = true
        }
      }
    })
  }

  getFavoriteTagAnotherPages() {
    this.favoriteService.getFavoriteProductsList().then(() => {
      this.fillArrayList()
    }).finally(() => {
      this.getFavoriteTag()
    })
  }

  async fillArrayList() {
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
    this.shopingCarService.saveIntoCar(e)
  }

}
