import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private navCtrl: NavController, private appCmpnt: AppComponent) { }

  ngOnInit() {
  }

  clickToGoBack() {
    this.appCmpnt.clickToGoBack()
  }

}
