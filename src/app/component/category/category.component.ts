import { Component, OnInit } from '@angular/core';

import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit {
  public arrayDataCategory: any[];
  public isDetailCategory = false;

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCurrentPage()
    this.categoryService.getCategoryList().finally(() => {
      this.fillArrayCategory();
    })
  }

  public optionsSlider = {
    slidesPerView: "auto",
    spaceBetween: 16
  }

  fillArrayCategory() {
    this.arrayDataCategory = this.categoryService.arrayCategory()
  }

  getCurrentPage() {
    if (window.location.pathname == "/category") {
      this.isDetailCategory = true;
    }
  }
}
