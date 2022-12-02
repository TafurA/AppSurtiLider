import { Component, OnInit } from '@angular/core';
import { MarcasService } from 'src/app/service/marcas/marcas.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {
  public arrayDataMarcas = new Array();

  constructor(public marcasService: MarcasService) { }

  ngOnInit() {
    this.marcasService.getListMarcas().then(() => {
      this.fillArrayMarcas();
    })
  }

  fillArrayMarcas() {
    this.arrayDataMarcas = this.marcasService.arrayMarcas()
  }

}
