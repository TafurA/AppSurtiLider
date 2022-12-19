import { Injectable } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

// Connect with http
import axios from 'axios';

// Global config
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PollService {
  public arrayCuestions = new Array;

constructor(public nvCtrl: NavController, private toastController: ToastController) { }

  async Questions() {

    await axios.get(`${environment.apiPath}getSurvey`, environment.headerConfig).then(response => {
      
      if (response.data) {
        this.arrayCuestions=response.data.data;
      } else {
        console.log(response.data.message);
      }

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }
  public dataQuestions(): Object {
    this.arrayCuestions;
    return this.arrayCuestions;
  }

  async ResponseQuestions(idVendedor : string, question1: string ,question2 : string, question3: string, idQuestion1: string, idQuestion2: string, idQuestion3: string) {


    await axios.get(`${environment.apiPath}answerSurvey?idVendedor=${idVendedor}&answers={"${idQuestion1}":"${question1}","${idQuestion2}":"${question2}","${idQuestion3}":"${question3}"}`, environment.headerConfig).then(response => {
      
      if (response) {
        console.log(response);
      } else {
        console.log(response.data.message);
      }

    }).catch((error) => {
      console.log("error.status");
      console.log(error)
    })

  }



}
