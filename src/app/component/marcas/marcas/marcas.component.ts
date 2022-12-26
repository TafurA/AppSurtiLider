import { Component, OnInit } from '@angular/core';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

import { MarcasService } from 'src/app/service/marcas/marcas.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
})

export class MarcasComponent implements OnInit {

  public arrayDataMarcas = new Array();

  public optionsSlider = {
    slidesPerView: "auto",
    spaceBetween: 16
  }

  constructor(public marcasService: MarcasService, private http: HTTP) { }

  ngOnInit(): void {
    this.marcasService.getListMarcas();
    this.test()
  }

  ngAfterViewInit() {
    this.fillArrayMarcas();
  }

  fillArrayMarcas() {
    this.arrayDataMarcas = this.marcasService.arrayMarcas()
  }

  test() {
    this.http.get('http://201.217.221.222:9090/IntranetSurti/WebServicesSurtiAppRest/getProvider', {}, {})
      .then(data => {
        console.log(data);
        console.log(data.data); // Información recibida desde el server.
        console.log(data.headers);
      })
      .catch(error => {
        console.log(error);
        console.log(error.error); // Mensaje de error en una cadena.
        console.log(error.headers);
      });
  }

}
