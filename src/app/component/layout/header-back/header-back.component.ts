import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-header-back',
  templateUrl: './header-back.component.html',
  styleUrls: ['./header-back.component.scss'],
})
export class HeaderBackComponent implements OnInit {

  /**
   * Represents a HeaderBackComponent.
   * @constructor
   * @param {NavController} navCtrl - The object for controller the navigation.
  */
  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

  /**
   * Return the navigation to the prev page.
   * @return this.navCtrl.back() Function of the object NavController
  */
  clickToGoBack() {
    return this.navCtrl.back()
  }
}
