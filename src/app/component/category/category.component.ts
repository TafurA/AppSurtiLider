import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit {
  public arrayDataCategory: any[];

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getCategoryList()
  }

  ngAfterViewInit() {
    this.fillArrayCategory();
  }

  public optionsSlider = {
    slidesPerView: "auto",
    spaceBetween: 16
  }

  fillArrayCategory() {
    this.arrayDataCategory = this.categoryService.arrayCategory()
  }
}
