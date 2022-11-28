import { Component, OnInit } from '@angular/core';


import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { ProductService } from 'src/app/service/product/product.service';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
})
export class GridProductComponent implements OnInit {

  public arrayDataProducts = new Array();
  public isFavoriteNull;
  public isViewOfFavorite = false;

  constructor(
    public productService: ProductService,
    public favoriteService: FavoriteService
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  public getProducts() {
    // For list of favorite products
    if (window.location.pathname == "/favorite") {
      this.isViewOfFavorite = true;
      this.isFavoriteNull = this.favoriteService.getIsFavoriteNull();

      this.favoriteService.getFavoriteProductsList().then(() => {
        this.fillArrayProducts()
      })
    } else {
      // Products without User session
      this.productService.getCurrentProducts("0").then(() => {
        this.fillArrayProducts()
      })
    }
  }

  fillArrayProducts() {
    // For list of favorite products
    if (window.location.pathname == "/favorite") {
      setInterval(() => {
        this.arrayDataProducts = this.favoriteService.arrayDataFavorites
        this.isFavoriteNull = this.favoriteService.getIsFavoriteNull();
      }, 1000)
    } else {
      // List of General products
      this.arrayDataProducts = this.productService.arrayDataProducts
    }
  }

}
