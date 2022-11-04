import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

// Connect with http
import axios from 'axios';

// Global config
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public nvCtrl: NavController, private alertController: AlertController,) { }

  async loginToSystem(user: string, pass: string) {

    await axios.get(`${environment.apiPath}authenticate?login=${user}&clave=${pass}`, environment.headerConfig).then(response => {

      if (response.data.response) {
        this.saveDataIntoLocalStorage(atob(response.data.dataSession));
        this.nvCtrl.navigateForward("/styleguide")
        // const encodeString = atob(response.data.dataSession);

        // let jsonUserData = JSON.parse(encodeString)
        // let objectEntries = Object.entries(jsonUserData)
        // for (let [key, value] of objectEntries) {
        //   console.log(key + ' : ' + atob(String(value)));
        // }

      } else {
        console.log("no PASO")
        this.presentAlert(response.data.message)
      }

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }

  logOutIntoSystem() { }

  saveDataIntoLocalStorage(data: string) {
    localStorage.setItem("userSessionData", data);
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
