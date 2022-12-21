import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-detail-providers',
  templateUrl: './detail-providers.page.html',
  styleUrls: ['./detail-providers.page.scss'],
})
export class DetailProvidersPage implements OnInit {

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
