import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.scss'],
})
export class HeaderBackComponent implements OnInit {

  /**
   * Represents a HeaderBackComponent.
   * @constructor
   * @param {NavController} navCtrl - The object for controller the navigation.
  */
  constructor(public navCtrl: NavController, public loginService: LoginService) { }

  ngOnInit() { }

  /**
   * Return the navigation to the prev page.
   * @return this.navCtrl.back() Function of the object NavController
  */
  clickToGoBack() {

    if (this.loginService.validateSession()) {
      console.log("TIENE SESION")
      if (window.location.pathname.includes("car-detail")) {
        return this.navCtrl.navigateForward("/home")
      } else {
        return this.navCtrl.back()
      }
    } else {
      console.log("sin SESION")
      this.navCtrl.navigateForward("/login")
    }
  }
}
