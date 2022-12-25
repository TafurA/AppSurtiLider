import { Component, OnInit } from '@angular/core';


import { FavoriteService } from 'src/app/service/favorite/favorite.service';
import { ProductService } from 'src/app/service/product/product.service';
import { SearchService } from 'src/app/service/search/search.service';

@Component({
  selector: 'app-grid-product',
  templateUrl: './grid-product.component.html',
})
export class GridProductComponent implements OnInit {

  public arrayDataProducts = new Array();
  public searchProducts = new Array();
  public isFavoriteNull;
  public isSearchProductsNull;
  public isViewOfFavorite = false;

  constructor(
    public productService: ProductService,
    public favoriteService: FavoriteService,
    public searchService: SearchService
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
    } else if (window.location.pathname == "/offert") {
      this.productService.getOffertProducts().then(() => {
        this.fillArrayProducts()
      })
    }
    else {
      // Products without User session
      this.productService.getCurrentProducts().then(() => {
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
    }
    else if (window.location.pathname.includes("search")) {
      // List of General products
      this.arrayDataProducts = JSON.parse(window.localStorage.getItem("productsSearch"))

      if (this.arrayDataProducts.length > 0) {
        this.isSearchProductsNull = true
      } else {
        this.isSearchProductsNull = false
      }

      this.changeSearchProducts()
    }
    else {
      // List of General products
      this.arrayDataProducts = this.productService.arrayDataProducts
      this.isSearchProductsNull = true
    }
  }

  public changeSearchProducts() {
    const inputSearch = document.querySelector(".js-input-search");
    inputSearch.addEventListener("change", (e) => {

      if (e.target['value'] != null) {
        this.searchService.getProductsOfSearch(
          e.target['value']
        ).then(() => {
          this.arrayDataProducts = JSON.parse(window.localStorage.getItem("productsSearch"))
        }).finally(() => {
          if (this.arrayDataProducts.length > 0) {
            this.isSearchProductsNull = true
          } else {
            this.isSearchProductsNull = false
          }
        })
      }

    })
  }

}
