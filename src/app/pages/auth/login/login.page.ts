import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  appComponentObject: any = new AppComponent(this.navCtrl)

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  clickToGoBack() {
    this.appComponentObject.clickToGoBack();
  }

}
