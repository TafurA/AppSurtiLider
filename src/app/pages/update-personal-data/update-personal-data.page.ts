import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


// Custom imports
import { UpdatePersonalDataService } from 'src/app/service/update-personal-data/update-personal-data.service';
import { LoginService } from 'src/app/service/login/login.service';
import { UpdatePersonalData } from 'src/app/util/update-personal-data-validator';

@Component({
  selector: 'app-update-personal-data',
  templateUrl: './update-personal-data.page.html',
  styleUrls: ['./update-personal-data.page.scss'],
  providers: [UpdatePersonalData]
})
export class UpdatePersonalDataPage implements OnInit {

  public codcli_b !: string;


  public UpdateFormPersonal: FormGroup;

  constructor(
    public loginService:LoginService,
    private updatePersonalDataService: UpdatePersonalDataService,
    private formBuilder: FormBuilder,
    private updatePersonalData: UpdatePersonalData
    ) { }

  ngOnInit() {
    this.buildUpdateDataPersonalForm();
    this.setUserData();
  }
  private buildUpdateDataPersonalForm() {
      //documento
      const mindocLength= 5;
      const maxdocLength= 10;
      //Nombres y apellidos
      const minNomLength= 3;
      const maxNomLength= 28;
      //Razon Social
      const maxRazonSocialLength= 40;
      const maxEstablecimiento =50
      //PATERN NUMBER
      const soloNumeros ="^[0-9]*$";
      //PATTERN LETRAS SIN ESPACIOS
      const letrasEspacio='[a-zA-Z\s]*';
      const letras='[a-zA-Z ]+$';
    this.UpdateFormPersonal = this.formBuilder.group({
      documento:        [''],
      primerNombre:     [''],
      segundoNombre:    [''],
      primerApellido:   [''],
      segundoApellido:  [''],
      email:            ['',[
                              Validators.email,
                              Validators.required,
                              Validators.maxLength(maxRazonSocialLength) 
                            ]],
      telefono:         ['',[
                              Validators.pattern("^[0-9]*$"), 
                              Validators.required,
                              Validators.minLength(maxdocLength),
                              Validators.maxLength(maxdocLength)  
                            ]]

      
    });
  }
  public getError(controlName: any) {
    return this.updatePersonalData.getError(controlName, this.UpdateFormPersonal);
  }


  setUserData() {
    this.UpdateFormPersonal.controls['documento'].disable();
    this.UpdateFormPersonal.controls['primerNombre'].disable();
    this.UpdateFormPersonal.controls['segundoNombre'].disable();
    this.UpdateFormPersonal.controls['primerApellido'].disable();
    this.UpdateFormPersonal.controls['segundoApellido'].disable();
    this.UpdateFormPersonal.controls['documento'].setValue(`${this.loginService.validateSession()['nitcli_b']}`);
    this.UpdateFormPersonal.controls['primerNombre'].setValue(`${this.loginService.validateSession()['nomcli_b']}`);
    this.UpdateFormPersonal.controls['segundoNombre'].setValue(`${this.loginService.validateSession()['nom2cli_b']}`);
    this.UpdateFormPersonal.controls['primerApellido'].setValue(`${this.loginService.validateSession()['ape1cli_b']}`);
    this.UpdateFormPersonal.controls['segundoApellido'].setValue(`${this.loginService.validateSession()['ape2cli_b']}`);

    this.UpdateFormPersonal.controls['telefono'].setValue(`${this.loginService.validateSession()['telcli_b']}`);
    this.UpdateFormPersonal.controls['email'].setValue(`${this.loginService.validateSession()['emacli_b']}`);
  }


  public async updateRegister() {
    const dataForm = this.UpdateFormPersonal.value;
    this.codcli_b=`${this.loginService.validateSession()['codcli_b']}`

    this.updatePersonalDataService.UpdateCustomer(
                                                  this.codcli_b,
                                                  dataForm.email,
                                                  dataForm.telefono);
    }
}
