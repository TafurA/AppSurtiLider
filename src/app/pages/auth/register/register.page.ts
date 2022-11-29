import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import {  ToastController } from '@ionic/angular';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';



// Custom imports
import { RegisterService } from 'src/app/service/register/register.service';
import { RegisterValidator } from 'src/app/util/register-validator';
// import { ModalDireccionComponent } from 'src/app/component/layout/modal-direccion/modal-direccion.component';
// import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [RegisterValidator]
})
export class RegisterPage implements OnInit {
  public RegisterForm: FormGroup;
  //mostrar y ocultar
  public form1  !: String;
  public form1_1!: String;
  public form1_2!: string;
  public form2  !: String;
  public form3  !: String;
  public nomenclatura !: string;
  public nomenclatura2 !: string;
  public currentFood = undefined;
  public validarNomenc= undefined;
  //mostrar y ocultar
  public loader: any;
  public dataMunicipios:any;
  public dataTipoCliente:any;
  public dataDireccion :any;
  public tipo1 =new Array;
  public tipo3=new Array;
  public tipo5 =new Array;
  public tipo6 =new Array;
  public tipo7 =new Array;

  //modal direccion
  @ViewChild(IonModal) modal: IonModal;
  message = 'h';

  constructor(
    private RegisterService: RegisterService,
    private formBuilder: FormBuilder,
    private registerValidator: RegisterValidator,
    private modalCtrl: ModalController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}
  ngOnInit() {
    this.form1 = "G";
    this.form1_2 = "";
    this.form1_1="";
    this.form2 = "";
    this.form3 = "";
    this.nomenclatura="";
    this.BuildRegisterForm();
    this.municipios();
    this.tipo_cliente();
    this.DireccionNomenclaturas();
  }
  tipo = [
    {
      id: 'C',
      name: 'Cedula de ciudadanía',
    },
    {
      id: 'N',
      name: 'NIT',
    }
  ];



