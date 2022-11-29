import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
// Connect with http
import axios from 'axios';

// Global config
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  data_peticion=[];
  dataTipoCliente=[];
  dataDireccion=[];
  constructor(public nvCtrl: NavController, private toastController: ToastController) {
  }

  async DireccionNomenclaturas(){
    await axios.get(`${environment.apiPath}ComboDireccionApp`, environment.headerConfig).then(response => {
      if (response.data) {
        // console.log(response.data);
        this.dataDireccion=response.data.data;
      }else{
        // console.log(response.data);
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
  async RegisterToSystem(tipo_doc: string,
                      documento: number,
                      primerNombre: string, 
                      segundoNombre: string, 
                      primerApellido:string, 
                      segundoApellido: string, 
                      razonSocial:string,
                      digitoVer:number,
                      email: string,
                      telefono:number,
                      tipo_tienda:string,
                      establecimiento:string,
                      ver_direccion:string,
                      barrio: string,
                      municipio:string ) {

    await axios.get(`${environment.apiPath}preRegistClient?nomcli_b=${primerNombre}&nom2cli_b=${segundoNombre}&apelcli_b=${primerApellido}&ape2cli_b=${segundoApellido}&nitcli_b=${documento}&dircli_b=${ver_direccion}&ciucli_b=${municipio}&telcli_b=${telefono}&empcli_b=${establecimiento}&zoncli_b=DA1234&barcli_b=${barrio}`, environment.headerConfig).then(response => {

      if (response.data.response) {
        // console.log(response)
        
        this.presentToast("Se creó correctamente el usuario", response.data.message, 'is-success')

      } else {
        console.log("no PASO")
        this.presentToast("TITUTLO", response.data.message, "is-error")

      }

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }
   //municipios
   async tbl_municipios() {

    await axios.get(`${environment.apiPath}BRComboMunicipios`, environment.headerConfig).then(response => {
      if (response.data) {
        // let data_peticion=response.data.data;
        this.data_peticion = response.data.data;
        // let data = this.data_peticion;
        // return data;
      }
      else{
        // console.log(response.data.data);
        console.log("Ocurrío un error al traer los municipios ");
      }
    }).catch((error) => {
    // console.log("error.status");
    // console.log(error)
    })

  }

  public confirmDataMunicipios(): Object {
    // this.tbl_municipios();
    this.data_peticion;
    // console.log(this.data_peticion);
    return this.data_peticion;
  }
    //tipo cliente
  async tbl_tipoCliente() {

    await axios.get(`${environment.apiPath}BRComboTipologias`, environment.headerConfig).then(response => {
      if (response.data) {
      this.dataTipoCliente=response.data.data;
      
      }else{
        console.log("Ocurrío un error al traer los municipios ");
      }
    }).catch((error) => {
    console.log("error.status");
    console.log(error)
    })

  }
  public confirmDataTipoCliente(): Object {
    this.dataTipoCliente;
    return this.dataTipoCliente;
  }

  async presentToast(title: string, description: string, alertType: string) {
    const toast = await this.toastController.create({
      header: title,
      message: description,
      duration: 8000,
      position: 'bottom',
      cssClass: `c-alert ${alertType}`,
    });

    await toast.present();
  }
}

