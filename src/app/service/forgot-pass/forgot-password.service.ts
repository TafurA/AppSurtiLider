import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
// Connect with http
import axios from 'axios';

// Global config
import { environment } from '../../../environments/environment';

// https://201.217.221.222:9001/IntranetSurti/WebServicesSurtiAppRest/Verificationcode?codigo=8235&email=tafursla@outlook.com
// https://201.217.221.222:9001/IntranetSurti/WebServicesSurtiAppRest/Changepassword?codigo=99313&passd=99313

@Injectable({
  providedIn: 'root'
})

export class ForgotPasswordService {

  public isCredentialFull: boolean = false;
  private userEmail: string;

  constructor(public toastController: ToastController, public loadingController: LoadingController) { }

  async serviceCredentialValidate(id: string) {

    await axios.get(`${environment.apiPath}Forgotpassword?identificacion=${id}`, environment.headerConfig).then(response => {

      if (response.data.response) {
        console.log(response)
        this.presentToast("¡Código enviado exitosamente!", response.data.message, 'is-success')
        this.isCredentialFull = true;
      } else {
        this.presentToast("¡Ups!", "No se reconoce el usuario", 'is-error')
        this.isCredentialFull = true;
      }

      return response

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }

  // Return email and true if the code has send succesfuly
  public confirmData(): Object {
    this.userEmail = "tafursla@outlook.com";
    return [this.isCredentialFull, this.userEmail];
  }

  // ALERT
  // TODO:hacer clase general
  async presentToast(title: string, description: string, alertType: string) {
    const toast = await this.toastController.create({
      header: title,
      message: description,
      duration: 2500,
      position: 'bottom',
      cssClass: `c-alert ${alertType}`,
    });

    await toast.present();
  }

}
