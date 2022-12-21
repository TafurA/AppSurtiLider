import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NavController } from '@ionic/angular';

import { BannerService } from 'src/app/service/banner/banner.service';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-detail-banner',
  templateUrl: './detail-banner.page.html',
})
export class DetailBannerPage implements OnInit {
  public arrayDataProducts = new Array();
  public bannerId;

  public banner = {
    imagen: ""
  }

  constructor(public bannerService: BannerService, private rutaActiva: ActivatedRoute, private loginService: LoginService, public navControler: NavController) { }

  ngOnInit() {
    this.validateSession()
  }

  getDataCurrentBanner() {
    this.bannerService.getBannerDetail(this.getActiveBannerId()).finally(() => {
      this.fillArrayProducts()
      console.log(this.bannerService.arrayDetailProductBanner())
      this.banner.imagen = this.bannerService.arrayDetailProductBanner()["imagen"]

      console.log(this.banner.imagen)
    })
  }

  fillArrayProducts() {
    this.arrayDataProducts = this.bannerService.arrayDataProducts
  }

  getActiveBannerId() {
    this.rutaActiva.params.subscribe(
      (params: Params) => {
        this.bannerId = params.bannerId;
      }
    );

    return this.bannerId;
  }

  private validateSession() {
    if (this.loginService.validateSession()) {
      console.log("TIENE SESION")
      this.getDataCurrentBanner()
    } else {
      console.log("sin SESION")
      this.navControler.navigateForward("/login")
    }
  }

}
