import { Injectable } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';


// Connect with http
import axios from 'axios';

// Global config
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateCredentialsService {

constructor(public nvCtrl: NavController, private toastController: ToastController, private alertController:AlertController) { }


async UpdatecredentialsCustomer(
  codigo: string,
  passwordCurrent: string,
  NewPassword:string){

    
await axios.get(`${environment.apiPath}Updatepassword?codigo=${codigo}&passPrevious=${passwordCurrent}&passNew=${NewPassword}`, environment.headerConfig).then(response => {

  console.log(response);
if (response.data.response) {

    this.presentAlertRegister("¡Exelente! su contraseña se actualizó con éxito");
    this.nvCtrl.navigateForward("/home");
} else {
  console.log("Error al actualizar contraseña")
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
        this.nvCtrl.navigateForward("/home")
      },
    },
  ],
});


await alert.present();
}



}
