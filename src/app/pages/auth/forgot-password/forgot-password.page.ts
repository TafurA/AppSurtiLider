import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { ForgotPasswordService } from 'src/app/service/forgot-pass/forgot-password.service';
import { CustomValidator } from 'src/app/util/custom-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  providers: [CustomValidator]
})

export class ForgotPasswordPage implements OnInit {

  public validateCredentialForm: FormGroup;
  public validateCodeForm: FormGroup;
  public loader: any;
  public stepOne: boolean = false;

  constructor(
    public forgotPasswordService: ForgotPasswordService,
    private formBuilder: FormBuilder,
    private customValidator: CustomValidator,
    public loadingController: LoadingController
  ) {
  }

  ngOnInit() {
    this.buildValidateCredentialForm();
  }

  // form.get('first')?.enable();
  // form.get('last')?.disable();

  private buildValidateCredentialForm() {
    this.validateCredentialForm = this.formBuilder.group({
      credential: ['', [Validators.required,]],
      code: ['', Validators.required],
      email: ['', Validators.required],
    });
  }


  public getError(controlName: any) {
    return this.customValidator.getError(controlName, this.validateCredentialForm);
  }

  public async validateUserCredential() {
    const dataForm = this.validateCredentialForm.value;

    this.showLoader()

    if (dataForm.credential != null) {
      await this.forgotPasswordService.serviceCredentialValidate(dataForm.credential).then(() => {
        this.removeLoader()

        if (this.forgotPasswordService.confirmData()[0]) {
          this.stepOne = true;
        }

      });
    }

  }

  async showLoader() {
    this.loader = await this.loadingController.create({
      spinner: "bubbles",
      translucent: true,
      cssClass: 'o-loader'
    });
    await this.loader.present();
  }

  async removeLoader() {
    this.loader = await this.loadingController.dismiss();
  }

}
