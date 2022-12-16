import { Component, OnInit } from '@angular/core';
import { ShopingCarService } from 'src/app/service/shoping-car.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  public numberProductsCar;
  public productsIsNull = true;

  constructor(public shopinCarService: ShopingCarService) { }

  ngOnInit() {
    // this.numberProductsCar = JSON.parse(localStorage.productsCar).length
    this.getCounterCarProducts()
  }

  public getCounterCarProducts() {
    const counterLocalStorage = localStorage.productsCar
    if (counterLocalStorage) {
      this.numberProductsCar = JSON.parse(counterLocalStorage).length
      this.productsIsNull = !this.productsIsNull
    } else {
      this.numberProductsCar = 0
      this.productsIsNull = this.productsIsNull
    }
  }

}
