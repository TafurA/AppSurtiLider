import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login/login.service';

import { CategoryComponent } from 'src/app/component/category/category.component';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';

@Component({
  selector: 'app-category-page',
  templateUrl: './category.page.html',
  providers: [HeaderComponent, MenuFixedComponent, CategoryComponent]
})

export class CategoryPage implements OnInit {

  constructor(public loginService: LoginService, public navControler: NavController) { }

  ngOnInit() {
    this.validateSession()
  }

  private validateSession() {
    if (!this.loginService.validateSession()) {
      this.navControler.navigateForward("/login")
    }
  }

}
