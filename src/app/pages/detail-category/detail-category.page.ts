import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CategoryComponent } from 'src/app/component/category/category.component';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { CategoryProductComponent } from 'src/app/component/product/category-product.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.page.html',
  providers: [HeaderComponent, MenuFixedComponent, CategoryComponent, ProductComponent, CategoryProductComponent]
})
export class DetailCategoryPage implements OnInit {

  constructor(private loginService: LoginService, public navController: NavController) {
  }

  ngOnInit() {
    this.validateSession()
  }

  private validateSession() {
    if (!this.loginService.validateSession()) {
      this.navController.navigateForward("/login")
    }
  }

}
