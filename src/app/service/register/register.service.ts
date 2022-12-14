import { Injectable } from '@angular/core';
import { AlertController, NavController} from '@ionic/angular';
// Connect with http
import axios from 'axios';

// Global config
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  data_peticion=[];
  dataBarrios=[];
  dataDireccion=[];
  public nombre:string;
  constructor(public nvCtrl: NavController, private alertController: AlertController) {
  }

  async DireccionNomenclaturas(){
    await axios.get(`${environment.apiPath}ComboDireccionApp`, environment.headerConfig).then(response => {
      if (response.data) {
        this.dataDireccion=response.data.data;
      }else{
        console.log("Ocurrío un error al traer las nomenclaturas de la dirección ");
      }
    }).catch((error) => {
    console.log("error.status");
    console.log(error)
    })
  }
  public ConfirmDireccion(): Object {
    this.dataDireccion;
    return this.dataDireccion;
  }
  
  //municipios
   async tbl_municipios() {

    await axios.get(`${environment.apiPath}ComboMunicipios`, environment.headerConfig).then(response => {
      if (response.data) {
        this.data_peticion = response.data.data;
      }
      else{
        console.log("Ocurrío un error al traer los municipios ");
      }
    }).catch((error) => {
    console.log("error.status");
    console.log(error)
    })
  }
  public confirmDataMunicipios(): Object {
    this.data_peticion;
    return this.data_peticion;
  }
  //Barrios
  async tbl_barrio() {

    await axios.get(`${environment.apiPath}ComboBarrios`, environment.headerConfig).then(response => {
      if (response.data) {
      this.dataBarrios=response.data.data;

      
      }else{
        console.log("Ocurrío un error al traer los municipios ");
      }
    }).catch((error) => {
    console.log("error.status");
    console.log(error)
    })

  }
  public confirmBarrios(): Object {
    this.dataBarrios;
    return this.dataBarrios;
  }
  async RegisterToSystem(tipo_doc: string,
    documento: number,
    primerNombre: string, 
    segundoNombre: string, 
    primerApellido:string, 
    segundoApellido: string, 
    razonSocial:string,
    email: string,
    telefono:number,
    establecimiento:string,
    ver_direccion:string,
    barrio: string,
    municipio:string,
    vendedor:string) {

    if (razonSocial){
       this.nombre=razonSocial ;
    }else if(primerNombre){
      this.nombre=primerNombre;
    }
    if(vendedor==""){
      vendedor='admsist'
      console.log(vendedor);
    }else{
      console.log(vendedor);

    }


  await axios.get(`${environment.apiPath}preRegistroCliente?tipo_doc=${tipo_doc}&nomcli_b=${this.nombre}&nom2cli_b=${segundoNombre}&ape1cli_b=${primerApellido}&ape2cli_b=${segundoApellido}&nitcli_b=${documento}&dircli_b=${ver_direccion}&ciucli_b=${municipio}&telcli_b=${telefono}&empcli_b=${establecimiento}&emailcli_b=${email}&barcli_b=${barrio}&vendedor=${vendedor}`, environment.headerConfig).then(response => {

    console.log(response);
  if (response.data.response) {

      this.presentAlertRegister("¡Exelente! Muy pronto nos estaremos comunicando con usted para asignarle sus credenciales.");
      this.nvCtrl.navigateForward("/welcome");
  } else {
    console.log("no PASO")
    this.presentAlert(response.data.message);

  }

  }).catch((error) => {
  console.log("error.status");
  console.log(error)
  })

  }

  async presentAlert(description: string) {
    let imagen ="../assets/image/interaccion_Registro.png";
    const alert = await this.alertController.create({
      
      // header: ,
      message:`<img src="${imagen}"><br>`+description,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm', 
        },
      ],
    });


    await alert.present();
  }
  async presentAlertRegister(description: string) {
    let imagen ="../assets/image/interaccion_Register.png";
    const alert = await this.alertController.create({
      
      message:`<img src="${imagen}"><br>`+description,
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'alert-button-confirm',
          handler: () => {
            this.nvCtrl.navigateForward("/welcome")
          },
        },
      ],
    });


    await alert.present();
  }

  
}

