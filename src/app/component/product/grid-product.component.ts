import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
})
export class GridProductComponent implements OnInit {

  public arrayDataProducts = new Array();

  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.getProducts()
  }

  ngAfterViewInit() {
    this.fillArrayProducts();
  }

  public getProducts() {
    this.productService.getCurrentProducts("0")
  }

  fillArrayProducts() {
    this.arrayDataProducts = this.productService.arrayDataProducts
    // console.log("ARRAY DATA PROPDUCTS")
    // console.log(this.arrayDataProducts)
  }

}
