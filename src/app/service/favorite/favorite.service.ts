import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import axios from 'axios';

import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public arrayDataFavorites = new Array();
  public isFavorite = false;
  public isFavoriteNull = false;

  constructor(
    public toastController: ToastController,
    public loginService: LoginService,
    public nvCtrl: NavController
  ) { }

  async addProductToFavorite(product) {
    if (this.loginService.validateSession()) {
      await axios.get(`${environment.apiPath}saveFavorite?nitcli_b=${this.getClientCode()}&codpro_b=${product}`, environment.headerConfig).then(response => {

        if (response.data.response) {
          this.presentToast("Agregado a favoritos", response.data.message, "is-success")
          this.isFavorite = true;
        } else {
          this.presentToast("Error al agregar a favorito", response.data.message, "is-error")
        }

      })
    } else {
      console.log("USUARIO SIN SESESEION")
      this.nvCtrl.navigateForward("/login")
    }
  }

  async removeFavoriteProducts(product) {
    await axios.get(`${environment.apiPath}removeFavorite?nitcli_b=${this.getClientCode()}&codpro_b=${product}`, environment.headerConfig).then(response => {

      if (response.data.response) {
        this.presentToast("Eliminado de favoritos", response.data.message, "is-success")
        this.isFavorite = false;
      } else {
        this.presentToast("Error eliminando de favortis", response.data.message, "is-error")
      }

    }).finally(() => {
      this.getFavoriteProductsList()
    })
  }

  productAddSuccess() {
    return this.isFavorite;
  }

  async getFavoriteProductsList() {
    this.arrayDataFavorites = []

    await axios.get(`${environment.apiPath}getFavoritos?nitcli_b=${this.getClientCode()}`, environment.headerConfig).then(response => {

      if (response.data.favorites) {
        for (let index = 0; index < response.data.favorites.length; index++) {
          const element = response.data.favorites[index];
          this.arrayDataFavorites[index] = element
        }
        this.setIsFavoriteNull(false)
      } else {
        this.setIsFavoriteNull(true)
      }

    })
  }

  public arrayFavorites() {
    return this.arrayDataFavorites
  }

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

  public getIsFavoriteNull() {
    return this.isFavoriteNull
  }

  public setIsFavoriteNull(isFavoriteNull) {
    this.isFavoriteNull = isFavoriteNull
  }

  private getClientCode() {
    return this.loginService.validateSession()['codcli_b'];
  }

}
