import { Component, OnInit } from '@angular/core';
import { CategoryComponent } from 'src/app/component/category/category.component';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { GridProductComponent } from 'src/app/component/product/grid-product.component';

@Component({
  selector: 'app-category-page',
  templateUrl: './category.page.html',
  providers: [HeaderComponent, MenuFixedComponent, CategoryComponent]
})

export class CategoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
