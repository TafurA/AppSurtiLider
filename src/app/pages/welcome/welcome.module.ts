// Custom native page transition
import { NavController, Platform } from '@ionic/angular';
import { NativePageTransitions, NativeTransitionOptions } from '@awesome-cordova-plugins/native-page-transitions/ngx';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WelcomePageRoutingModule } from './welcome-routing.module';

import { WelcomePage } from './welcome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WelcomePageRoutingModule
  ],
  declarations: [WelcomePage]
})

export class WelcomePageModule {
  constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions, private platform: Platform) {
    this.ionViewWillLeave();
  }

  //Este es un ejemplo de salida de página
  ionViewWillLeave() {
    let options: NativeTransitionOptions = {
      direction: 'down',
      duration: 500,
      slowdownfactor: 3,
      slidePixels: 20,
      iosdelay: 100,
      androiddelay: 150,
      fixedPixelsTop: 0,
      fixedPixelsBottom: 60
    }

    if (this.platform.is("cordova")) {
      this.nativePageTransitions.slide(options)
        .catch(onerror);
    } else {
      console.log("Run browser");
    }

  }

  // Este es un ejemplo de entrada en la página
  // openPage(page: any) {
  //   this.nativePageTransitions.slide(this.options);
  //   this.navCtrl.navigateForward(page);
  //   // this.navCtrl.navigateRoot(page);
  //   console.log("AQUI");
  // }
}
