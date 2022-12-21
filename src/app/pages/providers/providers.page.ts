import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/service/login/login.service';
import { MarcasService } from 'src/app/service/marcas/marcas.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {
  public arrayDataMarcas = new Array();

  constructor(public marcasService: MarcasService, public loginService: LoginService, public navControler: NavController) { }

  ngOnInit() {
    this.validateSession()
  }

  fillArrayMarcas() {
    this.arrayDataMarcas = this.marcasService.arrayMarcas()
  }

  private validateSession() {
    if (this.loginService.validateSession()) {
      this.marcasService.getListMarcas().then(() => {
        this.fillArrayMarcas();
      })
    } else {
      this.navControler.navigateForward("/login")
    }
  }

}
