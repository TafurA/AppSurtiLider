import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CustomValidator } from 'src/app/util/custom-validator';
import { ForgotPasswordService } from 'src/app/service/forgot-pass/forgot-password.service';
import { SecurityCodeComponent } from 'src/app/component/security-code/security-code.component';

@Component({
  selector: 'app-updated-password',
  templateUrl: './updated-password.page.html',
  providers: [CustomValidator, SecurityCodeComponent]
})

export class UpdatedPasswordPage implements OnInit {

  public updatedPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customValidator: CustomValidator,
    private forgotPasswordService: ForgotPasswordService,
    public securityCodeComponent: SecurityCodeComponent
  ) { }

  ngOnInit() {
    this.buildUpdatedPasswordForm()
  }

  private buildUpdatedPasswordForm() {
    const minPassLength = 5;
    this.updatedPasswordForm = this.formBuilder.group(
      {
        password: ['', [
          Validators.required,
          Validators.minLength(minPassLength),
        ]],
        passwordConfirm: ['', [
          Validators.required,
          Validators.minLength(minPassLength),
        ]]
      },
      {
        validators: this.customValidator.validateMatchPassword
      }
    );
  }

  public getError(controlName: any) {
    return this.customValidator.getError(controlName, this.updatedPasswordForm);
  }

  // update password
  public updatePassword() {
    const dataForm = this.updatedPasswordForm.value;

    this.forgotPasswordService.serviceUpdatePassword(
      this.securityCodeComponent.getCredentialString(),
      dataForm.passwordConfirm
    )
  }

}
