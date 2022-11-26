import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit {
  public isDetailCategory = false;
  public arrayDataCategory: any[];

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCurrentPage()
    this.categoryService.getCategoryList()
  }

  ngAfterViewInit() {
    this.fillArrayCategory();
    // console.log("this.arrayDataCategory")
    // console.log(this.arrayDataCategory)
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
      console.log(window.location.pathname)
      console.log("CATEGORIAAA")
      this.isDetailCategory = true;
    }
  }
}
