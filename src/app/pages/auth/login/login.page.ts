import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import axios from 'axios';

// Custom imports
import { LoginService } from 'src/app/service/login/login.service';
import { CustomValidator } from 'src/app/util/custom-validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [CustomValidator]
})

export class LoginPage implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    private customValidator: CustomValidator
  ) { }

  ngOnInit() {
    this.buildLoginForm();
    this.getUsers()
  }

  private buildLoginForm() {
    const minPassLength = 4;
    this.loginForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', [
        Validators.required,
        Validators.minLength(minPassLength),
        // this.customValidator.validatePassword
      ]]
      // email: ['john@angular.io', [
      //   Validators.required, Validators.email
      // ]],
    });
  }

  public getError(controlName: any) {
    return this.customValidator.getError(controlName, this.loginForm);
  }

  public async loginToSystem() {
    const dataForm = this.loginForm.value;

    if (dataForm.user != "" || dataForm.password != "") {
      this.loginService.loginToSystem(dataForm.user, dataForm.password);
    }

  }

  async getUsers() {
    try {
      axios.post("https://201.217.221.222:9001/IntranetSurti/WebServicesSurtiAppRest/consultaCategoriaProducto", {}, environment.headerConfig).then(response => {
        console.log(response)
      })

    } catch (error) {
      console.log(error.status);
      console.log(error.error); // error message as string
      console.log(error.headers);
    }
  }

}
