import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
})

export class SearchPage implements OnInit {

  public searchProducts = new Array();

  constructor(public loginService: LoginService, public navControler: NavController) {
  }

  ngOnInit() {
    this.validateSession()
  }

  private validateSession() {
    if (!this.loginService.validateSession()) {
      this.navControler.navigateForward("/login")
    }
  }

}
