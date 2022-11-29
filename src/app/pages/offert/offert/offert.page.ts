import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from 'src/app/component/layout/header/header.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';
import { GridProductComponent } from 'src/app/component/product/grid-product.component';
import { ProductComponent } from 'src/app/component/product/product/product.component';

@Component({
  selector: 'app-offert',
  templateUrl: './offert.page.html',
  providers: [HeaderComponent, MenuFixedComponent, ProductComponent, GridProductComponent]
})

export class OffertPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
