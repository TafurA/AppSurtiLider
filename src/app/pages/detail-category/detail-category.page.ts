import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryComponent } from 'src/app/component/category/category.component';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { CategoryProductComponent } from 'src/app/component/product/category-product.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.page.html',
  providers: [HeaderComponent, MenuFixedComponent, CategoryComponent, ProductComponent, CategoryProductComponent]
})
export class DetailCategoryPage implements OnInit {

  public categoryId: any;
  public nameCategory: string;
  public arrayDataSubCategory = new Array();


  constructor(private rutaActiva: ActivatedRoute, private categoryService: CategoryService) {
  }

  ngOnInit() {
    // this.rutaActiva.params.subscribe(
    //   (params: Params) => {
    //     this.categoryId = params.idCategory;
    //     this.nameCategory = params.nameCategory
    //     this.categoryService.getSubCategoryList(this.categoryId).then(() => {
    //       this.arrayDataSubCategory = JSON.parse(localStorage.test)
    //     })
    //   }
    // );

  }

}
