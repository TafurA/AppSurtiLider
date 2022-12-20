import { Component, OnInit } from '@angular/core';
import { networkInterfaces } from 'os';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
})
export class CarDetailPage implements OnInit {

  public addressData = {
    userCurrent: "",
    address: "",
    phone: "",
    date: new Date
  }

  constructor(public loginService: LoginService) { }

  ngOnInit() {
    console.log(this.loginService.validateSession())
    this.addressData.userCurrent = this.loginService.validateSession()['nomcli_b'] + " " + this.loginService.validateSession()['ape1cli_b']
    this.addressData.address = this.loginService.validateSession()['dircli_b']
    this.addressData.phone = this.loginService.validateSession()['telcli_b']
    console.log(this.addressData.date)
  }

}
