import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service';

import { BannerComponent } from 'src/app/component/banner/banner/banner.component';
import { MenuFixedComponent } from 'src/app/component/layout/menu-fixed/menu-fixed.component';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.page.html',
  providers: [MenuFixedComponent, BannerComponent]
})
export class SidebarMenuPage implements OnInit {

  public userName = ""
  public userCashback = ""

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    this.setUserData()
  }

  setUserData() {
    this.userName = `${this.loginService.validateSession()['nomcli_b']} ${this.loginService.validateSession()['ape1cli_b']}`
    this.userCashback = `${this.loginService.validateSession()['valor_acomulado']}`
  }

  logOut() {
    this.loginService.logOutIntoSystem()
  }

  toggleDropdown(e) {
    e.target.closest(
      ".c-navigation-support__item"
    ).classList.toggle("is-dropdown-show")
  }

}