  public download(url){
    window.open(url, "_blank");
  }




 
  private BuildRegisterForm() {
    //tipo
    const mintipoLength = 4;
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

    this.RegisterForm = this.formBuilder.group({
      tipo_doc:       ['',[ 
                       Validators.required
                      ]],
      documento:      ['',[ 
                       Validators.required,
                       Validators.pattern(soloNumeros),
                       Validators.minLength(mindocLength),
                       Validators.maxLength(maxdocLength)
                      ]],
      primerNombre:   ['',[ 
                       Validators.required,
                       Validators.pattern(letrasEspacio),
                       Validators.minLength(minNomLength),
                       Validators.maxLength(maxNomLength)
                      ]],
      segundoNombre:  ['',[
                       Validators.pattern(letras),
                       Validators.minLength(minNomLength)
                      ]],
      primerApellido:   ['',[ 
                        Validators.required,
                        Validators.pattern(letrasEspacio),
                        Validators.minLength(minNomLength),
                        Validators.maxLength(maxNomLength)
 
                       ]],
      segundoApellido:  ['',[
                        Validators.pattern(letrasEspacio),
                        Validators.minLength(minNomLength),
                        Validators.maxLength(maxNomLength)
                        
                       ]],                
      razonSocial:      ['',[
                        Validators.pattern("^[a-zA-Z0-9 ]+$"), 
                        Validators.required,
                        Validators.minLength(minNomLength),
                        Validators.maxLength(maxRazonSocialLength) 
                        ]],
      digitoVer:         ['',[
                        Validators.required,
                        Validators.pattern(soloNumeros),
                        Validators.minLength(1),
                        Validators.maxLength(1)
                        ]],
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
                      ]],

      tipo_tienda:    ['',[
                        Validators.required,
                      ]],
      establecimiento:['',[
                        Validators.pattern(letras), 
                        Validators.required,
                        Validators.maxLength(maxEstablecimiento)
                      ]],
      ver_direccion:  [ '',[
                        Validators.required
                      ]],
      // barrio:         ['',[
      //                   // Validators.pattern(letrasEspacio), 
      //                   Validators.required,
      //                   Validators.maxLength(maxRazonSocialLength) 
      //                 ]],  
      municipio:       ['',[
                        Validators.required,
                        Validators.maxLength(maxRazonSocialLength)
                       ]],
      dirparam1:       [''],
      dirparam2:       ['',
                        Validators.pattern(soloNumeros)        
                       ],
      dirparam3:       [''],
      dirparam4:       [''],
      dirparam5:       ['',
                        Validators.pattern(soloNumeros)        
                       ],
      dirparam6:       [''],
      dirparam7:       ['',
                          Validators.pattern(soloNumeros)        
                        ],
      dirparam8:       [''],
      tratamientoDatos: ['', Validators.required
                        ]

    });
  }
  public getError(controlName: any) {
    return this.registerValidator.getError(controlName, this.RegisterForm);
  }
  public async validarRegistro() {
    const dataForm = this.RegisterForm.value;
    if (dataForm.tipo_doc != "" || dataForm.documento != "" || dataForm.primerNombre != ""  || dataForm.primerApellido != "" || dataForm.segundoApellido != "" || dataForm.email != "" || dataForm.telefono != "" || dataForm.tipo_tienda != "" || dataForm.establecimiento != "" || dataForm.barrio != "" ) {
      this.RegisterService.RegisterToSystem(dataForm.tipo_doc.id, 
                                            dataForm.documento,
                                            dataForm.primerNombre,
                                            dataForm.segundoNombre,
                                            dataForm.primerApellido,
                                            dataForm.segundoApellido,
                                            dataForm.razonSocial,
                                            dataForm.digitoVer,
                                            dataForm.email,
                                            dataForm.telefono,
                                            dataForm.tipo_tienda,
                                            dataForm.establecimiento,
                                            dataForm.ver_direccion,
                                            dataForm.barrio,
                                            dataForm.municipio);
    }else{
      alert("Los campos no están diligenciados correctamente, por favor verifique e intente nuevamente.");
    }
  }
  // ocultar campos segun el tipo de dato
  public async obtenerTipoDoc(ev) {
    this.currentFood = ev.target.value;
    const dataForm = this.RegisterForm.value;
    if (dataForm.tipo_doc.id === "C" ) {
      this.form1_1="mostrar";
      this.form1_2="";

    }
    if (dataForm.tipo_doc.id === "N" ) {
      this.form1_2="mostrar";
      this.form1_1="";
      
    }
  }
  // mostrar seccion datos personales
  public async continuarform1() {
    const dataForm = this.RegisterForm.value;
    this.form1="g";
    this.form2="";   
    this.form3="";
    console.log(dataForm);
  }
  // mostrar seccion contacto
  public async continuarform2() {
    const dataForm = this.RegisterForm.value;
    if (dataForm.tipo_doc.id==null || dataForm.tipo_doc.id && ((dataForm.documento=="" || dataForm.primerNombre=="" || dataForm.primerApellido=="" ) && (dataForm.razonSocial=="" || dataForm.digitoVer==""  ) )) {     
      this.form1= "1";
      this.form2="";
      this.form3="";
      this.presentToast("Por favor, diligencie los datos del formulario", "Error", 'is-success');
    }
    else{
      this.form1= "";
      this.form2="g";
      this.form3="";
    }

    console.log(dataForm);
  }
  // mostrar seccion entrega
  public async continuarform3() {
    const dataForm = this.RegisterForm.value;
    if (dataForm.tipo_doc.id==null || dataForm.tipo_doc.id && ((dataForm.documento=="" || dataForm.primerNombre=="" || dataForm.primerApellido=="" ) && (dataForm.razonSocial=="" || dataForm.digitoVer==""  ) )) {     
    const dataForm = this.RegisterForm.value;
    this.form1="1";
    this.form2="";
    this.form3="";
    console.log(dataForm);
  }else if (dataForm.email=="" || dataForm.telefono =="") {
      this.form1="";
      this.form2="2";
      this.form3="";
      this.presentToast("Por favor, diligencie los datos del formulario", "Error", 'is-success');
    }else{
      this.form1="";
      this.form2="";
      this.form3="3";
    }
  }

   // datos input municipios 
   public async municipios(){
    const dataForm=this.RegisterForm.value;
    await this.RegisterService.tbl_municipios().then(() => {
      if (this.RegisterService.confirmDataMunicipios()[0]) {

        this.dataMunicipios =this.RegisterService.confirmDataMunicipios();
      }else{
        console.log("error");
      }

    });
    
  }
  //Tipo de tienda // POR ACTUALIZAR A BARRIOS
  public async tipo_cliente(){
    const dataForm=this.RegisterForm.value;
    await this.RegisterService.tbl_tipoCliente().then(() => {
      if (this.RegisterService.confirmDataTipoCliente()[0]) {
        this.dataTipoCliente =this.RegisterService.confirmDataTipoCliente();
      }else{
        console.log("error");
      }
    });
  }
 // //direccion
 public async DireccionNomenclaturas(){

  await this.RegisterService.DireccionNomenclaturas().then(() => {

    if (this.RegisterService.ConfirmDireccion()[0]) {

      this.dataDireccion =this.RegisterService.ConfirmDireccion();
        //extraer nomenclaturas
        this.tipo1= this.dataDireccion.filter(objeto=>objeto.tipo==1);
        this.tipo3= this.dataDireccion.filter(objeto=>objeto.tipo==3);
        this.tipo5= this.dataDireccion.filter(objeto=>objeto.tipo==5);
        this.tipo6= this.dataDireccion.filter(objeto=>objeto.tipo==6);
        this.tipo7= this.dataDireccion.filter(objeto=>objeto.tipo==7);
  }
  });
}  

//validar nomenclatura
public async validarNomenclatura(ev){
  this.validarNomenc = ev.target.value;
  const dataForm = this.RegisterForm.value;
  console.log(dataForm.dirparam1);
    
    if(dataForm.dirparam1 == "CALLE" ){
      this.nomenclatura="Mostrar";
      // console.log(this.nomenclatura);
    }else{
      this.nomenclatura="";
    }
    if(dataForm.dirparam1 == "CARRERA"  ){
      this.nomenclatura2="Mostrar";
      // console.log(this.nomenclatura2);
    }else{
      this.nomenclatura2="";
    }
  }

  
  //modal direccion
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  confirm() {
    const dataForm = this.RegisterForm.value;
   this.modal.dismiss(dataForm.dirparam1 + ' ' + 
                      dataForm.dirparam2 + ' ' +
                      dataForm.dirparam3 + ' ' +
                      dataForm.dirparam4 + ' ' +
                      dataForm.dirparam5 + ' ' +
                      dataForm.dirparam6 + ' ' +
                      dataForm.dirparam7 + ' ' +
                      dataForm.dirparam8, 'confirm');
    
  }
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `${ev.detail.data}`;
      const dataForm = this.RegisterForm.value;
      dataForm.ver_direccion=this.message;
      console.log(dataForm);
      
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
  async presentToast(title: string, description: string, alertType: string) {
    const toast = await this.toastController.create({
      header: title,
      message: description,
      duration: 2500,
      position: 'bottom',
      cssClass: `c-alert ${alertType}`,
    });

    await toast.present();
  }

}
