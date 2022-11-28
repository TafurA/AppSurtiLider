import { Component, OnInit } from '@angular/core';

import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
})
export class ListProductComponent implements OnInit {

  public arrayDataProducts = new Array();

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.getProducts()
  }

  ngAfterViewInit() {
    this.fillArrayProducts();
  }

  public slideOpts = {
    slidesPerView: 3,
    autoHeight: true,
    autoplay: {
      delay: 2000
    },
    preventClicksPropagation: true,
    preventClicks: true,
    preventInteractionOnTransition: true,
    spaceBetween: 16,
    setWrapperSize: true
  }

  public getProducts() {
    this.productService.getCurrentProducts("0")
  }

  fillArrayProducts() {
    this.arrayDataProducts = this.productService.arrayDataProducts
  }

}
