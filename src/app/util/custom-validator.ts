import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

export class CustomValidator {

  messageValidation: any = { 'required': 'Este campo es obligatorio', 'minLength': 'La contraseña debe contener mas de 4 caracteres' };

  constructor() { }

  // public validatePassword(control: AbstractControl) {
  //   const password = control.value;
  //   let error = null;
  //   if (!password.includes('$')) {
  //     error = { ...error, dollar: 'needs a dollar symbol' };
  //   }
  //   if (!parseFloat(password[0])) {
  //     error = { ...error, number: 'must start with a number' };
  //   }
  //   return error;
  // }

  public getError(controlName: string, formGroup: any): string {
    let error = '';
    const control = formGroup.get(controlName);

    if (control.touched && control.errors != null) {
      error = JSON.stringify(control.errors);

      if (control.errors.required) {
        error = this.messageValidation.required;
      } else if (control.errors.minlength) {
        error = this.messageValidation.minLength;
      }
      this.addClassToError(controlName, true);
    } else {
      this.addClassToError(controlName, false);
    }

    return error;
  }

  public addClassToError(controlName: any, showError: boolean) {
    const inputElement = document.querySelector(`[formControlName='${controlName}']`)
    const parentInput = inputElement.closest('.o-form__field');

    if (showError) {
      parentInput.classList.add("is-field-error")
    } else {
      parentInput.classList.remove("is-field-error")
    }
  }


}
