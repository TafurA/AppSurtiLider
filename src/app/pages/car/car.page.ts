import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TestObject } from 'protractor/built/driverProviders';
import { ShopingCarService } from 'src/app/service/shoping-car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.page.html',
})
export class CarPage implements OnInit {

  public arrayProducts = new Array()
  isRemoved = false;
  public totalProductPrice: any = 0

  constructor(public alertController: AlertController, public shopingService: ShopingCarService) { }

  ngOnInit() {
    this.setProductsIntoArray()
    this.getPriceTotalProducts()
    this.shopingService.getClientCashback("420212")
  }

  public getCarLocalStorage() {
    return JSON.parse(window.localStorage.getItem("productsCar"))
  }

  public setProductsIntoArray() {
    this.getCarLocalStorage().forEach(product => {
      this.arrayProducts.push(product)
    });
  }

  public removeProductIntoCar(productId) {
    const updatedCarProduct = this.getCarLocalStorage().filter((product) => product.productCode !== productId)

    this.presentAlert().finally(() => {

      if (this.isRemoved) {
        localStorage.setItem("productsCar", JSON.stringify(updatedCarProduct))
        this.arrayProducts = updatedCarProduct

        this.totalProductPrice = 0
        this.getPriceTotalProducts()

        if (this.currentProductsCarNumber() == 0) {
          localStorage.removeItem("productsCar")
          this.totalProductPrice = 0
        }
      }

    })

  }

  public currentProductsCarNumber() {
    if (!this.getCarLocalStorage()) {
      return 0
    } else {
      return this.getCarLocalStorage().length
    }
  }

  public getPriceTotalProducts() {
    this.getCarLocalStorage().forEach(product => {
      const productQuantity = parseFloat(product.price) * product.quantityProduct
      this.totalProductPrice = this.totalProductPrice + productQuantity
    });
  }

  public getPriceProcess() {
    return parseFloat(this.totalProductPrice).toFixed(3)
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '¿Quieres eliminar este producto del carrito?',
      cssClass: 'c-alert c-alert_product is-success',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.isRemoved = false;
          },
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.isRemoved = true;
          },
        },
      ],
    });

    await alert.present();
    await alert.onDidDismiss();
  }

  toggleDropdown(e) {
    e.target.closest(
      ".js-car-dropdown"
    ).classList.toggle("is-dropdown-show")
  }

}
