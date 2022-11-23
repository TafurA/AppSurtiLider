import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

// Connect with http
import axios from 'axios';

// Global config
import { environment } from '../../../environments/environment';
import { SessionGuard } from 'src/app/guard/session.guard';

@Injectable({
  providedIn: 'root',
})

export class LoginService {

  public ProcessDataUserSession = {};

  constructor(public nvCtrl: NavController, private toastController: ToastController, public sessionGuard: SessionGuard) {
  }

  async loginToSystem(user: string, pass: string) {

    await axios.get(`${environment.apiPath}authenticate?login=${user}&clave=${pass}`, environment.headerConfig).then(response => {

      if (response.data.response) {
        this.saveDataIntoLocalStorage(atob(response.data.dataSession));
        this.nvCtrl.navigateForward("/home")
      } else {
        console.log("no PASO")
        this.presentToast("TITUTLO", response.data.message, "is-error")
      }

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }

  logOutIntoSystem() {
    localStorage.removeItem("userSessionData")
    this.nvCtrl.navigateForward("/welcome")
  }

  saveDataIntoLocalStorage(data: string) {
    localStorage.setItem("userSessionData", data);
  }

  validateSession() {
    if (this.sessionGuard.canActivate()) {
      const encodeString = localStorage.userSessionData

      let jsonUserData = JSON.parse(encodeString)
      let objectEntries = Object.entries(jsonUserData)

      for (let [key, value] of objectEntries) {
        this.ProcessDataUserSession[key] = atob(String(value))
      }

      return this.ProcessDataUserSession
    } else {
      return this.sessionGuard.canActivate();
    }
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
