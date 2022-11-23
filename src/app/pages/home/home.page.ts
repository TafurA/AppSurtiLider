import { Component, OnInit } from '@angular/core';

import { BannerComponent } from 'src/app/component/banner/banner/banner.component';
import { CategoryComponent } from 'src/app/component/category/category.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { MarcasComponent } from 'src/app/component/marcas/marcas/marcas.component';

// Services
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  providers: [BannerComponent, MarcasComponent, CategoryComponent, MenuFixedComponent]
})
export class HomePage implements OnInit {
  loading: any

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    console.log(this.loginService.validateSession()['ape1cli_b'])
  }

}
