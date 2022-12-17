import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShopingCarService {

  public product = {
    "productCode": "",
    "nameProduct": "",
    "imgProduct": "",
    "quantityProduct": 0,
    "priceFinal": 0,
    "cantpun_b": 0,
    "puntos": 0,
    "valpun_b": "0",
    "valor": "0"
  }
  public products = []
  public counterProduct;
  public alert;

  constructor() {

  }

  public async getProductData(currentProduct) {
    this.product.productCode = currentProduct.codeProduct
    this.product.nameProduct = currentProduct.nameProduct
    this.product.imgProduct = currentProduct.img_prod
    this.product.quantityProduct = 0;
    this.product.priceFinal = currentProduct.totalValue
  }

  public async saveIntoCar(currentProduct) {
    this.getProductData(currentProduct).then(() => {

      const storageCarProduct = localStorage.getItem("productsCar")

      if (storageCarProduct) {

        const newDataCarProducts = JSON.parse(storageCarProduct) // Guardar array de productos

        for (let index = 0; index < newDataCarProducts.length; index++) {
          const element = newDataCarProducts[index];
          if (element.productCode == this.product.productCode) {
            this.product.quantityProduct = element.quantityProduct
            this.alertProduct("informative")
          } else {
            this.alertProduct("success")
          }
        }

        newDataCarProducts.push(this.product) // Guarda producto actual
        this.updateStorageCarProduct(newDataCarProducts, true, this.product.productCode) // Actualiza local storage

      } else {
        // Guardar producto por primera vez
        this.products = []
        this.product.quantityProduct = 1
        this.products.push(this.product)
        localStorage.setItem("productsCar", JSON.stringify(this.products))
        this.alertProduct("success")
      }

    }).finally(() => {
      this.changeCurrentValueCounterProduct()
    })
  }

  public addProductQuantity(codeProduct) {
    this.updateProductQuantity(codeProduct, "sum")
  }

  public addProductQuantityDetail(product) {
    this.getProductData(product).then(() => {

      const storageCarProduct = localStorage.getItem("productsCar")

      if (storageCarProduct) {

        const newDataCarProducts = JSON.parse(storageCarProduct) // Guardar array de productos

        for (let index = 0; index < newDataCarProducts.length; index++) {
          const element = newDataCarProducts[index];
          if (element.productCode == product.productCode) {
            product.quantityProduct = element.quantityProduct
            this.alertProduct("informative")
          } else {
            this.alertProduct("success")
          }
        }

        newDataCarProducts.push(product) // Guarda producto actual
        this.updateStorageCarProduct(newDataCarProducts, true, product.productCode) // Actualiza local storage

      } else {
        // Guardar producto por primera vez
        this.products = []
        product.quantityProduct = 0

        const temporalProduct = {
          "productCode": "",
          "nameProduct": "",
          "imgProduct": "",
          "quantityProduct": 0,
          "priceFinal": 0,
          "cantpun_b": 0,
          "puntos": 0,
          "valpun_b": "0",
          "valor": "0"
        }

        temporalProduct.productCode = product.productCode
        temporalProduct.nameProduct = product.nameProduct
        temporalProduct.imgProduct = product.img_prod
        temporalProduct.quantityProduct = product.quantityProduct

        this.products.push(temporalProduct)

        localStorage.setItem("productsCar", JSON.stringify(this.products))
        this.alertProduct("success")
        this.updateProductQuantity(temporalProduct.productCode, "sum")
      }

    }).finally(() => {
      this.changeCurrentValueCounterProduct()
    })
  }

  public removeProductQuantity(codeProduct) {
    this.updateProductQuantity(codeProduct, "rest")

    const storageCarProducts = JSON.parse(localStorage.productsCar)

    const filteredLibraries = storageCarProducts.filter((item) => item.quantityProduct !== 0)
    this.updateStorageCarProduct(filteredLibraries, false, 0)

    this.resetAlertAndCarIcon()
    this.changeCurrentValueCounterProduct()
  }

  public updateProductQuantity(codeProduct, action) {
    const storageCarProducts = JSON.parse(localStorage.productsCar)
    const newDataCarProducts = JSON.parse(localStorage.productsCar)

    for (let index = 0; index < storageCarProducts.length; index++) {
      const element = storageCarProducts[index];

      if (codeProduct != 0) {
        if (element.productCode == codeProduct) {

          if (action == "sum") {
            element.quantityProduct = element.quantityProduct + 1
          } else {
            element.quantityProduct = element.quantityProduct - 1
          }

          newDataCarProducts.push(element)
          this.changeCurrentValueQuantityProduct(element.quantityProduct)
        }
      }
    }

    this.updateStorageCarProduct(newDataCarProducts, false, 0)
  }

  public resetAlertAndCarIcon() {
    const numberCardAddProduct = document.querySelector(".js-number-card-product");

    if (numberCardAddProduct.innerHTML == "0") {
      if (document.querySelector(".js-alert-product").classList.contains("is-show")) {
        numberCardAddProduct.closest(".js-alert-product").querySelector(".c-product-alert__title").innerHTML = "Producto eliminado"
        numberCardAddProduct.closest(".js-alert-product").classList.add("is-informative")
        setTimeout(() => {
          numberCardAddProduct.closest(".js-alert-product").classList.remove("is-success")
          numberCardAddProduct.closest(".js-alert-product").classList.remove("is-informative")
          numberCardAddProduct.closest(".js-alert-product").classList.remove("is-show")
        }, 1000)
      }
    }

    if (!localStorage.productsCar) {
      const idIcoCar = document.querySelector(".js-ico-car");
      const idSearchHeader = document.querySelector(".js-search-header");
      idSearchHeader.classList.add("is-none-car")
      idIcoCar.classList.add("test")
      idIcoCar.querySelector(".js-text-ico-car").innerHTML = "0"
    }

  }

  public changeCurrentValueCounterProduct() {
    if (localStorage.productsCar) {
      const domNumberCount = JSON.parse(localStorage.productsCar).length
      const idIcoCar = document.querySelectorAll(".js-ico-car");
      const idSearchHeader = document.querySelectorAll(".js-search-header");

      idIcoCar.forEach(element => {
        element.classList.remove("test")
        const textIco = element.querySelectorAll(".js-text-ico-car")
        textIco.forEach(element => {
          element.innerHTML = domNumberCount
        });

        element.classList.add("is-product-add")
        setTimeout(() => {
          element.classList.remove("is-product-add")
        }, 500)

      });

      idSearchHeader.forEach(element => {
        element.classList.remove("is-none-car")
      });


    }
  }

  private changeCurrentValueQuantityProduct(quantity) {
    const numberQuantityProdudct = document.querySelectorAll(".js-number-card-product");

    numberQuantityProdudct.forEach(element => {
      element.innerHTML = quantity

      element.classList.add("is-animated")
      setTimeout(() => {
        element.classList.remove("is-animated")
      }, 500)
    });
  }

  private updateStorageCarProduct(newDataCarProducts, save, codeProduct) {
    // Remover ID de productos duplicados
    var uniqueArray = this.removeDuplicates(newDataCarProducts, "productCode");
    localStorage.setItem("productsCar", JSON.stringify(uniqueArray))

    if (uniqueArray.length == 0) {
      localStorage.removeItem("productsCar")

      if (!window.location.pathname.includes("detail-product")) {
        setTimeout(() => {
          document.querySelector(".js-number-card-product").innerHTML = "1"
        }, 1000)
      }
    }

    if (save) {
      this.updateProductQuantity(codeProduct, "sum")
    }

  }

  private removeDuplicates(originalArray, prop) {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  }

  private alertProduct(action) {
    const alertProduct = document.querySelector(".js-alert-product");
    alertProduct.setAttribute("id", this.product.productCode)
    alertProduct.classList.remove("is-show")

    if (window.location.pathname.includes("detail-product")) {
      alertProduct.querySelector(".c-add-car").classList.add("test")

      setTimeout(() => {
        alertProduct.classList.remove("is-show")
      }, 3000)
    } else {
      alertProduct.querySelector(".c-add-car").classList.remove("test")
    }

    if (action == "success") {
      alertProduct.classList.add("is-success")
      alertProduct.querySelector(".c-product-alert__title").innerHTML = "Producto agregado"
      alertProduct.classList.remove("is-informative")
    } else if (action == "informative") {
      setTimeout(() => {
        alertProduct.classList.add("is-informative")
        alertProduct.querySelector(".c-product-alert__title").innerHTML = "Cantidad actualizada"
        alertProduct.classList.remove("is-success")
      }, 100)

    }

    alertProduct.classList.add("is-show")

  }

  public closeAlert() {
    const alertProduct = document.querySelector(".js-alert-product");
    alertProduct.classList.remove("is-show")
  }
}
