import { Component, OnInit } from '@angular/core';
import { BannerComponent } from 'src/app/component/banner/banner/banner.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.page.html',
  providers: [MenuFixedComponent, BannerComponent]
})
export class SidebarMenuPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleDropdown(e) {
    e.target.closest(
      ".c-navigation-support__item"
    ).classList.toggle("is-dropdown-show")
  }

}
